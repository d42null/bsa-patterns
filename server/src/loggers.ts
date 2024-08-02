import * as fs from 'fs';

export const logToFile = (level: string, message: string) => {
  const logMessage = `${new Date().toISOString()} [${level.toUpperCase()}] ${message}\n`;
  fs.appendFile('logs.txt', logMessage, (err) => {
    if (err) {
      console.error('Error writing to log file', err);
    }
  });
};

export const logToConsole = (level: string, message: string) => {
  if (level === 'error') {
    console.error(message);
  }
};
