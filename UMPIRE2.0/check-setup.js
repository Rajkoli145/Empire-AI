#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🏟️  AI Umpire Setup Checker\n');

// Check Node.js version
console.log('1. Node.js Version:');
console.log(`   ✅ ${process.version}\n`);

// Check FFmpeg
console.log('2. FFmpeg Installation:');
try {
    const ffmpegVersion = execSync('ffmpeg -version', { encoding: 'utf8' });
    console.log('   ✅ FFmpeg is installed');
    console.log(`   Version: ${ffmpegVersion.split('\n')[0]}\n`);
} catch (error) {
    console.log('   ❌ FFmpeg not found');
    console.log('   Install with: brew install ffmpeg\n');
}

// Check .env file
console.log('3. Environment Configuration:');
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    console.log('   ✅ .env file exists');
    
    // Check for API key (without revealing it)
    const envContent = fs.readFileSync(envPath, 'utf8');
    if (envContent.includes('GEMINI_API_KEY=') && !envContent.includes('your_api_key_here')) {
        console.log('   ✅ GEMINI_API_KEY is configured');
    } else {
        console.log('   ❌ GEMINI_API_KEY not configured');
        console.log('   Add your API key from https://ai.google.dev/');
    }
} else {
    console.log('   ❌ .env file not found');
    console.log('   Copy .env.example to .env and configure');
}

console.log('\n4. Dependencies:');
try {
    const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    console.log('   ✅ package.json found');
    
    if (fs.existsSync('node_modules')) {
        console.log('   ✅ node_modules installed');
    } else {
        console.log('   ❌ node_modules not found - run npm install');
    }
} catch (error) {
    console.log('   ❌ package.json not found');
}

console.log('\n🎯 Next Steps:');
console.log('1. Wait for FFmpeg installation to complete');
console.log('2. Get Gemini API key from https://ai.google.dev/');
console.log('3. Add API key to .env file');
console.log('4. Restart server with: npm start');
