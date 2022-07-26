import { NgChartsModule } from 'ng2-charts';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoreRoutingModule } from './core-routing.module';
import { FooterComponent } from '../shared/templates/footer/footer.component';
import { HeaderComponent } from '../shared/templates/header/header.component';
// import { MaterialModule } from '../shared/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndexComponent } from './soulcodeacademy/index/index.component';
import { BootcampComponent } from './soulcodeacademy/bootcamp/bootcamp.component';

import { SlickCarouselModule } from 'ngx-slick-carousel';
import { ConfirmacaoInscricaoComponent } from './soulcodeacademy/confirmacao-inscricao/confirmacao-inscricao.component';
import { CursoDesenvolvedorSalesforceComponent } from './soulcodeacademy/curso-desenvolvedor-salesforce/curso-desenvolvedor-salesforce.component';
import { CursoEngenhariaDeDadosComponent } from './soulcodeacademy/curso-engenharia-de-dados/curso-engenharia-de-dados.component';
import { CursoJavaFullStackComponent } from './soulcodeacademy/curso-java-full-stack/curso-java-full-stack.component';
import { EmpresasComponent } from './soulcodeacademy/empresas/empresas.component';
import { FaqComponent } from './soulcodeacademy/faq/faq.component';
import { ImprensaComponent } from './soulcodeacademy/imprensa/imprensa.component';
import { PoliticaPrivacidadeComponent } from './soulcodeacademy/politica-privacidade/politica-privacidade.component';
import { SobreNosComponent } from './soulcodeacademy/sobre-nos/sobre-nos.component';
import { TermosDeUsoComponent } from './soulcodeacademy/termos-de-uso/termos-de-uso.component';
import { MartechAcademyComponent } from './soulcodeacademy/martech-academy/martech-academy.component';
import { ErrorComponent } from '../shared/templates/error/error.component';
import { InscricaoComponent } from './soulcodeacademy/inscricao/inscricao.component';

import { NgxMaskModule, IConfig } from 'ngx-mask'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SwiperModule } from 'swiper/angular';
import { EnviarVideoComponent } from './soulcodeacademy/enviar-video/enviar-video.component';
import { HeaderAdminComponent } from '../shared/templates/header-admin/header-admin.component';
import { PaginaDefaultComponent } from './soulcodeacademy/pagina-default/pagina-default.component';
import { PaginaAdminComponent } from '../admin/components/pagina-admin/pagina-admin.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    FooterComponent,
    HeaderComponent,
    HeaderAdminComponent,
    PaginaDefaultComponent,
    PaginaAdminComponent,
    ErrorComponent,
    IndexComponent,
    BootcampComponent,
    ConfirmacaoInscricaoComponent,
    CursoDesenvolvedorSalesforceComponent,
    CursoEngenhariaDeDadosComponent,
    CursoJavaFullStackComponent,
    EmpresasComponent,
    FaqComponent,
    ImprensaComponent,
    PoliticaPrivacidadeComponent,
    SobreNosComponent,
    TermosDeUsoComponent,
    MartechAcademyComponent,
    InscricaoComponent,
    EnviarVideoComponent
  ],
  imports: [
    CommonModule,
    CoreRoutingModule,
    // MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    SlickCarouselModule,
    SwiperModule,
    NgxMaskModule.forRoot(options),
    NgbModule,
    NgChartsModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    IndexComponent,
    HeaderAdminComponent,
    PaginaDefaultComponent,
    PaginaAdminComponent,
    BootcampComponent,
    ConfirmacaoInscricaoComponent,
    CursoDesenvolvedorSalesforceComponent,
    CursoEngenhariaDeDadosComponent,
    CursoJavaFullStackComponent,
    EmpresasComponent,
    FaqComponent,
    ImprensaComponent,
    PoliticaPrivacidadeComponent,
    SobreNosComponent,
    TermosDeUsoComponent,
    MartechAcademyComponent,
    ErrorComponent

  ],
})
export class CoreModule { }
