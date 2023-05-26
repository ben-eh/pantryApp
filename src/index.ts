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
	const id = request.params.id;
	// console.log(id);
	response.send(ingredients[id])
}

const addIngredient = async (request: Request, response: Response, next: any) => {
	// auto-generate ID
	const id = uuidv4();
	// get name from user via Request
	const name = request.body.name;
	// add a Ingredient property to the ingredients.json DB
	let ingredientsString = await FileHelper.readStringFromFile('src/ingredients.json')
	const ingredients = JSON.parse(ingredientsString);
	const newIngredient = {
		id: id,
		name: name
	}
	ingredients[id] = newIngredient;
	ingredientsString = JSON.stringify(ingredients);
	FileHelper.writeStringToFile('src/ingredients.json', ingredientsString);
}


router.get('/', getAllIngredients);
router.get('/:id', getSingleIngredient);
router.post('/', addIngredient);

app.use(express.json());
app.use('/', router);
app.use('/ingredients', router);

app.listen('3001', () => {
	console.log('the server is running');
});