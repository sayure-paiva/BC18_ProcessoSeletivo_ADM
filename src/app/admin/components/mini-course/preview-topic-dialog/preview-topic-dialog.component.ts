import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Topico } from 'src/app/shared/models/mini-curso';

@Component({
  selector: 'app-preview-topic-dialog',
  templateUrl: './preview-topic-dialog.component.html',
  styleUrls: ['./preview-topic-dialog.component.css']
})
export class PreviewTopicDialogComponent implements OnInit {

  @Input() topico: Topico;
  @Input() index: number;
  srcImagem: string = '';
  

  constructor(
    public activeModal: NgbActiveModal,
    private sanitizer: DomSanitizer
  ) { }

  convertHtmlToText(html: string) {
    const texto = this.sanitizer.bypassSecurityTrustHtml(html);
    return texto;
  }

  ngOnInit() {
    if (this.topico.imagemURL != '' && typeof this.topico.imagemURL == 'string') {
      this.srcImagem = this.topico.imagemURL;

    } else if (this.topico.imagemURL == '') {
      this.srcImagem = '';

    } else {
      let reader = new FileReader();
      reader.readAsDataURL(this.topico.imagemURL);
      reader.onload = (e) => this.srcImagem = reader.result as string;
    }
  }

}
