const user = JSON.parse(localStorage.getItem('user'));
if (!user) {
	window.location.href="http://localhost:3001/index.html";
}
const recipesFilter = document.getElementById('recipesFilter');
const filteredRecipesList = document.getElementById('filteredRecipesList');
let allRecipes;

const onPageLoad = async (e) => {
	allRecipes = await getAllRecipes();
}

const getAllRecipes = async () => {
	const response = await axios.get('http://localhost:3001/recipes')
	return response.data;
}

const welcomeHeader = document.getElementById('welcomeHeader');
const welcomeText = document.createTextNode(`Welcome back ${user.username}`);
welcomeHeader.appendChild(welcomeText);

const filterRecipes = (e) => {
	filteredRecipesList.innerHTML = '';
	const typedText = e.target.value.toLowerCase();
	if (typedText === '') return;

	const recipes = Object.values(allRecipes);
	console.log(recipes[0].name);
	const filteredRecipes = recipes.filter((recipe) => {
		return recipe.name.toLowerCase().includes(typedText);
	});
	addFilteredRecipesToDOM(filteredRecipes);
}

const addFilteredRecipesToDOM = (recipes) => {
	recipes.map((recipe) => {
		const li = document.createElement('li');
		const recipeName = document.createTextNode(recipe.name);
		li.setAttribute('id', recipe.id);
		li.appendChild(recipeName);
		filteredRecipesList.appendChild(li);
		li.addEventListener('click', showRecipe);
	});
}

const showRecipe = (e) => {
	const recipeID = e.target.id;
	window.location.href=`http://localhost:3001/showRecipe.html?id=${recipeID}`;
}

window.addEventListener('load', onPageLoad);
recipesFilter.addEventListener('input', filterRecipes);