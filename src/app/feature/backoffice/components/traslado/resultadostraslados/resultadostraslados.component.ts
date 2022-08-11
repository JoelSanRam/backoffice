import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { TrasladoService } from '../services/traslado.service';
import { find } from "lodash-es";
import { AuthService } from 'src/app/core/service/auth.service';
import { formatCurrency } from '@angular/common';
import { FirebaseService } from 'src/app/core/service/firebase/firebase.service';

declare const google: any;
@Component({
  selector: 'app-resultadostraslados',
  templateUrl: './resultadostraslados.component.html',
  styleUrls: ['./resultadostraslados.component.sass']
})
export class ResultadostrasladosComponent implements OnInit {
  initialDate = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  radioTipoTraslado = 'ida';
  adultos = 2;
  menores = 0;

  datosHotel;
  datosAeropuerto;
  trasladosForm: FormGroup;
  round_trip:string = 'one_way';
  tipo_tra = 'AH';
  destinos;
  destinoSlect;
  aeropuertos = '';
  hotel;
  endDate=new Date();
  trasladosResult;
  mapTraslados;
  traslados_compartidos;
  encontrados = 0;
  traslados_privados;
  zonas;
  params;
  placeDestination;
  polygons;
  traslados;
  submitted: boolean = false;
  loading:boolean = false;
  currencies;
  user;
  

  constructor(private route: ActivatedRoute, private fb: FormBuilder, private trasladosSrvc: TrasladoService,
    private datePipe: DatePipe, private router: Router, private authSvc:AuthService, private fs: FirebaseService, ) {
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.bsRangeValue = [this.initialDate, this.maxDate];

    this.trasladosForm = this.fb.group({
      lugar: ['', Validators.required],
      aeropuerto: ['', Validators.required],
      hotelLabel: ['', Validators.required],
      tipo_viaje: [''],
      tipo_traslado: [''],
      fechaServicio: [''],
      fechaRegreso: [''],
      adultos: [''],
      menores: ['']
  });

  this.trasladosSrvc.getDestinosTraslado().subscribe(r => {
    this.destinos = r;
    if(this.aeropuertos ==="" && this.trasladosForm.value.lugar !== ""){
      this.destinoSlect = this.destinos.find(lug => lug.idDestino ==  this.trasladosForm.value?.lugar);
      this.aeropuertos = this.destinoSlect.aeropuertos;
    }
});

  this.fs.currencies.subscribe(data => {
    console.log("firebase",data)
  //   var curr = [];
  //   Object.keys(data).forEach(function (key) {
  //     curr.push(data[key]);
  //  });
  //  this.currencies = curr;
  });

  this.authSvc.getUser('2303').subscribe(user => {
    this.user = user;
  });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if(params){
        console.log("params",params);
          this.trasladosForm.patchValue({
            tipo_viaje: params.tipo_viaje,
            tipo_traslado: params.tipoTrasladoTransporte,
            lugar:JSON.parse(params.lugar).idDestino,
            hotelLabel:decodeURI(params.hotelLabel),
            fechaServicio:moment(params.finicio).format("DD/MM/YYYY"),
            fechaRegreso:moment(params.ffinal)?.format("DD/MM/YYYY") || '',
            adultos: parseInt(params.adultos), 
            menores: parseInt(params.menores) 
        });
    
        let paramsAux = this.trasladosForm.value;
        this.initialDate= paramsAux.fechaServicio;
        this.adultos=paramsAux.adultos;
        this.menores=paramsAux.menores;
        if(this.destinos) 
        {
          this.destinoSlect = this.destinos.find(lug => lug.idDestino ==  this.trasladosForm.value?.lugar);
          this.aeropuertos = this.destinoSlect.aeropuertos;
        }
        if(paramsAux.tipo_viaje === 'round_trip')
        {
          this.trasladosForm.controls['tipo_traslado'].disable();
          this.round_trip='round_trip';
          this.bsRangeValue = [paramsAux.fechaServicio, paramsAux.fechaRegreso];
          this.trasladosForm.controls['fechaRegreso'].setValue(this.bsRangeValue);
        }else{
          this.trasladosForm.controls['tipo_traslado'].enable();
        }
       params.tipoTrasladoTransporte === 'HA' ? this.trasladosForm.controls['aeropuerto'].setValue(JSON.parse(params.destino).idAeropuerto)
       : this.trasladosForm.controls['aeropuerto'].setValue(JSON.parse(params.origen).idAeropuerto);

        console.log("er",this.trasladosForm)
         const paramsUrl = {
           adultos: parseInt(params.adultos),
           destino: JSON.parse(params.destino),
           finicio:params.finicio,
           ffinal: params.ffinal,
           hotelLabel: decodeURI(params.hotelLabel),
           lugar: JSON.parse(params.lugar),
           menores: parseInt(params.menores),
           origen: JSON.parse(params.origen),
           tipoTrasladoTransporte: params.tipoTrasladoTransporte,
           tipo_traslado: params.tipo_traslado,
           tipo_viaje: params.tipo_viaje
         }
        this.params = paramsUrl;
        // if (this.params.tipoTrasladoTransporte == 'AH' || this.params.tipo_viaje == 'round_trip') {
          if (this.params.tipoTrasladoTransporte == 'AH' || this.params.tipo_viaje == 'round_trip') {
            this.hotel = this.params.destino 
            // this.datosHotel = {
            //   nombre: this.params.destino.name,
            //   direccion: this.params.destino.address,
            //   geo: this.params.destino.geometry.location
            // }
  
            // this.datosAeropuerto = {
            //   nombre: this.params.origen.nombre,
            //   direccion: "",
            //   geo: this.params.origen.geometry.location
            // }
          } else {
            this.datosHotel = {
              nombre: this.params.origen.name,
              direccion: this.params.origen.address,
              geo: this.params.origen.geometry.location
            }
  
            // this.datosAeropuerto = {
            //   nombre: this.params.destino.nombre,
            //   direccion: "",
            //   geo: this.params.destino.geometry.location
            // }
          }
        this.searchTraslado(this.params);
      }
    });
  }

  searchTraslado(params) {
    //this.showloader();
    var origen = {
      lat: params.origen.geometry.location.lat,
      lng: params.origen.geometry.location.lng,
      type: 'origen'
    }
    var destino = {
      lat: params.destino.geometry.location.lat,
      lng: params.destino.geometry.location.lng,
      type: 'destino'
    }

    this.mapTraslados = {
      origen: origen,
      destino: destino
    }
    this.getZonasAll(params.lugar.idDestino); 
  }

  getZonasAll(idDestino) {
    this.trasladosSrvc.getZones(idDestino).subscribe(r => {
      this.zonas = r
      this.loadZonesMap(this.zonas);
    });
  }

  onBuscarTraslado=()=>{
    console.log("fecha1",this.initialDate)
    const data = this.trasladosForm.value;
    const aero = this.destinoSlect.aeropuertos.find(areop => areop.idAeropuerto == data.aeropuerto);
    let tt;
    this.submitted = true;
    this.loading = true;
  
    // if (data.lugar === '') {
    //     this.require.Errorlugar = true;
    //     this.loading = false;
    //     return;
    // }
    // this.require.Errorlugar = false;
    // if (data.aeropuerto == '') {
    //     this.require.ErrorAero = true;
    //     this.loading = false;
    //     return;
    // }
    // this.require.ErrorAero = false;
    // if (this.trasladosForm.invalid) {
    //     this.loading = false;
    //     return;
    // }
    let traslado = {
      adultos: this.adultos,
      destino: '',
      finicio: this.datePipe.transform(data.tipo_viaje === 'one_way' ? data.fechaServicio : data.fechaRegreso[0] , 'yyyy-MM-dd'),
      ffinal: this.datePipe.transform(data.tipo_viaje === 'one_way' ? '' : data.fechaRegreso[1], 'yyyy-MM-dd'),
      hotelLabel: data.hotelLabel,
      lugar: this.destinoSlect,
      menores: this.menores,
      origen: '',
      tipoTrasladoTransporte: data.tipo_viaje=== 'one_way' ? data.tipo_traslado : this.tipo_tra,
      tipo_traslado: '',
      tipo_viaje: data.tipo_viaje
  };
    if (data.tipo_viaje == 'one_way') {
        if (data.tipo_traslado == 'AH') {
            tt = 'aeropuerto';
            traslado.destino = this.hotel;
            traslado.tipo_traslado = tt; 
            traslado.origen = aero; 
        } else {
             tt = 'hotel';
             traslado.destino = aero;
             traslado.tipo_traslado = tt;
             traslado.origen = this.hotel; 
        }
    } else {
         tt = 'aeropuerto';
         traslado.destino = this.hotel;
         traslado.tipo_traslado = tt;
         traslado.origen = aero; 
      }
      console.log("traslado", traslado)
      const lugarAux = JSON.stringify(traslado.lugar);
      const destinoAux = JSON.stringify(traslado.destino);
      const origenAux= JSON.stringify(traslado.origen);
      const setParamsUrl={
        adultos: traslado.adultos,
        destino: destinoAux,
        finicio: this.datePipe.transform(traslado.finicio, 'yyyy-MM-dd'),
        ffinal: this.datePipe.transform(traslado.ffinal, 'yyyy-MM-dd'),
        hotelLabel: encodeURI(traslado.hotelLabel),
        lugar: lugarAux,
        menores: traslado.menores,
        origen: origenAux,
        tipoTrasladoTransporte: traslado.tipoTrasladoTransporte,
        tipo_traslado: traslado.tipo_traslado,
        tipo_viaje: traslado.tipo_viaje
      }
    this.router.navigate(['/traslado/resultados-traslados'], { queryParams: setParamsUrl })
    this.loading = false;
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

  onChanceRadio(value) {
    this.round_trip = value;
    if(value === 'round_trip') {
      this.trasladosForm.controls['tipo_traslado'].setValue('AH');
      this.tipo_tra='AH'
      this.trasladosForm.controls['fechaRegreso'].setValue(this.bsRangeValue);
    }
    value === 'round_trip' ? this.trasladosForm.controls['tipo_traslado'].disable() : this.trasladosForm.controls['tipo_traslado'].enable();
  }

  changeTipoTraslado(tipoTrasladoTransporte) {
    this.tipo_tra = tipoTrasladoTransporte;
}

getAirports(idAirport) {
  this.destinoSlect= this.destinos.find(destino => destino.idDestino == idAirport);
  this.trasladosForm.controls['aeropuerto'].enable();
  this.trasladosForm.controls['aeropuerto'].setValue('');
  this.aeropuertos = this.destinoSlect.aeropuertos;
  //this.require.Errorlugar = false;
}

handleAddressChange(address: any) {
  let labelhotel = address.name;
  for (let i = 0; i < address.address_components.length; i++) {
      labelhotel += ', ' + address.address_components[i].long_name;
  }
  this.trasladosForm.patchValue({ hotelLabel: labelhotel });
  this.hotel = {
      address: address.formatted_address,
      geometry: address.geometry,
      name: address.name,
      place_id: address.place_id
  };
}

searchTraslados(params) {
  this.placeDestination = {
    origen: [],
    destino: []
  }

  if (typeof this.params.origen.geometry.location.lat === 'function') {
    this.mapTraslados.origen.lat = parseFloat(this.params.origen.geometry.location.lat());
    this.mapTraslados.origen.lng = parseFloat(this.params.origen.geometry.location.lng());
  } else {
    this.mapTraslados.origen.lat = parseFloat(this.params.origen.geometry.location.lat);
    this.mapTraslados.origen.lng = parseFloat(this.params.origen.geometry.location.lng);
  }

  if (typeof this.params.destino.geometry.location.lat === 'function') {
    this.mapTraslados.destino.lat = parseFloat(this.params.destino.geometry.location.lat());
    this.mapTraslados.destino.lng = parseFloat(this.params.destino.geometry.location.lng());
  } else {
    this.mapTraslados.destino.lat = parseFloat(this.params.destino.geometry.location.lat);
    this.mapTraslados.destino.lng = parseFloat(this.params.destino.geometry.location.lng);
  }
   this.getContainsLocationZone(this.polygons, this.mapTraslados.origen);
   this.getContainsLocationZone(this.polygons, this.mapTraslados.destino);

  let zonaA = [];
  let zonaB = [];
  this.traslados = {
    privado: [],
    compartido: []
  };

  // if (typeof this.placeDestination.origen == 'undefined') {
  //   // loading.finish();
  //   this.sweetAlertService.error('', zona);
  //   return;
  // }
  // if (typeof this.placeDestination.destino == 'undefined') {
  //   // loading.finish();
  //   this.sweetAlertService.error('', zona);
  //   return;
  // }

  switch (params.tipo_traslado) {
    case 'aeropuerto':
      if (typeof this.placeDestination.destino !== 'undefined') {
        for (let d of this.placeDestination.destino) {
          zonaA.push(d.idZona);
        }
      }
      break;
    case 'hotel':
      if (typeof this.placeDestination.origen !== 'undefined') {
        for (let d of this.placeDestination.origen) {
          zonaA.push(d.idZona);
        }
      }
      break;
  }
  let idsOrigen = [];
  let idsDestino = [];

  for (let d of this.placeDestination.origen) {
    idsOrigen.push(d.idZona);
  }
  for (let d of this.placeDestination.destino) {
    idsDestino.push(d.idZona);
  }

  let $json = {
    origenZona: idsOrigen,
    destinoZona: idsDestino,
    finicio: params.finicio,
    ffinal: params.ffinal,
    edadmenores: [], 
    tipo_viaje: params.tipo_viaje,
    tipo_traslado: params.tipoTrasladoTransporte,
    zonaA: zonaA,
    zonaB: zonaB,
    menores: this.menores,
    adultos: this.adultos,
    ocupacion: params.ocupacion
  };

  this.trasladosSrvc.getTrasladosAvailables($json).subscribe(r => {
    //this.hideLoader();
    this.encontrados = r.results.encontrados;
    this.traslados_compartidos = r.results.compartido;
    this.traslados_privados = r.results.privado;
  });
}

getContainsLocationZone(polygons, locationPlace) {
  const Lat = parseFloat(locationPlace.lat.toFixed(6));
  const Lng = parseFloat(locationPlace.lng.toFixed(6));
  const mode = locationPlace.type;

  for (let h = 0; h < polygons.length; h++) {
    const markerPlace = new google.maps.LatLng(Lat, Lng);
    const containLocation = google.maps.geometry.poly.containsLocation(markerPlace, polygons[h]); //poly not defined
    if (containLocation) {
      switch (mode) {
        case 'origen':
          this.placeDestination.origen.push(polygons[h]);
          break;
        case 'destino':
          this.placeDestination.destino.push(polygons[h]);
          break;
      }
    }
  }
}
loadZonesMap(collectionZonas) {
  let arr = new Array();
  this.polygons = [];
  for (let i = 0; i < collectionZonas.length; i++) {
    arr = [];
    this.zonas[i].selectd = true;
    const geo = collectionZonas[i].geo;
    for (let j = 0; j < geo.length; j++) {
      arr.push(new google.maps.LatLng(
        parseFloat(geo[j].lat),
        parseFloat(geo[j].lng)
      ));
    }
    let trZona = this.zonas[i].zona_id;
    this.polygons.push(new google.maps.Polygon({
      paths: arr,
      strokeOpacity: 0,
      strokeWeight: 2,
      fillOpacity: 0,
      idZona: trZona
    }));
  }

  this.searchTraslados(this.params);
}

priceSince(tarf, div, tc = 0) {
  var divisa = div;
  var total = tarf;
  if (!tc) {
    var currency = find(this.currencies, function (current_c) {
      return current_c.currency_name == divisa;
    });
    tc = currency.tasa_cambio;
  }
  var total_currency = total * tc;
  var html = '';
  html = ' <span class="text-orange">' + this.user.currency + '</span> ' + '<span class="text-blue">$' + formatCurrency(total_currency, 'en-EN', '', '1') + '</span>';
  return html;
}

gotoBook(book) {
    console.log("booking",book)
  book.tipoTrasladoTransporte = this.params.tipoTrasladoTransporte;
  // book.info.descripcion = this.removeAccents(book.info.descripcion);
  // book.info.politicas = this.removeAccents(book.info.politicas);
  // book.info.informacion = this.removeAccents(book.info.informacion);
  // book.politicas.politicasCancelacion = this.removeAccents(book.politicas.politicasCancelacion);
  // book.datosHotel = this.datosHotel;
  // book.datosAeropuerto = this.datosAeropuerto;

  // if (book.politicas.id != 0) {
  //   if (this.permisos_gastoCan == 1) {
  //     this.sweetAlertService.confirm({
  //       title: book.politicas.title,
  //       text: book.politicas.descripcion,
  //       confirmButtonText: 'Continuar'
  //     }, this.politicas.bind(this, book));
  //     // MSG.confirm( book.politicas.title, book.politicas.descripcion ,"warning","Continuar",politicas);
  //   } else {
  //     this.sweetAlertService.info(book.politicas.title, book.politicas.descripcion);
  //   }
  // }
  // else {
  //   var bookJson = JSON.stringify(book);
  //   localStorage.setItem('traslado-detalle', bookJson);
  //   this.router.navigate(['/booking-traslado']);
  // }
   
}


}
