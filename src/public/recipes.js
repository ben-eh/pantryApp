const ingredientsFilter = document.getElementById('ingredientsFilter');
let allIngredients;
const stepButton = document.getElementById('stepButton');
const textAreaText = document.getElementById('recipeStep');
let allSteps = [];

const onPageLoad = async (e) => {
	allIngredients = await getAllIngredients();
}

const getAllIngredients = async () => {
	const response = await axios.get("http://localhost:3001/ingredients")
	return response.data;
}

const filterItems = (e) => {
	const typedText = e.target.value.toLowerCase();
	const ingredients = Object.values(allIngredients);
	const filteredIngredients = ingredients.filter((ingredient) => {
		return ingredient.name.toLowerCase().includes(typedText);
	});
	console.log(filteredIngredients);
}

const addStep = (e) => {
	const stepTextToAdd = textAreaText.value;
	allSteps.push(stepTextToAdd);
	textAreaText.value = '';
	// console.log(textAreaText.value);
	e.preventDefault();
}

console.log(allSteps);

window.addEventListener("load", onPageLoad);
ingredientsFilter.addEventListener('input', filterItems);
stepButton.addEventListener('click', addStep);