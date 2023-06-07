import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import FileHelper from '../utils/file-helper';
import { Ingredient, IngredientMap } from '../types/ingredients';
import { Recipe, RecipeMap } from '../types/recipes';

export const getAllRecipes = async (request: Request, response: Response, next: any) => {
	const recipesString:string = await FileHelper.readStringFromFile('src/mocks/recipes.json');
	const recipes:RecipeMap = JSON.parse(recipesString);
	const recipesArray = Object.values(recipes);
	const recipesWithIngredients:any = {}
	const promiseList = recipesArray.map(async (recipe) => {
		// get all ingredients listed in each recipe
		console.log('inside of map.');
		const recipeIngredients:Ingredient[] = await getRecipeIngredients(recipe.ingredients);
		recipesWithIngredients[recipe.id] = recipe;
		recipesWithIngredients[recipe.id].ingredients = recipeIngredients;
		// cleaner way to wite 86 and 87
		// recipesWithIngredients[recipe.id] = {
		// 	...recipe,
		// 	ingredients:recipeIngredients
		// }
	});
	await Promise.all(promiseList);
	response.send(recipesWithIngredients);
	console.log('sent request to client.');
}

const getRecipeIngredients = async (ids:string[]):Promise<Ingredient[]> => {
	const promiseList = ids.map(ingredientLoop);
	return await Promise.all(promiseList);
}

const ingredientLoop = async (id:string):Promise<Ingredient> => {
	return await getIngredient(id);
}

const getIngredient = async (id:string):Promise<Ingredient> => {
	const ingredientsString:string = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	return ingredients[id];
}

export const addRecipe = async (request: Request, response: Response, next: any) => {
	console.log(request.body);
	if (!request.body.name || !request.body.steps || !request.body.ingredients) {
		return response.status(400).json({ error: 'Failed to add recipe, make sure all fields are present.' });
	}
	let recipesString = await FileHelper.readStringFromFile('src/mocks/recipes.json');
	const recipes:RecipeMap = JSON.parse(recipesString);
	try {
		const id = uuidv4();
		const name = request.body.name.toLowerCase();
		const steps = request.body.steps;
		const ingredients = request.body.ingredients;
		const newRecipe = {
			id: id,
			name: name,
			steps: steps,
			ingredients: ingredients
		}
		recipes[id] = newRecipe;
		recipesString = JSON.stringify(recipes);
		await FileHelper.writeStringToFile('src/mocks/recipes.json', recipesString);
		response.status(200).json(newRecipe);
	} catch (error) {

	}
}