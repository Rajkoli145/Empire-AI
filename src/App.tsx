import React, { useEffect, useState, useRef, useCallback } from 'react';
import { 
  Play, 
  Eye, 
  Volume2, 
  Scale, 
  Zap, 
  Globe,
  CheckCircle,
  ChevronRight,
  Brain,
  Cpu,
  Activity,
  Target,
  Github,
  ExternalLink
} from 'lucide-react';
import GreenWaveBackground from './components/GreenWaveBackground';

function App() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Computer Vision Accuracy",
      description: "Advanced visual analysis for precise ball tracking and player positioning"
    },
    {
      icon: <Volume2 className="w-8 h-8" />,
      title: "Audio Awareness",
      description: "Sound detection for contact, crowd noise, and environmental factors"
    },
    {
      icon: <Scale className="w-8 h-8" />,
      title: "Rule Intelligence",
      description: "Deep understanding of complex rules across multiple sports"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Decisions",
      description: "Sub-300ms decision making with full transparency"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Multi-Sport Ready",
      description: "Adaptable system that works across different sports and leagues"
    }
  ];

  const techStack = [
    "Gemini Vision API",
    "Gemini Multimodal API", 
    "Gemini Live API",
    "Gemma (optional)"
  ];

  const impacts = [
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Fairness in every decision"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Integrity & fan trust"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Faster gameplay, fewer delays"
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      text: "Works across sports"
    }
  ];

  const agents = [
    { name: "Vision Agent", icon: <Eye className="w-5 h-5" /> },
    { name: "Audio Agent", icon: <Volume2 className="w-5 h-5" /> },
    { name: "Rules Agent", icon: <Scale className="w-5 h-5" /> },
    { name: "Decision Agent", icon: <Brain className="w-5 h-5" /> },
    { name: "Communication Agent", icon: <Activity className="w-5 h-5" /> },
    { name: "Mother Agent", icon: <Cpu className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 font-sans">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden">
        <GreenWaveBackground 
          primaryColor="34, 197, 94"
          secondaryColor="22, 163, 74"
          accentColor="16, 185, 129"
          backgroundColor="rgb(250, 250, 249)"
          waveOpacity={0.6}
          animationSpeed={0.002}
        />
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-emerald-900/5 to-transparent"></div>
        
        <div className={`relative z-10 text-center max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <div className="mb-6">
            <div className="inline-flex items-center px-4 py-2 bg-emerald-900/10 rounded-full text-emerald-800 text-sm font-medium mb-8">
              <Target className="w-4 h-4 mr-2" />
              World's First Agent AI Umpire
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The World's First
            <span className="block text-emerald-800">Agent AI Umpire</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Accurate. Real-time. Unbiased. <br />
            <span className="text-emerald-700 font-medium">Across Every Sport.</span>
          </p>
          
          <button 
            onClick={() => window.open('https://ai-umpire.vercel.app/', '_blank')}
            className="group inline-flex items-center px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore Prototype</span>
            <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Problems vs Solutions Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              When Human Error Costs
              <span className="block text-emerald-800">More Than the Game</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-16 items-start">
            {/* Problems Side */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-red-600 mb-2">❌ Current Problems</h3>
                <div className="w-16 h-1 bg-red-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Human error in fast play</h4>
                    <p className="text-gray-600">Split-second decisions in high-speed sports lead to missed calls and game-changing mistakes.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Bias & inconsistency</h4>
                    <p className="text-gray-600">Subjective judgment calls vary between officials, creating unfair advantages.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Costly delays with replay systems</h4>
                    <p className="text-gray-600">Video reviews interrupt game flow and still rely on human interpretation.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-red-50 rounded-lg border-l-4 border-red-500">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Lack of scalability across sports</h4>
                    <p className="text-gray-600">Different sports require specialized officials, limiting consistency and standardization.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Solutions Side */}
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-emerald-600 mb-2">✅ Our AI Solutions</h3>
                <div className="w-16 h-1 bg-emerald-500 mx-auto rounded-full"></div>
              </div>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Superhuman reaction time</h4>
                    <p className="text-gray-600">AI processes visual data in milliseconds, catching every critical moment with perfect accuracy.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Completely objective decisions</h4>
                    <p className="text-gray-600">Rule-based AI eliminates human bias, ensuring fair and consistent calls every time.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Instant real-time decisions</h4>
                    <p className="text-gray-600">No more game interruptions - decisions made in under 300ms with full transparency.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-3 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">Universal sports compatibility</h4>
                    <p className="text-gray-600">One AI system adapts to any sport, maintaining consistent officiating standards globally.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Solution Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Our Agentic AI
              <span className="block text-emerald-800">Umpire System</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              🤖 <strong>Gemini API Implementation</strong> - All 4 APIs Used for comprehensive sports analysis
            </p>
          </div>
          
          {/* 4 Gemini APIs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {/* Vision API */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">1. Vision API</h3>
                <p className="text-sm text-emerald-600 font-medium">gemini-1.5-flash</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Purpose:</strong> Individual frame analysis</p>
                <p>• Extracts 8 key frames using FFmpeg</p>
                <p>• Analyzes ball, bat, stumps, players</p>
                <p>• Provides detailed visual evidence</p>
              </div>
            </div>

            {/* Video API */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Play className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">2. Video API</h3>
                <p className="text-sm text-emerald-600 font-medium">gemini-1.5-pro</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Purpose:</strong> Complete sequence analysis</p>
                <p>• Processes entire video as base64</p>
                <p>• Tracks ball trajectory & movements</p>
                <p>• Chronological event understanding</p>
              </div>
            </div>

            {/* Multimodal API */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">3. Multimodal API</h3>
                <p className="text-sm text-emerald-600 font-medium">gemini-1.5-pro</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Purpose:</strong> Visual + rule knowledge</p>
                <p>• Synthesizes frame + video analysis</p>
                <p>• Applies sport-specific criteria</p>
                <p>• Expert-level rule interpretation</p>
              </div>
            </div>

            {/* Live API */}
            <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-200 hover:shadow-xl transition-all duration-300">
              <div className="text-center mb-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900">4. Live API</h3>
                <p className="text-sm text-emerald-600 font-medium">gemini-1.5-flash</p>
              </div>
              <div className="space-y-2 text-sm text-gray-600">
                <p><strong>Purpose:</strong> Real-time decisions</p>
                <p>• Generates final umpire call</p>
                <p>• Official announcement style</p>
                <p>• Confidence levels & reasoning</p>
              </div>
            </div>
          </div>

          {/* Processing Workflow */}
          <div className="bg-gradient-to-r from-emerald-50 to-green-50 rounded-2xl p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">🔄 Processing Workflow</h3>
            <div className="grid md:grid-cols-5 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">1</div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Prep</h4>
                <p className="text-sm text-gray-600">Upload → FFmpeg → Metadata</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">2</div>
                <h4 className="font-semibold text-gray-900 mb-2">Vision Analysis</h4>
                <p className="text-sm text-gray-600">Frame extraction → Analysis</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">3</div>
                <h4 className="font-semibold text-gray-900 mb-2">Video Analysis</h4>
                <p className="text-sm text-gray-600">Complete sequence → Temporal</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">4</div>
                <h4 className="font-semibold text-gray-900 mb-2">Rule Integration</h4>
                <p className="text-sm text-gray-600">Multimodal → Sports rules</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">5</div>
                <h4 className="font-semibold text-gray-900 mb-2">Final Decision</h4>
                <p className="text-sm text-gray-600">Live decision → Announcement</p>
              </div>
            </div>
          </div>

          {/* Sports Rule Implementation */}
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-stone-200">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">🎯 Sports Rule Implementation</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-2">Cricket</h4>
                <p className="text-sm text-gray-600">LBW, bowled, caught, stumped, run out, wide, no ball</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-2">Football</h4>
                <p className="text-sm text-gray-600">Goal, offside, foul, penalty decisions</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-2">Tennis</h4>
                <p className="text-sm text-gray-600">In/out, fault, ace, let decisions</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-2">Basketball</h4>
                <p className="text-sm text-gray-600">Score, foul, violation, three-pointer</p>
              </div>
              <div className="text-center p-4 bg-emerald-50 rounded-lg">
                <h4 className="font-bold text-emerald-800 mb-2">Extensible</h4>
                <p className="text-sm text-gray-600">Framework for other sports</p>
              </div>
            </div>
          </div>

          {/* Why This Multi-API Approach */}
          <div className="mt-12 text-center bg-stone-100 rounded-lg p-12">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">💡 Why This Multi-API Approach?</h3>
            <div className="grid md:grid-cols-3 gap-8 text-base text-gray-700">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-bold text-emerald-800 mb-3">Comprehensive Analysis</h4>
                <p>Each API contributes different perspectives for complete understanding</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-bold text-emerald-800 mb-3">Cross-Validation</h4>
                <p>Multiple analysis methods provide accuracy through verification</p>
              </div>
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <h4 className="text-lg font-bold text-emerald-800 mb-3">Real-time Performance</h4>
                <p>Optimized models for different tasks with smart caching system</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Key Features
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={feature.title} className="group bg-stone-50 hover:bg-stone-100 p-8 rounded-xl transition-all duration-300 hover:shadow-lg border border-stone-200">
                <div className="text-emerald-700 mb-4 group-hover:text-emerald-800 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Demo Showcase Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-stone-50 to-stone-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            See It in Action
          </h2>
          
          <div className="relative bg-gray-900 rounded-2xl p-12 mb-8 shadow-2xl">
            <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <Play className="w-16 h-16 text-white opacity-80" />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/20 to-transparent"></div>
            </div>
            <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              LIVE
            </div>
          </div>
          
          <p className="text-lg text-gray-700 font-medium">
            AI Umpire delivers decisions in <span className="text-emerald-800 font-bold">&lt;0.3s</span> with full transparency.
          </p>
        </div>
      </section>

      {/* Architecture & Tech Stack Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Tech Stack Overview
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            {/* Backend Technologies */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl p-8 border border-emerald-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cpu className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-emerald-900 mb-2">Backend Technologies</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Node.js (&gt;=16.0.0)</p>
                    <p className="text-sm text-gray-600">Main runtime environment</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Express.js (4.18.2)</p>
                    <p className="text-sm text-gray-600">Web server framework</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Google Generative AI (0.17.2)</p>
                    <p className="text-sm text-gray-600">Core AI integration</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Frontend Technologies */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 border border-blue-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-blue-900 mb-2">Frontend Technologies</h3>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Vanilla HTML5</p>
                    <p className="text-sm text-gray-600">Semantic markup structure</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">CSS3</p>
                    <p className="text-sm text-gray-600">Modern styling with gradients, animations, and responsive design</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Vanilla JavaScript</p>
                    <p className="text-sm text-gray-600">No frameworks, pure DOM manipulation</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Font Awesome 6.0.0</p>
                    <p className="text-sm text-gray-600">Icon library for UI elements</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <p className="font-semibold text-gray-900">Drag & Drop API</p>
                    <p className="text-sm text-gray-600">Native browser file upload functionality</p>
                  </div>
                </div>
              </div>
              
              {/* Additional Frontend Features */}
              <div className="mt-8 p-4 bg-white/50 rounded-lg">
                <h4 className="font-bold text-blue-800 mb-2">Key Frontend Features</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Responsive design for all devices</li>
                  <li>• Real-time video upload progress</li>
                  <li>• Interactive analysis results display</li>
                  <li>• Modern UI with smooth animations</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-20 px-6 bg-stone-50">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-16">
            Why It Matters
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {impacts.map((impact, index) => (
              <div key={index} className="flex items-center justify-center space-x-4 bg-white p-6 rounded-lg shadow-sm border border-stone-200">
                <div className="text-green-600 flex-shrink-0">
                  {impact.icon}
                </div>
                <p className="text-lg font-semibold text-gray-900">{impact.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-stone-100 via-stone-200 to-emerald-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/5 to-emerald-700/10"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            This is the future of
            <span className="block text-emerald-800">fair play.</span>
          </h2>
          
          <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto leading-relaxed">
            Join us in revolutionizing sports officiating with cutting-edge AI technology
            that ensures fairness, accuracy, and integrity in every game.
          </p>
          
          <button 
            onClick={() => window.open('https://ai-umpire.vercel.app/', '_blank')}
            className="group inline-flex items-center px-12 py-5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <span>Try the Prototype</span>
            <ChevronRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50/50 border-t border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="w-full h-px bg-stone-200 mb-8"></div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Umpire</h3>
              <p className="text-sm text-gray-600">Agent Referee System</p>
            </div>
            <div className="flex space-x-4">
              <a href="https://github.com/Rajkoli145/Empire-AI" 
                 className="inline-flex items-center space-x-2 px-4 py-2 border border-stone-300 rounded-md text-sm text-gray-700 hover:bg-stone-100 transition-colors duration-200">
                <Github className="w-4 h-4" />
                <span>GitHub</span>
              </a>
              <a href="#" 
                 className="inline-flex items-center space-x-2 px-4 py-2 border border-stone-300 rounded-md text-sm text-gray-700 hover:bg-stone-100 transition-colors duration-200">
                <ExternalLink className="w-4 h-4" />
                <span>Hackathon</span>
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-stone-200/50 text-center">
            <p className="text-sm text-gray-600">
              © 2024 AI Umpire. Built for the future of fair play.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;