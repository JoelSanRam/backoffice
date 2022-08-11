import { Component, OnInit } from '@angular/core';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TranslateService } from '@ngx-translate/core';
import { switchMap } from 'rxjs/operators';
import { Observable, Observer, of } from 'rxjs';
import { VuelosService } from '../../services/vuelos.service';
import * as moment from 'moment';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-aereos',
  templateUrl: './aereos.component.html',
  styleUrls: ['./aereos.component.sass']
})
export class AereosComponent implements OnInit {

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
  customOptionsAereolineas: OwlOptions = {
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
        items: 5
      }
    },
    nav: false
  }
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

  radioTipoVuelo = 'roundtrip';
  bsValue = moment().toDate();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  maxDate2: Date = moment().add(365, 'days').toDate();


  destinos

  edadMenores = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  edadInfantes = [0, 1, 2];

  user_data = JSON.parse(localStorage.getItem('user_data'));

  personas: {
    total: number,
    adultos: number,
    infantes: number,
    menores: number,
    edadinfantes: number[],
    edadmenores: number[]
  } = {
      total: 2,
      adultos: 2,
      infantes: 0,
      menores: 0,
      edadinfantes: [],
      edadmenores: [],
    }

  //! para eliminar posteriormente
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

  //! array para destino-origen

  arrayDestinos = [
    {
      origenLabel: "",
      origen: "",
      nombreOrigen: "",
      origenError: false,
      destinoLabel: "",
      destino: "",
      nombreDestino: "",
      destinoError: false,
    }
  ];

  totalDestinos;
  fechas = [
    {
      dia: moment().format('DD'),
      mes: moment().format('MMM'),
      anio: moment().format('YYYY'),
      fecha: moment().toDate(),
    },
    {
      dia: moment().add(3, 'day').format('DD'),
      mes: moment().add(3, 'day').format('MMM'),
      anio: moment().add(3, 'day').format('YYYY'),
      fecha: moment().toDate(),
    },
  ];
  fechasError: boolean = false;

  todayPlus2 = moment().add(3, 'days');

  aereosForm = {
    destino: [],
    fechas: [
      {
        fecha: "",
      },
      {
        fecha: "",
      },
    ],
    pax: [
      {
        adultos: 0,
        menores: 0,
        infantes: 0,
        edadesinfantes: [],
        edadesmenores: [],
      },
    ],
    clase: "Clase economica",
    air_content_provider: ["amadeus", "volaris"],
    pagina: 1,
    orden: "precio",
    resultados: 200,
    PromotionCode: "VLN30",
    idoperador: "",
    type: "",
  };

  constructor(
    public translate: TranslateService,
    private vuelosService: VuelosService,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('es');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('es');

    /*  translate.get('Vuelos').subscribe((res: string) => {
       console.log(res);
     }); */
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    // console.log(this.user_data)
  }


  ngOnInit(): void {

  }

  onChanceRadio(value) {
    const arrayDeRepuesto = [{
      origenLabel: "",
      origen: "",
      nombreOrigen: "",
      origenError: false,
      destinoLabel: "",
      destino: "",
      nombreDestino: "",
      destinoError: false,
    }];
    const arrayDeRepuestofechas = [
      {
        dia: moment().format('DD'),
        mes: moment().format('MMM'),
        anio: moment().format('YYYY'),
        fecha: moment().toDate(),
      },
      {
        dia: moment().add(3, 'day').format('DD'),
        mes: moment().add(3, 'day').format('MMM'),
        anio: moment().add(3, 'day').format('YYYY'),
        fecha: moment().toDate(),
      },
    ];
    this.radioTipoVuelo = value;
    switch (this.radioTipoVuelo) {
      case 'single':
        this.totalDestinos = 1
        this.arrayDestinos = arrayDeRepuesto
        this.fechas = [];
        this.fechas.push(arrayDeRepuestofechas[0])
        break;
      case 'roundtrip':
        this.totalDestinos = 1
        this.arrayDestinos = arrayDeRepuesto
        this.fechas = arrayDeRepuestofechas;
        break;
      case 'multitrip':
        this.totalDestinos = 2
        this.fechas = arrayDeRepuestofechas;
        this.arrayDestinos.push({
          origenLabel: "",
          origen: "",
          nombreOrigen: "",
          origenError: false,
          destinoLabel: "",
          destino: "",
          nombreDestino: "",
          destinoError: false,
        })
        break;
    }
    console.log(this.fechas)
  }

  addRemovePerson(personType, type) {
    switch (type) {
      case "add":
        switch (personType) {
          case "adultos":
            if (this.personas.total < 9) {
              this.personas.adultos += 1;
            }
            break;
          case "menores":
            if (
              this.personas.adultos > 0 &&
              this.personas.total < 9
            ) {
              this.personas.menores += 1;
              this.personas.edadmenores.push(3);
            }
            //this.personas.edadmenores.map(function (p){p=parseInt(p)})
            break;
          case "infantes":
            if (this.personas.infantes < this.personas.adultos && this.personas.total < 9) {
              this.personas.infantes += 1;
              this.personas.edadinfantes.push(0);
            }
            break;
        }
        break;
      case "rm":
        switch (personType) {
          case "adultos":
            if (this.personas.adultos > 0) {
              this.personas.adultos -= 1;
              if (
                this.personas.infantes > this.personas.adultos
              ) {
                this.personas.infantes = this.personas.adultos;
                this.personas.edadinfantes.pop();
              }
              if (this.personas.adultos <= 0) {
                this.personas.menores = 0;
                this.personas.edadmenores = [];
              }
            }
            break;
          case "menores":
            if (this.personas.menores > 0) {
              this.personas.menores -= 1;
              this.personas.edadmenores.pop();
            }
            break;
          case "infantes":
            if (this.personas.infantes > 0) {
              this.personas.infantes -= 1;
              this.personas.edadinfantes.pop();
            }
            break;
        }
        break;
    }
    this.personas.total = this.personas.adultos + this.personas.menores + this.personas.infantes;
    // this.personas.edadmenores.map(function (p){p=parseInt(p)})
    // console.log(this.personas)
  }

  parseandoElDato(tipo, value, i) {
    if (tipo == 'menores') {
      value = parseInt(value);
      this.personas.edadmenores[i] = value;
    }
    if (tipo == 'infantes') {
      value = parseInt(value);
      this.personas.edadinfantes[i] = value;
    }
  }

  addRmDestino(type, index) {
    switch (type) {
      case "add":
        if (this.totalDestinos < 6) {
          this.totalDestinos += 1;
          this.arrayDestinos.push({
            origenLabel: "",
            origen: "",
            nombreOrigen: "",
            origenError: false,
            destinoLabel: "",
            destino: "",
            nombreDestino: "",
            destinoError: false,
          });
          this.fechas.push({
            dia: this.todayPlus2.format('DD'),
            mes: this.todayPlus2.format('MMM'),
            anio: this.todayPlus2.format('YYYY'),
            fecha: moment().toDate(),
          });
        }
        break;
      case "rm":
        if (this.totalDestinos > 2) {
          this.totalDestinos -= 1;
          this.arrayDestinos.splice(index, 1);
          this.fechas.splice(index, 1);
        }
        break;
    }

  }

  validateData() {
    let isValid = true;
    for (const destino of this.arrayDestinos) {
      if (typeof destino.origen === "undefined" || destino.origen === "") {

        destino.origenError = true;
        isValid = false;
        console.log(isValid)
      } else {
        destino.origenError = false;
        console.log(isValid)

      }
      if (typeof destino.destino === "undefined" || destino.destino === "") {

        destino.destinoError = true;
        console.log(isValid)
        isValid = false;
      } else {
        console.log(isValid)

        destino.destinoError = false;
      }
    }

    for (let i = 0; i < this.fechas.length; i++) {
      if (this.fechas[i + 1]) {
        if (moment(this.fechas[i + 1].fecha).isSame(this.fechas[i].fecha, 'day')) {
        } else {

          if (moment(this.fechas[i + 1].fecha).isBefore(this.fechas[i].fecha, 'day')) {
            this.fechasError = true;
            isValid = false;
            console.log(isValid)
          }
        }
      }
      if (typeof this.fechas[i].fecha === "undefined") {
        isValid = false;
        console.log(isValid)

      }
    }
    console.log(isValid)
    return isValid;
  }

  search() {
    if (this.validateData()) {
      this.aereosForm.fechas = [];
      if (this.radioTipoVuelo == "roundtrip") {
        this.aereosForm.destino = [];
        this.aereosForm.destino[0] = {
          origen: this.arrayDestinos[0].origen,
          nombreOrigen: this.arrayDestinos[0].nombreOrigen,
          destino: this.arrayDestinos[0].destino,
          nombreDestino: this.arrayDestinos[0].nombreDestino,
        };
        this.aereosForm.destino[1] = {
          origen: this.arrayDestinos[0].destino,
          nombreOrigen: this.arrayDestinos[0].nombreDestino,
          destino: this.arrayDestinos[0].origen,
          nombreDestino: this.arrayDestinos[0].nombreOrigen,
        };
        let fecha1 = (this.fechas[0].fecha).toString()
        let fecha2 = (this.fechas[1].fecha).toString()
        fecha1 = moment(this.bsRangeValue[0]).format("YYYY-MM-DD")
        fecha2 = moment(this.bsRangeValue[1]).format("YYYY-MM-DD")
        this.aereosForm.fechas.push({
          fecha: fecha1
        },
          {
            fecha: fecha2
          })
      } else {
        this.aereosForm.destino = [];
        for (const destino of this.arrayDestinos) {
          this.aereosForm.destino.push({
            origen: destino.origen,
            nombreOrigen: destino.nombreOrigen,
            destino: destino.destino,
            nombreDestino: destino.nombreDestino,
          });
        }
        for (const fecha of this.fechas) {
          this.aereosForm.fechas.push({
            fecha: this.datePipe.transform(fecha.fecha, "yyyy-MM-dd"),
          });
        }
      }
      this.aereosForm.pax = [
        {
          adultos: this.personas.adultos,
          menores: this.personas.menores,
          infantes: this.personas.infantes,
          edadesinfantes: this.personas.edadinfantes,
          edadesmenores: this.personas.edadmenores,
        },
      ];
      console.log(this.aereosForm.pax)
      let agencia = this.aereosForm['agencia'] = {
        id_usuario: this.user_data.idUser,
        id_agencia: this.user_data.idAgencia
      };
      // this.aereosForm.idoperador = this.currentUser.userData.idOperador;
      this.aereosForm.type = this.radioTipoVuelo;
      let params = {
        PromotionCode: 'VLN30',
        air_content_provider: JSON.stringify(["amadeus", "volaris"]),
        clase: "Clase economica",
        destino: JSON.stringify(this.aereosForm.destino),
        fechas: JSON.stringify(this.aereosForm.fechas),
        idoperador: this.user_data.idOperador,
        origen_plataforma: this.user_data.origen,
        agencia: JSON.stringify(agencia),
        orden: "precio",
        pagina: 1,
        pax: JSON.stringify(this.aereosForm.pax),
        resultados: 200,
        type: this.aereosForm.type,
        destinosBuscador: JSON.stringify(this.arrayDestinos),
        fechasDestinos: JSON.stringify(this.fechas),
        personas: JSON.stringify(this.personas),
        totalDestino: this.totalDestinos
      }
      this.router.navigate(['/vuelos/resultados-vuelos'],  { queryParams: params })
    }
    // console.log(this.aereosForm)
  }

  autocompleteAirport(airportName) {
    this.destinos = new Observable((observer: Observer<any>) => {
      observer.next(airportName);
    }).pipe(
      switchMap((query: any) => {
        if (query) {
          return this.vuelosService.autocompleAirport(query);
        }
        return of([]);
      })
    );
  }

  onSelectAirport(event: TypeaheadMatch, type, index): void {
    if (type == "origen") {
      this.arrayDestinos[index].origenLabel =
        "(" +
        event.item.codigo +
        ") " +
        event.item.ciudad +
        ", " +
        event.item.pais;
      this.arrayDestinos[index].origen = event.item.codigo;
      this.arrayDestinos[index].nombreOrigen = event.item.ciudad;
    } else if (type == "destino") {
      this.arrayDestinos[index].destinoLabel =
        "(" +
        event.item.codigo +
        ") " +
        event.item.ciudad +
        ", " +
        event.item.pais;
      this.arrayDestinos[index].destino = event.item.codigo;
      this.arrayDestinos[index].nombreDestino = event.item.ciudad;
    }
  }

}
