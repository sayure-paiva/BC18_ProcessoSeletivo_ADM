import { Component, Input, OnInit } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.css"],
})
export class UserDetailComponent implements OnInit {

  @Input() public user: any;

  usuario: User = {} as User;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
  }
}
