const ingredientForm = document.getElementById('ingredientForm');

const onFormSubmit = (e) => {
	// const dialogBox = document.getElementById('successDialogBox');
	// dialogBox.showModal();
	alert('testing something');
	e.preventDefault();
	const ingredientNameElement = document.getElementById('ingredientName');
	const categoryNameElement = document.getElementById('category');
	const ingredientNameValue = ingredientNameElement.value;
	const categoryNameValue = categoryNameElement.value;
	axios.post("http://localhost:3001/ingredients", {
			name: ingredientNameValue,
			category: categoryNameValue
	}).then((response) => {
			alert(response.data);
			const newHeader = document.createElement('h1');
			newHeader.innerHTML = "successfully added";
			document.body.appendChild(newHeader);
	}).catch((error) => {
			alert(error);
	});
}

ingredientForm.addEventListener('submit', onFormSubmit);