import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-control-reservas',
  templateUrl: './control-reservas.component.html',
  styleUrls: ['./control-reservas.component.sass']
})
export class ControlReservasComponent implements OnInit {
  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();

  numHab: number;
  habitaciones = [];
  personas = 2;

  otraCantidad = false

  constructor() { 
    this.maxDate.setDate(this.maxDate.getDate() + 2);
    this.bsRangeValue = [this.bsValue, this.maxDate];
    this.numHab = 1;
    this.habitaciones = [{ 'adultos': 2, 'menores': 0, 'edadmenores': [] }];
  }

  ngOnInit(): void {
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

}
