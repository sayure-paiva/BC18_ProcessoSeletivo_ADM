import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HotToastService } from '@ngneat/hot-toast';
import { TesteTecnicoService } from 'src/app/shared/services/teste-tecnico.service';

@Component({
  selector: 'app-teste-tecnico-delete',
  templateUrl: './teste-tecnico-delete.component.html',
  styleUrls: ['./teste-tecnico-delete.component.css']
})
export class TesteTecnicoDeleteComponent implements OnInit {
  
  @Input() testeId: string;
  constructor(private testeService: TesteTecnicoService,
    private toast: HotToastService,
    public activeModal: NgbActiveModal) { }

    modalDelete() {
      this.testeService.deleteTeste(this.testeId).pipe(
        this.toast.observe({
          success: 'Teste deletado com sucesso',
          error: 'Um erro ocorreu',
          loading: 'Deletando teste...',
        })
      )
        .subscribe({
          complete: () => {
            this.activeModal.dismiss('Cross click')
          }
        })
    }
  
    onCancel() {
      this.activeModal.dismiss('Cross click')
    }
  

  ngOnInit(): void {
  }

}
