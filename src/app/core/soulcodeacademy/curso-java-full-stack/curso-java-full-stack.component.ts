import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-curso-java-full-stack',
  templateUrl: './curso-java-full-stack.component.html',
  styleUrls: ['./curso-java-full-stack.component.css']
})
export class CursoJavaFullStackComponent implements OnInit {
  title = 'Curso Java Full Stack - SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }

}
