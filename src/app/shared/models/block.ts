import { Converter } from "./converter";

export interface Block {
    id: string;
    cpf: string;
    email: string;
    nomeCompleto: string;
    status: string;
    motivo: string;
    comentario: string;
    contador: number;
    bloqueado: boolean
}

export const BlockConverter: Converter<Block> = {
    toFirestore: (data) => data,
    fromFirestore: (snapshot, options) => {
        const obj = snapshot.data(options)!;
        return {
            ...obj,
        } as Block;
    },
}
