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
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';
import { DetailCpfBlockComponent } from './components/cpf-block/detail-cpf-block/detail-cpf-block.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

const maskConfig: Partial<IConfig> = {
  validation: false,
};

@NgModule({
  declarations: [
    ListProcessesComponent,
    CreateProcessComponent,
    ListCandidatesComponent,
    EditProcessComponent,
    CreateCpfBlockComponent,
    UpdateCpfBlockComponent,
    ListCpfBlockComponent,
    DeleteCpfBlockComponent,
    DetailCpfBlockComponent
  ],
  imports: [
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    CommonModule,
    AdminRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(maskConfig),
    NgbModule,
    NgxPaginationModule,
    FormsModule
  ]
})
export class AdminModule { }
