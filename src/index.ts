import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import { IngredientMap } from './types/ingredients';
import FileHelper from './utils/file-helper';

const ingredients: IngredientMap = require('./ingredients.json')

const app = express();
const router = express.Router();

const getAllIngredients = (request: Request, response: Response, next: any) => {
	response.send(ingredients);
	// console.log(response.send);
}

const getSingleIngredient = (request: Request, response: Response, next: any) => {
	if (!request.params.id) {

	}
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
		let ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
		const ingredients = JSON.parse(ingredientsString);
		// test for duplicate entries
		for (const key in ingredients) {
			if (ingredients[key]["name"] == name) {
				return response.status(500).json({ error: 'Failed to add ingredient - duplicate item' });			
			}
		}
		const newIngredient = {
			id: id,
			name: name,
			category: category
		}
		ingredients[id] = newIngredient;
		ingredientsString = JSON.stringify(ingredients);
		FileHelper.writeStringToFile('src/ingredients.json', ingredientsString);
		response.status(200).json({ message: 'Ingredient added successfully.' });
	} catch (error) {
		response.status(500).json({ error: 'Failed to add ingredient.' });
	}
}

const deleteIngredient = async (request: Request, response: Response, next: any) => {
	const id = request.body.id;
	console.log(id);
	let ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients = JSON.parse(ingredientsString);
	delete ingredients[id];
	console.log(ingredients);
	ingredientsString = JSON.stringify(ingredients);
	FileHelper.writeStringToFile('src/ingredients.json', ingredientsString);
}


router.get('/', getAllIngredients);
router.get('/:id', getSingleIngredient);
router.post('/', addIngredient);
router.post('/:id', deleteIngredient);

app.use(express.json());
app.use('/', router);
app.use('/ingredients', router);

app.listen('3001', () => {
	console.log('the server is running');
});