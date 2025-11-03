package uis.edu.entorno.proyecto.fullstack.service;

import uis.edu.entorno.proyecto.fullstack.model.Cliente;
import uis.edu.entorno.proyecto.fullstack.repository.ClienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;

    public List<Cliente> findAll() {
        return clienteRepository.findAll();
    }

    public Optional<Cliente> findById(String id) {
        return clienteRepository.findById(id);
    }

    public Cliente save(Cliente cliente) {
        return clienteRepository.save(cliente);
    }

    public void deleteById(String id) {
        clienteRepository.deleteById(id);
    }

    public List<Cliente> findByNombre(String nombre) {
        return clienteRepository.findByNombreContainingIgnoreCase(nombre);
    }

    public boolean existsByEmail(String email) {
        return clienteRepository.existsByEmail(email);
    }
}