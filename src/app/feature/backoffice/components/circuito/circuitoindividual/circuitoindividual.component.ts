import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CircuitoService } from '../../../services/circuito.service';

@Component({
  selector: 'app-circuitoindividual',
  templateUrl: './circuitoindividual.component.html',
  styleUrls: ['./circuitoindividual.component.sass']
})
export class CircuitoindividualComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: true,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
    },
    nav: false
  }

  idCircuito;
  respCircuito;
  galeriaCircuito

  fondo = 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg'

  constructor(
    private circuitoService: CircuitoService,
    private route: ActivatedRoute,
    private router: Router,
  ) { 
    this.route.queryParams
      .subscribe(params => {
        this.idCircuito = params.id
      })
  }

  ngOnInit(): void {
    this.buscarTour(this.idCircuito);
  }

  buscarTour(data){
    this.circuitoService.getCircuitoDetails(data).subscribe(res => {
      this.respCircuito = res;
    })
    this.circuitoService.getServiceGallery(data).subscribe(res => {
      this.galeriaCircuito = res;
    })
  }

  regresar(){
    this.router.navigate([`/circuito/resultado-circuito`], {queryParamsHandling: 'preserve'})
  }

}
