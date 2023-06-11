import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import FileHelper from '../utils/file-helper';
import { FullIngredient, Ingredient, IngredientMap, IngredientQuantity } from '../types/ingredients';
import { Recipe, RecipeMap } from '../types/recipes';

export const getRecipe = async (request: Request, response: Response, next: any) => {
	// get ID of recipe we want
	const IDFromParams:string = request.params.id;

	// read the recipe db file
	const recipesString:string = await FileHelper.readStringFromFile('src/mocks/recipes.json');
	const recipes:RecipeMap = JSON.parse(recipesString);
	
	// find recipe object we want to send to client
	const recipe:Recipe = recipes[IDFromParams];

	// retrieve ingredient quantity objects for recipe
	const recipeIngredients:FullIngredient[] = await getRecipeFullIngredient(recipe.ingredients);

	// create recipe to send to user
	const recipesWithIngredients:any = recipe;
	recipesWithIngredients.ingredients = recipeIngredients;
	response.send(recipesWithIngredients);
}

export const getAllRecipes = async (request: Request, response: Response, next: any) => {
	const recipesString:string = await FileHelper.readStringFromFile('src/mocks/recipes.json');
	const recipes:RecipeMap = JSON.parse(recipesString);
	const recipesArray = Object.values(recipes);
	const recipesWithIngredients:any = {}
	const promiseList = recipesArray.map(async (recipe) => {
		// get all ingredients listed in each recipe
		const recipeIngredients:FullIngredient[] = await getRecipeFullIngredient(recipe.ingredients);
		recipesWithIngredients[recipe.id] = {
			...recipe,
			ingredients:recipeIngredients
		}
	});
	await Promise.all(promiseList);
	response.send(recipesWithIngredients);
	console.log('sent request to client.');
}

const getRecipeFullIngredient = async (ingredients:IngredientQuantity[]):Promise<FullIngredient[]> => {
	const ingredientsString = await FileHelper.readStringFromFile('src/mocks/ingredients.json');
	const ingredientsMap = JSON.parse(ingredientsString);
	const fullIngredients = ingredients.map((currentIngredient) => {
		// find ingredient
		const ingredient = ingredientsMap[currentIngredient.id];
		
		// combine ingredient with the ingredient quantity
		const fullIngredient = {
			...ingredient,
			...currentIngredient
		}

		// return the list of FullIngredients
		return fullIngredient;
	});

	return fullIngredients;

	// const promiseList:Promise<IngredientQuantity>[] = ingredients.map(ingredientLoop);
	// return await Promise.all(promiseList);
}

export const addRecipe = async (request: Request, response: Response, next: any) => {
	console.log(request.body);
	if (!request.body.name || !request.body.steps || !request.body.ingredients) {
		return response.status(400).json({ error: 'Failed to add recipe, make sure all fields are present.' });
	}
	let recipesString = await FileHelper.readStringFromFile('src/mocks/recipes.json');
	const recipes:RecipeMap = JSON.parse(recipesString);
	try {
		const id:string = uuidv4();
		const name:string = request.body.name.toLowerCase();
		const steps:string[] = request.body.steps;
		const ingredients:IngredientQuantity[] = request.body.ingredients;
		const newRecipe:Recipe = {
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