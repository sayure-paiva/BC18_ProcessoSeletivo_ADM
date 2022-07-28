import { Component, OnInit } from "@angular/core";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { HotToastService } from "@ngneat/hot-toast";
import { Observable } from "rxjs";
import { User } from "src/app/shared/models/user";
import { AdminService } from "src/app/shared/services/admin/admin.service";
import { UserCreateComponent } from "../user-create/user-create.component";
import { UserDeleteComponent } from "../user-delete/user-delete.component";
import { UserDetailComponent } from "../user-detail/user-detail.component";
import { UserUpdateComponent } from "../user-update/user-update.component";

@Component({
  selector: "app-user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"],
})
export class UserListComponent implements OnInit {
  allUsers$: Observable<User[]>;
  listUsers: User[] = [];
  listUsersToSerach: User[];

  public textSearch: string;
  public page = 1;
  public pageSize = 5;
  public listPage = [5, 10, 15, 20];

  order: string = 'type';
  reverse: boolean = true;
  caseInsensitive: boolean = false;
  titulo = 'Funcionários Cadastrados';
  disabled: boolean = false;

  constructor(
    private adminSerivce: AdminService,
    private modalService: NgbModal,
    private toast: HotToastService
  ) {}

  ngOnInit(): void {

    // Salva na variável todos os usuários com disabled == false
    this.allUsers$ = this.adminSerivce.getAllUsers(false);

    this.allUsers$.subscribe((users) => {

      this.listUsers = users;
      this.listUsersToSerach = users;

    });
  }

  filtrarLista() {
    if (this.textSearch.length > 2) {
      this.listUsers = this.listUsersToSerach.filter(
        (item) =>
          item.displayName
            .toString()
            .toLowerCase()
            .indexOf(this.textSearch.toLowerCase()) > -1 ||
          item.email
            .toString()
            .toLowerCase()
            .indexOf(this.textSearch.toLowerCase()) > -1 ||
          item.type
            .toString()
            .toLowerCase()
            .indexOf(this.textSearch.toLowerCase()) > -1
      );
    } else {
      this.listUsers = this.listUsersToSerach;
    }
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

  refreshList() {
    this.listUsers
      .map((block, i) => ({ id: i + 1, ...block }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  changeDisabled() {

    this.disabled ? this.titulo = 'Funcionários cadastrados' : this.titulo = 'Funcionarios desabilitados'

    this.disabled ? this.disabled = false : this.disabled = true ;

    // Salva na variável todos os usuários com disabled == false
    this.allUsers$ = this.adminSerivce.getAllUsers(this.disabled);

    this.allUsers$.pipe(

      this.toast.observe({
        loading: "Atualizando...",
        error: "Ocorreu um erro!",
        success: "Usuários atualizados",

      })).subscribe(users => {

      this.listUsers = users;
      this.listUsersToSerach = users;
    });

  }

  onClickCreate() {
    const ref = this.modalService.open(UserCreateComponent, { centered: true }); {
      ref.closed.subscribe({
        next: async (result) => {
          if (result) {
            await this.adminSerivce.createUser(result.usuario, result.imagem)
          }
        }
      })
    }
  }

  onClickDetail(user: User) {
    const ref = this.modalService.open(UserDetailComponent, { centered: true });
    ref.componentInstance.usuario = user;
  }

  onClickEdit(user: User) {
    const ref = this.modalService.open(UserUpdateComponent, { centered: true });

    ref.componentInstance.usuario = user;
    {
      ref.closed.subscribe({
        next:  (result) => {
          if (result) {
            this.adminSerivce.updateUser(result.usuario, result.imagem)
          }
        },
      });
    }
  }

  onClickDelete(user: User) {
    const ref = this.modalService.open(UserDeleteComponent, { centered: true });
    ref.componentInstance.usuario = user;
    {
      ref.closed.subscribe({
        next: (result) => {
          if (result) {
            this.adminSerivce.updateUser(result.usuario).finally(() => {
              this.disabled = false;
              this.changeDisabled();
            });
          }
        },
      });
    }
  }
}
