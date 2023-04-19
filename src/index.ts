import express, {Request, Response} from 'express';
import {v4 as uuidv4} from 'uuid';
import { IngredientMap } from './types/ingredients';
import FileHelper from './utils/file-helper';

const ingredients: IngredientMap = require('./ingredients.json')

const app = express();
const router = express.Router();

const getAllIngredients = (request: Request, response: Response, next: any) => {
	response.send(ingredients);
}

const getSingleIngredient = (request: Request, response: Response, next: any) => {
	const id = request.params.id;
	// console.log(id);
	response.send(ingredients[id])
}

const addIngredient = (request: Request, response: Response, next: any) => {
	// auto-generate ID
	const id = uuidv4();
	// get name from user via Request
	const name = request.body.name;
	// add a Ingredient property to the ingredients.json DB
	FileHelper.readStringFromFile('./ingredients.json')
}


router.get('/', getAllIngredients);
router.get('/:id', getSingleIngredient);
router.post('/', addIngredient);

app.use('/', router);
app.use('/ingredients', router);

app.listen('3001', () => {
	console.log('the server is running');
});
