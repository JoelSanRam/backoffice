import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelComponent } from './hotel.component';
import { RouterModule, Routes } from '@angular/router';
import { LightboxModule } from 'ngx-lightbox';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { BookingComponent } from './booking/booking.component';
import { ResultadosbusquedaComponent } from './resultadosbusqueda/resultadosbusqueda.component';


const routes: Routes = [
  {
    path: '',
    component: HotelComponent,
  },
  {
    path: 'bookingHotel',
    component: BookingComponent,
  },
  {
    path: 'resultados-hotel',
    component: ResultadosbusquedaComponent,
  },
];

@NgModule({
  declarations: [HotelComponent, BookingComponent, ResultadosbusquedaComponent],
  imports: [CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    LightboxModule,
    BsDatepickerModule.forRoot(),
  ],
})
export class HotelModule { }
