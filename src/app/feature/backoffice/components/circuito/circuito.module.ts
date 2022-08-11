import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CircuitoComponent } from './circuito.component'; 
import { LightboxModule } from 'ngx-lightbox';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingcircuitoComponent } from './bookingcircuito/bookingcircuito.component';
import { ResultadoscircuitoComponent } from './resultadoscircuito/resultadoscircuito.component';
import { CircuitoindividualComponent } from './circuitoindividual/circuitoindividual.component';

const routes: Routes = [
  {
    path: '',
    component: CircuitoComponent,
  },
  {
    path: 'booking-circuito',
    component: BookingcircuitoComponent,
  },
  {
    path: 'resultado-circuito',
    component: ResultadoscircuitoComponent,
  },
  {
    path: 'circuito-detalle/:id',
    component: CircuitoindividualComponent,
  },
];

@NgModule({
  declarations: [CircuitoComponent, BookingcircuitoComponent, ResultadoscircuitoComponent, CircuitoindividualComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    SharedModule,
    CarouselModule,
    BsDatepickerModule.forRoot(),
    LightboxModule,
    TypeaheadModule.forRoot(),
  ],
})
export class CircuitoModule { }
