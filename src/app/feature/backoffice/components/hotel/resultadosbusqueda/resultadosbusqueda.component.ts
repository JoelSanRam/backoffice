import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-resultadosbusqueda',
  templateUrl: './resultadosbusqueda.component.html',
  styleUrls: ['./resultadosbusqueda.component.sass'],
})
export class ResultadosbusquedaComponent implements OnInit {


  khe = 'Tarifas'

  hoteles = [
    {
      idHotel: 1,
      nombreHotel: 'Bahia',
      direccion: 'calle 19',
      brokers: [
        {
          idBorker: 1,
          nombreBroker: 'Suit',
          habitaciones: [
            { idHablitación: 1, nombreHabitacion: 'a1' },
            { idHablitación: 2, nombreHabitacion: 'a2' },
          ],
        },
        {
          idBorker: 2,
          nombreBroker: 'Villa',
          habitaciones: [
            { idHablitación: 1, nombreHabitacion: 'a1' },
            { idHablitación: 2, nombreHabitacion: 'a2' },
          ],
        },
        {
          idBorker: 3,
          nombreBroker: 'Mexa',
          habitaciones: [
            { idHablitación: 1, nombreHabitacion: 'a1' },
            { idHablitación: 2, nombreHabitacion: 'a2' },
          ],
        },
      ],
    },


  ];

  bsValue = new Date();
  bsRangeValue: Date[];
  maxDate = new Date();
  minDate = new Date();
  noHabitaciones = 1;
  Adultos = [1];
  Menores = [];

  arrayHabitaciones = [{
    habitaciones: {
      adultos: 1,
      menores: 0
    },
    index: 0
  }]

  numHab: number;
  habitaciones = [];
  personas = 2;

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
