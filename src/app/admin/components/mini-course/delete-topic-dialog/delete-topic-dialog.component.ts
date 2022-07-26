import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-delete-topic-dialog',
  templateUrl: './delete-topic-dialog.component.html',
  styleUrls: ['./delete-topic-dialog.component.css']
})
export class DeleteTopicDialogComponent implements OnInit {

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  @Input() indexTopic: number;
  delete!: boolean;


  onApagar(){
    this.activeModal.close({ delete: true })
  }

  ngOnInit() {
  }

}
