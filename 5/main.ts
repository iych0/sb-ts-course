import {Stack} from "./Stack";
import {TowerOfHanoi} from "./TowerOfHanoi";
import {getValue, IContainer} from "./GenericInterface";

// Ханойская башня
const objCount = 5

// Проверка с числовыми значениями
const initialTowerWithInts = new Stack<number>();
for (let i = 0; i < objCount; i++) {
    initialTowerWithInts.push(objCount - i)
}

const towerOfHanoiInt = new TowerOfHanoi(initialTowerWithInts)
towerOfHanoiInt.solve()
towerOfHanoiInt.checkLastTower()

// Проверка со строковыми значениями
const initialTowerWithStrings = new Stack<string>();
for (let i = 0; i < objCount; i++) {
    initialTowerWithStrings.push(`${String.fromCharCode((96 + objCount) - i)}`)
}

const towerOfHanoiString = new TowerOfHanoi(initialTowerWithStrings)
towerOfHanoiString.solve()
towerOfHanoiString.checkLastTower()


// Generic Interface
type FunnyStuff = number

const containerWithInt: IContainer<number> = {value: 6}
console.log(getValue(containerWithInt))

const containerWithString: IContainer<string> = {value: "hypothalamus"}
console.log(getValue(containerWithString))

const containerWithFunnyStuff: IContainer<FunnyStuff> = {value: 420}
console.log(getValue(containerWithFunnyStuff))
