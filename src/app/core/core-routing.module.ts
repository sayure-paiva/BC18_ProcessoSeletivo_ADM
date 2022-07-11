import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProcessComponent } from '../admin/components/processes/create-process/create-process.component';
import { ListCandidatesComponent } from '../admin/components/processes/list-candidates/list-candidates.component';
import { ListProcessesComponent } from '../admin/components/processes/list-processes/list-processes.component';
import { LoginComponent } from '../auth/login/login.component';
import { AuthGuard } from '../shared/guards/auth.guard';
import { IsAdminGuard } from '../shared/guards/is-admin.guard';
import { ErrorComponent } from '../shared/templates/error/error.component';
import { PaginaAdminComponent } from '../admin/components/pagina-admin/pagina-admin.component';
import { PaginaDefaultComponent } from './soulcodeacademy/pagina-default/pagina-default.component';
import { BootcampComponent } from './soulcodeacademy/bootcamp/bootcamp.component';
import { ConfirmacaoInscricaoComponent } from './soulcodeacademy/confirmacao-inscricao/confirmacao-inscricao.component';
import { CursoDesenvolvedorSalesforceComponent } from './soulcodeacademy/curso-desenvolvedor-salesforce/curso-desenvolvedor-salesforce.component';
import { CursoEngenhariaDeDadosComponent } from './soulcodeacademy/curso-engenharia-de-dados/curso-engenharia-de-dados.component';
import { CursoJavaFullStackComponent } from './soulcodeacademy/curso-java-full-stack/curso-java-full-stack.component';
import { EmpresasComponent } from './soulcodeacademy/empresas/empresas.component';
import { EnviarVideoComponent } from './soulcodeacademy/enviar-video/enviar-video.component';
import { FaqComponent } from './soulcodeacademy/faq/faq.component';
import { ImprensaComponent } from './soulcodeacademy/imprensa/imprensa.component';
import { IndexComponent } from './soulcodeacademy/index/index.component';
import { InscricaoComponent } from './soulcodeacademy/inscricao/inscricao.component';
import { MartechAcademyComponent } from './soulcodeacademy/martech-academy/martech-academy.component';
import { PoliticaPrivacidadeComponent } from './soulcodeacademy/politica-privacidade/politica-privacidade.component';
import { SobreNosComponent } from './soulcodeacademy/sobre-nos/sobre-nos.component';
import { TermosDeUsoComponent } from './soulcodeacademy/termos-de-uso/termos-de-uso.component';

export const coreRoutes: Routes = [
  {
    path: 'index',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: '',
    component: PaginaDefaultComponent,
    children: [
      {
        path: '',
        component: IndexComponent
      },
      {
        path: 'bootcamp',
        component: BootcampComponent
      },
      {
        path: 'confirmacao-inscricao',
        component: ConfirmacaoInscricaoComponent
      },
      {
        path: 'curso-desenvolvedor-salesforce',
        component: CursoDesenvolvedorSalesforceComponent
      },
      {
        path: 'curso-engenharia-de-dados',
        component: CursoEngenhariaDeDadosComponent
      },
      {
        path: 'curso-java-full-stack',
        component: CursoJavaFullStackComponent
      },
      {
        path: 'empresas',
        component: EmpresasComponent
      },
      {
        path: 'enviar-video-analista-midia-digital-performance',
        component: EnviarVideoComponent
      },
      {
        path: 'enviar-video-engenharia-de-dados',
        component: EnviarVideoComponent
      },
      {
        path: 'enviar-video-java-full-stack',
        component: EnviarVideoComponent
      },
      {
        path: 'enviar-video-salesforce',
        component: EnviarVideoComponent
      },
      {
        path: 'faq',
        component: FaqComponent
      },
      {
        path: 'imprensa',
        component: ImprensaComponent
      },
      {
        path: 'inscricao-desenvolvedor-salesforce',
        component: InscricaoComponent
      },
      {
        path: 'inscricao-engenharia-de-dados',
        component: InscricaoComponent
      },
      {
        path: 'inscricao-java-full-stack',
        component: InscricaoComponent
      },
      {
        path: 'politica-privacidade',
        component: PoliticaPrivacidadeComponent
      },
      {
        path: 'sobre-nos',
        component: SobreNosComponent
      },
      {
        path: 'termos-de-uso',
        component: TermosDeUsoComponent
      },
      {
        path: 'martech-academy',
        component: MartechAcademyComponent
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
  {
    path: 'admin',
    component: PaginaAdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'processos',
        pathMatch: 'full'
      },
      {
        path: 'processos',
        component: ListProcessesComponent
      },
      {
        path: 'processos/:id',
        component: ListCandidatesComponent
      },
    ]
  },
  {
    path: '**',
    redirectTo: 'not-found',
    pathMatch: 'full'
  },
  {
    path: 'not-found',
    component: ErrorComponent,
    data: {
      message: 'Página não encontrada'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule]
})
export class CoreRoutingModule { }
