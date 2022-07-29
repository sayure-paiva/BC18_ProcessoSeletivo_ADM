import { Component, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DashboarService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboarService) { }

  generos$?: Observable<ChartData>;
  estados$?: Observable<ChartData>;
  racaOuCor$?: Observable<ChartData>;
  idades$?: Observable<ChartData>;
  escolaridades$?: Observable<ChartData>;
  comoNosConheceu$?: Observable<ChartData>;
  statusFinal$?: Observable<ChartData>;
  turma$?: Observable<ChartData>;
  listaTurma: any[] = [];
  listaTurmaSelecionada = [];
  isSelectedAllTurma = true;

  ngOnInit(): void {
    this.dashboardService.getSelectedProcesso().subscribe(res => {
      this.listaTurma = res;
      this.atualizarGrafico(this.getListaIdSelecionado());
    })
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

  getDataMeet(lista: any[]) {
    return this.dashboardService.getMeet(lista)
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

  getListaIdSelecionado() {
    this.listaTurmaSelecionada = [];
    this.listaTurma.forEach(val => {

      if (val.selected === true) {
        this.listaTurmaSelecionada.push(val.id);
      }
    })
    return this.listaTurmaSelecionada;
  }

  selectedAllTurma($event) {
    const selecionado = $event.target.checked;
    if (selecionado) {
      this.listaTurma.forEach(val => {
        val.selected = true;
      });
    } else {
      this.listaTurma.forEach(val => {
        val.selected = false
      });
    }
    this.atualizarGrafico(this.getListaIdSelecionado());
  }

  atualizarLista($event, id) {
    let value = $event.target.checked;
    this.listaTurma.filter(val => val.id == id)[0].selected = value;

    this.listaTurmaSelecionada = [];
    this.listaTurma.forEach(val => {
      if (val.selected === true) {
        this.listaTurmaSelecionada.push(val.id);
      }
    })
    this.atualizarGrafico(this.listaTurmaSelecionada);
  }

  atualizarGrafico(lista: any[]) {
    this.generos$ = this.getDataGenre(lista);
    this.estados$ = this.getDataStates(lista);
    this.racaOuCor$ = this.getDataEthnicity(lista);
    this.idades$ = this.getDataAge(lista);
    this.escolaridades$ = this.getDataSchooling(lista);
    this.comoNosConheceu$ = this.getDataMeet(lista);
    this.statusFinal$ = this.getDataStatus(lista);
  }
}

