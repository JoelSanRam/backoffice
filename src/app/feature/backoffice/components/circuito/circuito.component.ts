import { Component, OnInit } from '@angular/core';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Observable, Observer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import * as moment from 'moment';
import { CircuitoService } from '../../services/circuito.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.sass']
})
export class CircuitoComponent implements OnInit {
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
  }, /* {
    "idSeccion": 30,
    "seccion": "RIVIERA MAYA",
    "estatus": 1,
    "orden": 2,
    "flyers": [{
      "idFlyer": 11095,
      "title": "Viva Wyndham Maya",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflyyw61.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflyyw61.jpg",
      "flyer": "azamid\/azamidflyyw61.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-01-18 08:25:38",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": null,
      "fecha_fin": null,
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 30,
      "vigencia": 0,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11095"
    }, {
      "idFlyer": 11096,
      "title": "Viva Wyndham Azteca",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflyri67.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflyri67.jpg",
      "flyer": "azamid\/azamidflyri67.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-01-18 08:26:16",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": null,
      "fecha_fin": null,
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 30,
      "vigencia": 0,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11096"
    }, {
      "idFlyer": 11404,
      "title": "Kore Tulum",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflyfb38.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflyfb38.jpg",
      "flyer": "azamid\/azamidflyfb38.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-02-24 17:43:56",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": null,
      "fecha_fin": null,
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 30,
      "vigencia": 0,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11404"
    }, {
      "idFlyer": 11451,
      "title": "Hotel Nickelodeon Riviera Maya",
      "description": "",
      "url": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/azamidflyu131.jpg",
      "url_thumbnail": "https:\/\/tms-flyers.s3.amazonaws.com\/azamid\/thumbnails\/azamidflyu131.jpg",
      "flyer": "azamid\/azamidflyu131.jpg",
      "predeterminado": 0,
      "fecha_subida": "2022-02-25 19:33:49",
      "flyer_base64": null,
      "dominio": "https:\/\/tms-flyers.s3.amazonaws.com",
      "fecha_inicio": "2022-02-16",
      "fecha_fin": "2022-03-08",
      "orden": 0,
      "estatus": 1,
      "hoy": "2022-03-07",
      "idSeccion": 30,
      "vigencia": 1,
      "url_flyer": "https:\/\/api2.travelmapsoft.com\/public\/v6\/flyer\/personalizado\/11451"
    }]
  } */];

  bsValue = moment().toDate();
  minDate = new Date();

  numHab: number;
  habitaciones = [];
  personas = 2;

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
  edadMenores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  circuitosForm: FormGroup;
  destinos;
  destino;

  constructor(
    private circuitoService: CircuitoService,
    private formBuilder: FormBuilder,
    private router: Router,
    private _lightbox: Lightbox
  ) {
    this.numHab = 1;
    this.habitaciones = [{ 'adultos': 2, 'menores': 0, 'edadmenores': [] }];
    this.circuitosForm = this.formBuilder.group({
      d: ['', [Validators.required, Validators.minLength(2)]],
      dt: [this.bsValue, Validators.required],
      ts: ['CIR'],
      nhabs: [''],
      habs: [''],
      matchs: [''],
    });
  }

  ngOnInit(): void {
    this.destinos = new Observable((observer: Observer<any>) => {
      observer.next(this.circuitosForm.value.d);
    }).pipe(
      switchMap((query: any) => {
        if (query) {
          return this.circuitoService.autocomplete(query, 'CIR', 'D,S');
        }
        return of([]);
      })
    );
  }

  AddRemoveHab(val) {
    switch (val) {
      case 'add':
        if (this.numHab < 8) {
          this.numHab++;
          this.habitaciones.push({ 'adultos': 2, 'edadmenores': [], 'menores': 0 });
          this.calcularTotalPersonas();
        }
        break;
      case 'rm':
        if (this.numHab == 1) {
        } else {
          this.numHab--;
          this.habitaciones.splice(-1, 1);
          this.calcularTotalPersonas();
        }
        break;
    }
  }

  calcularTotalPersonas() {
    var adults = this.habitaciones.reduce((a, b) => ({ adultos: a.adultos + b.adultos }));
    var ninios = 0;
    for (var menor of this.habitaciones) {
      ninios += menor.edadmenores.length;
    }
    this.personas = adults.adultos + ninios;
  }

  addRemoveAdulto(item, val) {
    let adult = this.habitaciones[item].adultos;
    switch (val) {
      case 'add':
        if (adult < 5) {
          this.habitaciones[item].adultos++;
          this.calcularTotalPersonas();
        }
        break;
      case 'rm':
        if (adult == 1) {
        } else {
          this.habitaciones[item].adultos--;
          this.calcularTotalPersonas();
        }
        break;
    }
  }

  addRemoveMenor(item, val) {
    switch (val) {
      case 'add':
        if (item.edadmenores.length < 3) {
          item.edadmenores.push({ 'edad': 0 });
          item.menores = item.edadmenores.length;
          this.calcularTotalPersonas();
        }
        break;
      case 'rm':
        item.edadmenores.pop();
        item.menores = item.edadmenores.length;
        this.calcularTotalPersonas();
        break;
    }
  }

  edadMenor(indexHab, indexEdadmenores, value) {
    this.habitaciones[indexHab].edadmenores[indexEdadmenores].edad = value;
}

  onSelect(event: TypeaheadMatch): void {
    this.circuitosForm.patchValue({ d: event.item.label });
    this.circuitosForm.patchValue({ matchs: event.item.matchs });
    this.destino = event.item;
  }
  setIconClass(destino) {
    if (destino.type === 'S') {
      return 'fa-flag';
    } else {
      return 'fa-globe-americas';
    }
  }

  searchCircuitos() {
    if(this.circuitosForm.invalid){
      console.log('simon')
      return
    }
    let pureba = moment(this.circuitosForm.value.dt).format("YYYY-MM-DD")
    this.circuitosForm.value.nhabs = this.numHab
    this.circuitosForm.value.habs = this.habitaciones
    this.circuitosForm.value.dt = pureba
    console.log(this.circuitosForm.value)
    let params = {
      destino: encodeURI(this.circuitosForm.value.d),
      fecha: encodeURI(this.circuitosForm.value.dt),
      tipoServicio: this.circuitosForm.value.ts,
      nhabs: this.circuitosForm.value.nhabs,
      habs: (JSON.stringify(this.circuitosForm.value.habs)),
      matchs: this.circuitosForm.value.matchs
    }
    this.router.navigate(['/circuito/resultado-circuito'], { queryParams: params })
  }

}
