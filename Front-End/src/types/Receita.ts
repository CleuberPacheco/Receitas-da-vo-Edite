export interface Receita {
    id?: number;
    nome?: string;
    categoria?: string;
    subcategoria?: string; // <-- Adicione esta linha
    modoPreparo?: string;
    ingredientes?: string | string[];
    fotoUrl?: string;
}