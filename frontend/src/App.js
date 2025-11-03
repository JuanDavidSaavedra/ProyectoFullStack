import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Clientes from './components/Clientes';
import './App.css';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = () => {
            const auth = localStorage.getItem('auth');
            setIsAuthenticated(auth === 'true');
            setLoading(false);
        };

        checkAuth();

        // Escuchar cambios en localStorage
        window.addEventListener('storage', checkAuth);

        return () => {
            window.removeEventListener('storage', checkAuth);
        };
    }, []);

    if (loading) {
        return <div>Cargando...</div>;
    }

    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route
                        path="/login"
                        element={!isAuthenticated ? <Login /> : <Navigate to="/clientes" />}
                    />
                    <Route
                        path="/clientes"
                        element={isAuthenticated ? <Clientes /> : <Navigate to="/login" />}
                    />
                    <Route
                        path="/"
                        element={<Navigate to={isAuthenticated ? "/clientes" : "/login"} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;