import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { MiniCurso, Topico } from 'src/app/shared/models/mini-curso';
import { MiniCourseService } from 'src/app/shared/services/mini-course.service';

@Component({
  selector: 'app-detail-mini-course',
  templateUrl: './detail-mini-course.component.html',
  styleUrls: ['./detail-mini-course.component.css']
})
export class DetailMiniCourseComponent implements OnInit {


  public isCollapsedbt1 = true;
  public isCollapsedbt2 = true;
  topicoAtual: Topico;
  miniCurso: MiniCurso = {} as MiniCurso;
  loading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private miniCourseService: MiniCourseService,
    private sanitizer: DomSanitizer
  ) { }

  onMostrarTopico(topico: Topico) {
    this.topicoAtual = topico;
  }

  convertHtmlToText(html: string) {
    const texto = this.sanitizer.bypassSecurityTrustHtml(html);
    return texto;
  }

  irParaProximoTopico() {

    const indexAtual = this.miniCurso.topicos.indexOf(this.topicoAtual);

    if (indexAtual != this.miniCurso.topicos.length - 1) {
      this.topicoAtual = this.miniCurso.topicos[this.miniCurso.topicos.indexOf(this.topicoAtual) + 1];
    }

  }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.miniCourseService.getMiniCursoById(id)
      .subscribe((miniCurso) => {
        this.miniCurso = miniCurso;
        this.loading = false;
      });
  }

}
