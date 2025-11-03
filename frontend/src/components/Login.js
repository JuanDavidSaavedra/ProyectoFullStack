import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [nombre, setNombre] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            if (isLogin) {
                const response = await authAPI.login(email, password);

                // Guardar en localStorage
                localStorage.setItem('auth', 'true');
                localStorage.setItem('email', email);
                localStorage.setItem('nombre', response.data.nombre || email);

                setSuccess('Login exitoso');

                // Forzar recarga del estado de autenticación
                window.dispatchEvent(new Event('storage'));

                // Redirigir inmediatamente
                navigate('/clientes');
            } else {
                await authAPI.register({ email, password, nombre });
                setSuccess('Registro exitoso. Ahora puedes iniciar sesión.');
                setIsLogin(true);
                setNombre('');
                setEmail('');
                setPassword('');
            }
        } catch (error) {
            setError(error.response?.data?.error || 'Error en la operación');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h2>{isLogin ? 'Iniciar Sesión' : 'Registrarse'}</h2>

                {error && <div className="error">{error}</div>}
                {success && <div className="success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <div className="form-group">
                            <label>Nombre:</label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={(e) => setNombre(e.target.value)}
                                required
                                disabled={loading}
                            />
                        </div>
                    )}

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Contraseña:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
                    </button>
                </form>

                <p style={{ marginTop: '15px', textAlign: 'center' }}>
                    {isLogin ? '¿No tienes cuenta? ' : '¿Ya tienes cuenta? '}
                    <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setSuccess('');
                        }}
                        style={{ padding: '5px 10px', fontSize: '12px' }}
                        disabled={loading}
                    >
                        {isLogin ? 'Registrarse' : 'Iniciar Sesión'}
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;