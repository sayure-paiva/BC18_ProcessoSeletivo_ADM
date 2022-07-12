import { TesteLogicoDetailComponent } from './../teste-logico-detail/teste-logico-detail.component';
import { HotToastService } from '@ngneat/hot-toast';
import { TesteLogicoDeleteComponent } from '../teste-logico-delete/testeLogicoDelete.component';
import { TesteLogicoEditComponent } from './../teste-logico-edit/teste-logico-edit.component';
import { Component, OnInit } from '@angular/core';
import { FormGroup} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Teste } from 'src/app/shared/models/teste';
import { TesteLogicoService } from 'src/app/shared/services/teste-logico.service';
import { TesteLogicoAddComponent } from '../teste-logico-add/teste-logico-add.component';

@Component({
  selector: 'app-teste-logico-list',
  templateUrl: './teste-logico-list.component.html',
  styleUrls: ['./teste-logico-list.component.css']
})
export class TesteLogicoListComponent implements OnInit {
  // teste: Teste = {} as Teste;
  form: FormGroup;
  allTeste: Teste[]= [];  
  public page = 1;
  public pageSize = 5;
  public listPage = [5, 10, 15, 20];
  
  constructor(public testeService: TesteLogicoService,
    private modalService: NgbModal,
    private toast : HotToastService
  ) { }

  deleteTeste(id: string) {
    const modalRef = this.modalService.open(TesteLogicoDeleteComponent, { centered: true, size:'sm' });
    modalRef.componentInstance.testeId = id;
  }

  openCreate() {
    this.modalService.open(TesteLogicoAddComponent, { centered: true });
  }

  openEdit(teste: Teste) {
    const modalRef = this.modalService.open(TesteLogicoEditComponent, { centered: true });
    modalRef.componentInstance.teste = teste;
  }

  ngOnInit(): void {
   this.testeService.getAll().pipe(
    this.toast.observe({
      success: 'Teste listados com sucesso',
      error: 'Um erro ocorreu',
      loading: 'Listando teste...',
    })
  )
  .subscribe(testesFirestore => {
    this.allTeste = testesFirestore;
  });
  }

  refreshBlock() {
    this.allTeste
       .map((teste, i) => ({id: i + 1, ...teste}))
       .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
   }

  ellipsis(mensagem: string): string {
    if (mensagem.length > 30) {
      return mensagem.slice(0, 30) + '...';
    }
    return mensagem;
  }

  onClickDetail(teste: Teste) {
    const ref = this.modalService.open(TesteLogicoDetailComponent, { centered: true, size:'lg'});
    ref.componentInstance.teste = teste
  }

}
