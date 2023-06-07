export type User = {
	id: string,
	username: string,
	password: string,
	email: string,
	recipes: string[],
}

export type UserMap = {
	[id: string]: User
}