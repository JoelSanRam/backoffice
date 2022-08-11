import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GruposService } from '../../service/grupos.service';
import * as moment from 'moment';
@Component({
  selector: 'app-cotizar',
  templateUrl: './cotizar.component.html',
  styleUrls: ['./cotizar.component.sass']
})
export class CotizarComponent implements OnInit {

  zonaEventos = false;
  arregloFechaComparativa = [];

  hotelesList;
  regiones;
  tipoGrupo;
  planes;
  eventos;
  servicios;
  
  bsValue = moment().toDate();
  bsRangeValue=[];
  isMeridian = true;
  myTime = new Date();

  cotizarForm: FormGroup;
  habitaciones = [
    { tipo: 'SGL', },
    { tipo: 'DBL' },
    { tipo: 'TPL' },
    { tipo: 'CPL' }
  ];

  arregloHotes = [];
  arregoFechas = [];
  arregloTipoOcupacion = [];
  arregloTipoServicios = [];

  params;

  constructor(
    private gruposService: GruposService,
    private formBuilder: FormBuilder,
  ) {
    // this.maxDate.setDate(this.maxDate.getDate() + 2);
    const after7days =  moment(this.bsValue).add(7, 'days').toDate();
    this.bsRangeValue = [this.bsValue, after7days];
    this.cotizarForm = this.formBuilder.group({
      hotelInicial: [],
      hoteles: [, Validators.required],
      rangoInicial: [this.bsRangeValue],
      fechas: [],
      tipoGrupo: [],
      planAlimentos: [],
      habs: [5, Validators.required],
      tipoOcupacion: [],
      menores: [false],
      tipoEvento: [],
      pax: [6],
      dia: [],
      hora: [],
      duracion: [],
      servicios: [],
      observaciones: []
    })
  }

  ngOnInit(): void {
    this.getHoteles();
    this.getTipos();
    this.getPlanAli();
    this.getEventos();
    this.getServicios();
    this.cotizarForm.patchValue({
      // tipoGrupo: this.tipoGrupo[0]
    });
    
  }

  zonaBanquetesActivar() {
    this.zonaEventos = !this.zonaEventos
  }

  getHoteles() {
    this.gruposService.getHotelesGrupos().subscribe(response => {
      this.hotelesList = response;
      this.regiones = Array.from(new Set(response.map(({ region }) => region)));
    });
  }

  getTipos() {
    this.gruposService.getTipos().subscribe(response => {
      
      this.tipoGrupo = response;
      this.cotizarForm.controls['tipoGrupo'].setValue(response[0].nombre);
    });
  }

  getPlanAli() {
    this.gruposService.getPlanAlimentos().subscribe(response => {
      this.planes = response;
      this.cotizarForm.controls['planAlimentos'].setValue(response[0].nombre);
    });
  }

  getEventos() {
    this.gruposService.getEventos().subscribe(response => {
      this.eventos = response;
      this.cotizarForm.controls['tipoEvento'].setValue(response[0].nombre);
    });
  }

  getServicios() {
    this.gruposService.getServicios().subscribe(response => {
      this.servicios = response;
    });
  }

  addHotel(){
    if(this.arregloHotes.includes(this.cotizarForm.value.hotelInicial) || this.cotizarForm.value.hotelInicial == undefined){
      return
    }
    this.arregloHotes.push(this.cotizarForm.value.hotelInicial)
    console.log(this.arregloHotes);
  }

  remHotel(i){
    this.arregloHotes.splice(i, 1);
  }

  getFechas() {
    let objFechas={
      finicio:moment(this.cotizarForm.value.rangoInicial[0]).format('YYYY-MM-DD'),
      ffinal:moment(this.cotizarForm.value.rangoInicial[1]).format('YYYY-MM-DD')
    };

    let comparar:string
    comparar = `${objFechas.finicio} - ${objFechas.ffinal}`
    
    if(this.arregloFechaComparativa.includes(comparar)){
      console.log(this.arregloFechaComparativa)
      return
    }
    this.arregloFechaComparativa.push(comparar)
    this.arregoFechas.push(objFechas)
    console.log(this.arregoFechas);
    
  }

  remFecha(i){
    this.arregoFechas.splice(i, 1);
    this.arregloFechaComparativa.splice(i, 1);
  }

  changeTipoOcupacion(event, tipo){
    let index;
    if(event == true){
      this.arregloTipoOcupacion.push({'tipo': tipo})
    }else{
      index = this.arregloTipoOcupacion.indexOf(tipo);
      this.arregloTipoOcupacion.splice(index, 1)
    }
  }

  changeTipoServicios(event, tipo){
    let index;
    if(event){
      this.arregloTipoServicios.push(tipo);
    }else {
      index = this.arregloTipoServicios.indexOf(tipo);
      this.arregloTipoServicios.splice(index, 1)
    }
    console.log(this.arregloTipoServicios)
  }

  cotizar() {
    if(this.cotizarForm.value.menores == true){
      this.cotizarForm.value.menores = 'SI';
    }else {
      this.cotizarForm.value.menores = 'NO';
    }
    let horitaBonita = moment(this.cotizarForm.value.hora).format('HH:mm')
    this.cotizarForm.value.hoteles = this.arregloHotes;
    this.cotizarForm.value.fechas = this.arregoFechas;
    this.cotizarForm.value.tipoOcupacion = this.arregloTipoOcupacion;
    this.cotizarForm.value.servicios = this.arregloTipoServicios;
    this.cotizarForm.value.hora = horitaBonita;
    if(this.arregloHotes.length < 1 || this.arregoFechas.length < 1){
      return
    }
    console.log(this.cotizarForm.value);
    let evento;
    if (this.zonaEventos) {
      evento = {
        tipoEvento: this.cotizarForm.value.tipoEvento,
        nPer: this.cotizarForm.value.pax,
        dia: this.cotizarForm.value.dia,
        hora: this.cotizarForm.value.hora,
        duracion: this.cotizarForm.value.duracion,
        servicios: this.arregloTipoServicios
      }
    } else {
      evento = {}
    }

    this.params = {
      hotel: this.arregloHotes,
      fechas: this.arregoFechas,
      tipoGrupo: this.cotizarForm.value.tipoGrupo,
      nhab: this.cotizarForm.value.habs,
      tipoHabs: this.arregloTipoOcupacion,
      planes: this.cotizarForm.value.planAlimentos,
      menores: this.cotizarForm.value.menores,
      obser: this.cotizarForm.value.observaciones,
      evento: evento,
    }
    console.log(this.params)
    // return
    this.gruposService.sendMail(this.params).subscribe(response => {
      console.log(response)
    });
  }

}
