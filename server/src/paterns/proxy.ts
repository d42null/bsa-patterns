export class Proxy {
    private target: any;
  
    constructor(target: any) {
      this.target = target;
    }
  
    logAndExecute(method: string, ...args: any[]) {
      console.log(`Method ${method} called with args: ${JSON.stringify(args)}`);
      return this.target[method](...args);
    }
  }
  