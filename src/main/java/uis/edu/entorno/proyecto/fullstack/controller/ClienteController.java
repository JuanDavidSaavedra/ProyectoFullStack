package uis.edu.entorno.proyecto.fullstack.controller;

import uis.edu.entorno.proyecto.fullstack.model.Cliente;
import uis.edu.entorno.proyecto.fullstack.service.ClienteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/clientes")
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:3001"})
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @GetMapping
    public List<Cliente> getAllClientes() {
        return clienteService.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Cliente> getClienteById(@PathVariable String id) {
        Optional<Cliente> cliente = clienteService.findById(id);
        return cliente.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Cliente createCliente(@RequestBody Cliente cliente) {
        return clienteService.save(cliente);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Cliente> updateCliente(@PathVariable String id, @RequestBody Cliente clienteDetails) {
        Optional<Cliente> cliente = clienteService.findById(id);
        if (cliente.isPresent()) {
            Cliente clienteActualizado = cliente.get();
            clienteActualizado.setNombre(clienteDetails.getNombre());
            clienteActualizado.setEmail(clienteDetails.getEmail());
            clienteActualizado.setTelefono(clienteDetails.getTelefono());
            clienteActualizado.setDireccion(clienteDetails.getDireccion());
            return ResponseEntity.ok(clienteService.save(clienteActualizado));
        }
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCliente(@PathVariable String id) {
        if (clienteService.findById(id).isPresent()) {
            clienteService.deleteById(id);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/buscar")
    public List<Cliente> searchClientes(@RequestParam String nombre) {
        return clienteService.findByNombre(nombre);
    }
}