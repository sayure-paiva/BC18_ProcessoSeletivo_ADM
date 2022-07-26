import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData } from 'chart.js';
import { DashboarService } from 'src/app/shared/services/dashboard.service';

@Component({
  selector: 'app-common-pie',
  templateUrl: './common-pie.component.html',
  styleUrls: ['./common-pie.component.css']
})
export class CommonPieComponent implements OnInit {
  @Input('dados') chartData$!:  Observable<ChartData | { labels: string[]; datasets: { data: number[]; label: string;}[]; }>;
  @Input('typeChart') typeChart: any;
  @Input('labels') labels: any;

  constructor(private dashboardService: DashboarService) { }

  config: ChartConfiguration['options'] = {
    responsive: false,
    plugins: {
      legend: {
        position: 'bottom',
        display: true,
      },
    },
  };

  ngOnInit(): void { }

}
