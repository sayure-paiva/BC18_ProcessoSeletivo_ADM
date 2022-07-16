import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateProcessComponent } from '../create-process/create-process.component';

@Component({
  selector: 'app-create-options-dialog',
  templateUrl: './create-options-dialog.component.html',
  styleUrls: ['./create-options-dialog.component.css']
})
export class CreateOptionsDialogComponent implements OnInit {

  constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

  openCreateProcess(){
    this.activeModal.dismiss();
    this.modalService.open(CreateProcessComponent, { centered: true });
  }

  openCreateType(){
    
  }

  ngOnInit() {
  }

}
