// AI Umpire Agent - Frontend JavaScript
class UmpireUI {
    constructor() {
        this.selectedFile = null;
        this.initializeEventListeners();
        this.checkServerHealth();
    }

    initializeEventListeners() {
        // File upload elements
        const uploadArea = document.getElementById('uploadArea');
        const videoInput = document.getElementById('videoInput');
        const analyzeBtn = document.getElementById('analyzeBtn');
        const analyzeAnotherBtn = document.getElementById('analyzeAnotherBtn');
        const tryAgainBtn = document.getElementById('tryAgainBtn');

        // Upload area click
        uploadArea.addEventListener('click', () => {
            videoInput.click();
        });

        // File input change
        videoInput.addEventListener('change', (e) => {
            this.handleFileSelect(e.target.files[0]);
        });

        // Drag and drop events
        uploadArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadArea.classList.add('dragover');
        });

        uploadArea.addEventListener('dragleave', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
        });

        uploadArea.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadArea.classList.remove('dragover');
            
            const files = e.dataTransfer.files;
            if (files.length > 0) {
                this.handleFileSelect(files[0]);
            }
        });

        // Button events
        analyzeBtn.addEventListener('click', () => {
            this.analyzeVideo();
        });

        analyzeAnotherBtn.addEventListener('click', () => {
            this.resetInterface();
        });

        tryAgainBtn.addEventListener('click', () => {
            this.resetInterface();
        });
    }

    handleFileSelect(file) {
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('video/')) {
            alert('Please select a valid video file.');
            return;
        }

        // Validate file size (100MB limit)
        const maxSize = 100 * 1024 * 1024; // 100MB
        if (file.size > maxSize) {
            alert('File size must be less than 100MB.');
            return;
        }

        this.selectedFile = file;
        this.updateUploadUI(file);
    }

    updateUploadUI(file) {
        const uploadArea = document.getElementById('uploadArea');
        const analyzeBtn = document.getElementById('analyzeBtn');

        // Update upload area to show selected file
        uploadArea.innerHTML = `
            <i class="fas fa-file-video"></i>
            <h3>File Selected</h3>
            <p><strong>${file.name}</strong></p>
            <p>Size: ${this.formatFileSize(file.size)}</p>
            <small>Click to select a different file</small>
        `;

        // Enable analyze button
        analyzeBtn.disabled = false;
    }

    async analyzeVideo() {
        if (!this.selectedFile) return;

        const sport = document.getElementById('sportSelect').value;
        
        // Show processing section
        this.showSection('processingSection');
        
        // Create form data
        const formData = new FormData();
        formData.append('video', this.selectedFile);
        formData.append('sport', sport);

        // Start processing animation
        this.startProcessingAnimation();

        try {
            const response = await fetch('/api/upload-video', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                this.displayResults(result.decision);
            } else {
                throw new Error(result.error || 'Analysis failed');
            }

        } catch (error) {
            console.error('Analysis error:', error);
            this.showError(error.message);
        }
    }

    startProcessingAnimation() {
        const steps = ['step1', 'step2', 'step3', 'step4'];
        let currentStep = 0;

        const animateStep = () => {
            if (currentStep < steps.length) {
                // Mark current step as active
                const step = document.getElementById(steps[currentStep]);
                step.classList.add('active');

                // Mark previous step as completed
                if (currentStep > 0) {
                    const prevStep = document.getElementById(steps[currentStep - 1]);
                    prevStep.classList.remove('active');
                    prevStep.classList.add('completed');
                }

                currentStep++;
                
                // Continue animation after delay
                setTimeout(animateStep, 2000);
            } else {
                // Mark last step as completed
                const lastStep = document.getElementById(steps[steps.length - 1]);
                lastStep.classList.remove('active');
                lastStep.classList.add('completed');
            }
        };

        animateStep();
    }

    displayResults(decision) {
        console.log('🎯 Displaying results:', decision);
        try {
            // Safely populate results section with fallbacks
            document.getElementById('finalCall').textContent = decision?.finalCall || 'DECISION';
            
            // Format the decision content in a more readable way
            const decisionText = decision?.decision || 'Analysis completed';
            const formattedContent = this.formatDecisionContent(decisionText);
            document.getElementById('decisionContent').innerHTML = formattedContent;
            
            // Handle sport name safely
            const sport = decision?.sport || 'general';
            document.getElementById('sportType').textContent = sport.charAt(0).toUpperCase() + sport.slice(1);
            
            // Handle video duration safely
            const duration = decision?.videoDuration || 0;
            document.getElementById('videoDuration').textContent = `${duration.toFixed(1)}s`;
            
            // Handle frame count - check for new property first, then old one
            let frameInfo = 'Full Video';
            if (decision?.processedAsFullVideo) {
                frameInfo = 'Complete Video Analysis';
            } else if (decision?.processedFrames) {
                frameInfo = decision.processedFrames.toString() + ' frames';
            }
            document.getElementById('framesCount').textContent = frameInfo;
            
            // Handle audio status safely
            document.getElementById('audioStatus').textContent = decision?.hasAudio ? 'Available' : 'Not Available';
            
            // Set confidence badge safely
            const confidenceBadge = document.getElementById('confidenceBadge');
            const confidenceLevel = document.getElementById('confidenceLevel');
            const confidence = decision?.confidence || 'Medium';
            confidenceLevel.textContent = confidence;
            
            // Update confidence badge class safely
            confidenceBadge.className = 'confidence-badge ' + confidence.toLowerCase();

            // Show results section
            this.showSection('resultsSection');
        } catch (error) {
            console.error('Error displaying results:', error);
            this.showError('Failed to display analysis results');
        }
    }

    showError(message) {
        document.getElementById('errorMessage').textContent = message;
        this.showSection('errorSection');
    }

    showSection(sectionId) {
        // Hide all sections
        const sections = [
            'uploadSection',
            'processingSection', 
            'resultsSection',
            'errorSection'
        ];

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.classList.add('hidden');
                element.style.display = 'none';
            }
        });

        // Show target section with force visibility
        const targetElement = document.getElementById(sectionId);
        if (targetElement) {
            targetElement.classList.remove('hidden');
            targetElement.style.display = 'block';
            targetElement.style.visibility = 'visible';
            targetElement.style.opacity = '1';
            console.log(`✅ Showing section: ${sectionId}`);
        } else {
            console.error(`❌ Section not found: ${sectionId}`);
        }
    }

    resetInterface() {
        // Clear selected file
        this.selectedFile = null;
        document.getElementById('videoInput').value = '';

        // Reset upload area
        const uploadArea = document.getElementById('uploadArea');
        uploadArea.innerHTML = `
            <i class="fas fa-cloud-upload-alt"></i>
            <h3>Upload Sports Video</h3>
            <p>Drop your video file here or click to browse</p>
            <div class="file-formats">
                <small>Supported formats: MP4, AVI, MOV, WMV (Max 100MB)</small>
            </div>
        `;

        // Reset analyze button
        const analyzeBtn = document.getElementById('analyzeBtn');
        analyzeBtn.disabled = true;

        // Reset processing steps
        const steps = ['step1', 'step2', 'step3', 'step4'];
        steps.forEach(stepId => {
            const step = document.getElementById(stepId);
            step.classList.remove('active', 'completed');
        });

        // Show upload section
        this.showSection('uploadSection');
    }

    async checkServerHealth() {
        try {
            const response = await fetch('/api/health');
            const health = await response.json();
            
            if (!health.geminiConfigured) {
                console.warn('Warning: Gemini API key not configured');
                this.showError('Server is not properly configured. Please check the API key configuration.');
            }
        } catch (error) {
            console.error('Health check failed:', error);
            this.showError('Unable to connect to the server. Please check if the server is running.');
        }
    }

    formatFileSize(bytes) {
        if (bytes === 0) return '0 Bytes';
        
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    formatDecisionContent(decisionText) {
        // Clean up the text and parse structured sections
        let formattedHTML = '';
        
        // Remove emojis and clean up formatting
        let cleanText = decisionText
            .replace(/[🏆🎯💪📢⚖️🏏]/g, '') // Remove emojis
            .replace(/\*\*/g, '') // Remove markdown bold
            .trim();

        // Split into sections based on patterns
        const sections = [];
        
        // Look for DECISION section
        const decisionMatch = cleanText.match(/DECISION\s*:?\s*([^]*?)(?=REASONING|CONFIDENCE|OFFICIAL CALL|$)/i);
        if (decisionMatch) {
            sections.push({
                title: 'Decision',
                content: decisionMatch[1].trim()
            });
        }
        
        // Look for REASONING section
        const reasoningMatch = cleanText.match(/REASONING\s*:?\s*([^]*?)(?=CONFIDENCE|OFFICIAL CALL|$)/i);
        if (reasoningMatch) {
            sections.push({
                title: 'Reasoning',
                content: reasoningMatch[1].trim()
            });
        }
        
        // Look for CONFIDENCE section
        const confidenceMatch = cleanText.match(/CONFIDENCE\s*:?\s*([^]*?)(?=OFFICIAL CALL|$)/i);
        if (confidenceMatch) {
            sections.push({
                title: 'Confidence Level',
                content: confidenceMatch[1].trim()
            });
        }
        
        // Look for OFFICIAL CALL section
        const callMatch = cleanText.match(/OFFICIAL CALL\s*:?\s*([^]*?)$/i);
        if (callMatch) {
            sections.push({
                title: 'Official Call',
                content: callMatch[1].trim()
            });
        }
        
        // If no structured sections found, create a general analysis
        if (sections.length === 0) {
            // Try to extract key information from the text
            const sentences = cleanText.split(/[.!?]+/).filter(s => s.trim().length > 0);
            sections.push({
                title: 'Analysis Summary',
                content: sentences.slice(0, 3).join('. ') + (sentences.length > 3 ? '...' : '')
            });
        }
        
        // Generate HTML for each section
        sections.forEach(section => {
            const highlightedContent = this.highlightKeyTerms(section.content);
            formattedHTML += `
                <div class="decision-section">
                    <span class="section-title">${section.title}</span>
                    <div class="section-text">${highlightedContent}</div>
                </div>
            `;
        });
        
        return formattedHTML;
    }

    highlightKeyTerms(text) {
        // Highlight important cricket terms and decisions
        const keyTerms = [
            { term: 'OUT', class: 'highlight-term' },
            { term: 'NOT OUT', class: 'highlight-term' },
            { term: 'STUMPED', class: 'highlight-term' },
            { term: 'LBW', class: 'highlight-term' },
            { term: 'CAUGHT', class: 'highlight-term' },
            { term: 'BOWLED', class: 'highlight-term' },
            { term: 'RUN OUT', class: 'highlight-term' },
            { term: 'High', class: 'confidence-high' },
            { term: 'Medium', class: 'confidence-medium' },
            { term: 'Low', class: 'confidence-low' }
        ];
        
        let highlightedText = text;
        
        keyTerms.forEach(({ term, class: className }) => {
            const regex = new RegExp(`\\b${term}\\b`, 'gi');
            highlightedText = highlightedText.replace(regex, `<span class="${className}">${term}</span>`);
        });
        
        return highlightedText;
    }
}

// Initialize the UI when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('🏏 AI Umpire Agent - Initializing UI...');
    try {
        const ui = new UmpireUI();
        console.log('✅ UI initialized successfully');
        
        // Force show upload section with aggressive styling
        const uploadSection = document.getElementById('uploadSection');
        if (uploadSection) {
            uploadSection.classList.remove('hidden');
            uploadSection.style.display = 'block';
            uploadSection.style.visibility = 'visible';
            uploadSection.style.opacity = '1';
            uploadSection.style.position = 'relative';
            uploadSection.style.zIndex = '999';
            uploadSection.style.background = '#ffffff';
            uploadSection.style.border = '3px solid #10b981';
            uploadSection.style.padding = '2rem';
            uploadSection.style.margin = '2rem 0';
            uploadSection.style.minHeight = '200px';
            console.log('✅ Upload section is visible');
            
            // Also force the upload area
            const uploadArea = document.getElementById('uploadArea');
            if (uploadArea) {
                uploadArea.style.display = 'block';
                uploadArea.style.visibility = 'visible';
                uploadArea.style.opacity = '1';
                uploadArea.style.background = '#f8fafc';
                uploadArea.style.border = '2px dashed #10b981';
                uploadArea.style.padding = '3rem 2rem';
                uploadArea.style.textAlign = 'center';
                uploadArea.style.minHeight = '150px';
                console.log('✅ Upload area is visible');
            }
        } else {
            console.error('❌ Upload section not found in DOM');
        }
    } catch (error) {
        console.error('❌ Error initializing UI:', error);
    }
});