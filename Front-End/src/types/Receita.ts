export interface Receita {
    id?: number;
    nome: string;
    categoria: string;
    subcategoria?: string; // <-- Adicione esta linha
    tempoPreparoMinutos: number;
    modoPreparo: string;
    ingredientes?: string | string[];
    urlFoto?: string;
}