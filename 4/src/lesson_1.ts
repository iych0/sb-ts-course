class User {
	static userName;
	private surname;
	protected age;

	constructor(userName, surname, age) {
		this.userName = userName;
		this.age = age;
		this.surname = surname;
	}

	public setAge(age) {
		this.age = age;
	}

	public getAge() {
		return this.age;
	}
}
