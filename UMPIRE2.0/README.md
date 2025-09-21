# 🏟️ AI Umpire Agent

An intelligent sports video analysis system that uses Google Gemini AI to make umpire/referee decisions from uploaded sports videos. The system analyzes video frames, applies sports rules, and provides real-time decisions like a professional umpire.

## 🚀 Features

- **Multi-Sport Support**: Cricket, Football/Soccer, Tennis, Basketball, and general sports
- **AI-Powered Analysis**: Uses Google Gemini Vision, Multimodal, and Text Generation APIs
- **Real-time Processing**: Extracts video frames and audio for comprehensive analysis
- **Professional UI**: Clean, responsive web interface with drag-and-drop video upload
- **Detailed Decisions**: Provides reasoning, confidence levels, and umpire-style announcements
- **Performance Monitoring**: Built-in logging and performance tracking

## 🎯 System Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│   Video Upload  │ => │  Frame/Audio     │ => │   Gemini Vision API │
│   (Web UI)      │    │  Extraction      │    │   (Frame Analysis)  │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
                                                           │
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────────┐
│ Final Decision  │ <= │   Gemini Live    │ <= │ Gemini Multimodal   │
│ (Umpire Style)  │    │ (Text Generation)│    │ (Rule Application)  │
└─────────────────┘    └──────────────────┘    └─────────────────────┘
```

## 📋 Prerequisites

- **Node.js** (v16.0.0 or higher)
- **FFmpeg** (for video processing)
- **Google Gemini API Key**

## 🛠️ Installation

### 1. Install System Dependencies

**macOS:**
```bash
# Install FFmpeg using Homebrew
brew install ffmpeg
```

**Ubuntu/Debian:**
```bash
sudo apt update
sudo apt install ffmpeg
```

**Windows:**
- Download FFmpeg from [https://ffmpeg.org/download.html](https://ffmpeg.org/download.html)
- Add FFmpeg to your system PATH

### 2. Clone and Setup Project

```bash
# Navigate to project directory
cd /Users/pranavkale/Desktop/UMPIRE2.0

# Install dependencies
npm install
```

### 3. Get Google Gemini API Key

1. Go to [Google AI Studio](https://ai.google.dev/)
2. Create a new project or select existing one
3. Enable the Gemini API
4. Generate an API key
5. Copy the API key for the next step

### 4. Configure Environment

```bash
# The .env file is already created, just add your API key:
# Open .env file and add your Gemini API key:
GEMINI_API_KEY=your_api_key_here
```

Example `.env` configuration:
```env
GEMINI_API_KEY=AIzaSyC-your-actual-api-key-here
PORT=3000
LOG_LEVEL=info
MAX_FILE_SIZE=104857600
MAX_PROCESSING_TIME=300000
```

## 🎮 Usage

### Start the Server

```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### Using the Web Interface

1. **Open your browser** and navigate to `http://localhost:3000`
2. **Select sport type** from the dropdown (Cricket, Football, Tennis, Basketball, General)
3. **Upload video** by dragging and dropping or clicking to browse
4. **Click "Analyze Video"** to start the AI analysis
5. **View the decision** with reasoning and confidence level

### Supported Video Formats

- **Formats**: MP4, AVI, MOV, WMV, QuickTime
- **Max Size**: 100MB
- **Recommended**: Short clips (5-30 seconds) for best performance

## 🏏 Supported Sports & Decisions

### Cricket
- **Decisions**: OUT, NOT OUT, WIDE, NO BALL, SIX, FOUR
- **Key Elements**: Ball, bat, stumps, wicket-keeper, fielders, crease, pads
- **Rules**: LBW, bowled, caught, stumped, run out, wide, no ball

### Football/Soccer
- **Decisions**: GOAL, NO GOAL, OFFSIDE, FOUL, PENALTY, CORNER, THROW-IN
- **Key Elements**: Ball, goal, goal line, players, goalkeeper, penalty area
- **Rules**: Goal line technology, offside, fouls, handball, penalty decisions

### Tennis
- **Decisions**: IN, OUT, FAULT, ACE, LET, WINNER
- **Key Elements**: Ball, court lines, net, service box, player, racket
- **Rules**: Ball in/out, service faults, lets, winners

### Basketball
- **Decisions**: SCORE, FOUL, VIOLATION, OUT OF BOUNDS, SHOT CLOCK, THREE POINTER
- **Key Elements**: Ball, hoop, court lines, three-point line, players
- **Rules**: Scoring, fouls, violations, boundaries, shot clock

## 🔧 API Endpoints

### POST `/api/upload-video`
Upload and analyze a sports video.

**Request:**
```javascript
// Form data
{
  video: File, // Video file
  sport: String // Sport type (cricket, football, tennis, basketball, general)
}
```

**Response:**
```javascript
{
  success: true,
  decision: {
    timestamp: "2024-01-15T10:30:00.000Z",
    sport: "cricket",
    videoDuration: 5.2,
    decision: "Detailed umpire decision text...",
    processedFrames: 10,
    hasAudio: true,
    confidence: "High",
    finalCall: "OUT"
  }
}
```

### GET `/api/health`
Check server health and configuration.

**Response:**
```javascript
{
  status: "healthy",
  timestamp: "2024-01-15T10:30:00.000Z",
  geminiConfigured: true
}
```

## 🎛️ Configuration Options

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `GEMINI_API_KEY` | Google Gemini API key | - | ✅ |
| `PORT` | Server port | 3000 | ❌ |
| `LOG_LEVEL` | Logging level (error, warn, info, debug) | info | ❌ |
| `MAX_FILE_SIZE` | Maximum video file size in bytes | 104857600 (100MB) | ❌ |
| `MAX_PROCESSING_TIME` | Maximum processing time in milliseconds | 300000 (5 minutes) | ❌ |

## 📊 Performance & Limitations

### Processing Time
- **Short videos (5-15s)**: 30-60 seconds
- **Medium videos (15-30s)**: 1-2 minutes
- **Factors**: Video resolution, complexity, sport type

### Accuracy
- **High confidence**: Clear, well-lit videos with obvious decisions
- **Medium confidence**: Some ambiguity or poor video quality
- **Low confidence**: Very unclear or complex situations

### Limitations
- Works best with clear, high-quality videos
- Requires visible key elements (ball, players, boundaries)
- Audio analysis is basic (presence detection only)
- Not suitable for real-time live analysis

## 🐛 Troubleshooting

### Common Issues

**FFmpeg not found:**
```bash
# Make sure FFmpeg is installed and in PATH
ffmpeg -version
```

**API Key not working:**
```bash
# Verify your API key in .env file
# Check Google AI Studio for key status and quotas
```

**Video processing fails:**
```bash
# Check video format and size
# Ensure video is not corrupted
# Check server logs in ./logs/app.log
```

**Out of memory errors:**
```bash
# Reduce video size or resolution
# Increase Node.js memory limit:
node --max-old-space-size=4096 src/server.js
```

### Debug Mode

Enable debug logging:
```env
LOG_LEVEL=debug
```

Check logs:
```bash
tail -f logs/app.log
```

## 📝 Development

### Project Structure

```
UMPIRE2.0/
├── src/
│   ├── server.js              # Main Express server
│   ├── umpireAgent.js         # Core AI umpire logic
│   ├── sportsRules.js         # Sports rules database
│   └── utils/
│       ├── videoProcessor.js  # Video/audio processing
│       ├── fileUtils.js       # File management utilities
│       └── logger.js          # Logging system
├── public/
│   ├── index.html            # Web interface
│   ├── style.css             # UI styles
│   └── script.js             # Frontend JavaScript
├── uploads/                  # Temporary upload directory
├── temp/                     # Processing temp files
├── logs/                     # Application logs
├── package.json             # Dependencies and scripts
├── .env                     # Environment configuration
└── README.md               # This file
```

### Adding New Sports

1. **Update `sportsRules.js`**:
   ```javascript
   newsport: {
     name: "New Sport",
     decisions: ["DECISION1", "DECISION2"],
     rules: { /* rules object */ },
     keyElements: ["element1", "element2"]
   }
   ```

2. **Update the frontend dropdown** in `public/index.html`

### Testing

```bash
# Start development server
npm run dev

# Test with sample videos
# Check health endpoint
curl http://localhost:3000/api/health
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini AI** for powerful multimodal AI capabilities
- **FFmpeg** for video processing functionality
- **Express.js** and Node.js ecosystem
- Sports organizations for rule specifications

## 📞 Support

If you encounter any issues or have questions:

1. **Check the logs**: `./logs/app.log`
2. **Review this README**: Most issues are covered here
3. **Create an issue**: Open a GitHub issue with details
4. **Check quotas**: Verify your Google AI Studio quotas

---

**Built with ❤️ for sports video analysis**