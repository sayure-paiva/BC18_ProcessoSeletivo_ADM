import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { OrderPipe } from 'ngx-order-pipe';
import { Block } from 'src/app/shared/models/block';
import { CpfBlockService } from 'src/app/shared/services/cpf-block.service';
import { CreateCpfBlockComponent } from '../create-cpf-block/create-cpf-block.component';
import { DeleteCpfBlockComponent } from '../delete-cpf-block/delete-cpf-block.component';
import { DetailCpfBlockComponent } from '../detail-cpf-block/detail-cpf-block.component';
import { UpdateCpfBlockComponent } from '../update-cpf-block/update-cpf-block.component';

@Component({
  selector: 'app-list-cpf-block',
  templateUrl: './list-cpf-block.component.html',
  styleUrls: ['./list-cpf-block.component.css']
})
export class ListCpfBlockComponent implements OnInit {

  public page = 1;
  public pageSize = 5;
  public listPage = [5, 10, 15, 20];
  public listaBlock: Block[] = [];
  public listaBlockResponse: Block[] = [];
  public textSearch: any;
  order: string = 'nomeCompleto';
  reverse: boolean = false;
  caseInsensitive: boolean = false;
  loading: boolean = true;

  constructor(
    public cpfBlockService: CpfBlockService,
    private modalService: NgbModal,
    private toast: HotToastService,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit(): void {
    this.cpfBlockService.getBlockFindAll()
      .subscribe(val => {
        this.listaBlockResponse = this.orderPipe.transform(val, 'nomeCompleto');
        this.listaBlock = this.orderPipe.transform(val, 'nomeCompleto');
        this.loading = false
      })
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
                  success: 'Adicionado com sucesso!',
                })
              )
              .subscribe();
          }
        }
      })
    }
  }

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
                  success: 'Alterado com sucesso!',
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
                  success: 'Deletado com sucesso!',
                })
              )
              .subscribe();
          }
        }
      })
    }
  }

  filterList() {
    if (this.textSearch.length > 2) {

      this.listaBlock = this.listaBlockResponse.filter((item) =>
        item.cpf.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.nomeCompleto.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.email.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.motivo.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
      );
    } else {
      this.listaBlock = this.listaBlockResponse;
    }
  }

  refreshBlock() {
    this.listaBlock
      .map((block, i) => ({ id: i + 1, ...block }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  formatCpf(value: string) {
    if (value.length === 11) {
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3\-\$4');
    }
    return 'erro';
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }
}
