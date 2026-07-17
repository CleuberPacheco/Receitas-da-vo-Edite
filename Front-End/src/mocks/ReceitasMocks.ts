// src/mocks/receitasMocks.ts
import {type Receita} from '../types/Receita';

export const receitasMock: Receita[] = [
  // --- DOCES ---
    {
        id: 'd1',
        titulo: 'Bolo de Cenoura com Brigadeiro ',
        categoria: 'doces',
        subcategoria: 'Bolos',
        fotoUrl: 'https://images.unsplash.com/photo-1621466560271-4b055938885b?q=80&w=300', // Foto fofa real
        ingredientes: ['Cenoura', 'Ovos', 'Farinha'],
        modoPreparo: 'Misture e asse.'
    },
    {
        id: 'd2',
        titulo: 'Pudim de Leite Condensado',
        categoria: 'doces',
        subcategoria: 'Sobremesas de Geladeira',
        fotoUrl: null, // <--- ESTE NÃO TEM FOTO NO BANCO!
        ingredientes: ['Leite', 'Leite Condensado', 'Caramelo','Leite', 'Leite Condensado', 'Caramelo'],
        modoPreparo: 'Cozinhe em banho maria.'
    },
    {
        id: 'd3',
        titulo: 'Bolo de Cenoura com Brigadeiro',
        categoria: 'doces',
        subcategoria: 'Bolos',
        fotoUrl: 'https://images.unsplash.com/photo-1621466560271-4b055938885b?q=80&w=300', // Foto fofa real
        ingredientes: ['Cenoura', 'Ovos', 'Farinha'],
        modoPreparo: 'Misture e asse.'
    },
    {
        id: 'd4',
        titulo: 'Pudim de Leite Condensado',
        categoria: 'doces',
        subcategoria: 'Sobremesas de Geladeira',
        fotoUrl: null, // <--- ESTE NÃO TEM FOTO NO BANCO!
        ingredientes: ['Leite', 'Leite Condensado', 'Caramelo','Leite', 'Leite Condensado', 'Caramelo'],
        modoPreparo: 'Cozinhe em banho maria.'
    },
    {
        id: 'd5',
        titulo: 'Bolo de Cenoura com Brigadeiro',
        categoria: 'doces',
        subcategoria: 'Bolos',
        fotoUrl: 'https://images.unsplash.com/photo-1621466560271-4b055938885b?q=80&w=300', // Foto fofa real
        ingredientes: ['Cenoura', 'Ovos', 'Farinha'],
        modoPreparo: 'Misture e asse.'
    },
    {
        id: 'd6',
        titulo: 'Pudim de Leite Condensado',
        categoria: 'doces',
        subcategoria: 'Sobremesas de Geladeira',
        fotoUrl: null, // <--- ESTE NÃO TEM FOTO NO BANCO!
        ingredientes: ['Leite', 'Leite Condensado', 'Caramelo','Leite', 'Leite Condensado', 'Caramelo'],
        modoPreparo: 'Cozinhe em banho maria.'
    },
    {
        id: 'd7',
        titulo: 'Bolo de Cenoura com Brigadeiro',
        categoria: 'doces',
        subcategoria: 'Bolos',
        fotoUrl: 'https://images.unsplash.com/photo-1621466560271-4b055938885b?q=80&w=300', // Foto fofa real
        ingredientes: ['Cenoura', 'Ovos', 'Farinha'],
        modoPreparo: 'Misture e asse.'
    },
    {
        id: 'd8',
        titulo: 'Pudim de Leite Condensado',
        categoria: 'doces',
        subcategoria: 'Sobremesas de Geladeira',
        fotoUrl: null, // <--- ESTE NÃO TEM FOTO NO BANCO!
        ingredientes: ['Leite', 'Leite Condensado', 'Caramelo','Leite', 'Leite Condensado', 'Caramelo'],
        modoPreparo: 'Cozinhe em banho maria.'
    },
    
    // --- SALGADOS ---
    {
        id: 's1',
        titulo: 'Torta de Frango Cremosa',
        categoria: 'salgados',
        subcategoria: 'Tortas Salgadas',
        fotoUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=300', // Foto real
        ingredientes: ['Frango', 'Creme de Leite', 'Massa'],
        modoPreparo: 'Asse até dourar. era uma vez um lugarzinho no meio do mato onde morava uma velhinha chamada Dona Edite. Ela era conhecida por suas receitas deliciosas, que ela preparava com muito amor e carinho. Um dia, Dona Edite decidiu compartilhar suas receitas com o mundo, criando um caderno de receitas especial. Ela começou a escrever suas receitas favoritas, desde bolos e tortas até pratos salgados e sobremesas. Cada receita era acompanhada de uma história única, que contava como ela aprendeu a fazer aquele prato ou como ele se tornou especial para ela. O caderno de receitas de Dona Edite se tornou um tesouro para todos que o tinham, e suas receitas continuaram a ser passadas de geração em geração, mantendo viva a memória e o sabor da cozinha da Dona Edite.'
    },
    {
        id: 's2',
        titulo: 'Pão de Queijo Mineiro',
        categoria: 'salgados',
        subcategoria: 'Lanches',
        fotoUrl: 'https://images.unsplash.com/photo-1627311124401-44755d4710bd?q=80&w=300', // Foto real
        ingredientes: ['Polvilho', 'Queijo', 'Ovos'],
        modoPreparo: 'Forme bolinhas e asse.'
    } 
];