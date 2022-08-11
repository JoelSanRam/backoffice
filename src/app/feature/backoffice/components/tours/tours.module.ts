import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ToursComponent } from './tours.component'; 
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightboxModule } from 'ngx-lightbox';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BookingtoursComponent } from './bookingtours/bookingtours.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultadostoursComponent } from './resultadostours/resultadostours.component';
import { TourindividualComponent } from './tourindividual/tourindividual.component';

const routes: Routes = [
  {
    path: '',
    component: ToursComponent,
  },
  {
    path: 'booking-tour',
    component: BookingtoursComponent,
  },
  {
    path: 'resultados-tour',
    component: ResultadostoursComponent,
  },
  {
    path: 'tour-detalle/:url_page',
    component: TourindividualComponent,
  },
];

@NgModule({
  declarations: [ToursComponent, BookingtoursComponent, ResultadostoursComponent, TourindividualComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
    TypeaheadModule.forRoot(),
    LightboxModule
  ],
  exports: [
  ]
})
export class ToursModule { }
