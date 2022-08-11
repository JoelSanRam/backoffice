import { Component, OnInit } from '@angular/core';
import { MicroblogService } from '../service/microblog.service';

@Component({
  selector: 'app-microblog',
  templateUrl: './microblog.component.html',
  styleUrls: ['./microblog.component.sass']
})
export class MicroblogComponent implements OnInit {
  publicaciones;
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
    },{
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
    },]
  },];
  constructor(
    private microblogService: MicroblogService
  ) { }

  ngOnInit(): void {
    this.getPublicaciones()
  }

  getPublicaciones(){
    this.microblogService.getPublicaciones().subscribe(res => {
      this.publicaciones = res.data;
      console.log(this.publicaciones)
    })
  }

}
