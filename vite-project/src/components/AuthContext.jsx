import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMe, loginUser, registerUser } from '../api/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem('token')||' ');
    const [user, setUser] = useState(null);
    const isAuthenticated = !!token;
    
    useEffect(() => {
        if(!token) {
            setUser(null);
            return;
        }
        fetchMe()
        .then((u) => setUser(u))
        .catch(( ) => {
            localStorage.removeItem('token');
            setToken(' ');
            setUser(null);
        });
        }, [token]);

        const login = async (creds) => {
            const data = await loginUser(creds);
            if (data?.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                try {
                    const user = await fetchMe();
                    setUser(user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            } else {
                throw new Error('Invalid credentials');
            }
        };
        const register = async (info) => {
            const data = await registerUser(info);
            if (data?.token) {
                localStorage.setItem('token', data.token);
                setToken(data.token);
                try {
                    const user = await fetchMe();
                    setUser(user);
                } catch (error) {
                    console.error('Error fetching user:', error);
                }
            } 
        };
        const logout = () => {
            localStorage.removeItem('token');
            setToken(' ');
            setUser(null);
        };
        return (
            <AuthContext.Provider value={{ user, isAuthenticated, login, register, logout }}>
                {children}
            </AuthContext.Provider>
         );
    };
        export const useAuth = () => {
            const ctx = useContext(AuthContext);
        if (!ctx) throw new Error('useAuth must be used within AuthProvider');
        return ctx;
        };  

