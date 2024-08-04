import * as fs from 'fs';

enum LogLevel {
  Info = 'info',
  Warning = 'warning',
  Error = 'error',
}
  // PATTERN: Observer
class Logger {
  private static instance: Logger;
  private subscribers: LogSubscriber[] = [];

  private constructor() {}

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  public log(level: LogLevel, message: string) {
    this.subscribers.forEach((subscriber) => subscriber.update(level, message));
  }

  public subscribe(subscriber: LogSubscriber) {
    this.subscribers.push(subscriber);
  }
}

interface LogSubscriber {
  update(level: LogLevel, message: string): void;
}

class FileLogSubscriber implements LogSubscriber {
  update(level: LogLevel, message: string): void {
    fs.appendFileSync('logs.txt', `${level}: ${message}\n`);
  }
}

class ConsoleErrorSubscriber implements LogSubscriber {
  update(level: LogLevel, message: string): void {
    if (level === LogLevel.Error) {
      console.error(message);
    }
  }
}

// Initialize logger and subscribers
const logger = Logger.getInstance();
const fileSubscriber = new FileLogSubscriber();
const consoleErrorSubscriber = new ConsoleErrorSubscriber();

logger.subscribe(fileSubscriber);
logger.subscribe(consoleErrorSubscriber);

export { logger, LogLevel };
