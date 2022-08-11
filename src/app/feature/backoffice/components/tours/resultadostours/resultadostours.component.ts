import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToursService } from '../../../services/tours.service';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead/typeahead-match.class';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable, Observer, of, Subject } from 'rxjs';
import { switchMap, debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
@Component({
    selector: 'app-resultadostours',
    templateUrl: './resultadostours.component.html',
    styleUrls: ['./resultadostours.component.sass']
})
export class ResultadostoursComponent implements OnInit {

    subject: Subject<any> = new Subject();

    bsValue = moment().toDate();
    fecha = this.bsValue.toDateString()

    bsRangeValue: Date[];
    maxDate = new Date();
    minDate = new Date();

    adultos = 2;
    menores = 0;

    toursDisponibles = [];
    existParams = false

    toursResult;
    catFiltro;
    categoryFilters;
    consulta;

    destinos;
    destino;
    buscadorTour: FormGroup;
    filtrosTour: FormGroup;
    searchParams; //variable que contentra cambios de parametros de busqueda
    constructor(
        private route: ActivatedRoute,
        private toursService: ToursService,
        private router: Router,
        private formBuilder: FormBuilder,
    ) {

        this.fecha = moment(new Date()).format("YYYY-MM-DD")

        this.buscadorTour = this.formBuilder.group(
            {
                d: ['', Validators.required],
                typeDes: [''],
                dt: [this.bsValue, Validators.required],
                ts: ['TOU'],
                ocupacion: [1],
                adultos: [this.adultos],
                menores: [this.menores],
            }
        );

        this.filtrosTour = this.formBuilder.group({
            ordenar: ['PRICE_ASC'],
            proveedor: [''],
            categorias: ['']
        });

        //! arma primero el formulario buscador de resultados y arma el var searchParams
        this.route.queryParams
            .subscribe(params => {
                this.consulta = {
                    d: decodeURI(params.destino),
                    dt: params.fecha,
                    ts: params.tipoServicio,
                    ocupacion: params.ocupacion,
                    adultos: params.adultos,
                    menores: params.menores,
                }
                this.adultos = parseInt(params.adultos);
                this.menores = parseInt(params.menores);
                this.buscadorTour.patchValue({
                    d: decodeURI(params.destino),
                    dt: decodeURI(moment(params.fecha).format("DD/MM/YYYY"))
                });

                this.searchParams = {
                    d: decodeURI(params.destino),
                    dt: params.fecha,
                    ts: 'TOU',
                    ocupacion: 1,
                    adultos: parseInt(params.adultos),
                    menores: parseInt(params.menores)
                };
            });
    }

    ngOnInit(): void {

        this.destinos = new Observable((observer: Observer<any>) => {
            observer.next(this.buscadorTour.value.d);
        }).pipe(
            switchMap((query: any) => {
                if (query) {
                    return this.toursService.autocomplete(query, 'TOU', 'D,S');
                }
                return of([]);
            })
        );

        this.subject.pipe(debounceTime(1000)).subscribe(() => {
            this.toursDisponibles.forEach(tour => {
                tour = this.toursResult.filter((tour) => {
                    tour.info.proveedor.proveedor.includes(this.filtrosTour.value.proveedor.toUpperCase())
                });
                // this.toursDisponibles = tour
            })
        })

        this.searchTour(this.searchParams);
    }

    removeAccents(value) {
        return value.replace(/á/g, 'a').replace(/é/g, 'e').replace(/í/g, 'i').replace(/ó/g, 'o').replace(/ú/g, 'u');
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

    onSelect(event: TypeaheadMatch): void {
        this.buscadorTour.patchValue({
            d: event.item.label,
            s: event.item.label,
            typeDes: event.item.type
        });
        this.destino = event.item;
    }

    tourDetalle(i) {
        this.toursService.searchTours(this.consulta).subscribe(res => {
            let resultados = res.results
            let params = {
                destino: encodeURI(res.searchParameters.d),
                fecha: res.searchParameters.dt,
                tipoServicio: res.searchParameters.ts,
                ocupacion: res.searchParameters.ocupacion,
                adultos: res.searchParameters.adultos,
                menores: res.searchParameters.menores,
            }
            this.router.navigate([`/tours/tour-detalle/${resultados[i].info.url_page}`], { queryParams: params })
        })
    }

    filterByOrdenar() {
        switch (this.filtrosTour.value.ordenar) {
            case 'PRICE_ASC':
                this.toursResult.sort(
                    (a, b) =>
                        parseFloat(a.tarifas.publica.adulto_currency) - parseFloat(b.tarifas.publica.adulto_currency)
                );
                break;
            case 'PRICE_DESC':
                this.toursResult.sort(
                    (a, b) =>
                        parseFloat(b.tarifas.publica.adulto_currency) - parseFloat(a.tarifas.publica.adulto_currency)
                );
                break;
        }
    }

    filterByName() {
        /*     this.toursDisponibles.forEach(tour => {
              tour = this.toursResult.filter((tour) => {
                tour.info.proveedor.proveedor.includes(this.filtrosTour.value.proveedor.toUpperCase())
              });
            }) */
        this.subject.next();
    }

    searchTour(paramsBusqueda) {
        this.toursDisponibles = [];

        this.toursService.searchTours(paramsBusqueda).subscribe(res => {
            this.existParams = true;
            this.toursDisponibles = res.results;
            this.catFiltro = [];
            for (const tour of this.toursDisponibles) {
                const categorias = tour.info.categorias;
                for (const c of categorias) {
                    this.catFiltro.push(c);
                }
            }
            // this.catFiltro = uniq(this.catFiltro, (e) => e);

            this.toursService.filtersNameTours(this.catFiltro).subscribe((categories) => {
                this.categoryFilters = categories;
            });
        });
    }

    submitSearchTour() { //Este metodo es para el boton propio del formulario
        if(this.buscadorTour.invalid){
            console.log('simon')
            return
          }
        let pureba = moment(this.buscadorTour.value.dt).format("YYYY-MM-DD");
        this.buscadorTour.value.dt = pureba;
        this.buscadorTour.value.adultos = this.adultos;
        this.buscadorTour.value.menores = this.menores;

        this.searchParams = {
            d: this.buscadorTour.value.d,
            dt: this.buscadorTour.value.dt,
            ts: 'TOU',
            ocupacion: 1,
            adultos: this.buscadorTour.value.adultos,
            menores: this.buscadorTour.value.menores
        };

        let params = {
            destino: encodeURI(this.buscadorTour.value.d),
            fecha: encodeURI(this.buscadorTour.value.dt),
            tipoServicio: this.buscadorTour.value.ts,
            ocupacion: this.buscadorTour.value.ocupacion,
            adultos: this.buscadorTour.value.adultos,
            menores: this.buscadorTour.value.menores
        }
        this.router.navigate(['/tours/resultados-tour'], { queryParams: params });

        this.searchTour(this.searchParams);
    }

    bookingTour(i) {
        localStorage.setItem('infoTour', JSON.stringify(i))
        this.router.navigate(['/tours/booking-tour'],  {queryParamsHandling: 'preserve'})
    }

}
