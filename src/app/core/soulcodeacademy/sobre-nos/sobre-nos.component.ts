import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

import SwiperCore, { SwiperOptions, Pagination } from 'swiper';
SwiperCore.use([Pagination]);
@Component({
  selector: 'app-sobre-nos',
  templateUrl: './sobre-nos.component.html',
  styleUrls: ['./sobre-nos.component.css']
})
export class SobreNosComponent implements OnInit {
  title = 'Sobre Nós - SoulCode Academy';
  config: SwiperOptions = {
    slidesPerView: 2,
    spaceBetween: 40,
    centeredSlides: true,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      768: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 10,
      },
      320: {
        slidesPerView: 1,
        spaceBetween: 5,
      }
      
    }
  };
  
  constructor(
    private titleService: Title,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(this.title);
  }
  
  slides = [
    {
      img: "assets/images/team/270/1616080168511.jpeg",
      name: "Alessandra Bomura",
      position: "CIO Logicalis Latam, C-Level Executive, Mentora e Conselheira."
    },
    {
      img: "assets/images/team/270/edu-lyra.jpg",
      name: "Edu Lyra",
      position: "Fundador e CEO Gerando Falcões."
    },
    {
      img: "assets/images/team/270/1583344688916.jpeg",
      name: "Fernando Lemos",
      position: "CTO & Customer Success VP da Microsoft."
    },
    {
      img: "assets/images/team/270/Gil-Giardelli.jpg",
      name: "Gil Giardelli",
      position: "Professor Global, Apresentador, Escritor, Inovador na @5era, Roboticista AÍ, Eticista."
    },
    {
      img: "assets/images/team/270/pipo-AN.jpg",
      name: "Pipo Calazans",
      position: "CEO na SunsetDDB."
    },
    {
      img: "assets/images/team/270/1644504942287.jpeg",
      name: "Valeria Soska",
      position: "Diretora Comercial na Globo."
    },
    {
      img: "assets/images/team/270/1571408744359.jpeg",
      name: "Vitor Cavalcanti",
      position: "Diretor geral do Instituto IT Mídia."
    }
  ];

  slideConfig = {
    "autoplay": true,
    "autoplaySpeed": 2000,
    "arrows": false,
    "centerMode": true,
    "centerPadding": '60px',
    "slidesToShow": 5,
    "responsive": [
        {
        "breakpoint": 768,
        "settings": {
            "autoplay": true,
            "autoplaySpeed": 2000,
            "arrows": false,
            "centerMode": true,
            "centerPadding": '40px',
            "slidesToShow": 3
          }
        },
        {
        "breakpoint": 480,
        "settings": {
            "autoplay": true,
            "autoplaySpeed": 2000,
            "arrows": false,
            "centerMode": true,
            "centerPadding": '40px',
            "slidesToShow": 1
          }
        }
      ]
  };

}
