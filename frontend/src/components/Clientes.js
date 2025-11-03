import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientesAPI, logout } from '../services/api';

const Clientes = () => {
    const [clientes, setClientes] = useState([]);
    const [cliente, setCliente] = useState({
        nombre: '',
        email: '',
        telefono: '',
        direccion: ''
    });
    const [editingId, setEditingId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadClientes();
    }, []);

    const loadClientes = async () => {
        try {
            setLoading(true);
            const response = await clientesAPI.getAll();
            setClientes(response.data);
        } catch (error) {
            setError('Error al cargar clientes');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            if (editingId) {
                await clientesAPI.update(editingId, cliente);
            } else {
                await clientesAPI.create(cliente);
            }

            resetForm();
            loadClientes();
        } catch (error) {
            setError('Error al guardar el cliente');
        }
    };

    const handleEdit = (clienteEdit) => {
        setCliente({
            nombre: clienteEdit.nombre,
            email: clienteEdit.email,
            telefono: clienteEdit.telefono,
            direccion: clienteEdit.direccion
        });
        setEditingId(clienteEdit.id);
    };

    const handleDelete = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este cliente?')) {
            try {
                await clientesAPI.delete(id);
                loadClientes();
            } catch (error) {
                setError('Error al eliminar el cliente');
            }
        }
    };

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await clientesAPI.search(searchTerm);
            setClientes(response.data);
        } catch (error) {
            setError('Error en la búsqueda');
        }
    };

    const resetForm = () => {
        setCliente({
            nombre: '',
            email: '',
            telefono: '',
            direccion: ''
        });
        setEditingId(null);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container">
            <nav className="navbar">
                <div className="navbar-content">
                    <div className="navbar-brand">Sistema de Clientes</div>
                    <div className="navbar-user">
                        <span>Bienvenido, {localStorage.getItem('nombre') || localStorage.getItem('email')} </span>
                        <button
                            className="btn btn-danger"
                            onClick={handleLogout}
                            style={{ marginLeft: '10px' }}
                        >
                            Cerrar Sesión
                        </button>
                    </div>
                </div>
            </nav>

            {/* Resto del código del componente Clientes permanece igual */}
            <div className="card">
                <h2>{editingId ? 'Editar Cliente' : 'Nuevo Cliente'}</h2>

                {error && <div className="error">{error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Nombre:</label>
                        <input
                            type="text"
                            value={cliente.nombre}
                            onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={cliente.email}
                            onChange={(e) => setCliente({...cliente, email: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Teléfono:</label>
                        <input
                            type="text"
                            value={cliente.telefono}
                            onChange={(e) => setCliente({...cliente, telefono: e.target.value})}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Dirección:</label>
                        <input
                            type="text"
                            value={cliente.direccion}
                            onChange={(e) => setCliente({...cliente, direccion: e.target.value})}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary">
                        {editingId ? 'Actualizar' : 'Crear'}
                    </button>

                    {editingId && (
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>
                            Cancelar
                        </button>
                    )}
                </form>
            </div>

            <div className="card">
                <h2>Buscar Clientes</h2>
                <form onSubmit={handleSearch}>
                    <div className="form-group">
                        <input
                            type="text"
                            placeholder="Buscar por nombre..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Buscar</button>
                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => {
                            setSearchTerm('');
                            loadClientes();
                        }}
                    >
                        Mostrar Todos
                    </button>
                </form>
            </div>

            <div className="card">
                <h2>Lista de Clientes</h2>
                {loading ? (
                    <p>Cargando clientes...</p>
                ) : (
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Teléfono</th>
                            <th>Dirección</th>
                            <th>Acciones</th>
                        </tr>
                        </thead>
                        <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nombre}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.telefono}</td>
                                <td>{cliente.direccion}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleEdit(cliente)}
                                    >
                                        Editar
                                    </button>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleDelete(cliente.id)}
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                )}
                {clientes.length === 0 && !loading && <p>No hay clientes registrados.</p>}
            </div>
        </div>
    );
};

export default Clientes;