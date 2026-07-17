package br.com.pacheco.caderno_receitas.controller;

import br.com.pacheco.caderno_receitas.model.Receita;
import br.com.pacheco.caderno_receitas.repository.ReceitaRepository;
import br.com.pacheco.caderno_receitas.service.ObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/receitas")
@CrossOrigin(origins = "*") // Importante manter para o React conseguir acessar
public class ReceitaController {

    @Autowired
    private ReceitaRepository repository;

    @Autowired
    private ObjectStorageService storageService; // Injetando o seu novo serviço da Oracle!

    // Listar todas as receitas (opcionalmente filtrando por categoria)
    @GetMapping
    public List<Receita> listar(@RequestParam(required = false) String categoria) {
        if (categoria != null) {
            return repository.findByCategoria(categoria);
        }
        return repository.findAll();
    }
    // Buscar UMA receita pelo ID
    @GetMapping("/{id}")
    public ResponseEntity<Receita> buscarPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(receita -> ResponseEntity.ok().body(receita))
                .orElse(ResponseEntity.notFound().build());
    }

    // Criar nova receita COM upload de imagem
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Receita> criar(
            @RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute Receita receita) {
        try {
            // Se veio um arquivo de foto, fazemos o upload na nuvem
            if (file != null && !file.isEmpty()) {
                String urlFoto = storageService.uploadFile(file);
                receita.setUrlFoto(urlFoto);
            }

            Receita receitaSalva = repository.save(receita);
            return ResponseEntity.ok(receitaSalva);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Alterar receita existente COM OU SEM nova foto
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Receita> alterar(
            @PathVariable Long id,
            @RequestParam(value = "file", required = false) MultipartFile file,
            @ModelAttribute Receita receitaAtualizada) {

        try {
            // Primeiro, buscamos a receita antiga para não perder dados importantes
            Optional<Receita> receitaAntigaOpt = repository.findById(id);
            if (receitaAntigaOpt.isEmpty()) {
                return ResponseEntity.notFound().build();
            }

            Receita receitaAntiga = receitaAntigaOpt.get();

            // Se o usuário mandou uma FOTO NOVA, fazemos upload
            if (file != null && !file.isEmpty()) {
                String urlFoto = storageService.uploadFile(file);
                receitaAtualizada.setUrlFoto(urlFoto);
            } else {
                // Se não mandou foto, reaproveitamos a URL antiga que já estava no banco
                receitaAtualizada.setUrlFoto(receitaAntiga.getUrlFoto());
            }

            receitaAtualizada.setId(id);
            Receita receitaSalva = repository.save(receitaAtualizada);

            return ResponseEntity.ok(receitaSalva);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Excluir receita
    @DeleteMapping("/{id}")
    public void excluir(@PathVariable Long id) {
        repository.deleteById(id);
    }
}