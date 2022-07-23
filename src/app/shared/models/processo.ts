import { Converter } from './converter';
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

export const ProcessoConverter: Converter<Processo> = {
  toFirestore: (data) => data,
  fromFirestore: (snapshot, options) => {
      const obj = snapshot.data(options)!;

      return {
          ...obj,
      } as Processo;
  },
}
