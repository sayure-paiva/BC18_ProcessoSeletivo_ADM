import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateHotToastRef, HotToastService } from '@ngneat/hot-toast';
import { from } from 'rxjs';
import { MiniCurso, Topico } from 'src/app/shared/models/mini-curso';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';
import { DeleteTopicDialogComponent } from '../delete-topic-dialog/delete-topic-dialog.component';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { TipoBootcampService } from 'src/app/shared/services/tipo-bootcamp.service';
import { TipoBootcamp } from 'src/app/shared/models/tipo-bootcamp';
import { PreviewTopicDialogComponent } from '../preview-topic-dialog/preview-topic-dialog.component';

@Component({
  selector: 'app-edit-mini-course',
  templateUrl: './edit-mini-course.component.html',
  styleUrls: ['./edit-mini-course.component.css']
})
export class EditMiniCourseComponent implements OnInit {
  public Editor = ClassicEditor;
  config = {
    toolbar: {
      items: ['heading', '|', 'bold', 'italic', '|', 'numberedList', 'bulletedList', '|', 'undo', 'redo'],

      shouldNotGroupWhenFull: true
    }
  };

  miniCurso: MiniCurso = {} as MiniCurso;
  miniCursoOld: MiniCurso = {} as MiniCurso;
  tiposBootcampDesseMinicurso: TipoBootcamp[] = [];
  toastLoading: CreateHotToastRef<unknown>;
  imagemAnexada?: File;
  loading: boolean = true;
  creatingTopico?: boolean;
  index?: number;
  srcImagem: string = '';
  input?: Topico = {
    subtitulo: '',
    texto: '',
    imagemURL: ''
  }

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private toast: HotToastService,
    private modalService: NgbModal,
    private miniCourseService: MiniCourseService,
    private router: Router,
    private tipoBootcampService: TipoBootcampService
  ) { }

  createMiniCursoForm = this.fb.group({
    titulo: ['', [Validators.required]],
    topicos: this.fb.array([])
  });

  topicoForm = this.fb.group({
    subtitulo: ['', [Validators.required]],
    texto: ['', [Validators.required]],
    imagemURL: ['', [Validators.required]]
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

    let render = new FileReader();
    render.onload = (e) => {
      imgHTML.setAttribute('src', e.target.result as string);
    }

    render.readAsDataURL(this.imagemAnexada)
  }

  novoTopico(): FormGroup {
    return this.fb.group({
      subtitulo: '',
      texto: '',
      imagemURL: '',
    })
  }

  addTopico(content) {
    this.srcImagem = 'https://greenvolt.com.br/wp-content/uploads/2018/05/ef3-placeholder-image.jpg';
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

  onClickEdit(content, topico: Topico, index: number) {
    this.creatingTopico = false;
    this.input = topico;

    //Se já tiver a URL do storage
    if (topico.imagemURL != '' && typeof topico.imagemURL == 'string') {
      this.srcImagem = topico.imagemURL;

      //Se não tiver imagem
    } else if (topico.imagemURL == '') {
      this.srcImagem = 'https://greenvolt.com.br/wp-content/uploads/2018/05/ef3-placeholder-image.jpg';

      //Se estiver carregando uma nova imagem
    } else {
      let reader = new FileReader();
      reader.readAsDataURL(topico.imagemURL);
      reader.onload = (e) => this.srcImagem = reader.result as string;
    }

    this.modalService.open(content, { size: 'lg', centered: true });
    this.index = index;
  }

  onClickPreview(topico: Topico, index: number){
    const modalRef = this.modalService.open(PreviewTopicDialogComponent, { size: 'lg', centered: true });
    modalRef.componentInstance.topico = topico;
    modalRef.componentInstance.index = index;
  }

  onDefinir() {
    if (this.creatingTopico) {
      this.topicos().push(this.novoTopico());
    }

    if (this.imagemAnexada != null) {
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
      id: this.miniCurso.id,
      titulo: this.titulo.value,
      topicos: this.topicos().value
    }


    from(this.miniCourseService.updateMiniCurso(this.miniCursoOld, this.miniCurso))
      .subscribe({
        next: () => this.toastLoading = this.toast.loading('Editando Mini-Curso...'),
        error: () => {
          this.toastLoading.close();
          this.toast.error('Um erro ocorreu');
        },
        complete: () => {
          if (this.miniCurso.titulo != this.miniCursoOld.titulo) {

            const tamanhoDoArray = this.tiposBootcampDesseMinicurso.length;

            this.tiposBootcampDesseMinicurso.forEach((tipoBootcamp, index) => {
              tipoBootcamp.miniCurso = this.miniCurso.titulo;

              this.tipoBootcampService.updateTipoBootcamp(tipoBootcamp)
                .subscribe({
                  complete: () => {
                    if ((index + 1) == tamanhoDoArray) {
                      this.toastLoading.close();
                      this.toast.success('Mini-Curso editado com sucesso');
                      this.router.navigate(['/admin/mini-cursos']);
                    }
                  }
                });
            });

          } else {
            this.toastLoading.close();
            this.toastLoading = this.toast.success('Processo editado com sucesso');
            this.router.navigate(['/admin/mini-cursos']);
          }
        }
      })

  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.miniCourseService.getMiniCursoById(id)
      .subscribe((miniCurso) => {

        this.miniCurso = miniCurso;
        this.miniCursoOld = miniCurso;
        this.loading = false;
        this.titulo.setValue(miniCurso.titulo);

        miniCurso.topicos.forEach((topico) => {
          this.topicos().push(this.novoTopico());
        })
        this.topicos().setValue(miniCurso.topicos);

        this.tipoBootcampService.getAllTiposBootcampFilteredByMiniCurso(miniCurso.titulo)
          .subscribe((tiposBootcampFirestore) => {
            this.tiposBootcampDesseMinicurso = tiposBootcampFirestore;
          });
        
      });


  }

}
