import express, {Request, Response} from 'express';
import { getAllRecipes, addRecipe } from '../controllers/recipes'

const recipesRouter = express.Router();

recipesRouter.get('/', getAllRecipes);
recipesRouter.post('/', addRecipe);

export default recipesRouter;