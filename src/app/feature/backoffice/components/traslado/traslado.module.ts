import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrasladoComponent } from './traslado.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightboxModule } from 'ngx-lightbox';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BookingtrasladoComponent } from './bookingtraslado/bookingtraslado.component';
import { ResultadostrasladosComponent } from './resultadostraslados/resultadostraslados.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {GoogleMapsModule} from '@angular/google-maps'; 

const routes: Routes = [
  {
    path: '',
    component: TrasladoComponent,
  },
  {
    path: 'booking-traslado',
    component: BookingtrasladoComponent,
  },
  {
    path: 'resultados-traslados',
    component: ResultadostrasladosComponent,
  },
];

@NgModule({
  declarations: [TrasladoComponent, BookingtrasladoComponent, ResultadostrasladosComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
    LightboxModule,
    SharedModule,
    GooglePlaceModule,
    GoogleMapsModule
  ],
})
export class TrasladoModule { }
