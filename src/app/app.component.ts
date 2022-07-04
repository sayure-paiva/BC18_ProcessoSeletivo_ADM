import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from './shared/services/auth.service';
import { CoursesService } from './shared/services/courses.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  componentObject: object;
  componentName: string;
  constructor(
    public auth: AuthService,
    public coursesService: CoursesService,
    public route: ActivatedRoute
    ){
    }

    onActivate(event: any): void {
      this.componentObject = event;
      this.componentName= event.constructor.name;      
    }
 
}
