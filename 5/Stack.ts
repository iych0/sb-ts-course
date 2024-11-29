export class Stack<T> implements IStack<T> {
    private items: T[] = [];

    constructor(private capacity: number = Infinity) {}

    push(item: T): void {
        if (this.size() === this.capacity) {
            throw Error("Стек переполнен");
        }
        this.items.push(item);
    }

    pop(): T | undefined {
        return this.items.pop();
    }

    peek(): T | undefined {
        return this.items[this.size() - 1];
    }

    size(): number {
        return this.items.length;
    }

    clear(): void {
        this.items = []
    }
}

export interface IStack<T> {
    push(item: T): void;
    pop(): T | undefined;
    peek(): T | undefined;
    size(): number;
    clear(): void;
}