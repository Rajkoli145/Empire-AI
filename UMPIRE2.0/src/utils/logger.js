const fs = require('fs-extra');
const path = require('path');

class Logger {
  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.logFile = path.join(__dirname, '../../logs/app.log');
    this.ensureLogDir();
    
    // Log levels: error, warn, info, debug
    this.levels = {
      error: 0,
      warn: 1,
      info: 2,
      debug: 3
    };
  }

  async ensureLogDir() {
    const logDir = path.dirname(this.logFile);
    await fs.ensureDir(logDir);
  }

  shouldLog(level) {
    return this.levels[level] <= this.levels[this.logLevel];
  }

  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();
    const metaStr = Object.keys(meta).length > 0 ? ` | ${JSON.stringify(meta)}` : '';
    return `[${timestamp}] ${level.toUpperCase()}: ${message}${metaStr}`;
  }

  async writeLog(level, message, meta = {}) {
    if (!this.shouldLog(level)) return;

    const logMessage = this.formatMessage(level, message, meta);
    
    // Console output with colors
    const colors = {
      error: '\x1b[31m',
      warn: '\x1b[33m', 
      info: '\x1b[36m',
      debug: '\x1b[37m'
    };
    
    const reset = '\x1b[0m';
    console.log(`${colors[level] || colors.info}${logMessage}${reset}`);
    
    // File output
    try {
      await fs.appendFile(this.logFile, logMessage + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }

  error(message, meta = {}) {
    this.writeLog('error', message, meta);
  }

  warn(message, meta = {}) {
    this.writeLog('warn', message, meta);
  }

  info(message, meta = {}) {
    this.writeLog('info', message, meta);
  }

  debug(message, meta = {}) {
    this.writeLog('debug', message, meta);
  }

  // Helper for logging errors with stack traces
  logError(error, context = '') {
    const errorInfo = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      context: context
    };
    
    this.error(`Error occurred${context ? ` in ${context}` : ''}`, errorInfo);
  }

  // Helper for API request logging
  logRequest(req) {
    const requestInfo = {
      method: req.method,
      url: req.url,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      contentLength: req.get('Content-Length')
    };
    
    this.info('API Request', requestInfo);
  }

  // Helper for performance logging
  logPerformance(operation, duration, meta = {}) {
    this.info(`Performance: ${operation} took ${duration}ms`, meta);
  }
}

// Singleton instance
const logger = new Logger();

module.exports = logger;