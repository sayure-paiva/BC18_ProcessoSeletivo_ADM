import { Converter } from "./converter";

export interface Inscricao {
    areaDeFormacao: string;
    cidade: string;
    comoNosConheceu: string;
    cpf: string;
    curso: number;
    cursoDeFormacao: string;
    dataInscricao: Date;
    dataNascimento: string;
    email: string;
    escolaridade: string;
    genero: string;
    nomeCompleto: string;
    racaOuCor: string;
    telefone: string;
    uf: string;
    senha?: string;
    souPCD?: boolean;
    uid?: string;
    uidUsuario?: string;
    processoUid?: string;
    pitchURL?: string;
    cpfBlock?: boolean;
    comentario?: string;
    etnia?: string;
    results?: Array<Answers>;
    statusJornada?: string;
    statusFinal?: string;
    qtTentativas?: number;
}

export interface Answers {
    questionId: string;
    answerQuestion: Array<string>;
    answerCandidate: Array<string>;
    isApproved: boolean;
}

export const InscricaoConverter: Converter<Inscricao> = {
  toFirestore: (data) => data,
  fromFirestore: (snapshot, options) => {
      const obj = snapshot.data(options)!;

      return {
          ...obj,
      } as Inscricao;
  },
}
