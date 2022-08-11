import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ToursService } from '../../services/tours.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { Observable, Observer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

import * as moment from 'moment';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.sass']
})
export class ToursComponent implements OnInit {
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      }
    },
    nav: false
  }
  public _album: Array<any> = [];
  flyers = [{
    "idSeccion": 35,
    "seccion": "ESPECIALES",
    "estatus": 1,
    "orden": 2,
    "flyers": [{
      "idFlyer": 11286,
      "title": "Incentivo Marival",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflyli27.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflyli27.jpg",
      "flyer": "azamid\/azamidflyli27.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-02-03 13:29:04",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": null,
      "fecha_fin": null,
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 35,
      "vigencia": 0,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11286"
    }, {
      "idFlyer": 11502,
      "title": "Krystal Grand Cancún",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidfly1d46.png",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidfly1d46.png",
      "flyer": "azamid\/azamidfly1d46.png",
      "predeterminado": 0,
      "fecha_subida": "2022-03-04 14:02:41",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": "2022-03-04",
      "fecha_fin": "2022-03-07",
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 35,
      "vigencia": 1,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11502"
    }, {
      "idFlyer": 11476,
      "title": "Hoteles Sandos",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflypc42.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflypc42.jpg",
      "flyer": "azamid\/azamidflypc42.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-03-01 10:20:19",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": "2022-03-01",
      "fecha_fin": "2022-03-15",
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 35,
      "vigencia": 1,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11476"
    },]
  },];

  bsValue = moment().toDate();
  fecha;

  minDate = new Date();

  adultos = 2;
  menores = 0;
  destinos;
  destino;
  buscadorTour: FormGroup;

  
  imgArray = [
    {
      img: '../../../assets/img/anuncio2.jpg',
      alt: 'holi'
    },
    {
      img: '../../../assets/img/anuncio2.jpg',
      alt: 'holi'
    },
    {
      img: '../../../assets/img/anuncio2.jpg',
      alt: 'holi'
    },
  ];

  constructor(
    private formBuilder: FormBuilder,
    private toursService: ToursService,
    private router: Router,
  ) {
    this.buscadorTour = this.formBuilder.group(
      {
        destino: ['', Validators.required],
        typeDes: [''],
        d: [''],
        s: [''],
        dt: [this.bsValue, Validators.required],
        ts: ['TOU'],
        ocupacion: [1],
        adultos: [this.adultos],
        menores: [this.menores],
      }
    );

  }

  ngOnInit(): void {
    this.destinos = new Observable((observer: Observer<any>) => {
      observer.next(this.buscadorTour.value.destino);
    }).pipe(
      switchMap((query: any) => {
        if (query) {
          return this.toursService.autocomplete(query, 'TOU', 'D,S');
        }
        return of([]);
      })
    );

  }

  addRemovePerson(personType, type) {
    switch (type) {
      case "add":
        switch (personType) {
          case "adultos":
            this.adultos += 1;
            break;
          case "menores":
            this.menores += 1;
            break;
        }
        break;
      case "rm":
        switch (personType) {
          case "adultos":
            this.adultos -= 1;
            break;
          case "menores":
            this.menores -= 1;
            break;
        }
        break;
    }
  }

  onSelect(event: TypeaheadMatch): void {
    this.buscadorTour.patchValue({
      destino: event.item.label,
      s: event.item.label,
      typeDes: event.item.type
    });
    this.destino = event.item;
  }

  searchTour() {
    if(this.buscadorTour.invalid){
      console.log('simon')
      return
    }
    let pureba = moment(this.buscadorTour.value.dt).format("YYYY-MM-DD")
    console.log(this.buscadorTour.value.dt, pureba);
    // return
    this.buscadorTour.value.dt = pureba
    this.buscadorTour.value.adultos = this.adultos
    this.buscadorTour.value.menores = this.menores
    console.log(this.buscadorTour.value)
    // return
    let params = {
      destino: encodeURI(this.buscadorTour.value.destino),
      fecha: encodeURI(this.buscadorTour.value.dt),
      tipoServicio: this.buscadorTour.value.ts,
      ocupacion: this.buscadorTour.value.ocupacion,
      adultos: this.buscadorTour.value.adultos,
      menores: this.buscadorTour.value.menores
    }
    console.log(params)
    this.router.navigate(['/tours/resultados-tour'], { queryParams: params })
  }



}
