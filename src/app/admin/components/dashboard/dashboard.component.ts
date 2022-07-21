import { map } from 'rxjs/operators';
import { DashboarService } from 'src/app/shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {


  constructor(private dashboardService: DashboarService) { }

  etnias$?: Observable<ChartData>;
  escolaridades$?: Observable<ChartData>;
  cidades$?: Observable<ChartData>;
  cursos$?: Observable<ChartData>;

  ngOnInit(): void {
    this.etnias$ = this.getDadosGrafico(1);
    this.escolaridades$ = this.getDadosEscolaridades();
    this.cidades$ = this.getDadosCidades();
    this.cursos$ = this.getDadosGrafico(1);
  }


  getDadosGrafico(any){
    return this.dashboardService.getEtnias()
      .pipe(map(data => {
        console.log(data)
        return {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
            },
          ],
        };
      })
      )
  }

  getDadosEscolaridades(){
    return this.dashboardService.getEtnias()
      .pipe(map(data => {
        console.log(data)
        return {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
            },
          ],
        };
      })
      )
  }

  getDadosCidades(){
    return this.dashboardService.getEtnias()
      .pipe(map(data => {
        console.log(data)
        return {
          labels: Object.keys(data),
          datasets: [
            {
              data: Object.values(data),
            },
          ],
        };
      })
      )
  }



}
