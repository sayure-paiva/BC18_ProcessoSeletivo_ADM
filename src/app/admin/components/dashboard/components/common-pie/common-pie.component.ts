import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent } from 'chart.js';
import { DashboarService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-common-pie',
  templateUrl: './common-pie.component.html',
  styleUrls: ['./common-pie.component.scss']
})
export class CommonPieComponent implements OnInit {
  @Input('dados') chartData$!:  Observable<ChartData | { labels: string[]; datasets: { data: number[]; label: string;}[]; }>;
  @Input('typeChart') typeChart: any;
  @Input('labels') labels: any;

  public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
    console.log(event, active);
  }

  constructor(private dashboardService: DashboarService) { }

  // chartData$?: Observable<ChartData>;

  config: ChartConfiguration['options'] = { //config dos gráficos
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: true
      },
    },
  };

  ngOnInit(): void {
    // this.dashboardService.getSchooling().subscribe(val => {
    //   console.log(val)
    // })
    // this.dashboardService.getCities().subscribe(val => {
    //   console.log(val)
    // })


  //   this.chartData$ = this.dashboardService.getEtnias()
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
  }

}
