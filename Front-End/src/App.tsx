// src/App.tsx
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// --- IMPORTAÇÃO DE COMPONENTES ---
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import RecipeCard from './components/recipecard/RecipeCard';
import AddRecipeFab from './components/addrecipefab/AddRecipeFab';
import RecipeView from './components/recipeview/RecipeView';
import AddRecipeModal from './components/addrecipemodal/AddRecipeModal';
import RecipeCarousel from './components/recipecarousel/RecipeCarousel';

// --- IMPORTAÇÃO DE TIPOS ---
import { type Receita } from './types/Receita';

function App() {
  const [receitas, setReceitas] = useState<Receita[]>([]); 
  const [receitaEmEdicao, setReceitaEmEdicao] = useState<Receita | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // ATUALIZADO: Tenta ler o tema salvo no navegador; se não tiver, começa no 'dark'
  const [tema, setTema] = useState<'dark' | 'light'>(() => {
    const temaSalvo = localStorage.getItem('tema_vo_edite');
    return (temaSalvo === 'light' || temaSalvo === 'dark') ? temaSalvo : 'dark';
  });
  
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [termoPesquisa, setTermoPesquisa] = useState('');

  // Carrega as receitas do Back-end ao iniciar
  useEffect(() => {
    fetch('http://localhost:8080/receitas')
      .then((res) => res.json())
      .then((data) => setReceitas(data))
      .catch((err) => console.error("Erro ao conectar com Back-end:", err));
  }, []);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ATUALIZADO: Além de trocar no React, salva a escolha no navegador
  const toggleTema = () => {
    const novoTema = tema === 'dark' ? 'light' : 'dark';
    setTema(novoTema);
    localStorage.setItem('tema_vo_edite', novoTema);
  };

  const abrirModalNovaReceita = () => {
      setReceitaEmEdicao(null);
      setIsModalOpen(true);
  };

  const abrirModalParaEditar = (receita: Receita) => {
      setReceitaEmEdicao(receita);
      setIsModalOpen(true);
  };

  const renderizarLista = (categoriaDesejada: string) => {
    const filtradas = receitas.filter(r => {
        const matchCategoria = r.categoria?.toLowerCase() === categoriaDesejada.toLowerCase();
        
        const matchPesquisa = termoPesquisa === '' || 
                              r.nome.toLowerCase().includes(termoPesquisa.toLowerCase()) || 
                              (r.subcategoria && r.subcategoria.toLowerCase().includes(termoPesquisa.toLowerCase()));
        
        return matchCategoria && matchPesquisa;
    });
    
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        {filtradas.length > 0 ? (
          filtradas.map((receita: Receita) => (
            <RecipeCard key={receita.id} data={receita} />
          ))
        ) : (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '20px' }}>
            Nenhuma receita encontrada para "{termoPesquisa}".
          </p>
        )}
      </div>
    );
  };

  const ultimas10Receitas = [...receitas].reverse().slice(0, 10);

  return (
    <div className={`app-container ${tema}`}>
      
      <Header titulo="Receitas da Vó Edite" />
      
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', marginTop: '90px' }}>
        
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '20px', paddingTop: '32px', paddingBottom: '80px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ marginTop: '20px' }}>
                <h3 style={{ textAlign: 'center', textTransform: 'uppercase', fontSize: '1.2rem' }}>
                  Novidades da Vó
                </h3>
                <RecipeCarousel receitas={ultimas10Receitas} />
              </div>
              <AddRecipeFab onClick={abrirModalNovaReceita} />
            </div>
          } />

          <Route path="/doces" element={
            <div style={{ padding: '20px', paddingTop: '32px', paddingBottom: '80px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <SearchBar 
                value={termoPesquisa} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTermoPesquisa(e.target.value)} 
              />
              <h3 style={{ color: tema === 'dark' ? '#ffffff' : '#6b21a8', margin: isMobile ? '1rem 0 1rem 0.5rem' : '1rem 0 1rem 2.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Receitas Doces
              </h3>
              {renderizarLista('doces')}
              <AddRecipeFab onClick={abrirModalNovaReceita} />
            </div>
          } />

          <Route path="/salgados" element={
            <div style={{ padding: '20px', paddingTop: '32px', paddingBottom: '80px', flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <SearchBar 
                value={termoPesquisa} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTermoPesquisa(e.target.value)} 
              />
              <h3 style={{ color: tema === 'dark' ? '#ffffff' : '#6b21a8', margin: isMobile ? '1rem 0 1rem 0.5rem' : '1rem 0 1rem 2.5rem', textTransform: 'uppercase', fontWeight: 'bold' }}>
                Receitas Salgadas
              </h3>
              {renderizarLista('salgados')}
              <AddRecipeFab onClick={abrirModalNovaReceita} />
            </div>
          } />

          <Route path="/receita/:id" element={<RecipeView onEdit={abrirModalParaEditar} />} />
        </Routes>

        {isModalOpen && (
          <AddRecipeModal 
            onClose={() => setIsModalOpen(false)} 
            receitaParaEditar={receitaEmEdicao} 
          />
        )}
      </main>

      <Footer tema={tema} onToggleTema={toggleTema} />
    </div>
  );
}

export default App;