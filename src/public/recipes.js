const ingredientsFilter = document.getElementById('ingredientsFilter');
let allIngredients;
let allMeasurements;
const stepButton = document.getElementById('stepButton');
const textAreaText = document.getElementById('recipeStep');
const stepsDiv = document.getElementById('addedSteps');
let allSteps = [];
const filteredIngredientsList = document.getElementById('ingredients-list-search');
const addedIngredientsList = document.getElementById('added-ingredients-list');
const submitButton = document.getElementById('submit-button');
const nameInput = document.getElementById('recipeName');
const measurementSelectField = document.getElementById('ingredientMeasurement');

const onPageLoad = async (e) => {
	allIngredients = await getAllIngredients();
	allMeasurements = await getAllMeasurements();
}

const getAllIngredients = async () => {
	const response = await axios.get("http://localhost:3001/ingredients")
	return response.data;
}

const getAllMeasurements = async() => {
	const response = await axios.get("http://localhost:3001/ingredients/measurements")
	return response.data;
}

const filterItems = (e) => {
	filteredIngredientsList.innerHTML = '';
	const typedText = e.target.value.toLowerCase();
	if (typedText === '') return;

	const ingredients = Object.values(allIngredients);
	const filteredIngredients = ingredients.filter((ingredient) => {
		return ingredient.name.toLowerCase().includes(typedText);
	});
	// console.log(filteredIngredients);
	addFilteredIngredientsToDOM(filteredIngredients);
}

const addFilteredIngredientsToDOM = (ingredients) => {
	ingredients.map((ingredient) => {
		const li = addIngredientToFilteredListResults(ingredient, filteredIngredientsList);
		li.addEventListener('click', addIngredientToAddedIngredientsList);
	});
}

const addIngredientToAddedIngredientsList = (e) => {
	const id = e.target.id;
	const ingredient = allIngredients[id];
	addIngredientToAddedList(ingredient, addedIngredientsList);
	ingredientsFilter.value = '';
	filteredIngredientsList.innerHTML = '';
}

const addIngredientToAddedList = (ingredient, list) => {
	const listlis = list.getElementsByTagName('li');
	const elements = Object.values(listlis);
	if (elements.length > 0) {
		const filterResult = elements.filter((li) => {
			return ingredient.id === li.id
		});
		if (filterResult.length > 0) {
			alert('you have already added this ingredient');
			return;
		}
	}
	const li = document.createElement('li');
	const ingredientName = document.createTextNode(ingredient.name);
	li.setAttribute('id', ingredient.id);
	li.appendChild(ingredientName);

	// attach quantity input field
	const quanityInputLabel = document.createElement('label');
	const quantityInputLabelText = document.createTextNode('Quantity');
	quanityInputLabel.appendChild(quantityInputLabelText);
	const quantityInputField = document.createElement('input');
	quantityInputField.id = 'quantityField';
	li.appendChild(quanityInputLabel);
	li.appendChild(quantityInputField);

	// attach measurement select field
	const measurementSelectLabel = document.createElement('label');
	const measurementSelectLabelText = document.createTextNode('Measurement');
	measurementSelectLabel.appendChild(measurementSelectLabelText);
	const measurementSelectField = document.createElement('select');
	allMeasurements.map((measurement) => {
		const measurementOption = document.createElement('option');
		measurementOption.value = measurement;
		const measurementOptionText = document.createTextNode(measurement);
		measurementOption.appendChild(measurementOptionText);
		measurementSelectField.appendChild(measurementOption);
	});
	li.appendChild(measurementSelectLabel);
	li.appendChild(measurementSelectField);

	list.appendChild(li);
	return li;
}

const addIngredientToFilteredListResults = (ingredient, list) => {
	const listlis = list.getElementsByTagName('li');
	const elements = Object.values(listlis);
	if (elements.length > 0) {
		const filterResult = elements.filter((li) => {
			return ingredient.id === li.id
		});
		if (filterResult.length > 0) {
			alert('you have already added this ingredient');
			return;
		}
	}
	const li = document.createElement('li');
	const ingredientName = document.createTextNode(ingredient.name);
	li.setAttribute('id', ingredient.id);
	li.appendChild(ingredientName);

	list.appendChild(li);
	return li;
}

const addStep = (e) => {
	const li = document.createElement('li');
	const stepName = document.createTextNode(textAreaText.value);
	li.appendChild(stepName);
	stepsDiv.appendChild(li);
	textAreaText.value = '';
	e.preventDefault();
}

const addRecipe = (e) => {
	// get recipe name
	const name = nameInput.value;
	
	// get array of ingredient IDs
	const ingredientsElements = addedIngredientsList.getElementsByTagName('li');
	// console.log(ingredientsElements[0]);
	const elements = Object.values(ingredientsElements);
	// console.log(elements);
	const ingredients = elements.map(ingredient => {
		const quantityField = ingredient.querySelector('input');
		const selectField = ingredient.querySelector('select');
		const IngredientQuantity = {
			id: ingredient.id,
			quantity: quantityField.value,
			unitOfMeasure: selectField.value
		}
		return IngredientQuantity;
	});
	
	// get array of steps
	const stepsCollection = stepsDiv.getElementsByTagName('li');
	const stepsList = Object.values(stepsCollection);
	const steps = stepsList.map(step => step.innerHTML);

	const recipe = {
		name,
		steps,
		ingredients
	}

	postRecipe(recipe);
}

const postRecipe = (recipe) => {
	axios.post("http://localhost:3001/recipes",
		recipe
	).then((response) => {
		alert('recipe added successfully');
	}).catch((error) => {
		alert(error);
	});
}

window.addEventListener("load", onPageLoad);
ingredientsFilter.addEventListener('input', filterItems);
stepButton.addEventListener('click', addStep);
submitButton.addEventListener('click', addRecipe);