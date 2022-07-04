export interface Curso {
    turma: string;
    id: number;
    nome: string;
    inicio: string;
    prazoInscricao: string;
    perguntasParaEnvioDeVideo?: string[];
}
