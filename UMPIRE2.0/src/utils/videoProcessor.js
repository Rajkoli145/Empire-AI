const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const fs = require('fs-extra');
const { v4: uuidv4 } = require('uuid');

class VideoProcessor {
  constructor() {
    this.tempDir = path.join(__dirname, '../../temp');
    this.ensureTempDir();
  }

  async ensureTempDir() {
    await fs.ensureDir(this.tempDir);
  }

  /**
   * Extract frames from video at specified intervals
   * @param {string} videoPath - Path to the video file
   * @param {number} frameInterval - Extract every nth frame (default: 30 for 1 frame per second at 30fps)
   * @param {number} maxFrames - Maximum number of frames to extract (default: 20)
   * @returns {Array<string>} Array of frame file paths
   */
  async extractFrames(videoPath, frameInterval = 30, maxFrames = 20) {
    return new Promise((resolve, reject) => {
      const sessionId = uuidv4();
      const outputDir = path.join(this.tempDir, `frames_${sessionId}`);
      
      fs.ensureDir(outputDir)
        .then(() => {
          const outputPattern = path.join(outputDir, 'frame_%03d.jpg');
          
          ffmpeg(videoPath)
            .on('end', async () => {
              try {
                // Get list of extracted frames
                const frameFiles = await fs.readdir(outputDir);
                const framePaths = frameFiles
                  .filter(file => file.endsWith('.jpg'))
                  .sort()
                  .slice(0, maxFrames) // Limit to maxFrames
                  .map(file => path.join(outputDir, file));
                
                console.log(`Extracted ${framePaths.length} frames from video`);
                resolve(framePaths);
              } catch (error) {
                reject(error);
              }
            })
            .on('error', (err) => {
              console.error('FFmpeg error:', err);
              reject(err);
            })
            .outputOptions([
              '-vf', `fps=1/${frameInterval}`, // Extract 1 frame every frameInterval frames
              '-q:v', '2' // High quality JPEG
            ])
            .output(outputPattern)
            .run();
        })
        .catch(reject);
    });
  }

  /**
   * Extract audio from video
   * @param {string} videoPath - Path to the video file
   * @returns {string} Path to the extracted audio file
   */
  async extractAudio(videoPath) {
    return new Promise((resolve, reject) => {
      const sessionId = uuidv4();
      const audioPath = path.join(this.tempDir, `audio_${sessionId}.wav`);
      
      ffmpeg(videoPath)
        .on('end', () => {
          console.log('Audio extraction completed');
          resolve(audioPath);
        })
        .on('error', (err) => {
          console.error('Audio extraction error:', err);
          reject(err);
        })
        .outputOptions([
          '-vn', // No video
          '-acodec', 'pcm_s16le', // PCM 16-bit encoding
          '-ar', '16000', // 16kHz sample rate (good for speech recognition)
          '-ac', '1' // Mono audio
        ])
        .output(audioPath)
        .run();
    });
  }

  /**
   * Get video metadata
   * @param {string} videoPath - Path to the video file
   * @returns {Object} Video metadata
   */
  async getVideoMetadata(videoPath) {
    return new Promise((resolve, reject) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err) {
          reject(err);
        } else {
          const videoStream = metadata.streams.find(stream => stream.codec_type === 'video');
          const audioStream = metadata.streams.find(stream => stream.codec_type === 'audio');
          
          // Parse frame rate safely
          let frameRate = 30; // default
          if (videoStream?.r_frame_rate) {
            const [num, den] = videoStream.r_frame_rate.split('/');
            frameRate = den ? parseFloat(num) / parseFloat(den) : parseFloat(num);
          }
          
          resolve({
            duration: parseFloat(metadata.format.duration),
            frameRate: frameRate,
            width: videoStream?.width,
            height: videoStream?.height,
            hasAudio: !!audioStream,
            format: metadata.format.format_name,
            size: metadata.format.size
          });
        }
      });
    });
  }

  /**
   * Extract key frames from video (scene changes, action moments)
   * @param {string} videoPath - Path to the video file
   * @param {number} maxFrames - Maximum number of key frames to extract
   * @returns {Array<string>} Array of key frame file paths
   */
  async extractKeyFrames(videoPath, maxFrames = 15) {
    return new Promise((resolve, reject) => {
      const sessionId = uuidv4();
      const outputDir = path.join(this.tempDir, `keyframes_${sessionId}`);
      
      fs.ensureDir(outputDir)
        .then(() => {
          const outputPattern = path.join(outputDir, 'keyframe_%03d.jpg');
          
          ffmpeg(videoPath)
            .on('end', async () => {
              try {
                const frameFiles = await fs.readdir(outputDir);
                const framePaths = frameFiles
                  .filter(file => file.endsWith('.jpg'))
                  .sort()
                  .slice(0, maxFrames)
                  .map(file => path.join(outputDir, file));
                
                console.log(`Extracted ${framePaths.length} key frames from video`);
                resolve(framePaths);
              } catch (error) {
                reject(error);
              }
            })
            .on('error', (err) => {
              console.error('Key frame extraction error:', err);
              reject(err);
            })
            .outputOptions([
              '-vf', 'fps=1/2', // Extract 1 frame every 2 seconds
              '-q:v', '2' // High quality
            ])
            .output(outputPattern)
            .run();
        })
        .catch(reject);
    });
  }

  /**
   * Convert frame file to base64 for API transmission
   * @param {string} framePath - Path to frame image
   * @returns {string} Base64 encoded image
   */
  async frameToBase64(framePath) {
    try {
      const imageBuffer = await fs.readFile(framePath);
      return imageBuffer.toString('base64');
    } catch (error) {
      console.error('Error converting frame to base64:', error);
      throw error;
    }
  }

  /**
   * Clean up temporary files for a session
   * @param {Array<string>} framePaths - Array of frame file paths to clean up
   */
  async cleanupFrames(framePaths) {
    try {
      for (const framePath of framePaths) {
        const frameDir = path.dirname(framePath);
        if (frameDir.includes('temp')) {
          await fs.remove(frameDir);
        }
      }
    } catch (error) {
      console.error('Error cleaning up frames:', error);
    }
  }

  /**
   * Clean up audio file
   * @param {string} audioPath - Path to audio file to clean up
   */
  async cleanupAudio(audioPath) {
    try {
      if (audioPath && audioPath.includes('temp')) {
        await fs.remove(audioPath);
      }
    } catch (error) {
      console.error('Error cleaning up audio:', error);
    }
  }
}

module.exports = VideoProcessor;