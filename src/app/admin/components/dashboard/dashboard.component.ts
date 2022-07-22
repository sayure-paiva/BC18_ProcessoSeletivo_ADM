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

  racaOuCor$?: Observable<ChartData>;
  escolaridades$?: Observable<ChartData>;
  estados$?: Observable<ChartData>;
  generos$?: Observable<ChartData>;
  statusJornada$?: Observable<ChartData>;
  pitchUrl$?: Observable<ChartData>;
  dataNasc$?: Observable<ChartData>;

  ngOnInit(): void {
    this.racaOuCor$ = this.getDataEthnicity();
    this.escolaridades$ = this.getDataSchooling();
    this.estados$ = this.getDataStates();
    this.generos$ = this.getDataGenre();
    this.statusJornada$ = this.getDataStatus();
    this.pitchUrl$ = this.getDataPitch();
    this.dataNasc$ = this.getDataAge();
  }

  // getDadosGrafico(any){
  //   return this.dashboardService.getCities()
  //     .pipe(map(data => {
  //       console.log(data)
  //       return {
  //         labels: Object.keys(data),
  //         datasets: [
  //           {
  //             data: Object.values(data),
  //           },
  //         ],
  //       };
  //     })
  //     )
  // }

  getDataEthnicity() {
    return this.dashboardService.getEthnicity()
      .pipe(map(data => {
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

  getDataSchooling() {
    return this.dashboardService.getSchooling()
      .pipe(map(data => {
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

  getDataStates() {
    return this.dashboardService.getStates()
      .pipe(map(data => {
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

  getDataGenre() {
    return this.dashboardService.getGenre()
      .pipe(map(data => {
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

  getDataStatus() {
    return this.dashboardService.getStatus()
      .pipe(map(data => {
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

  getDataPitch() {
    return this.dashboardService.getPitch()
      .pipe(map(data => {
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

  getDataAge() {
    return this.dashboardService.getAge()
      .pipe(map(data => {
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
