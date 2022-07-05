import { Component, OnInit } from "@angular/core";

import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Title } from "@angular/platform-browser";
import { ActivatedRoute, Router } from "@angular/router";
import { Processo } from "src/app/shared/models/processo";
import { CoursesService } from "src/app/shared/services/courses.service";
import {
  estadosDoBrasil,
  niveisDeEscolaridade,
  areasDeFormacao,
  meiosDeContato,
  racasOuCores,
  generos,
} from "src/app/shared/options";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { Inscricao } from "src/app/shared/models/inscricao";

@Component({
  selector: "app-inscricao",
  templateUrl: "./inscricao.component.html",
  styleUrls: ["./inscricao.component.css"],
})
export class InscricaoComponent implements OnInit {
  curso: string = this.coursesService.formatarNomeDoCurso(
    this.route.snapshot.url.join("")
  );
  detalhesDoCurso: Processo = this.coursesService.detalhesDoCurso(this.curso);

  title = `Inscrição para ${this.curso} - SoulCode Academy`;
  formInscricao: UntypedFormGroup;
  estadosDoBrasil: string[] = estadosDoBrasil;
  niveisDeEscolaridade: string[] = niveisDeEscolaridade;
  areasDeFormacao: string[] = areasDeFormacao;
  meiosDeContato: string[] = meiosDeContato;
  racasOuCores: any[] = racasOuCores;
  generos: string[] = generos;
  inscricao: Inscricao;

  constructor(
    private titleService: Title,
    private coursesService: CoursesService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(this.title);

    this.formInscricao = this.fb.group({
      areaDeFormacao: [""],
      cidade: [
        "",
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      comoNosConheceu: ["", [Validators.required]],
      cpf: ["", [Validators.required, this.validaCpf]],
      curso: [this.detalhesDoCurso.idTeachable],
      cursoDeFormacao: [""],
      dataInscricao: new Date(),
      email: ["", [Validators.required, Validators.email]],
      escolaridade: ["", [Validators.required]],
      genero: ["", [Validators.required]],
      dataNascimento: ["", [Validators.required, this.maiorQue18Anos]],
      nomeCompleto: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ],
      ],
      racaOuCor: ["", [Validators.required]],
      telefone: ["", [Validators.required]],
      termos: [false, [Validators.requiredTrue]],
      uf: ["", [Validators.required]],
    });

    this.setEscolaridadeValidators();
  }

  onSubmit() {
    const {
      areaDeFormacao,
      cidade,
      comoNosConheceu,
      cpf,
      curso,
      cursoDeFormacao,
      dataInscricao,
      dataNascimento,
      escolaridade,
      email,
      genero,
      nomeCompleto,
      racaOuCor,
      telefone,
      uf,
    } = this.formInscricao.value;

    this.inscricao = {
      areaDeFormacao: areaDeFormacao,
      cidade: cidade.toUpperCase(),
      comoNosConheceu: comoNosConheceu,
      cpf: cpf,
      curso: curso,
      cursoDeFormacao: cursoDeFormacao,
      dataInscricao: dataInscricao,
      dataNascimento: dataNascimento.split("/").reverse().join("-"),
      email: email.toLowerCase(),
      escolaridade: escolaridade,
      genero: genero,
      nomeCompleto: nomeCompleto.toUpperCase(),
      racaOuCor: racaOuCor,
      telefone: telefone,
      uf: uf,
    };

    if (this.formInscricao.valid) {
      this.db
        .collection("Inscricao")
        .add(this.inscricao)
        .then(() => {
          this.router.navigate(["/confirmacao-inscricao"]);
        })
        .catch((error) => {
          console.error(error);
          alert("Erro ao inscrever-se no curso. Tente novamente mais tarde.");
        });
    }
  }

  getErrorMessage(control: ValidationErrors): string {
    if (control.required) {
      return "O campo é obrigatório";
    }
    if (control.minlength) {
      return `O campo deve ter no mínimo ${control.minlength.requiredLength} caracteres`;
    }
    if (control.maxlength) {
      return `O campo deve ter no máximo ${control.maxlength.requiredLength} caracteres`;
    }
    if (control.email) {
      return "O campo deve ser um e-mail válido";
    }
    if (control.requiredTrue) {
      return "Você deve aceitar os termos e condições";
    }
    if (control.cpfInvalido) {
      return "CPF inválido";
    }
    if (control.dataInvalida) {
      return "Data inválida";
    }
    if (control.idade) {
      return control.idade.min
        ? `Você deve ter ${control.idade.min} anos`
        : `Data inválida`;
    }
    if (control.mask) {
      return "Formato inválido";
    }
    return "";
  }

  validaCpf(controle: AbstractControl) {
    const cpf = controle.value;

    let soma: number = 0;
    let resto: number;
    let valido: boolean;

    const regex = new RegExp("[0-9]{11}");

    if (
      cpf == "00000000000" ||
      cpf == "11111111111" ||
      cpf == "22222222222" ||
      cpf == "33333333333" ||
      cpf == "44444444444" ||
      cpf == "55555555555" ||
      cpf == "66666666666" ||
      cpf == "77777777777" ||
      cpf == "88888888888" ||
      cpf == "99999999999" ||
      !regex.test(cpf)
    ) {
      valido = false;
    } else {
      let numero: number = 0;
      let caracter: string = "";
      let numeros: string = "0123456789";
      let j: number = 10;
      let somatorio: number = 0;
      let resto: number = 0;
      let digito1: number = 0;
      let digito2: number = 0;
      let cpfAux: string = "";
      cpfAux = cpf.substring(0, 9);
      for (let i: number = 0; i < 9; i++) {
        caracter = cpfAux.charAt(i);
        if (numeros.search(caracter) == -1) {
          return false;
        }
        numero = Number(caracter);
        somatorio = somatorio + numero * j;
        j--;
      }
      resto = somatorio % 11;
      digito1 = 11 - resto;
      if (digito1 > 9) {
        digito1 = 0;
      }
      j = 11;
      somatorio = 0;
      cpfAux = cpfAux + digito1;
      for (let i: number = 0; i < 10; i++) {
        caracter = cpfAux.charAt(i);
        numero = Number(caracter);
        somatorio = somatorio + numero * j;
        j--;
      }
      resto = somatorio % 11;
      digito2 = 11 - resto;
      if (digito2 > 9) {
        digito2 = 0;
      }
      cpfAux = cpfAux + digito2;
      if (cpf != cpfAux) {
        valido = false;
      } else {
        valido = true;
      }
    }

    if (valido) return null;

    return { cpfInvalido: true };
  }

  maiorQue18Anos(controle: AbstractControl) {
    const nascimento = controle.value;

    if (nascimento.length !== 10) return { dataInvalida: true };

    const dia = nascimento.split("/")[0];
    const mes = nascimento.split("/")[1];
    const ano = nascimento.split("/")[2];

    const hoje = new Date();
    const dataNascimento = new Date(ano, mes - 1, dia, 0, 0, 0);
    const dezoitoAnos = 1000 * 60 * 60 * 24 * 365 * 18;
    const centoEVinteAnos = 1000 * 60 * 60 * 24 * 365 * 120;
    const idade = hoje.getTime() - dataNascimento.getTime();

    if (idade >= dezoitoAnos && idade <= centoEVinteAnos) return null;
    if (idade < dezoitoAnos) return { idade: { min: 18 } };
    if (idade > centoEVinteAnos) return { idade: { max: 120 } };

    return { dataInvalida: true };
  }

  setEscolaridadeValidators() {
    const escolaridade = this.formInscricao.get("escolaridade");
    const areaDeFormacao = this.formInscricao.get("areaDeFormacao");
    const cursoDeFormacao = this.formInscricao.get("cursoDeFormacao");
    areaDeFormacao.disable();
    cursoDeFormacao.disable();
    escolaridade.valueChanges.subscribe((value) => {
      switch (value) {
        case "Ensino Superior Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        case "Ensino Superior Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        case "Pós-graduação Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        case "Pós-graduação Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        case "Mestrado Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        case "Mestrado Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          break;
        default:
          areaDeFormacao.setValidators([]);
          cursoDeFormacao.setValidators([]);
          areaDeFormacao.disable();
          cursoDeFormacao.disable();
          break;
      }
    });
  }

  phoneMask(value: string) {
    return value.length === 11 ? "(00) 00000 0000" : "(00) 0000 00009";
  }
}
