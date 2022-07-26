import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderPipe } from 'ngx-order-pipe';
import { Teste } from 'src/app/shared/models/teste';
import { TesteTecnicoService } from 'src/app/shared/services/teste-tecnico.service';
import { TesteTecnicoAddComponent } from '../teste-tecnico-add/teste-tecnico-add.component';
import { TesteTecnicoDeleteComponent } from '../teste-tecnico-delete/teste-tecnico-delete.component';
import { TesteTecnicoDetailComponent } from '../teste-tecnico-detail/teste-tecnico-detail.component';
import { TesteTecnicoEditComponent } from '../teste-tecnico-edit/teste-tecnico-edit.component';

@Component({
  selector: 'app-teste-tecnico-list',
  templateUrl: './teste-tecnico-list.component.html',
  styleUrls: ['./teste-tecnico-list.component.css']
})
export class TesteTecnicoListComponent implements OnInit {
  form: FormGroup;
  allTeste: Teste[] = [];
  public listaTesteResponse: Teste[] = [];
  public page = 1;
  public pageSize = 10;
  public listPage = [5, 10, 15, 20];
  public textSearch: any;
  caseInsensitive: boolean = false;
  loading: boolean = true;
  order: string = 'question';
  reverse: boolean = false;

  constructor(public testeService: TesteTecnicoService,
    private modalService: NgbModal,
    private orderPipe: OrderPipe) { }

    deleteTeste(id: string) {
      const modalRef = this.modalService.open(TesteTecnicoDeleteComponent, { centered: true, size: 'sm' });
      modalRef.componentInstance.testeId = id;
    }
  
    openCreate() {
      this.modalService.open(TesteTecnicoAddComponent, { centered: true });
    }
  
    openEdit(teste: Teste) {
      const modalRef = this.modalService.open(TesteTecnicoEditComponent, { centered: true });
      modalRef.componentInstance.teste = teste;
    }

  ngOnInit(): void {
    this.testeService.getAll()
      .subscribe(testesFirestore => {
        const testeFiltrados: Teste[] = [];
        testesFirestore.forEach((teste) => {
          if (teste.category == "teste-tecnico") {
            testeFiltrados.push(teste);
          }
        })
        this.listaTesteResponse = this.orderPipe.transform(testeFiltrados, 'question');
        this.allTeste = this.orderPipe.transform(testeFiltrados, 'question');
      });
    this.loading = false;
  }

  refreshBlock() {
    this.allTeste
      .map((teste, i) => ({ id: i + 1, ...teste }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  ellipsis(mensagem: string): string {
    if (mensagem.length > 30) {
      return mensagem.slice(0, 30) + '...';
    }
    return mensagem;
  }

  onClickDetail(teste: Teste) {
    const ref = this.modalService.open(TesteTecnicoDetailComponent, { centered: true, size: 'lg' });
    ref.componentInstance.teste = teste
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  filterList() {
    if (this.textSearch.length > 2) {
      this.allTeste = this.listaTesteResponse.filter((item) =>
        item.question.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.alternatives.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.answers.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.bootcamp.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
      )
    } else {
      this.allTeste = this.listaTesteResponse;
    }
  }

}
