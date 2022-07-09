import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListProcessesComponent } from './components/processes/list-processes/list-processes.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProcessComponent } from './components/processes/create-process/create-process.component';
import { ListCandidatesComponent } from './components/processes/list-candidates/list-candidates.component';
import { EditProcessComponent } from './components/processes/edit-process/edit-process.component';
import { HotToastModule } from '@ngneat/hot-toast';


@NgModule({
  declarations: [
    ListProcessesComponent,
    CreateProcessComponent,
    ListCandidatesComponent,
    EditProcessComponent
  ],
  imports: [
    HotToastModule.forRoot({
      position: 'bottom-center',
    }),
    CommonModule,
    AdminRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }
