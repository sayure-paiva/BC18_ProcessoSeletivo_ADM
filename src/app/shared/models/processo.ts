export interface Processo {
    id?: string;
    turma: string;
    idTeachable: number;
    tipo: string;
    inicioBootcamp: Date;
    inicioInscricoes: Date;
    terminoInscricoes: Date;
    status: string;
}