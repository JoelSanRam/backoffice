import { Component, OnInit } from '@angular/core';
import { ToursService } from '../../../services/tours.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-bookingtours',
  templateUrl: './bookingtours.component.html',
  styleUrls: ['./bookingtours.component.sass']
})
export class BookingtoursComponent implements OnInit {
  consulta;
  adultos;
  menores;
  tourBook;
  ligaPago = 'Liga de pago bien bonita'
  otraCantidad;

  constructor(
    private route: ActivatedRoute,
    private toursService: ToursService,
    private router: Router,
    private formBuilder: FormBuilder,
  ) {
    this.route.queryParams
    .subscribe(params => {
        this.consulta = {
            s: decodeURI(params.destino),
            dt: params.fecha,
            ts: params.tipoServicio,
            ocupacion: params.ocupacion,
            adultos: params.adultos,
            menores: params.menores,
        }

        this.adultos = parseInt(params.adultos);
        this.menores = parseInt(params.menores);

    });
   }

  ngOnInit(): void {
    this.tourBook = JSON.parse(localStorage.getItem("infoTour"))
    console.log(this.tourBook)
  }

  backResults(){
    this.router.navigate(['/tours/resultados-tour'], {queryParamsHandling: 'preserve'});
  }

  copiarLigaPago(){
    navigator.clipboard.writeText(this.ligaPago)
  }

}
