import { NgModule  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AereosComponent } from './aereos.component';
import { RouterModule, Routes } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { LightboxModule } from 'ngx-lightbox';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from 'src/app/shared/shared.module';
import { ResultadosVuelosComponent } from './resultados-vuelos/resultados-vuelos.component';
import { BookingaereosComponent } from './bookingaereos/bookingaereos.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

const routes: Routes = [
  {
    path: '',
    component: AereosComponent,
  },
  {
    path: 'resultados-vuelos',
    component: ResultadosVuelosComponent,
  },
  {
    path: 'booking-vuelos',
    component: BookingaereosComponent,
  },
];

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [AereosComponent, ResultadosVuelosComponent, BookingaereosComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    CarouselModule,
    BsDatepickerModule.forRoot(),
    LightboxModule,
    SharedModule,
    TypeaheadModule.forRoot(),
    TranslateModule.forRoot({
      defaultLanguage: 'es',
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      }
  })
  ],
  
})
export class VuelosModule { }
