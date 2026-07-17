// src/components/AddRecipeModal/AddRecipeModal.tsx
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';
import styles from './AddRecipeModal.module.css';
import { type Receita } from '../../types/Receita';

interface AddRecipeModalProps {
    onClose: () => void;
    receitaParaEditar?: Receita | null;
}

const AddRecipeModal = ({ onClose, receitaParaEditar }: AddRecipeModalProps) => {
    const [titulo, setTitulo] = useState('');
    const [categoria, setCategoria] = useState('');
    const [subcategoria, setSubcategoria] = useState('');
    const [ingredientes, setIngredientes] = useState('');
    const [modoPreparo, setModoPreparo] = useState('');
    
    const [fotoPreview, setFotoPreview] = useState<string | null>(null);
    // Guarda o arquivo real para enviar ao Java
    const [fotoFile, setFotoFile] = useState<File | Blob | null>(null); 
    const [isCompressing, setIsCompressing] = useState(false);

    useEffect(() => {
        if (receitaParaEditar) {
            setTitulo(receitaParaEditar.nome);
            setCategoria(receitaParaEditar.categoria || '');
            setSubcategoria(receitaParaEditar.subcategoria || ''); // Puxa do banco se existir
            setIngredientes(Array.isArray(receitaParaEditar.ingredientes) ? receitaParaEditar.ingredientes.join('\n') : '');
            setModoPreparo(receitaParaEditar.modoPreparo);
            setFotoPreview(receitaParaEditar.urlFoto || null);
            setFotoFile(null); // Reseta o arquivo, pois já existe uma foto no banco
        }
    }, [receitaParaEditar]);

    // Função para formatar a string no padrão Capitalize (Ex: "Bolo de Cenoura")
    const formatarCapitalize = (texto: string) => {
        if (!texto) return '';
        return texto
            .toLowerCase()
            .split(' ')
            .map(palavra => palavra.charAt(0).toUpperCase() + palavra.slice(1))
            .join(' ');
    };

    const handleFotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setIsCompressing(true);
        try {
            const options = { maxSizeMB: 0.3, maxWidthOrHeight: 1200, useWebWorker: true };
            const compressedFile = await imageCompression(file, options);
            
            const imageUrl = URL.createObjectURL(compressedFile);
            setFotoPreview(imageUrl);
            setFotoFile(compressedFile); // Salva o arquivo comprimido no estado
        } catch (error) {
            console.error("Erro ao processar imagem", error);
        } finally {
            setIsCompressing(false);
        }
    };

    const handleSalvar = async (e: React.FormEvent) => {
        e.preventDefault();
        
        // Usando FormData no lugar de JSON
        const formData = new FormData();
        formData.append('nome', titulo);
        formData.append('categoria', categoria);
        
        // Formata a subcategoria antes de mandar para o banco de dados
        formData.append('subcategoria', formatarCapitalize(subcategoria)); 
        
        formData.append('ingredientes', ingredientes);
        formData.append('modoPreparo', modoPreparo);
        formData.append('tempoPreparoMinutos', '30'); // Mantendo o seu valor padrão
        
        // Só anexa o arquivo se o usuário selecionou uma nova foto
        if (fotoFile) {
            formData.append('file', fotoFile);
        }

        try {
            const url = receitaParaEditar ? `http://localhost:8080/receitas/${receitaParaEditar.id}` : 'http://localhost:8080/receitas';
            const method = receitaParaEditar ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method: method,
                // O navegador adiciona o Content-Type e o boundary automaticamente
                body: formData 
            });

            if (response.ok) {
                alert("Receita salva com sucesso!");
                window.location.reload(); 
                onClose();
            } else {
                alert("Erro ao salvar no servidor.");
            }
        } catch (error) {
            console.error("Erro:", error);
        }
    };

    const isEdicao = !!receitaParaEditar;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h2>{isEdicao ? 'Editar Receita' : 'Nova Receita da Vó'}</h2>
                    <button onClick={onClose} className={styles.closeButton}>X</button>
                </div>

                <form onSubmit={handleSalvar} className={styles.form}>
                    <input type="text" placeholder="Nome da Receita" className={styles.input} required value={titulo} onChange={(e) => setTitulo(e.target.value)} />
                    
                    <select className={styles.input} required value={categoria} onChange={(e) => setCategoria(e.target.value)}>
                        <option value="" disabled>Selecione a Categoria</option>
                        <option value="doces">Doces</option>
                        <option value="salgados">Salgados</option>
                    </select>

                    {/* Novo campo de Subcategoria */}
                    <input 
                        type="text" 
                        placeholder="Subcategoria (Ex: Bolo, Torta, Sopa)" 
                        className={styles.input} 
                        required 
                        value={subcategoria} 
                        onChange={(e) => setSubcategoria(e.target.value)}
                        // Dá a sensação imediata para o usuário de que as iniciais ficarão maiúsculas
                        style={{ textTransform: 'capitalize' }}
                    />

                    <textarea placeholder="Ingredientes (um por linha)" className={styles.textarea} required value={ingredientes} onChange={(e) => setIngredientes(e.target.value)} />
                    <textarea placeholder="Modo de Preparo" className={styles.textarea} required value={modoPreparo} onChange={(e) => setModoPreparo(e.target.value)} />

                    <div className={styles.fotoUploadContainer}>
                        {isCompressing ? <div className={styles.fotoBtn}>⏳ Processando...</div> : fotoPreview ? (
                            <div className={styles.previewWrapper}>
                                <img src={fotoPreview} alt="Preview" className={styles.fotoPreview} />
                                <button type="button" onClick={() => { setFotoPreview(null); setFotoFile(null); }} className={styles.removeFotoBtn}>Remover</button>
                            </div>
                        ) : (
                            <>
                                <label htmlFor="fotoReceita" className={styles.fotoBtn}>📷 Add Foto</label>
                                <input type="file" id="fotoReceita" accept="image/*" onChange={handleFotoChange} className={styles.fileInput} />
                            </>
                        )}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        {isEdicao ? 'Salvar Alterações' : 'Guardar no Caderno'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddRecipeModal;