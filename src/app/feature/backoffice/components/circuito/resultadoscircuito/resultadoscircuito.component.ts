import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import * as moment from 'moment';
import { CircuitoService } from '../../../services/circuito.service';
import { Observable, Observer, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-resultadoscircuito',
  templateUrl: './resultadoscircuito.component.html',
  styleUrls: ['./resultadoscircuito.component.sass']
})
export class ResultadoscircuitoComponent implements OnInit {
  bsValue = moment().toDate();
  fecha = this.bsValue.toDateString()
  minDate = new Date();

  numHab: number;
  habitaciones = [];
  personas = 2;
  edadMenores = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  destinos;
  destino;
  buscadorCircuito: FormGroup;
  filtrosCircuito: FormGroup;

  searchParams;
  consulta;

  existParams = false;
  circuitosDisponibles = [];
  catFiltro = [];

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private circuitoService: CircuitoService,
    private router: Router,
  ) {
    this.numHab = 1;
    this.buscadorCircuito = this.formBuilder.group(
      {
        d: ['', [Validators.required, Validators.minLength(2)]],
        dt: [this.bsValue, Validators.required],
        ts: ['CIR'],
        nhabs: [''],
        habs: [''],
        matchs: [''],
      }
    );

    this.filtrosCircuito = this.formBuilder.group({
      ordenar: ['PRICE_ASC'],
      proveedor: [''],
      categorias: ['']
    });

    this.route.queryParams
      .subscribe(params => {
        this.consulta = {
          d: decodeURI(params.destino),
          dt: params.fecha,
          ts: params.tipoServicio,
          nhabs: parseInt(params.nhabs),
          habs: JSON.parse(params.habs),
          matchs: params.matchs,
        }
        this.buscadorCircuito.patchValue({
          d: decodeURI(params.destino),
          dt: decodeURI(moment(params.fecha).format("DD/MM/YYYY")),
          matchs: params.matchs
        });
      });
    this.habitaciones = this.consulta.habs;
    this.calcularTotalPersonas();
    this.numHab = this.consulta.nhabs
  }

  ngOnInit(): void {
    this.destinos = new Observable((observer: Observer<any>) => {
      observer.next(this.buscadorCircuito.value.d);
    }).pipe(
      switchMap((query: any) => {
        if (query) {
          return this.circuitoService.autocomplete(query, 'CIR', 'D,S');
        }
        return of([]);
      })
    );
    this.searchCircuito(this.consulta);
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

  searchCircuito(paramsBusqueda) {
    this.circuitosDisponibles = [];

    this.circuitoService.searchCircuitos(paramsBusqueda).subscribe(res => {
      this.existParams = true;
      this.circuitosDisponibles = res.results;
      this.catFiltro = res.categorias;

    });
  }

  edadMenor(indexHab, indexEdadmenores, value) {
    this.habitaciones[indexHab].edadmenores[indexEdadmenores].edad = value;
  }

  onSelect(event: TypeaheadMatch): void {
    this.buscadorCircuito.patchValue({ d: event.item.label });
    this.buscadorCircuito.patchValue({ matchs: event.item.matchs });
    this.destino = event.item;
  }

  setIconClass(destino) {
    if (destino.type === 'S') {
      return 'fa-flag';
    } else {
      return 'fa-globe-americas';
    }
  }

  orderByPrice() {
    let order = this.filtrosCircuito.value.ordenar
    switch (order) {
      case 'PRICE_ASC':
        this.circuitosDisponibles.sort(
          (a, b) => parseFloat(a.total.publico_currency) - parseFloat(b.total.publico_currency)
        );
        break;
      case 'PRICE_DESC':
        this.circuitosDisponibles.sort(
          (a, b) => parseFloat(b.total.publico_currency) - parseFloat(a.total.publico_currency)
        );
        break;
    }
  }

  submitSearchCircuito() {
    let pureba = moment(this.buscadorCircuito.value.dt).format("YYYY-MM-DD")
    this.buscadorCircuito.value.nhabs = this.numHab;
    this.buscadorCircuito.value.habs = this.habitaciones;
    this.buscadorCircuito.value.dt = pureba;

    this.searchParams = {
      d: this.buscadorCircuito.value.d,
      dt: this.buscadorCircuito.value.dt,
      ts: 'CIR',
      nhabs: this.buscadorCircuito.value.nhabs,
      habs: this.buscadorCircuito.value.habs,
      matchs: this.buscadorCircuito.value.matchs,
    };

    let params = {
      destino: encodeURI(this.buscadorCircuito.value.d),
      fecha: encodeURI(this.buscadorCircuito.value.dt),
      tipoServicio: this.buscadorCircuito.value.ts,
      nhabs: this.buscadorCircuito.value.nhabs,
      habs: (JSON.stringify(this.buscadorCircuito.value.habs)),
      matchs: this.buscadorCircuito.value.matchs
    };
    this.router.navigate(['/circuito/resultado-circuito'], { queryParams: params })
    this.searchCircuito(this.searchParams);
  }

  detalleTour(data) {
    this.router.navigate([`/circuito/circuito-detalle/${data}`], { queryParams: { id: data }, queryParamsHandling: 'merge' })
  }

  errorImg(event) {
    event.target.src = 'https://azabachetour.com/img/assets/noimage.jpg'
  }

  bookingCircuito(i) {
    console.log(i)
    localStorage.setItem('infoCircuito', JSON.stringify(i))
    this.router.navigate(['/circuito/booking-circuito'], { queryParamsHandling: 'preserve' })
  }

}
