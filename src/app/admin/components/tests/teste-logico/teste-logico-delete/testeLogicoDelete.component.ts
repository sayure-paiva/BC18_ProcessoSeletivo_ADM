import { HotToastService } from '@ngneat/hot-toast';
import { Component, Input, OnInit } from '@angular/core';
import { TesteLogicoService } from 'src/app/shared/services/teste-logico.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-testeLogicoDelete',
  templateUrl: './testeLogicoDelete.component.html',
  styleUrls: ['./testeLogicoDelete.component.css']
})
export class TesteLogicoDeleteComponent implements OnInit {

  @Input() testeId: string;
  constructor(private testeService: TesteLogicoService,
    private toast: HotToastService,
    public activeModal: NgbActiveModal) { }

  modalDelete() {
    this.testeService.deleteTeste(this.testeId).pipe(
      this.toast.observe({
        success: 'Questão deletada com sucesso',
        error: 'Um erro ocorreu',
        loading: 'Deletando questão...',
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

  ngOnInit() {
  }

}
