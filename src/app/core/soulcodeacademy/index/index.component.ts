import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';


@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.css']
})

export class IndexComponent implements OnInit {
    
    title = 'SoulCode Academy';
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }



  slides = [
    {img: "assets/images/partners/carousel/4.png"},
    {img: "assets/images/partners/carousel/6.png"},
    {img: "assets/images/partners/carousel/7.png"},
    {img: "assets/images/partners/carousel/8.png"},
    {img: "assets/images/partners/carousel/9.png"},
    {img: "assets/images/partners/carousel/10.png"},
    {img: "assets/images/partners/carousel/11.png"},
    {img: "assets/images/partners/carousel/12.png"},
    {img: "assets/images/partners/carousel/13.png"},
    {img: "assets/images/partners/carousel/14.png"},
    {img: "assets/images/partners/carousel/15.png"},
    {img: "assets/images/partners/carousel/20.png"},
    {img: "assets/images/partners/carousel/27.png"},
    {img: "assets/images/partners/carousel/30.png"},
  ];


  slideConfig = {"slidesToShow": 4, "slidesToScroll": 2, "autoplay": true, "autoplaySpeed": 1000, "arrows": true, "dots": false, "pauseOnHover": false, "responsive": [{"breakpoint": 768, "settings": {"slidesToShow": 4}}, {"breakpoint": 520, "settings": {"slidesToShow": 2}}]};
  

  


}
