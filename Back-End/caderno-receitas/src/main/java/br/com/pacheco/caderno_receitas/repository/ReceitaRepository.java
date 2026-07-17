package br.com.pacheco.caderno_receitas.repository;

import br.com.pacheco.caderno_receitas.model.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {
    // Busca por categoria (para as abas do seu app)
    List<Receita> findByCategoria(String categoria);
}