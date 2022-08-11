import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToursService } from '../../../services/tours.service';

@Component({
  selector: 'app-tourindividual',
  templateUrl: './tourindividual.component.html',
  styleUrls: ['./tourindividual.component.sass']
})
export class TourindividualComponent implements OnInit {
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

  fondo = 'https://s1.1zoom.me/big3/471/Painting_Art_Back_view_Photographer_575380_3840x2400.jpg'

  tourResult;
  broker;
  galeria;
  detalle;
  consulta;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.route.queryParams
      .subscribe(params => {
        this.consulta = {
          d: decodeURI(params.destino),
          dt: params.fecha,
          ts: params.tipoServicio,
          ocupacion: params.ocupacion,
          adultos: params.adultos,
          menores: params.menores,
        }
        let pathBroker;
        let gallery;
        this.toursService.searchTours(this.consulta).subscribe(res => {

          this.tourResult = res.results;
          console.log(this.tourResult)
          // arrayTours = this.tourResult
          this.tourResult.forEach(function (tour) {
            gallery = tour.info.url_page
            if (tour.consumer === null) {
              this.broker = tour.broker
              pathBroker = tour.info.url_page + '?broker=' + this.broker;
            } else {

              pathBroker = tour.info.url_page + '?broker=' + tour.consumer;

            }
          })
          this.toursService.getTourDetails(pathBroker).subscribe(individual => {
            this.detalle = individual
            console.log(individual);
          })
          this.toursService.getTourGallery(gallery).subscribe(galeria => {
            this.galeria = galeria
            console.log(galeria);
          })


        })

      }
      );
  }

  regresar(){
    this.route.queryParams
    .subscribe(params => {
      console.log(this.consulta)
      this.router.navigate(['/tours/resultados-tour'], { queryParams: params })
    }
     )

  }

}
