export interface Receita {
    id: number;
    nome: string;
    categoria: string;
    subcategoria?: string;
    modoPreparo: string;
    ingredientes: string | string[];
    urlFoto?: string; // Alterado de fotoUrl para urlFoto
}