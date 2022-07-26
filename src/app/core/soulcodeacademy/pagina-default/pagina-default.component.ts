import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../shared/services/auth.service';
import { CoursesService } from '../../../shared/services/courses.service';

@Component({
  selector: 'app-pagina-default',
  templateUrl: './pagina-default.component.html',
  styleUrls: ['./pagina-default.component.css']
})
export class PaginaDefaultComponent implements OnInit {

  componentObject: object;
  componentName: string;
  constructor(
    public auth: AuthService,
    public coursesService: CoursesService,
    public route: ActivatedRoute
    ){}
    headerAppears: boolean = false;

    onActivate(event: any): void {
      this.componentObject = event;
      this.componentName= event.constructor.name;      
      if(this.componentName == 'LoginComponent' || this.componentName == 'MartechAcademyComponent'){
        this.headerAppears = false;
      }else{
        this.headerAppears = true;
      }
    }

  ngOnInit() {
  }

}
