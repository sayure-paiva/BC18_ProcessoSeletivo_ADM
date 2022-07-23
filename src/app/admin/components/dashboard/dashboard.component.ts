import { map } from 'rxjs/operators';
import { DashboarService } from 'src/app/shared/services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ChartData } from 'chart.js';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboarService, private breakpointObserver: BreakpointObserver) { }

  racaOuCor$?: Observable<ChartData>;
  escolaridades$?: Observable<ChartData>;
  estados$?: Observable<ChartData>;
  generos$?: Observable<ChartData>;
  statusJornada$?: Observable<ChartData>;
  pitchUrl$?: Observable<ChartData>;
  dataNasc$?: Observable<ChartData>;
  listaTurma: any[] = [];
  listaTurmaSelecionada = [];
  isSelectedAllTurma = true;

  ngOnInit(): void {
    this.atualizarGrafico([]);

    this.dashboardService.getSelectedProcesso().subscribe(res => {
      this.listaTurma = res;
    })
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



  getDataEthnicity(lista: any[]) {
    return this.dashboardService.getEthnicity(lista)
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

  getDataSchooling(lista: any[]) {
    return this.dashboardService.getSchooling(lista)
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

  getDataStates(lista: any[]) {
    return this.dashboardService.getStates(lista)
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

  getDataGenre(lista: any[]) {
    return this.dashboardService.getGenre(lista)
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

  getDataStatus(lista: any[]) {
    return this.dashboardService.getStatus(lista)
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

  getDataPitch(lista: any[]) {
    return this.dashboardService.getPitch(lista)
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

  getDataAge(lista: any[]) {
    return this.dashboardService.getAge(lista)
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

  selectedAllformulariosEvent($event) {
    // console.log($event.target.checked)
    this.isSelectedAllTurma = $event.target.checked;
    if (this.isSelectedAllTurma) {
      this.listaTurma.forEach(val => {
        val.selected = true;
      });
    } else {

      this.listaTurma.forEach(val => {
        val.selected = false
      });
    }
    // this.atualizarLista(null);
  }


  atualizarLista($event, id) {
    let value =$event.target.checked;
    this.listaTurma.filter(val => val.id == id)[0].selected = value;

    this.listaTurmaSelecionada = [];
    this.listaTurma.forEach(val => {

      if (val.selected === true) {
        this.listaTurmaSelecionada.push(val.id);

      }
    })


    this.atualizarGrafico(this.listaTurmaSelecionada);

  }

  atualizarGrafico(lista: any[]){
    console.log(lista)
    this.racaOuCor$ = this.getDataEthnicity(lista);
    this.escolaridades$ = this.getDataSchooling(lista);
    this.estados$ = this.getDataStates(lista);
    this.generos$ = this.getDataGenre(lista);
    this.statusJornada$ = this.getDataStatus(lista);
    this.pitchUrl$ = this.getDataPitch(lista);
    this.dataNasc$ = this.getDataAge(lista);
  }

}

// datasets: [
//   { data: [ 65, 59, 80, 81, 56, 55, 40 ], label: 'Series A' },
//   { data: [ 28, 48, 40, 19, 86, 27, 90 ], label: 'Series B' }
// ]


