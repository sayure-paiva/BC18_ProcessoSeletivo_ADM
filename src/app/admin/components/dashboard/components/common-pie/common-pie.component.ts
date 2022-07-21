import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { DashboarService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-common-pie',
  templateUrl: './common-pie.component.html',
  styleUrls: ['./common-pie.component.scss']
})
export class CommonPieComponent implements OnInit {

  constructor(private dashboardService: DashboarService) { }

  chartData$?: Observable<ChartData>;

  config: ChartConfiguration['options'] = { //config dos gráficos
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
    },
  };

  ngOnInit(): void {
    this.dashboardService.getEtnias().subscribe(val => {
      console.log(val)
    })
    this.chartData$ = this.dashboardService.getEtnias()
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
