import express, {Request, Response} from 'express';
import FileHelper from '../utils/file-helper';
import { User, UserMap } from '../types/users';

export const getAllUsers = async (request: Request, response: Response, next: any) => {
	const usersString:string = await FileHelper.readStringFromFile('src/mocks/users.json');
	const users:UserMap = JSON.parse(usersString);
	response.send(users);
}

export const authenticateUser = async (request: Request, response: Response, next: any) => {
	const allUsers:string = await FileHelper.readStringFromFile('src/mocks/users.json');
	const users:UserMap = JSON.parse(allUsers);
	const username = request.body.username;
	const password = request.body.password;
	const currentUsersArray:User[] = Object.values(users).filter((user) => {
		return user.username === username && user.password === password
	});
	if (currentUsersArray.length > 0) {
		const userToSend = currentUsersArray[0];
		response.send(userToSend)
	} else {
		response.status(404).json({ error: 'User not found' });
	}
}