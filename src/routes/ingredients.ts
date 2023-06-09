import express, {Request, Response} from 'express';
import { getAllIngredients, getSingleIngredient, addIngredient, deleteIngredient, getMeasurements } from '../controllers/ingredients';

const ingredientsRouter = express.Router();

ingredientsRouter.get('/measurements', getMeasurements);
ingredientsRouter.get('/', getAllIngredients);
ingredientsRouter.get('/:id', getSingleIngredient);
ingredientsRouter.post('/', addIngredient);
ingredientsRouter.post('/:id', deleteIngredient);

export default ingredientsRouter;