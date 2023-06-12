import axios from "axios";
import React, { useEffect, useState } from "react";

type User = {
    id: string;
    username: string;
    password: string;
    email: string;
    recipes: string[];
}
type Credentials = {
    username: string;
    password: string;
}
type AuthContextType = {
    user: User | undefined;
    login: (credentials: Credentials) => void;
    logout: () => void;
}
const authContextDefaultValue = {
    user: undefined,
    login: () => {},
    logout: () => {},
}

const authContext = React.createContext<AuthContextType>(authContextDefaultValue);

export const AuthProvider = ({ children }: any) => {
    const [user, setUser] = useState<User>();

    useEffect(() => {
        if (!user) {
            const userString: string | null = localStorage.getItem('PantryApp-User');
            userString && setUser(JSON.parse(userString));
        }
    });
    
    const login = async (credentials: Credentials) => {
        try {
            const options = {
                headers: {
                  'Content-Type': 'application/json'
                },
            }
            const request = await axios.post('http://localhost:3001/users/authenticate', credentials, options);
            const user: User = request.data;;
            setUser(user);
            localStorage.setItem('PantryApp-User', JSON.stringify(user));
        }catch (error) {
            alert('Could not login');
        }
    }
    const logout = () => {
        localStorage.removeItem('PantryApp-User');
    }

    return (
        <authContext.Provider value={{ user, login, logout }}>
            {children}
        </authContext.Provider>
    );
}

const useAuth = (): AuthContextType => {
    const context = React.useContext(authContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

export default useAuth;