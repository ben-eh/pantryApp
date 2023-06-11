import express, {Request, Response} from 'express';
import { getAllRecipes, addRecipe, getRecipe } from '../controllers/recipes'

const recipesRouter = express.Router();

recipesRouter.get('/', getAllRecipes);
recipesRouter.get('/:id', getRecipe);
recipesRouter.post('/', addRecipe);

export default recipesRouter;