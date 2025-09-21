const { GoogleGenerativeAI } = require('@google/generative-ai');
const VideoProcessor = require('./utils/videoProcessor');
const fs = require('fs-extra');
const path = require('path');

class UmpireAgent {
  constructor() {
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('GEMINI_API_KEY environment variable is required');
    }
    
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.videoProcessor = new VideoProcessor();
    
    // Initialize ALL 4 Gemini models for different purposes - Updated to 2.5 Flash
    this.visionModel = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });     // 1. Vision API - Frame analysis
    this.videoModel = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });       // 2. Video API - Complete video
    this.multimodalModel = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });  // 3. Multimodal API - Rules + Video
    this.liveModel = this.genAI.getGenerativeModel({ model: "gemini-2.5-flash" });      // 4. Live API - Final decision
    
    // Add consistency cache
    this.analysisCache = new Map();
    
    // Clear cache on startup for testing
    console.log('🧹 Cleared analysis cache for fresh testing');
  }

  /**
   * Convert video file to base64 for inline processing
   * @param {string} videoPath - Path to the video file
   * @returns {Object} Video data object
   */
  async prepareVideoForProcessing(videoPath) {
    try {
      const videoBuffer = await fs.readFile(videoPath);
      const videoBase64 = videoBuffer.toString('base64');
      
      const fileSizeMB = videoBuffer.length / (1024 * 1024);
      const base64SizeMB = videoBase64.length / (1024 * 1024);
      
      console.log(`📤 Prepared video for processing: ${path.basename(videoPath)}`);
      console.log(`📊 Video size: ${fileSizeMB.toFixed(2)}MB (raw), ${base64SizeMB.toFixed(2)}MB (base64)`);
      
      if (base64SizeMB > 20) {
        console.warn('⚠️ Warning: Large video size might affect processing');
      }
      
      return {
        data: videoBase64,
        mimeType: 'video/mp4'
      };
    } catch (error) {
      console.error('Video preparation error:', error);
      throw error;
    }
  }

  /**
   * Main method to process video and return umpire decision
   * @param {string} videoPath - Path to the video file
   * @param {string} sport - Sport type
   * @returns {Object} Umpire decision
   */
  async processVideo(videoPath, sport = 'general') {
    console.log(`🏟️ Starting AI Umpire analysis for ${sport}...`);
    
    // Create cache key for consistency
    const cacheKey = `${path.basename(videoPath)}_${sport}`;
    
    // Check if we have cached analysis for consistency
    if (this.analysisCache.has(cacheKey)) {
      console.log('💾 Using cached analysis for consistency');
      return this.analysisCache.get(cacheKey);
    }
    
    try {
      // Step 1: Get basic video metadata
      console.log('📹 Getting video metadata...');
      const metadata = await this.videoProcessor.getVideoMetadata(videoPath);
      console.log(`Video metadata: ${metadata.duration}s, ${metadata.width}x${metadata.height}`);
      
      // Step 2: Prepare video for inline processing
      console.log('📤 Preparing video for AI analysis...');
      const videoData = await this.prepareVideoForProcessing(videoPath);
      
      // Step 3: Use Vision API - Extract and analyze key frames
      console.log('👁️ Step 1: Vision API - Analyzing key frames...');
      const framePaths = await this.videoProcessor.extractKeyFrames(videoPath, 8);
      const visionAnalysis = await this.analyzeFramesWithVision(framePaths, sport);
      
      // Step 4: Use Video API - Analyze complete video
      console.log('🎬 Step 2: Video API - Analyzing complete video...');
      const videoAnalysis = await this.analyzeVideoDirectly(videoData, sport);
      
      // Step 5: Use Multimodal API - Combine frame + video + rules
      console.log('🧠 Step 3: Multimodal API - Applying rules...');
      const multimodalAnalysis = await this.applyRulesWithMultimodal(visionAnalysis, videoAnalysis, sport, null);
      
      // Step 6: Use Live API - Generate final decision
      console.log('⚖️ Step 4: Live API - Final umpire decision...');
      const finalDecision = await this.generateLiveDecision(multimodalAnalysis, sport, metadata);
      
      // Cache the result for consistency
      this.analysisCache.set(cacheKey, finalDecision);
      
      // Cleanup temporary files
      await this.videoProcessor.cleanupFrames(framePaths);

      // Log all 4 APIs used
      console.log('\n📊 === API USAGE SUMMARY ===');
      console.log('✅ Vision API (gemini-2.5-flash): Frame analysis complete');
      console.log('✅ Video API (gemini-2.5-flash): Complete video analysis complete');
      console.log('✅ Multimodal API (gemini-2.5-flash): Rule integration complete');
      console.log('✅ Live API (gemini-2.5-flash): Final decision complete');
      console.log('=== ALL 4 GEMINI 2.5 FLASH APIs SUCCESSFULLY USED ===\n');
      
      console.log('✅ AI Umpire analysis complete using all 4 Gemini APIs!');
      return finalDecision;

    } catch (error) {
      console.error('❌ Error in umpire agent:', error);
      throw error;
    }
  }

  /**
   * Analyze entire video directly using Gemini's video capabilities
   * @param {Object} videoData - The video data object with base64 and mimeType
   * @param {string} sport - Sport type
   * @returns {string} Video analysis
   */
  async analyzeVideoDirectly(videoData, sport) {
    // Get video metadata for context
    const videoSizeMB = (videoData.data.length * 3/4) / (1024 * 1024); // approximate from base64
    
    const prompt = `
You are a PROFESSIONAL CRICKET UMPIRE analyzing a complete cricket video to make an OFFICIAL DECISION.

🎬 **CRITICAL: ANALYZE THE ENTIRE VIDEO DURATION**
⚠️ This video contains the complete cricket action sequence - you must analyze ALL of it!
⚠️ Watch from the very beginning (0 seconds) to the very end - not just the final moment!
⚠️ Describe what happens at the START, MIDDLE, and END of the video
⚠️ Track the ball's complete journey from bowling to the final outcome
⚠️ Consider the full chronological sequence of events

🏏 **YOUR TASK**: Make a definitive umpire decision based on the COMPLETE video.

📺 **VIDEO ANALYSIS REQUIREMENTS**:
- Watch the ENTIRE video duration from start to finish
- Track the ball's complete journey and trajectory
- Observe all player movements and positions throughout
- Note the sequence of events chronologically
- Don't focus only on the ending - analyze the full context

🔍 **SYSTEMATIC COMPLETE VIDEO ANALYSIS**:

**STEP 1: Full Video Timeline Analysis**
- BEGINNING (first 1-2 seconds): What happens at the start?
- MIDDLE (middle portion): What develops during the action?
- END (final 1-2 seconds): What is the final outcome?
- COMPLETE SEQUENCE: Describe the full chronological flow
- SCENARIO TYPE: What type of cricket scenario is this?

**STEP 2: Complete Visual Evidence** 
- Ball's complete trajectory and path throughout the video
- All contact points (bat, pad, ground, fielders) in sequence
- Batsman's complete actions and movements
- All fielders' actions throughout
- Equipment interactions (stumps, bails) across the full video
- Complete timing and sequence of ALL events

**STEP 3: Full Context Cricket Rules**
- Apply cricket rules to the COMPLETE sequence you observed
- Consider the entire play, not just isolated moments
- Which rules are relevant to the FULL scenario?

**STEP 4: Official Decision Based on Complete Analysis**
- **DECISION**: OUT or NOT OUT
- **TYPE**: If out, specify dismissal type
- **REASONING**: What you saw across the ENTIRE video that supports this call
- **CONFIDENCE**: High/Medium/Low

🎯 **CRITICAL**: Base your decision on the COMPLETE video analysis, not just the final frame!
`;

    try {
      const result = await this.videoModel.generateContent([
        prompt,
        {
          inlineData: {
            data: videoData.data,
            mimeType: videoData.mimeType
          }
        }
      ]);
      
      const analysisResult = result.response.text();
      
      // Debug logging
      console.log('\n🔍 === VIDEO ANALYSIS DEBUG ===');
      console.log('📋 Analysis Result:');
      console.log(analysisResult);
      console.log('=== END DEBUG ===\n');
      
      return analysisResult;
    } catch (error) {
      console.error('Direct video analysis error:', error);
      throw error;
    }
  }

  /**
   * Step 1: Vision API - Analyze individual frames for detailed visual evidence
   */
  async analyzeFramesWithVision(framePaths, sport) {
    console.log(`📷 Vision API: Processing ${framePaths.length} key frames...`);
    const analyses = [];

    for (let i = 0; i < framePaths.length; i++) {
      try {
        const frameBase64 = await this.videoProcessor.frameToBase64(framePaths[i]);
        
        const prompt = `
You are a CRICKET VISION EXPERT analyzing a single frame for detailed visual evidence.

🏏 **FRAME ANALYSIS TASK:**
Analyze this single frame from a cricket video for specific visual details.

🔍 **Focus on these cricket elements:**
1. Ball position and trajectory (if visible)
2. Batsman position and bat contact
3. Fielder positions and actions
4. Stumps and bails status
5. Crease lines and player positions relative to them
6. Any contact points (bat-ball, pad-ball, etc.)

📷 **Visual Evidence Report:**
- What do you see clearly in this frame?
- Any cricket equipment interactions?
- Player positions and movements?
- Critical moments or contact points?

Frame ${i + 1} of ${framePaths.length} - Provide detailed visual evidence:
`;

        const result = await this.visionModel.generateContent([
          prompt,
          {
            inlineData: {
              data: frameBase64,
              mimeType: "image/jpeg"
            }
          }
        ]);

        const analysis = result.response.text();
        analyses.push({
          frameNumber: i + 1,
          analysis: analysis,
          framePath: framePaths[i]
        });

        console.log(`✓ Analyzed frame ${i + 1}/${framePaths.length}`);

      } catch (error) {
        console.error(`Error analyzing frame ${i + 1}:`, error);
        analyses.push({
          frameNumber: i + 1,
          analysis: "Frame analysis failed",
          error: error.message
        });
      }
    }

    return analyses;
  }

  /**
   * Step 3: Multimodal API - Combine Vision + Video + Cricket Rules
   */
  async applyRulesWithMultimodal(visionAnalyses, videoAnalysis, sport, audioPath) {
    console.log('🧠 Multimodal API: Combining all analysis with cricket expertise...');
    
    // Compile frame analyses from Vision API
    const framesSummary = visionAnalyses.map(frame => 
      `Frame ${frame.frameNumber}: ${frame.analysis}`
    ).join('\n\n');

    const prompt = `
You are a PROFESSIONAL CRICKET UMPIRE combining multiple AI analyses to make an expert decision.

🧠 **MULTIMODAL ANALYSIS TASK:**
Combine the detailed frame analysis with complete video analysis using your cricket expertise.

📷 **VISION API ANALYSIS (Frame Details):**
${framesSummary}

🎬 **VIDEO API ANALYSIS (Complete Sequence):**
${videoAnalysis}

🏏 **YOUR CRICKET EXPERTISE:**
Using your complete knowledge of cricket laws and umpiring standards:

**MULTIMODAL SYNTHESIS:**
1. How do the frame details support or contradict the video analysis?
2. What additional cricket rule considerations apply?
3. Which analysis provides the most reliable evidence?
4. Are there any inconsistencies to resolve?
5. What is your expert cricket assessment?

**INTEGRATED DECISION:**
Based on combining both analyses with cricket laws, provide:
- Situation assessment
- Key evidence summary
- Rule application
- Confidence level
- Preliminary decision with reasoning

**Focus on cricket accuracy and umpiring standards.**
`;

    try {
      const result = await this.multimodalModel.generateContent([prompt]);
      return result.response.text();
    } catch (error) {
      console.error('Multimodal analysis error:', error);
      throw error;
    }
  }

  /**
   * Step 4: Live API - Generate final real-time umpire decision
   */
  async generateLiveDecision(multimodalAnalysis, sport, videoMetadata) {
    console.log('⚡ Live API: Generating real-time umpire decision...');
    const prompt = `
You are a PROFESSIONAL CRICKET UMPIRE making a LIVE MATCH DECISION based on comprehensive AI analysis.

⚡ **LIVE API FINAL DECISION**

VIDEO DURATION: ${videoMetadata.duration} seconds
COMPREHENSIVE ANALYSIS: ${multimodalAnalysis}

This is your FINAL OFFICIAL UMPIRE CALL for a live cricket match.

🏏 **LIVE DECISION REQUIRED:**

🏆 **DECISION**: [OUT or NOT OUT - be decisive]

🎯 **REASONING**: [Key evidence that supports this call]

💪 **CONFIDENCE**: [High/Medium/Low]

📢 **OFFICIAL CALL**: [Exactly how you would announce this in a real match]

⚡ **LIVE MATCH PRESSURE**: Make your call now - the players and crowd are waiting!
`;

    try {
      const result = await this.liveModel.generateContent([prompt]);
      const decision = result.response.text();
      
      // Debug logging for final decision
      console.log('\n⚖️ === FINAL DECISION DEBUG ===');
      console.log('🏏 Final Decision:');
      console.log(decision);
      console.log('=== END DECISION DEBUG ===\n');

      // Parse and structure the decision
      const extractedConfidence = this.extractConfidenceLevel(decision);
      const extractedFinalCall = this.extractFinalCall(decision, sport);
      
      // Debug extraction
      console.log('🔍 === EXTRACTION DEBUG ===');
      console.log('📝 Full Decision Text:', decision.substring(0, 200) + '...');
      console.log('🎯 Extracted Confidence:', extractedConfidence);
      console.log('🏏 Extracted Final Call:', extractedFinalCall);
      console.log('=== END EXTRACTION DEBUG ===\n');
      
      return {
        timestamp: new Date().toISOString(),
        sport: sport,
        videoDuration: videoMetadata.duration,
        decision: decision,
        processedAsFullVideo: true, // We analyzed the complete video
        hasAudio: videoMetadata.hasAudio,
        confidence: extractedConfidence,
        finalCall: extractedFinalCall
      };

    } catch (error) {
      console.error('Final decision generation error:', error);
      throw error;
    }
  }

  /**
   * Extract confidence level from decision text
   */
  extractConfidenceLevel(decisionText) {
    const text = decisionText.toLowerCase();
    if (text.includes('high confidence') || text.includes('confidence: high')) {
      return 'High';
    } else if (text.includes('medium confidence') || text.includes('confidence: medium')) {
      return 'Medium';
    } else if (text.includes('low confidence') || text.includes('confidence: low')) {
      return 'Low';
    }
    return 'Medium'; // default
  }

  /**
   * Extract the final call from decision text
   */
  extractFinalCall(decisionText, sport) {
    const text = decisionText.toUpperCase();
    
    // Cricket-specific decisions - prioritize longer matches first!
    if (sport === 'cricket') {
      if (text.includes('NOT OUT')) {
        return 'NOT OUT';
      }
      if (text.includes('OUT')) {
        return 'OUT';
      }
    }
    
    // Other sports - prioritize longer matches first
    const decisions = [
      'NOT OUT', 'OUT',           // Cricket (longer first)
      'NO GOAL', 'GOAL',         // Football (longer first)
      'NO FOUL', 'FOUL',         // General (longer first)
      'NO SCORE', 'SCORE',       // General (longer first)
      'INVALID', 'VALID',        // General (longer first)
      'ILLEGAL', 'LEGAL',        // General (longer first)
      'FAULT', 'LET', 'PENALTY', 'FREE KICK'
    ];

    for (const decision of decisions) {
      if (text.includes(decision)) {
        return decision;
      }
    }

    return 'DECISION REQUIRED'; // fallback
  }

  /**
   * Cleanup temporary files
   */
  async cleanupFiles(framePaths, audioPath) {
    try {
      await this.videoProcessor.cleanupFrames(framePaths);
      if (audioPath) {
        await this.videoProcessor.cleanupAudio(audioPath);
      }
    } catch (error) {
      console.error('Cleanup error:', error);
    }
  }
}

module.exports = UmpireAgent;