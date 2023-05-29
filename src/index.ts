import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import { Ingredient, IngredientMap } from './types/ingredients';
import { Recipe, RecipeMap } from './types/recipes';
import FileHelper from './utils/file-helper';

const app = express();
const ingredientsRouter = express.Router();
const recipesRouter = express.Router();

const getAllIngredients = async (request: Request, response: Response, next: any) => {
	const ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	response.send(ingredients);
}

const getSingleIngredient = async (request: Request, response: Response, next: any) => {
	if (!request.params.id) {

	}
	const ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	const id = request.params.id;
	// console.log(id);
	response.send(ingredients[id])
}

const addIngredient = async (request: Request, response: Response, next: any) => {
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
		let ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json');
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
		await FileHelper.writeStringToFile('src/ingredients.json', ingredientsString);
		response.status(200).json(newIngredient);
	} catch (error) {
		response.status(500).json({ error: 'Failed to add recipe.' });
	}
}

const addRecipe = async (request: Request, response: Response, next: any) => {
	if (!request.body.name || !request.body.steps || !request.body.ingredients) {
		return response.status(400).json({ error: 'Failed to add recipe, make sure all fields are present.' });
	}
	let recipesString = await FileHelper.readStringFromFile('src/recipes.json');
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
		await FileHelper.writeStringToFile('src/recipes.json', recipesString);
		response.status(200).json(newRecipe);
	} catch (error) {

	}
}

const deleteIngredient = async (request: Request, response: Response, next: any) => {
	const id = request.body.id;
	let ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients = JSON.parse(ingredientsString);
	if (!request.body.id || !ingredients.hasOwnProperty(id)) {
		return response.status(406).json({ error: 'No ID provided, or it is blank or does not exist in the database.' });
	}
	try {
		delete ingredients[id];
		ingredientsString = JSON.stringify(ingredients);
		FileHelper.writeStringToFile('src/ingredients.json', ingredientsString);
		response.status(200).json({ message: 'Ingredient deleted successfully.' });		
	} catch (error) {
		response.status(500).json({ error: 'Failed to delete ingredient.' });
	}
}

const getAllRecipes = async (request: Request, response: Response, next: any) => {
	const recipesString:string = await FileHelper.readStringFromFile('src/recipes.json')
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
	const ingredientsString:string = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients:IngredientMap = JSON.parse(ingredientsString);
	return ingredients[id];
}


ingredientsRouter.get('/', getAllIngredients);
ingredientsRouter.get('/:id', getSingleIngredient);
ingredientsRouter.post('/', addIngredient);
ingredientsRouter.post('/:id', deleteIngredient);

recipesRouter.get('/', getAllRecipes);
recipesRouter.post('/', addRecipe);

app.use(express.json());
app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);

app.listen('3001', () => {
	console.log('the server is running');
});