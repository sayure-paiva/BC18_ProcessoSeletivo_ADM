import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { Block } from 'src/app/shared/models/cpf-block/block';
import { CpfBlockService } from 'src/app/shared/services/cpf-block.service';
import { CreateCpfBlockComponent } from '../create-cpf-block/create-cpf-block.component';
import { DeleteCpfBlockComponent } from '../delete-cpf-block/delete-cpf-block.component';
import { UpdateCpfBlockComponent } from '../update-cpf-block/update-cpf-block.component';
import { HotToastService } from '@ngneat/hot-toast';
import { DetailCpfBlockComponent } from '../detail-cpf-block/detail-cpf-block.component';

@Component({
  selector: 'app-list-cpf-block',
  templateUrl: './list-cpf-block.component.html',
  styleUrls: ['./list-cpf-block.component.css']
})
export class ListCpfBlockComponent implements OnInit {

  allBlocks$?: Observable<Block[]>;
  public page = 1;
  public pageSize = 5;
  public listPage = [5, 10, 15, 20];
  public listaBlock: Block[] = [];
  public listaBlockResponse: Block[] = [];
  public textSearch: any;

  constructor(public cpfBlockService: CpfBlockService, private modalService: NgbModal, private toast: HotToastService,) { }

  ngOnInit(): void {
    this.allBlocks$ = this.cpfBlockService.getBlockFindAll();
    this.allBlocks$
      .pipe(
        this.toast.observe({
          loading: 'Carregando...',
          error: 'Ocorreu um erro!',
          success: 'Listado com sucesso!',
        })
      )
      .subscribe(val => {
        this.listaBlock = val;
        this.listaBlockResponse = val;

      })
    console.log(this.allBlocks$)
  }

  onClickAdd() {
    const ref = this.modalService.open(CreateCpfBlockComponent, { centered: true }); {
      ref.closed.subscribe({
        next: (result) => {
          if (result) {
            this.cpfBlockService.createBlockList(result.block)
              .pipe(
                this.toast.observe({
                  loading: 'Adicionando...',
                  error: 'Ocorreu um erro!',
                  success: 'Dado adicionado com sucesso!',
                })
              )
              .subscribe();
          }
        }
      })
    }
  };

  onClickDetail(block: Block) {
    const ref = this.modalService.open(DetailCpfBlockComponent, { centered: true });
    ref.componentInstance.dados = block
  }

  onClickEdit(block: Block) {
    const ref = this.modalService.open(UpdateCpfBlockComponent, { centered: true });
    ref.componentInstance.block = block;
    {
      ref.closed.subscribe({
        next: (result) => {
          if (result) {
            this.cpfBlockService.updateBlockList(result.block)
              .pipe(
                this.toast.observe({
                  loading: 'Adicionando...',
                  error: 'Ocorreu um erro!',
                  success: 'Dado alterado com sucesso!',
                })
              )
              .subscribe();
          }
        }
      });
    }
  }

  onClickDelete(block: Block) {
    const ref = this.modalService.open(DeleteCpfBlockComponent, { centered: true });
    ref.componentInstance.dados = block;
    {
      ref.closed.subscribe({
        next: (result) => {
          if (result) {
            this.cpfBlockService.deleteBlockList(result.block)
              .pipe(
                this.toast.observe({
                  loading: 'Deletando...',
                  error: 'Ocorreu um erro',
                  success: 'Dado deletado com sucesso!',
                })
              )
              .subscribe();
          }
        }
      })
    }
  }

  filtrarLista() {
    if (this.textSearch.length > 2) {

      this.listaBlock = this.listaBlockResponse.filter((item) =>
        item.cpf.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.nomeCompleto.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.email.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.motivo.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 

      );
    }else{
      this.listaBlock = this.listaBlockResponse;
    }
  }

  refreshBlock() {
   this.listaBlock
      .map((block, i) => ({id: i + 1, ...block}))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  formatCpf(value:string){
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'erro';
  }

}
