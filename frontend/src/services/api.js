import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para requests
api.interceptors.request.use(
    (config) => {
        console.log(`🔄 Haciendo petición: ${config.method?.toUpperCase()} ${config.url}`);
        return config;
    },
    (error) => {
        console.error('❌ Error en petición:', error);
        return Promise.reject(error);
    }
);

// Interceptor para responses
api.interceptors.response.use(
    (response) => {
        console.log(`✅ Respuesta exitosa: ${response.status} ${response.config.url}`);
        return response;
    },
    (error) => {
        console.error('❌ Error en respuesta:', {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        if (error.response?.status === 401) {
            localStorage.removeItem('auth');
            localStorage.removeItem('email');
            localStorage.removeItem('nombre');
            // Disparar evento para actualizar el estado de autenticación
            window.dispatchEvent(new Event('storage'));
        }
        return Promise.reject(error);
    }
);

export const authAPI = {
    login: (email, password) =>
        api.post('/auth/login', { email, password }),

    register: (userData) =>
        api.post('/auth/register', userData)
};

export const clientesAPI = {
    getAll: () => api.get('/clientes'),
    getById: (id) => api.get(`/clientes/${id}`),
    create: (cliente) => api.post('/clientes', cliente),
    update: (id, cliente) => api.put(`/clientes/${id}`, cliente),
    delete: (id) => api.delete(`/clientes/${id}`),
    search: (nombre) => api.get(`/clientes/buscar?nombre=${nombre}`)
};

// Función para verificar autenticación
export const checkAuth = () => {
    return localStorage.getItem('auth') === 'true';
};

// Función para logout
export const logout = () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('email');
    localStorage.removeItem('nombre');
    window.dispatchEvent(new Event('storage'));
};

export default api;