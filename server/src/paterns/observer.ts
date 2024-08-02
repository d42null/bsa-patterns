export interface Observer {
  notify(level: string, message: string): void;
}

export class Observer {
  private subscribers: ((level: string, message: string) => void)[] = [];

  subscribe(subscriber: (level: string, message: string) => void) {
    this.subscribers.push(subscriber);
  }

  notify(level: string, message: string) {
    this.subscribers.forEach((subscriber) => subscriber(level, message));
  }
}
