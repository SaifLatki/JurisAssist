import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const API_URL = 'http://localhost:5000';

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [token, setToken] = useState(
        localStorage.getItem('token')
    );

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const verifyUser = async () => {

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const response = await axios.get(
                    `${API_URL}/auth/me`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }
                );

                setUser(response.data.user);

            } catch (error) {

                console.log('Authentication failed');

                localStorage.removeItem('token');
                setToken(null);
                setUser(null);

            } finally {

                setLoading(false);

            }
        };

        verifyUser();

    }, [token]);


    const login = async (email, password) => {

        const response = await axios.post(
            `${API_URL}/auth/login`,
            {
                email,
                password
            }
        );

        const { token, user } = response.data;

        localStorage.setItem('token', token);

        setToken(token);
        setUser(user);

        return user;
    };


    const register = async (
        name,
        email,
        password,
        role
    ) => {

        const response = await axios.post(
            `${API_URL}/auth/register`,
            {
                name,
                email,
                password,
                role
            }
        );

        return response.data;
    };


    const logout = () => {

        localStorage.removeItem('token');

        setToken(null);
        setUser(null);

    };


    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}


export function useAuth() {
    return useContext(AuthContext);
}