package br.com.pacheco.caderno_receitas.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Entity
@Table(name = "tb_receitas")
@Data // Gera Getters, Setters, Equals, HashCode e toString
@NoArgsConstructor // Gera o construtor vazio obrigatório para o JPA
@AllArgsConstructor // Gera um construtor com todos os campos
public class Receita {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 2000)
    private String ingredientes;

    @Column(columnDefinition = "CLOB")
    private String modoPreparo;

    private int tempoPreparoMinutos;


    private String categoria; // Ex: Doce, Salgada, Vegana

    @Column(length = 100)
    private String subcategoria;

    private String urlFoto; // Para salvar o caminho da imagem

    private LocalDateTime dataCriacao = LocalDateTime.now();

    // Dica: Se quiser um construtor específico apenas para nome e preparo,
    // você pode mantê-lo aqui embaixo, mas o @AllArgsConstructor já ajuda muito.
}