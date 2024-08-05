export class Memento<T> {
  constructor(private state: T) {}

  getState(): T {
    return this.state;
  }
}

export class Caretaker<T> {
  private mementos: Memento<T>[] = [];
  private currentIndex: number = -1;

  save(state: T): void {
    this.mementos = this.mementos.slice(0, this.currentIndex + 1);
    this.mementos.push(new Memento(state));
    this.currentIndex++;
  }

  undo(): T | null {
    if (this.currentIndex <= 0) {
      return null;
    }
    this.currentIndex--;
    return this.mementos[this.currentIndex].getState();
  }

  redo(): T | null {
    if (this.currentIndex >= this.mementos.length - 1) {
      return null;
    }
    this.currentIndex++;
    return this.mementos[this.currentIndex].getState();
  }
}
