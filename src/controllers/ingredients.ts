import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import FileHelper from '../utils/file-helper';
import { Ingredient, IngredientMap } from '../types/ingredients';

export const getAllIngredients = async (request: Request, response: Response, next: any) => {
	const ingredientsString = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	response.send(ingredients);
}

export const getSingleIngredient = async (request: Request, response: Response, next: any) => {
	if (!request.params.id) {

	}
	const ingredientsString = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	const id = request.params.id;
	// console.log(id);
	response.send(ingredients[id])
}

export const addIngredient = async (request: Request, response: Response, next: any) => {
	// check to make sure body has 'name' property
	if (!request.body.name || !request.body.category) {
		return response.status(500).json({ error: 'Failed to add ingredient, make sure all fields are present.' });
	}
	// auto-generate ID
	try {
		const id = uuidv4();
		// get name and category via Request
		const name = request.body.name.toLowerCase();
		const category = request.body.category.toLowerCase();
		let ingredientsString = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
		const ingredients:IngredientMap = JSON.parse(ingredientsString);
		// test for duplicate entries
		const checkDuplicateIngredient = Object.values(ingredients).filter((item:Ingredient) => item.name === name);
		if (checkDuplicateIngredient.length > 0) {
			return response.status(400).json({ error: 'Failed to add ingredient - duplicate item' });			
		}
		const newIngredient = {
			id: id,
			name: name,
			category: category
		}
		ingredients[id] = newIngredient;
		ingredientsString = JSON.stringify(ingredients);
		await FileHelper.writeStringToFile('src/mocks/ingredients.json', ingredientsString);
		response.status(200).json(newIngredient);
	} catch (error) {
		response.status(500).json({ error: 'Failed to add recipe.' });
	}
}

export const deleteIngredient = async (request: Request, response: Response, next: any) => {
	const id = request.body.id;
	let ingredientsString = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
	const ingredients = JSON.parse(ingredientsString);
	if (!request.body.id || !ingredients.hasOwnProperty(id)) {
		return response.status(406).json({ error: 'No ID provided, or it is blank or does not exist in the database.' });
	}
	try {
		delete ingredients[id];
		ingredientsString = JSON.stringify(ingredients);
		FileHelper.writeStringToFile('src/mocks/ingredients.json', ingredientsString);
		response.status(200).json({ message: 'Ingredient deleted successfully.' });		
	} catch (error) {
		response.status(500).json({ error: 'Failed to delete ingredient.' });
	}
}