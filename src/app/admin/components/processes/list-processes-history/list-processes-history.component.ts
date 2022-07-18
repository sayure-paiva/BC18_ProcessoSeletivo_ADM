import { Component, OnInit } from '@angular/core';
import { OrderPipe } from 'ngx-order-pipe';
import { Processo } from 'src/app/shared/models/processo';
import { CoursesService } from 'src/app/shared/services/courses.service';

@Component({
  selector: 'app-list-processes-history',
  templateUrl: './list-processes-history.component.html',
  styleUrls: ['./list-processes-history.component.css']
})
export class ListProcessesHistoryComponent implements OnInit {

  public page = 1;
  public pageSize = 5;
  public listPage = [5, 10, 15, 20];
  processos: Processo[] = [];
  processosResponse: Processo[] = [];
  public textSearch: any;
  order: string = 'turma';
  reverse: boolean = true;
  caseInsensitive: boolean = false;
  loading: boolean = true

  constructor(
    public coursesService: CoursesService,
    private orderPipe: OrderPipe,
  ) { }

  ngOnInit(): void {
    this.coursesService.getAllProcesses()
      .subscribe(processosFirestore => {
        this.processosResponse = this.orderPipe.transform(processosFirestore, 'turma');
        this.processos = this.orderPipe.transform(processosFirestore, 'turma');
        this.loading = false
      })
  }


  filterList() {
    if (this.textSearch.length > 2) {
      this.processos = this.processosResponse.filter((item) =>
        item.turma.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.tipo.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1 ||
        item.status.toString().toLowerCase().indexOf(this.textSearch.toLowerCase()) > -1
      );
    } else {
      this.processos = this.processosResponse;
    }
  }

  refreshBlock() {
    this.processos
      .map((block, i) => ({ id: i + 1, ...block }))
      .slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }

  setOrder(value: string) {
    if (this.order === value) {
      this.reverse = !this.reverse;
    }
    this.order = value;
  }

}
