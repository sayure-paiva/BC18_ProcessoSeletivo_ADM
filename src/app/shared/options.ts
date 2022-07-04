/**
 * @detalhesDosCursos
 * No momento, o projeto não busca as informações de processos seletivos abertos do servidor. 
 * Futuramente o administrador irá cadastrar os processos.
 * Estamos provisoriamente utilizando essa constante para obter as informações.
 */
export const detalhesDosCursos = [
    {
        id: 1785292, // id do teachable
        nome: 'Martech Academy',
        turma: 'BC31',
        inicio: '2022-08-15',
        prazoInscricao: '2022-08-08',
        status: 'Aberto',
        
    },
    {
        id: 1785292,
        nome: 'Analista Midia Digital Performance', // nome da url diferente em 'enviar video'
        turma: 'BC31',
        inicio: '2022-08-15',
        prazoInscricao: '2022-08-08',
        status: 'Aberto',
    },
    {
        id: 1788757,
        nome: 'Desenvolvedor Salesforce',
        turma: 'BC26',
        inicio: '2022-07-04',
        prazoInscricao: '2022-06-22',
        status: 'Aberto',
    },
    {
        id: 1774608,
        nome: 'Engenharia De Dados',
        turma: 'BC23',
        inicio: '2022-06-23',
        prazoInscricao: '2022-06-13',
        status: 'Aberto',
    },
    {
        id: 1788844,
        nome: 'Java Full Stack',
        turma: 'BC27',
        inicio: '2022-07-18',
        prazoInscricao: '2022-07-08',
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
