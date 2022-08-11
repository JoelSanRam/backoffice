import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as moment from 'moment';
import { Observable, Observer, of } from 'rxjs';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { switchMap } from 'rxjs/operators';
import { VuelosService } from '../../../services/vuelos.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-resultados-aereos',
  templateUrl: './resultados-vuelos.component.html',
  styleUrls: ['./resultados-vuelos.component.sass']
})
export class ResultadosVuelosComponent implements OnInit {

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
      },
      740: {
        items: 3
      },
    },
    nav: false
  }

  customOptionsTarifas: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 400,
    navText: ["<b><i class='fa fa-chevron-left'></i></b>", "<i class='fa fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
    },
    nav: true
  }

  khe = 'Promociones'

  radioTipoVuelo;
  bsValue = moment().toDate();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  maxDate2: Date = moment().add(365, 'days').toDate();

  dataVuelos;

  destinos;

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
  fechaDeParams;

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
  todayPlus2 = moment().add(3, 'days');
  fechasError: boolean = false;
  consulta;

  familiasTarifarias;

  flag = false;
  flagTarifas;

  constructor(
    private route: ActivatedRoute,
    private vuelosService: VuelosService,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.route.queryParams.subscribe(params => {
      this.arrayDestinos = JSON.parse(params.destinosBuscador)
      this.fechas = JSON.parse(params.fechasDestinos);
      this.totalDestinos = parseInt(params.totalDestino)
      this.consulta = {
        PromotionCode: params.PromotionCode,
        air_content_provider: JSON.parse(params.air_content_provider),
        clase: params.clase,
        destino: JSON.parse(params.destino),
        fechas: JSON.parse(params.fechas),
        idoperador: params.idoperador,
        orden: params.orden,
        pagina: parseInt(params.pagina),
        origen_plataforma: params.origen_plataforma,
        pax: JSON.parse(params.pax),
        resultados: params.resultados,
        type: params.type,
        agencia: JSON.parse(params.agencia),
        personas: JSON.parse(params.personas)
      }
      this.fechas.forEach(res => {
        res.fecha = moment(res.fecha).toDate();
      })
    })
    this.personas = this.consulta.personas;
    this.radioTipoVuelo = this.consulta.type
    this.bsValue = this.consulta.fechas[0].fecha
    this.maxDate = this.consulta.fechas[1].fecha
    this.bsRangeValue = [moment(this.bsValue).toDate(), moment(this.maxDate).toDate()];
  }

  ngOnInit(): void {
    this.getDataDisponibilidad(this.consulta);
  }

  getDataDisponibilidad(params) {
    this.dataVuelos = []
    this.vuelosService.disponibilidadAereos(params).subscribe(res => {
      this.dataVuelos = res.flights[0].flights.items;
    })
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
    }]
    this.radioTipoVuelo = value;
    switch (this.radioTipoVuelo) {
      case 'single':
        this.totalDestinos = 1
        this.arrayDestinos = arrayDeRepuesto
        break;
      case 'roundtrip':
        this.totalDestinos = 1
        this.arrayDestinos = arrayDeRepuesto
        break;
      case 'multitrip':
        this.totalDestinos = 2
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

  formatDuration(durationString) {
    let durationTokens = durationString.split(":");
    let hour = parseInt(durationTokens[0]);
    return hour + "h " + durationTokens[1] + "m";
  }

  formatTime(timeString) {
    let timeTokens = timeString.split(":");
    return `${timeTokens[0]}:${timeTokens[1]}`;
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
      } else {

        destino.origenError = false;
      }
      if (typeof destino.destino === "undefined" || destino.destino === "") {

        destino.destinoError = true;
        isValid = false;
      } else {

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
          }
        }
      }
      if (typeof this.fechas[i].fecha === "undefined") {
        isValid = false;
      }
    }
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

      this.consulta = {
        PromotionCode: 'VLN30',
        air_content_provider: ["amadeus", "volaris"],
        clase: "Clase economica",
        destino: this.aereosForm.destino,
        fechas: this.aereosForm.fechas,
        idoperador: this.user_data.idOperador,
        orden: "precio",
        pagina: 1,
        origen_plataforma: this.user_data.origen,
        pax: this.aereosForm.pax,
        resultados: 200,
        type: this.aereosForm.type,
        agencia: agencia,
        personas: this.personas
      }

      this.router.navigate(['/vuelos/resultados-vuelos'], { queryParams: params })
      this.getDataDisponibilidad(this.consulta)
    }
  }

  openFamiliaTar(value, index) {
    this.flagTarifas = index
    this.flag = !this.flag;
    this.familiasTarifarias = []
    let tramos = value.tramos;
    let ratekey = [];
    let air_content_provider = [];

    for (const tramo of tramos) {
      for (const vuelo of tramo.vuelos) {

        ratekey.push(vuelo.ratekey);
        air_content_provider.push(vuelo.air_content_provider);

      }
    }
    let checkFamily = {
      ratekey,
      air_content_provider: [...new Set(air_content_provider)]
    }
    this.vuelosService.getFamilyFare(checkFamily).subscribe(familias => {
      this.familiasTarifarias = familias;
    })
  }

  closeFamiliaTar(){
    this.flagTarifas = -1
    this.flag = !this.flag;
  }

}
