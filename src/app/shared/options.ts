import { Processo } from "./models/processo";

/**
 * @detalhesDosCursos
 * No momento, o projeto não busca as informações de processos seletivos abertos do servidor. 
 * Futuramente o administrador irá cadastrar os processos.
 * Estamos provisoriamente utilizando essa constante para obter as informações.
 */
export const detalhesDosCursos: Processo[] = [
    {
        turma: 'BC31',
        idTeachable: 1785292, // id do teachable
        tipo: 'Martech Academy',
        inicioBootcamp: new Date('2022-08-15'),
        inicioInscricoes: new Date('2022-07-15'),
        terminoInscricoes: new Date('2022-08-08'),
        status: 'Aberto',
        
    },
    {
        turma: 'BC31',
        idTeachable: 1785292,
        tipo: 'Analista Midia Digital Performance', // tipo da url diferente em 'enviar video'
        inicioBootcamp: new Date('2022-08-15'),
        inicioInscricoes: new Date('2022-07-15'),
        terminoInscricoes: new Date('2022-08-08'),
        status: 'Aberto',
    },
    {
        turma: 'BC26',
        idTeachable: 1788757,
        tipo: 'Desenvolvedor Salesforce',
        inicioBootcamp: new Date('2022-07-04'),
        inicioInscricoes: new Date('2022-07-15'),
        terminoInscricoes: new Date('2022-06-22'),
        status: 'Aberto',
    },
    {
        turma: 'BC23',
        idTeachable: 1774608,
        tipo: 'Engenharia De Dados',
        inicioBootcamp: new Date('2022-06-23'),
        inicioInscricoes: new Date('2022-07-15'),
        terminoInscricoes: new Date('2022-06-13'),
        status: 'Aberto',
    },
    {
        turma: 'BC27',
        idTeachable: 1788844,
        tipo: 'Java Full Stack',
        inicioBootcamp: new Date('2022-07-18'),
        inicioInscricoes: new Date('2022-07-15'),
        terminoInscricoes: new Date('2022-07-08'),
        status: 'Aberto',
        
    }
];

export const estadosDoBrasil = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export const niveisDeEscolaridade = [
    'Ensino Médio Incompleto',
    'Ensino Médio Completo',
    'Ensino Superior Incompleto',
    'Ensino Superior Completo',
    'Pós-graduação Incompleto',
    'Pós-graduação Completo',
    'Mestrado Incompleto',
    'Mestrado Completo'
];

export const areasDeFormacao = [
    'Ciências Exatas',
    'Ciências Humanas e Sociais',
    'Ciências Biológicas e de Saúde',
    'Não sei informar'
];

export const meiosDeContato = [
    'Facebook',
    'Instagram',
    'LinkedIn',
    'Twitter',
    'YouTube',
    'E-mail',
    'Imprensa/Notícias',
    'Pesquisa Online (Ex.: Google)',
    'Indicação',
    'Outro'
];

export const racasOuCores = [
    {
        value: 'Branco',
        viewValue: 'Branco(a)'
    },
    {
        value: 'Preto',
        viewValue: 'Preto(a)'
    },
    {
        value: 'Pardo',
        viewValue: 'Pardo(a)'
    },
    {
        value: 'Amarelo',
        viewValue: 'Amarelo(a)'
    },
    {
        value: 'Indígena',
        viewValue: 'Indígena'
    },
    {
        value: 'Prefiro não informar',
        viewValue: 'Prefiro não informar'
    }
];

export const generos = [
    'Feminino',
    'Masculino',
    'Personalizado',
    'Prefiro não informar'
];
