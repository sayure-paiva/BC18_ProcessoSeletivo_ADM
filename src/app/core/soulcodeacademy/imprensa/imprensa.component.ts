import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-imprensa',
  templateUrl: './imprensa.component.html',
  styleUrls: ['./imprensa.component.css']
})
export class ImprensaComponent implements OnInit {
  title = 'Imprensa - SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
