package uis.edu.entorno.proyecto.fullstack.repository;

import uis.edu.entorno.proyecto.fullstack.model.Cliente;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface ClienteRepository extends MongoRepository<Cliente, String> {
    List<Cliente> findByNombreContainingIgnoreCase(String nombre);
    Boolean existsByEmail(String email);
}