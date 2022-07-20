import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  AbstractControl,
  UntypedFormBuilder,
  UntypedFormControl,
  UntypedFormGroup,
  ValidationErrors,
  Validators,
} from "@angular/forms";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Inscricao } from 'src/app/shared/models/inscricao';
import {
  areasDeFormacao,
  estadosDoBrasil,
  generos, meiosDeContato,
  niveisDeEscolaridade,
  racasOuCores } from 'src/app/shared/options';

@Component({
  selector: 'app-martech-academy',
  templateUrl: './martech-academy.component.html',
  styleUrls: ['./martech-academy.component.css']
})
export class MartechAcademyComponent implements OnInit {
  @ViewChild('inscricaoSucesso', {static: true}) inscricaoSucesso : TemplateRef<any>;
  @ViewChild('inscricaoErro', {static: true}) inscricaoErro : TemplateRef<any>;
  title = 'Martech Academy';
  formMartech: UntypedFormGroup


  estadosDoBrasil: string[] = estadosDoBrasil;
  niveisDeEscolaridade: string[] = niveisDeEscolaridade;
  areasDeFormacao: string[] = areasDeFormacao;
  meiosDeContato: string[] = meiosDeContato;
  racasOuCores: any[] = racasOuCores;
  generos: string[] = generos;
  inscricao: Inscricao;
  martechId: number = 1785292;
  enableInput: boolean = false
  constructor(
    private titleService: Title,
    private fb: UntypedFormBuilder,
    private router: Router,
    private db: AngularFirestore,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
    this.formMartech = this.fb.group({
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
      curso: [this.martechId],
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
      statusFinal,
      comentario,
      pitchURL,
      uid,
      processoUid,
      etnia,
      souPCD
    } = this.formMartech.value;

    this.inscricao = {
      areaDeFormacao: areaDeFormacao || "",
      cidade: cidade.toUpperCase(),
      comoNosConheceu: comoNosConheceu,
      cpf: cpf,
      curso: curso,
      cursoDeFormacao: cursoDeFormacao || "",
      dataInscricao: dataInscricao,
      dataNascimento: dataNascimento.split("/").reverse().join("-"),
      email: email.toLowerCase(),
      escolaridade: escolaridade,
      genero: genero,
      nomeCompleto: nomeCompleto.toUpperCase(),
      racaOuCor: racaOuCor,
      telefone: telefone,
      uf: uf,
      comentario: comentario,
      statusFinal:statusFinal,
      uid: uid,
      processoUid: processoUid,
      pitchURL: pitchURL,
      etnia: etnia,
      souPCD: souPCD
    };
    if (this.formMartech.valid) {
      this.db
        .collection("Inscricao")
        .add(this.inscricao)
        .then((res) => {
          console.log(res);
          this.modalService.open(this.inscricaoSucesso);
          this.formMartech.reset();
        })
        .catch((error) => {
          console.error(error);
          this.modalService.open(this.inscricaoErro);
        });
    }
  }

  getErrorMessage(control: ValidationErrors): string {
    if (control.required) {
      return "Campo obrigatório";
    }
    if (control.minlength) {
      return `Campo deve ter no mínimo ${control.minlength.requiredLength} caracteres`;
    }
    if (control.maxlength) {
      return `Campo deve ter no máximo ${control.maxlength.requiredLength} caracteres`;
    }
    if (control.email) {
      return "E-mail inválido";
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
        : control.idade.max
        ? `Idade inválida`
        : "Data inválida";
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

    if (!nascimento || nascimento.length !== 10) return { dataInvalida: true };

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
    const escolaridade = this.formMartech.get("escolaridade");
    const areaDeFormacao = this.formMartech.get("areaDeFormacao");
    const cursoDeFormacao = this.formMartech.get("cursoDeFormacao");

    areaDeFormacao.disable();
    cursoDeFormacao.disable();
    escolaridade.valueChanges.subscribe((value) => {
      switch (value) {
        case "Ensino Superior Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        case "Ensino Superior Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        case "Pós-graduação Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        case "Pós-graduação Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        case "Mestrado Incompleto":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        case "Mestrado Completo":
          areaDeFormacao.setValidators([Validators.required]);
          cursoDeFormacao.setValidators([Validators.required]);
          areaDeFormacao.enable();
          cursoDeFormacao.enable();
          this.enableInput = true;
          break;
        default:
          areaDeFormacao.setValidators([]);
          cursoDeFormacao.setValidators([]);
          areaDeFormacao.disable();
          cursoDeFormacao.disable();
          this.enableInput = false;
          break;
      }
    });
  }

  phoneMask(value: string) {
    if (!value) return value;
    return value.length === 11 ? "(00) 00000 0000" : "(00) 0000 00009";
  }

}
