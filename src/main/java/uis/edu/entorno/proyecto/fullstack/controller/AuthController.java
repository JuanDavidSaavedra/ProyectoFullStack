package uis.edu.entorno.proyecto.fullstack.controller;

import uis.edu.entorno.proyecto.fullstack.model.Usuario;
import uis.edu.entorno.proyecto.fullstack.service.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class AuthController {

    @Autowired
    private UsuarioService usuarioService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Optional<Usuario> usuarioOpt = usuarioService.findByEmail(loginRequest.getEmail());

            if (usuarioOpt.isPresent()) {
                Usuario usuario = usuarioOpt.get();
                if (passwordEncoder.matches(loginRequest.getPassword(), usuario.getPassword())) {
                    Map<String, String> response = new HashMap<>();
                    response.put("message", "Login exitoso");
                    response.put("email", usuario.getEmail());
                    response.put("nombre", usuario.getNombre());
                    return ResponseEntity.ok(response);
                }
            }

            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Credenciales inválidas");
            return ResponseEntity.badRequest().body(errorResponse);

        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error en el servidor");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody Usuario usuario) {
        try {
            if (usuarioService.existsByEmail(usuario.getEmail())) {
                Map<String, String> errorResponse = new HashMap<>();
                errorResponse.put("error", "El email ya está registrado");
                return ResponseEntity.badRequest().body(errorResponse);
            }

            usuario.setRol("USER");
            Usuario nuevoUsuario = usuarioService.save(usuario);

            Map<String, String> response = new HashMap<>();
            response.put("message", "Usuario registrado exitosamente");
            response.put("id", nuevoUsuario.getId());

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> errorResponse = new HashMap<>();
            errorResponse.put("error", "Error al registrar usuario");
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }

    public static class LoginRequest {
        private String email;
        private String password;

        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
        public String getPassword() { return password; }
        public void setPassword(String password) { this.password = password; }
    }
}