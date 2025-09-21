const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const fs = require('fs-extra');
require('dotenv').config();

const UmpireAgent = require('./umpireAgent');
const MockUmpireAgent = require('./mockUmpireAgent');
const { cleanupTempFiles } = require('./utils/fileUtils');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3000;

// Check if FFmpeg is available
let ffmpegAvailable = false;
try {
  execSync('ffmpeg -version', { stdio: 'ignore' });
  ffmpegAvailable = true;
  console.log('✅ FFmpeg detected - Full video processing enabled');
} catch (error) {
  console.log('⚠️  FFmpeg not found - Using mock mode for testing');
  console.log('   Install FFmpeg with: brew install ffmpeg');
}

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads/'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'video-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 100 * 1024 * 1024 // 100MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedMimes = ['video/mp4', 'video/avi', 'video/mov', 'video/wmv', 'video/quicktime'];
    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only video files are allowed.'), false);
    }
  }
});

// Initialize Umpire Agent (real or mock based on FFmpeg availability)
const umpireAgent = ffmpegAvailable ? new UmpireAgent() : new MockUmpireAgent();

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/api/upload-video', upload.single('video'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No video file uploaded' });
    }

    const videoPath = req.file.path;
    const sport = req.body.sport || 'general'; // Default sport type
    
    console.log(`Processing video: ${videoPath} for sport: ${sport}`);
    
    // Process video and get umpire decision
    const decision = await umpireAgent.processVideo(videoPath, sport);
    
    // Clean up uploaded file
    await fs.remove(videoPath);
    
    res.json({
      success: true,
      decision: decision,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error processing video:', error);
    
    // Clean up file if error occurs
    if (req.file && req.file.path) {
      try {
        await fs.remove(req.file.path);
      } catch (cleanupError) {
        console.error('Error cleaning up file:', cleanupError);
      }
    }
    
    res.status(500).json({
      error: 'Failed to process video',
      details: error.message
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!process.env.GEMINI_API_KEY
  });
});

// Cleanup temporary files on server start
cleanupTempFiles();

// Start server
app.listen(PORT, () => {
  console.log(`🏟️  AI Umpire Agent server running on port ${PORT}`);
  console.log(`🌐 Open http://localhost:${PORT} to access the application`);
  
  if (!process.env.GEMINI_API_KEY) {
    console.warn('⚠️  Warning: GEMINI_API_KEY not found in environment variables');
  }
});

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully');
  cleanupTempFiles();
  process.exit(0);
});

process.on('SIGINT', async () => {
  console.log('SIGINT received, shutting down gracefully');
  cleanupTempFiles();
  process.exit(0);
});

module.exports = app;