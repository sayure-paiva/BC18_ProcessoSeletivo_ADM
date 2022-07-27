import { CommonPieComponent } from './components/dashboard/components/common-pie/common-pie.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ListProcessesComponent } from './components/processes/list-processes/list-processes.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateProcessComponent } from './components/processes/create-process/create-process.component';
import { ListCandidatesComponent } from './components/processes/list-candidates/list-candidates.component';
import { EditProcessComponent } from './components/processes/edit-process/edit-process.component';
import { HotToastModule } from '@ngneat/hot-toast';
import { CreateCpfBlockComponent } from './components/cpf-block/create-cpf-block/create-cpf-block.component';
import { UpdateCpfBlockComponent } from './components/cpf-block/update-cpf-block/update-cpf-block.component';
import { ListCpfBlockComponent } from './components/cpf-block/list-cpf-block/list-cpf-block.component';
import { DeleteCpfBlockComponent } from './components/cpf-block/delete-cpf-block/delete-cpf-block.component';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailCpfBlockComponent } from './components/cpf-block/detail-cpf-block/detail-cpf-block.component';
import { TesteLogicoAddComponent } from './components/tests/teste-logico/teste-logico-add/teste-logico-add.component';
import { TesteLogicoEditComponent } from './components/tests/teste-logico/teste-logico-edit/teste-logico-edit.component';
import { TesteLogicoListComponent } from './components/tests/teste-logico/teste-logico-list/teste-logico-list.component';
import { OrderModule } from 'ngx-order-pipe';
import { UserCreateComponent } from './components/users/user-create/user-create.component';
import { UserDeleteComponent } from './components/users/user-delete/user-delete.component';
import { UserDetailComponent } from './components/users/user-detail/user-detail.component';
import { UserListComponent } from './components/users/user-list/user-list.component';
import { UserUpdateComponent } from './components/users/user-update/user-update.component';
import { ListTiposComponent } from './components/types-bootcamp/list-tipos/list-tipos.component';
import { CreateTipoComponent } from './components/types-bootcamp/create-tipo/create-tipo.component';
import { EditTipoComponent } from './components/types-bootcamp/edit-tipo/edit-tipo.component';
import { DeleteTipoDialogComponent } from './components/types-bootcamp/delete-tipo-dialog/delete-tipo-dialog.component';
import { ListProcessesHistoryComponent } from './components/processes/list-processes-history/list-processes-history.component';
import { TesteTecnicoAddComponent } from './components/tests/teste-tecnico/teste-tecnico-add/teste-tecnico-add.component';
import { TesteTecnicoDeleteComponent } from './components/tests/teste-tecnico/teste-tecnico-delete/teste-tecnico-delete.component';
import { TesteTecnicoDetailComponent } from './components/tests/teste-tecnico/teste-tecnico-detail/teste-tecnico-detail.component';
import { TesteTecnicoEditComponent } from './components/tests/teste-tecnico/teste-tecnico-edit/teste-tecnico-edit.component';
import { TesteTecnicoListComponent } from './components/tests/teste-tecnico/teste-tecnico-list/teste-tecnico-list.component';
import { DetailCandidateComponent } from './components/processes/detail-candidate/detail-candidate.component';
import { CloseProcessDialogComponent } from './components/processes/close-process-dialog/close-process-dialog.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgChartsModule } from 'ng2-charts';
import { ListMiniCoursesComponent } from './components/mini-course/list-mini-courses/list-mini-courses.component';
import { CreateMiniCourseComponent } from './components/mini-course/create-mini-course/create-mini-course.component';
import { EditMiniCourseComponent } from './components/mini-course/edit-mini-course/edit-mini-course.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DeleteMiniCourseDialogComponent } from './components/mini-course/delete-mini-course-dialog/delete-mini-course-dialog.component';
import { DetailMiniCourseComponent } from './components/mini-course/detail-mini-course/detail-mini-course.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { PreviewTopicDialogComponent } from './components/mini-course/preview-topic-dialog/preview-topic-dialog.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ListProcessesComponent,
    ListProcessesHistoryComponent,
    CreateProcessComponent,
    ListCandidatesComponent,
    EditProcessComponent,
    CreateCpfBlockComponent,
    UpdateCpfBlockComponent,
    ListCpfBlockComponent,
    DeleteCpfBlockComponent,
    DetailCpfBlockComponent,
    TesteLogicoAddComponent,
    TesteLogicoEditComponent,
    TesteLogicoListComponent,
    UserDetailComponent,
    UserListComponent,
    UserUpdateComponent,
    UserDeleteComponent,
    UserCreateComponent,
    ListTiposComponent,
    CreateTipoComponent,
    EditTipoComponent,
    DeleteTipoDialogComponent,
    TesteTecnicoAddComponent,
    TesteTecnicoDeleteComponent,
    TesteTecnicoDetailComponent,
    TesteTecnicoEditComponent,
    TesteTecnicoListComponent,
    DetailCandidateComponent,
    CloseProcessDialogComponent,
    DashboardComponent,
    CommonPieComponent,
    ListMiniCoursesComponent,
    CreateMiniCourseComponent,
    EditMiniCourseComponent,
    DeleteMiniCourseDialogComponent,
    DetailMiniCourseComponent,
    PreviewTopicDialogComponent
  ],
  imports: [
    OrderModule,
    CommonModule,
    AdminRoutingModule,
    AngularFirestoreModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    NgChartsModule,
    CKEditorModule
  ]
})
export class AdminModule { }
