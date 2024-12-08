interface Car {
	model: string;
	price: number;
	dynamic_1: Record<string, string>;
	dynamic_2: { [key: string]: number };
	tuple: [string, number, string];
}

type cKeys = keyof Car;
const carKey: cKeys = "model";
console.log(carKey)

// перегрузка функции
function add(a: string, b: string): string;
function add(a: number, b: number): number;
function add(a: string, b: number): string;
function add(a: number, b: string): string;
function add(a: string | number, b: string | number): string | number {
	if (typeof a === 'string' && typeof b === 'string') {
		return a + b;
	} else if (typeof a === 'number' && typeof b === 'number') {
		return a + b;
	} else {
		return a.toString() + b.toString();
	}
}

console.log(add(1, 2), add('1', 2), add(1, '2'), add('1', '2'))

// 1. только ключи интерфейса Car
type CarAllKeys = keyof Car; // "model" | "price" | "dynamic_1" | "dynamic_2" | "tuple"

// 2. только свойства, которые являются строками
type CarStringProperties = Pick<Car, Extract<keyof Car, string>>;
// Extract извлекает string ключи ищ Car, Pick создает тип на основе этих ключей

// 3. только свойства, которые являются числами
type CarNumberProperties = Pick<Car, Extract<keyof Car, number>>;
// Extract извлекает number ключи ищ Car, Pick создает тип на основе этих ключей

// 4. свойства интерфейса Car, но с типами, измененными на `string`
type CarAsString = { [K in keyof Car]: string; };
// создает тип на основе ключей Car, присваивая всем тип string

// 5. только динамические свойства (свойства с индексными сигнатурами)
type CarDynamicProperties = Pick<Car, 'dynamic_1' | 'dynamic_2'>;

// 6. только кортеж
type CarTupleProperty = Pick<Car, 'tuple'>;