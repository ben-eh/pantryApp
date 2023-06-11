const loginButton = document.getElementById('authLoginButton');

const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');


const onLogin = (e) => {
	const username = usernameField.value;
	const password = passwordField.value;
	const loginDetails = {
		username,
		password
	}
	login(loginDetails);
}

const login = (userDetails) => {
	axios.post("http://localhost:3001/users/authenticate",
		userDetails
	).then((response) => {
		localStorage.setItem('user', JSON.stringify(response.data));
		window.location.href="http://localhost:3001/home.html";
	}).catch((error) => {
		console.log(error);
	});
}
	
loginButton.addEventListener('click', onLogin);