package uis.edu.entorno.proyecto.fullstack.repository;

import uis.edu.entorno.proyecto.fullstack.model.Usuario;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UsuarioRepository extends MongoRepository<Usuario, String> {
    Optional<Usuario> findByEmail(String email);
    Boolean existsByEmail(String email);
}