import { DashboardComponent } from './../admin/components/dashboard/dashboard.component';
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ListCpfBlockComponent } from "../admin/components/cpf-block/list-cpf-block/list-cpf-block.component";
import { ListCandidatesComponent } from "../admin/components/processes/list-candidates/list-candidates.component";
import { ListProcessesComponent } from "../admin/components/processes/list-processes/list-processes.component";
import { LoginComponent } from "../auth/login/login.component";
import { ErrorComponent } from "../shared/templates/error/error.component";
import { PaginaAdminComponent } from "../admin/components/pagina-admin/pagina-admin.component";
import { PaginaDefaultComponent } from "./soulcodeacademy/pagina-default/pagina-default.component";
import { BootcampComponent } from "./soulcodeacademy/bootcamp/bootcamp.component";
import { ConfirmacaoInscricaoComponent } from "./soulcodeacademy/confirmacao-inscricao/confirmacao-inscricao.component";
import { CursoDesenvolvedorSalesforceComponent } from "./soulcodeacademy/curso-desenvolvedor-salesforce/curso-desenvolvedor-salesforce.component";
import { CursoEngenhariaDeDadosComponent } from "./soulcodeacademy/curso-engenharia-de-dados/curso-engenharia-de-dados.component";
import { CursoJavaFullStackComponent } from "./soulcodeacademy/curso-java-full-stack/curso-java-full-stack.component";
import { EmpresasComponent } from "./soulcodeacademy/empresas/empresas.component";
import { EnviarVideoComponent } from "./soulcodeacademy/enviar-video/enviar-video.component";
import { FaqComponent } from "./soulcodeacademy/faq/faq.component";
import { ImprensaComponent } from "./soulcodeacademy/imprensa/imprensa.component";
import { IndexComponent } from "./soulcodeacademy/index/index.component";
import { InscricaoComponent } from "./soulcodeacademy/inscricao/inscricao.component";
import { MartechAcademyComponent } from "./soulcodeacademy/martech-academy/martech-academy.component";
import { PoliticaPrivacidadeComponent } from "./soulcodeacademy/politica-privacidade/politica-privacidade.component";
import { SobreNosComponent } from "./soulcodeacademy/sobre-nos/sobre-nos.component";
import { TermosDeUsoComponent } from "./soulcodeacademy/termos-de-uso/termos-de-uso.component";
import { TesteLogicoListComponent } from "../admin/components/tests/teste-logico/teste-logico-list/teste-logico-list.component";
import { ListTiposComponent } from '../admin/components/types-bootcamp/list-tipos/list-tipos.component';
import { ListProcessesHistoryComponent } from '../admin/components/processes/list-processes-history/list-processes-history.component';
import { UserListComponent } from "../admin/components/users/user-list/user-list.component";
import { TesteTecnicoListComponent } from "../admin/components/tests/teste-tecnico/teste-tecnico-list/teste-tecnico-list.component";
import { DetailCandidateComponent } from "../admin/components/processes/detail-candidate/detail-candidate.component";
import { IsAdminGuard } from "../shared/guards/isAdmin/is-admin.guard";
import { IsRecruiterGuard } from "../shared/guards/isRecruiter/is-recruiter.guard";
import { ListMiniCoursesComponent } from "../admin/components/mini-course/list-mini-courses/list-mini-courses.component";
import { CreateMiniCourseComponent } from "../admin/components/mini-course/create-mini-course/create-mini-course.component";
import { EditMiniCourseComponent } from "../admin/components/mini-course/edit-mini-course/edit-mini-course.component";
import { DetailMiniCourseComponent } from "../admin/components/mini-course/detail-mini-course/detail-mini-course.component";

export const coreRoutes: Routes = [
  {
    path: "index",
    redirectTo: "",
    pathMatch: "full",
  },
  {
    path: "",
    component: PaginaDefaultComponent,
    children: [
      {
        path: "",
        component: IndexComponent,
      },
      {
        path: "bootcamp",
        component: BootcampComponent,
      },
      {
        path: "confirmacao-inscricao",
        component: ConfirmacaoInscricaoComponent,
      },
      {
        path: "curso-desenvolvedor-salesforce",
        component: CursoDesenvolvedorSalesforceComponent,
      },
      {
        path: "curso-engenharia-de-dados",
        component: CursoEngenhariaDeDadosComponent,
      },
      {
        path: "curso-java-full-stack",
        component: CursoJavaFullStackComponent,
      },
      {
        path: "empresas",
        component: EmpresasComponent,
      },
      {
        path: "enviar-video-analista-midia-digital-performance",
        component: EnviarVideoComponent,
      },
      {
        path: "enviar-video-engenharia-de-dados",
        component: EnviarVideoComponent,
      },
      {
        path: "enviar-video-java-full-stack",
        component: EnviarVideoComponent,
      },
      {
        path: "enviar-video-salesforce",
        component: EnviarVideoComponent,
      },
      {
        path: "faq",
        component: FaqComponent,
      },
      {
        path: "imprensa",
        component: ImprensaComponent,
      },
      {
        path: "inscricao-desenvolvedor-salesforce",
        component: InscricaoComponent,
      },
      {
        path: "inscricao-engenharia-de-dados",
        component: InscricaoComponent,
      },
      {
        path: "inscricao-java-full-stack",
        component: InscricaoComponent,
      },
      {
        path: "politica-privacidade",
        component: PoliticaPrivacidadeComponent,
      },
      {
        path: "sobre-nos",
        component: SobreNosComponent,
      },
      {
        path: "termos-de-uso",
        component: TermosDeUsoComponent,
      },
      {
        path: "martech-academy",
        component: MartechAcademyComponent,
      },
      {
        path: "login",
        component: LoginComponent,
      },
    ],
  },
  {
    path: "admin",
    component: PaginaAdminComponent,
    children: [
      {
        path: "",
        redirectTo: "processos",
        pathMatch: "full",
      },
      {
        path: "processos",
        component: ListProcessesComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "processos/historico",
        component: ListProcessesHistoryComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "processos/:id",
        component: ListCandidatesComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: 'processos/:id',
        component: DetailCandidateComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: 'cpf-block',
        component: ListCpfBlockComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path:'dashboard',
        component: DashboardComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "teste-logico",
        component: TesteLogicoListComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "teste-tecnico",
        component: TesteTecnicoListComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "list-users",
        component: UserListComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "tipos-bootcamp",
        component: ListTiposComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "mini-cursos",
        component: ListMiniCoursesComponent,
        canActivate: [IsRecruiterGuard]
      },
      {
        path: "mini-cursos/new",
        component: CreateMiniCourseComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "mini-cursos/edit/:id",
        component: EditMiniCourseComponent,
        canActivate: [IsAdminGuard]
      },
      {
        path: "mini-cursos/:id",
        component: DetailMiniCourseComponent,
        canActivate: [IsRecruiterGuard]
      },
    ],
  },
  {
    path: "**",
    redirectTo: "not-found",
    pathMatch: "full",
  },
  {
    path: "not-found",
    component: ErrorComponent,
    data: {
      message: "Página não encontrada",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(coreRoutes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
