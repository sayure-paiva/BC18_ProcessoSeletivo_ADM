export interface MiniCurso {
    id?: string;
    titulo: string;
    topicos: Topico[]
}

export interface Topico {
    subtitulo: string;
    texto: string;
    imagemURL?: string | File;
}