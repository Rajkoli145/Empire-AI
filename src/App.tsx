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
  Target
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
              World's First Multi-Agent AI Umpire
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            The World's First
            <span className="block text-emerald-800">Multi-Agent AI Umpire</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
            Accurate. Real-time. Unbiased. <br />
            <span className="text-emerald-700 font-medium">Across Every Sport.</span>
          </p>
          
          <button className="group inline-flex items-center px-8 py-4 bg-emerald-800 hover:bg-emerald-900 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore Prototype</span>
            <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* The Problem Section */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              When Human Error Costs
              <span className="block text-emerald-800">More Than the Game</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Human error in fast play</h3>
                  <p className="text-gray-600">Split-second decisions in high-speed sports lead to missed calls and game-changing mistakes.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Bias & inconsistency</h3>
                  <p className="text-gray-600">Subjective judgment calls vary between officials, creating unfair advantages.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Costly delays with replay systems</h3>
                  <p className="text-gray-600">Video reviews interrupt game flow and still rely on human interpretation.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Lack of scalability across sports</h3>
                  <p className="text-gray-600">Different sports require specialized officials, limiting consistency and standardization.</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-stone-100 to-stone-200 rounded-2xl overflow-hidden">
                <img 
                  src="/image.png" 
                  alt="Soccer field with players in action" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-red-500/10 to-transparent rounded-2xl"></div>
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
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {agents.map((agent, index) => (
                <div key={agent.name} className="text-center">
                  <div className="bg-white rounded-lg p-4 shadow-md border border-stone-200 mb-2 hover:shadow-lg transition-shadow duration-300">
                    <div className="text-emerald-700 mb-2 flex justify-center">
                      {agent.icon}
                    </div>
                    <h3 className="text-sm font-semibold text-gray-900">{agent.name}</h3>
                  </div>
                  {index < agents.length - 1 && (
                    <div className="hidden lg:block absolute top-6 left-full w-4 h-0.5 bg-emerald-300" style={{left: `${(index + 1) * 16.666 - 8.333}%`}}></div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center bg-stone-100 rounded-lg p-6">
              <p className="text-gray-700 font-medium">
                Powered by <span className="text-emerald-800 font-semibold">Gemini APIs</span> - 
                Each agent specializes in a specific aspect of game analysis, 
                coordinated by the Mother Agent for optimal decision-making.
              </p>
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
              Architecture & Tech Stack
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Powered by Google's Gemini</h3>
              <div className="grid grid-cols-2 gap-4">
                {techStack.map((tech) => (
                  <div key={tech} className="bg-stone-50 p-4 rounded-lg border border-stone-200">
                    <p className="font-semibold text-gray-900 text-center">{tech}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-2xl p-8 border border-emerald-200">
                <div className="text-center">
                  <div className="mb-6">
                    <Cpu className="w-16 h-16 text-emerald-700 mx-auto" />
                  </div>
                  <h3 className="text-xl font-bold text-emerald-900 mb-2">Multi-Agent Architecture</h3>
                  <p className="text-emerald-700">
                    Distributed intelligence system with specialized agents for comprehensive game analysis
                  </p>
                </div>
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
          
          <button className="group inline-flex items-center px-12 py-5 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl">
            <span>Try the Prototype</span>
            <ChevronRight className="w-6 h-6 ml-3 transition-transform group-hover:translate-x-1" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 px-6 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-sm text-gray-400">
            © 2024 Multi-AI Umpire System • Built for fair play in sports
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;