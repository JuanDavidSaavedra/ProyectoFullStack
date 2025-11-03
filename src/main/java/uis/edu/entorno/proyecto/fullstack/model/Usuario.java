package uis.edu.entorno.proyecto.fullstack.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.index.Indexed;

@Document(collection = "usuarios")
public class Usuario {
    @Id
    private String id;

    @Indexed(unique = true)
    private String email;

    private String nombre;
    private String password;
    private String rol;

    public Usuario() {}

    public Usuario(String email, String nombre, String password, String rol) {
        this.email = email;
        this.nombre = nombre;
        this.password = password;
        this.rol = rol;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }
}