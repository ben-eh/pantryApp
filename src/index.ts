import express, {Request, Response} from 'express';
import usersRouter from './routes/users';
import recipesRouter from './routes/recipes';
import ingredientsRouter from './routes/ingredients';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/ingredients', ingredientsRouter);
app.use('/recipes', recipesRouter);
app.use('/users', usersRouter);
app.use('/',express.static(__dirname + '/public'));

app.listen('3001', () => {
	console.log('the server is running');
});