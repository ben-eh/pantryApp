import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import MyRecipesPage from "./pages/MyRecipes";
import CreateRecipePage from "./pages/CreateRecipe";
import useAuth, { AuthProvider } from "./hooks/useAuth";


const PublicStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={LoginPage}/>
        <Route path='/register' Component={RegisterPage}/>
      </Routes>
    </BrowserRouter>
  );
}

const UserStack = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={MyRecipesPage}/>
        <Route path='/create-recipe' Component={CreateRecipePage}/>
      </Routes>
    </BrowserRouter>
  );
}

const Router = () => {
  const { user } = useAuth();

  if (!user) return <PublicStack />;
  return <UserStack />
}

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
