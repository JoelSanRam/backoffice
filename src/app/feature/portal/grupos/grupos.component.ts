import { Component, OnInit } from '@angular/core';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { GruposService } from '../service/grupos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['./grupos.component.sass']
})
export class GruposComponent implements OnInit {

  cotizaciones;
  detallesCotizacion?;
  mensajesCotizacion?;
  folioMensaje;
  fechaMensaje = [];
  horaMensaje;
  returnedArray?: string[];
  indexParaMensaje;
  idAgencia;
  idAuth;
  mensaje = '';

  constructor(
    private gruposService: GruposService,
  ) {
    this.detallesCotizacion = {};
  }

  ngOnInit(): void {
    this.getHistorial();
    this.cotizaciones = this.cotizaciones?.map((v: string, i: number) => `Content line ${i + 1}`);
    this.returnedArray = this.cotizaciones?.slice(0, 10);
  }

  getHistorial() {
    this.gruposService.getGruposList().subscribe(res => {
      this.cotizaciones = res;
    })
  }

  getDetalle(id) {
    this.detallesCotizacion = {};
    this.detallesCotizacion = this.cotizaciones[id];
  }

  getMensajes(id, index) {
    this.folioMensaje = id
    this.indexParaMensaje = index
    this.gruposService.getMensajes(id).subscribe(res => {
      this.mensajesCotizacion = res;
      this.mensajesCotizacion.map(function (hora) {
        hora.prueba = (moment(hora.fecha).format('hh:mm'))
      })
      console.log(this.mensajesCotizacion);
      console.log(index);
    });
  }

  sendMensaje(mensaje) {
    this.getDetalle(this.indexParaMensaje)
    this.idAgencia = this.detallesCotizacion.idAgencia
    this.idAuth = this.detallesCotizacion.idAuth
    // return
    const params = {
      folio: this.folioMensaje,
      idAgencia: this.detallesCotizacion.idAgencia,
      idAuth: this.idAuth,
      mensaje: mensaje
    }
    this.gruposService.sendMensaje(params).subscribe(response => {
      this.mensaje = '';
      this.getMensajes(this.folioMensaje, this.indexParaMensaje);
    })
    console.log(mensaje)
  }

  pageChanged(event: PageChangedEvent): void {
    const startItem = (event.page - 1) * event.itemsPerPage;
    const endItem = event.page * event.itemsPerPage;
    this.returnedArray = this.cotizaciones.slice(startItem, endItem);
  }

}
