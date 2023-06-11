const stepsList = document.getElementById('stepsList');
const ingredientsList = document.getElementById('ingredientsList');

const onPageLoad = async (e) => {
	const queryParams = window.location.search;
	const queryParamsArray = queryParams.split('=');
	const id = queryParamsArray[1];
	recipe = await getRecipe(id);
	assignIngredientsAndSteps(recipe);
}

const getRecipe = async (id) => {
	const response = await axios.get(`http://localhost:3001/recipes/${id}`)
	return response.data
}

const assignIngredientsAndSteps = (recipe) => {
	const ingredients = recipe.ingredients;
	ingredients.map((ingredient) => {
		addIngredientsToDOM(ingredient);
	});
	const steps = recipe.steps;
	steps.map((step) => {
		addStepsToDOM(step);
	});
}

const addStepsToDOM = (step) => {
	const li = document.createElement('li');
	const liText = document.createTextNode(step);
	li.appendChild(liText);
	stepsList.appendChild(li);
}

const addIngredientsToDOM = (ingredient) => {
	const li = document.createElement('li');
	const liText = document.createTextNode(ingredient.name);
	li.appendChild(liText);
	ingredientsList.appendChild(li);
}


window.addEventListener('load', onPageLoad);