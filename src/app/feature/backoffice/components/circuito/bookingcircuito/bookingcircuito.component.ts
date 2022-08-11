import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CircuitoService } from '../../../services/circuito.service';

@Component({
  selector: 'app-bookingcircuito',
  templateUrl: './bookingcircuito.component.html',
  styleUrls: ['./bookingcircuito.component.sass']
})
export class BookingcircuitoComponent implements OnInit {
  circuitoBook;
  consulta;
  adultos = 0;
  menores = 0;

  constructor(
    private route: ActivatedRoute,
    private circuitoService: CircuitoService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
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
      });
      let numAdulto = 0;
      let numMenor = 0;
      this.consulta.habs.forEach(res =>  {
        numAdulto += res.adultos
        numMenor += res.menores
      });
      this.adultos=numAdulto;
      this.menores=numMenor;
  }

  ngOnInit(): void {
    this.circuitoBook = JSON.parse(localStorage.getItem("infoCircuito"));
  }

  numSequence(n: number): Array<number> {
    return Array(n);
  }

  backResults() {
    this.router.navigate(['/circuito/resultado-circuito'], { queryParamsHandling: 'preserve' });
  }

}
