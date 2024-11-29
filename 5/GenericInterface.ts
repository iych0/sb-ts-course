export interface IContainer<T> {
    value: T
}

export function getValue<T>(container: IContainer<T>): T {
    return container.value
}