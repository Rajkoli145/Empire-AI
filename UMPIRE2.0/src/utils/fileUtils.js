const fs = require('fs-extra');
const path = require('path');

/**
 * Clean up temporary files and directories
 */
async function cleanupTempFiles() {
  try {
    const tempDir = process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '../../temp');
    const uploadsDir = path.join(__dirname, '../../uploads');
    
    // Clean temp directory
    if (await fs.pathExists(tempDir)) {
      const tempFiles = await fs.readdir(tempDir);
      for (const file of tempFiles) {
        const filePath = path.join(tempDir, file);
        const stat = await fs.stat(filePath);
        
        // Remove files/directories older than 1 hour
        const oneHourAgo = Date.now() - (60 * 60 * 1000);
        if (stat.mtime.getTime() < oneHourAgo) {
          await fs.remove(filePath);
          console.log(`Cleaned up: ${filePath}`);
        }
      }
    }
    
    // Clean old upload files (older than 2 hours)
    if (await fs.pathExists(uploadsDir)) {
      const uploadFiles = await fs.readdir(uploadsDir);
      for (const file of uploadFiles) {
        const filePath = path.join(uploadsDir, file);
        const stat = await fs.stat(filePath);
        
        const twoHoursAgo = Date.now() - (2 * 60 * 60 * 1000);
        if (stat.mtime.getTime() < twoHoursAgo) {
          await fs.remove(filePath);
          console.log(`Cleaned up old upload: ${filePath}`);
        }
      }
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

/**
 * Ensure required directories exist
 */
async function ensureDirectories() {
  const dirs = [
    process.env.NODE_ENV === 'production' ? '/tmp' : path.join(__dirname, '../../temp'),
    path.join(__dirname, '../../uploads'),
    path.join(__dirname, '../../public')
  ];
  
  for (const dir of dirs) {
    await fs.ensureDir(dir);
  }
}

/**
 * Get file size in human readable format
 * @param {number} bytes 
 * @returns {string}
 */
function formatFileSize(bytes) {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Check if file exists and is accessible
 * @param {string} filePath 
 * @returns {boolean}
 */
async function isFileAccessible(filePath) {
  try {
    await fs.access(filePath, fs.constants.F_OK | fs.constants.R_OK);
    return true;
  } catch {
    return false;
  }
}

module.exports = {
  cleanupTempFiles,
  ensureDirectories,
  formatFileSize,
  isFileAccessible
};