import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListProcessesComponent } from './components/processes/list-processes/list-processes.component';
import { DetailProcessComponent } from './components/processes/detail-process/detail-process.component';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateProcessComponent } from './components/processes/create-process/create-process.component';
import { ListCandidatesComponent } from './components/processes/list-candidates/list-candidates.component';


@NgModule({
  declarations: [
    ListProcessesComponent,
    DetailProcessComponent,
    CreateProcessComponent,
    ListCandidatesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
