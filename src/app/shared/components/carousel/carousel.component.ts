import { Component, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.sass']
})
export class CarouselComponent implements OnInit {
  
  arrayImagenes = [];
  @Input() options;
  @Input() imagenes;

  constructor() { }

  ngOnInit(): void {
    this.arrayImagenes = this.imagenes;
  }

}
