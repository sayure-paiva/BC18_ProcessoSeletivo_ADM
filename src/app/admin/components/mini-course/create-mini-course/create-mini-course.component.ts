import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { MiniCurso, Topico } from 'src/app/shared/models/mini-curso';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';
import { DeleteTopicDialogComponent } from '../delete-topic-dialog/delete-topic-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { PreviewTopicDialogComponent } from '../preview-topic-dialog/preview-topic-dialog.component';

@Component({
  selector: 'app-create-mini-course',
  templateUrl: './create-mini-course.component.html',
  styleUrls: ['./create-mini-course.component.css'],
})
export class CreateMiniCourseComponent implements OnInit {
  public Editor = ClassicEditor;
  config = {
    toolbar: {
      items: ['heading', '|', 'bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],

      shouldNotGroupWhenFull: true
    }
  };

  textoEditor: string = '';
  miniCurso: MiniCurso = {} as MiniCurso;
  imagemAnexada?: File = null;
  creatingTopico?: boolean;
  index?: number;
  input?: Topico = {
    subtitulo: '',
    texto: '',
    imagemURL: ''
  }


  constructor(
    private fb: FormBuilder,
    private toast: HotToastService,
    private modalService: NgbModal,
    private miniCourseService: MiniCourseService,
    private router: Router
  ) { }


  createMiniCursoForm = this.fb.group({
    titulo: ['', [Validators.required]],
    topicos: this.fb.array([])
  });

  topicoForm = this.fb.group({
    subtitulo: ['', [Validators.required]],
    texto: ['', [Validators.required]],
    imagemURL: []
  });

  //#region Getters
  //createMiniCursoForm
  get titulo() {
    return this.createMiniCursoForm.get('titulo');
  }

  topicos(): FormArray {
    return this.createMiniCursoForm.get("topicos") as FormArray
  }

  //topicoForm
  get subtitulo() {
    return this.topicoForm.get('subtitulo');
  }
  get texto() {
    return this.topicoForm.get('texto');
  }
  //#endregion

  receiveImage(event: any) {
    this.imagemAnexada = event.target.files[0];

    const imgHTML = document.getElementById('imgChange');

    let reader = new FileReader();
    reader.onload = (e) => {
      imgHTML.setAttribute('src', e.target.result as string);
    }
    reader.readAsDataURL(event.target.files[0])
  }

  novoTopico(): FormGroup {
    return this.fb.group({
      subtitulo: '',
      texto: '',
      imagemURL: ''
    })
  }

  addTopico(content) {
    this.topicoForm.reset();
    this.creatingTopico = true;
    this.index = this.topicos().length;
    this.input = { subtitulo: '', texto: '', imagemURL: '' }
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  removerTopico(index: number) {
    const ref = this.modalService.open(DeleteTopicDialogComponent, { size: 'sm', centered: true });
    ref.componentInstance.indexTopic = index;
    {
      ref.closed.subscribe({
        next: (result) => {
          if (result) {
            this.topicos().removeAt(index);
          }
        },
      });
    }
  }

  onClickPreview(topico: Topico, index: number){
    const modalRef = this.modalService.open(PreviewTopicDialogComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.topico = topico;
    modalRef.componentInstance.index = index;
  }

  onClickEdit(content: any, topico: Topico, index: number) {
    this.creatingTopico = false;
    this.input = topico;
    this.modalService.open(content, { size: 'lg', centered: true });
    this.index = index;
  }

  onDefinir() {
    if (this.creatingTopico) {
      this.topicos().push(this.novoTopico());
    }

    if (this.imagemAnexada == null) {
      this.input.imagemURL = '';
    } else {
      this.input.imagemURL = this.imagemAnexada;
    }

    const molde: Topico[] = this.topicos().value;
    molde[this.index] = { subtitulo: this.input.subtitulo, texto: this.input.texto, imagemURL: this.input.imagemURL }
    this.topicos().setValue(molde);
    this.topicoForm.reset();
    this.imagemAnexada = null;
    this.modalService.dismissAll();
  }

  ellipsis(mensagem: string): string {
    if (mensagem.length > 30) {
      return mensagem.slice(0, 30) + '...';
    }
    return mensagem;
  }

  //Recebe o texto como html e transforma em texto normal
  convertHtml(mensagemHtml: string) {
    var texto = mensagemHtml.replace(/<[^>]+>/g, '');
    return this.ellipsis(texto);
  }

  textImage(index: number) {
    const molde: Topico[] = this.topicos().value;
    if (molde[index].imagemURL != '') {
      return 'Imagem anexada'
    } else {
      return 'Sem imagem'
    }
  }

  onSubmit() {
    this.miniCurso = {
      titulo: this.titulo.value,
      topicos: this.topicos().value
    }

    from(this.miniCourseService.createMiniCurso(this.miniCurso))
      .pipe(
        this.toast.observe({
          loading: 'Adicionando novo Mini-Curso...',
          error: 'Ocorreu um erro!',
          success: 'Mini-curso adicionado com sucesso',
        })
      )
      .subscribe({
        complete: () => this.router.navigate(['/admin/mini-cursos'])
      })

  }

  ngOnInit() {
    
  }


}
