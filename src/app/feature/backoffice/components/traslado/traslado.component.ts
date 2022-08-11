import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { Lightbox } from 'ngx-lightbox';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { TrasladoService } from './services/traslado.service';

@Component({
  selector: 'app-traslado',
  templateUrl: './traslado.component.html',
  styleUrls: ['./traslado.component.sass']
})
export class TrasladoComponent implements OnInit {
  customOptions: OwlOptions = {
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
  radioTipoTraslado = "ida";
  initialDate = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  adultos = 2;
  menores = 0;

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
  
  trasladosForm: FormGroup;
  tipo_tra = 'AH';
  destinos;
  selectedDestino;
  destinoSlect;
  aeropuertos = '';
  hotel;
  round_trip:string = 'one_way';
  submitted: boolean = false;
  loading:boolean = false;

  require = {
    Errorlugar: false,
    ErrorAero: false,
}


  constructor(
    private _lightbox: Lightbox,
    private fb: FormBuilder,
    private trasladosSrvc: TrasladoService,
    private datePipe: DatePipe,
    private router: Router,
  ) {
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.bsRangeValue = [this.initialDate, this.maxDate];

    this.trasladosForm = this.fb.group({
      lugar: ['', Validators.required],
      aeropuerto: [{value: '', disabled: true}, Validators.required],
      hotelLabel: ['', Validators.required],
      tipo_viaje: ['one_way'],
      tipo_traslado: ['AH'],
      fechaServicio: [this.initialDate],
      fechaRegreso: [''],
      adultos: [''],
      menores: ['']
  });

  this.trasladosSrvc.getDestinosTraslado().subscribe(r => {
    this.destinos = r;
});
  }

  ngOnInit(): void {

  }
   get f() { return this.trasladosForm.controls; }

  onChanceRadio(value) {
    this.round_trip = value;
    if(value === 'round_trip') {
      this.trasladosForm.controls['tipo_traslado'].setValue('AH');
      this.tipo_tra='AH'
      this.trasladosForm.controls['fechaRegreso'].setValue(this.bsRangeValue);
    }
    value === 'round_trip' ? this.trasladosForm.controls['tipo_traslado'].disable() : this.trasladosForm.controls['tipo_traslado'].enable();
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

 onSectionChange=(value)=>{}

}
