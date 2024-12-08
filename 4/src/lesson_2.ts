interface Person {
	readonly id: number, // только для чтения
	userName: string,
	surname?: string, // необязательное свойство
	isGigaChad?: boolean,
	coins: number,
	age: number,
	addCoin(amount: number): void,
	removeCoin(amount: number): void,
	getCoins(): string
}

interface Developer extends Person {
	stack: string[]
}

class BackendDeveloper implements Developer {
    stack: string[];
    id: number;
    userName: string;
    surname?: string | undefined;
    isGigaChad?: boolean | undefined;
    coins: number;
    age: number;

	constructor(
		stack: string[], id: number, userName: string, surname: string | undefined = undefined,
		isGigaChad: boolean | undefined = undefined, coins: number, age: number) {
		this.stack = stack
		this.id = id
		this.userName = userName
		this.surname = surname
		this.isGigaChad = isGigaChad
		this.coins = coins
		this.age = age
	}
    addCoin(amount: number): void {
		this.coins += amount;
    }
    removeCoin(amount: number): void {
		this.coins -= amount;
    }
    getCoins(): string {
		return `Количество монет ${this.coins}`;
    }

}

const TestDeveloper: BackendDeveloper = new BackendDeveloper(['c++', 'c#'], 420, 'Oleg', undefined, undefined, 5, 5)
console.log(TestDeveloper.getCoins())

const ivan: Person = {
	id: 1,
	userName: "Ivan",
	surname: "Ivanov",
	coins: 5,
	age: 25,
	addCoin(amount) {
		this.coins += amount;
	},
	removeCoin(amount) {
		this.coins -= amount;
	},
	getCoins() {
		return `Количество монет ${this.coins}`;
	},
};

console.log(ivan.getCoins())