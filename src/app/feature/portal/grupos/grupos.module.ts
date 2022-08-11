import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GruposComponent } from './grupos.component';
import { RouterModule, Routes } from '@angular/router';
import { CotizarComponent } from './cotizar/cotizar.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';

const routes: Routes = [
  {
    path: '',
    component: GruposComponent
  },
  {
    path: 'cotizar',
    component: CotizarComponent
  },
];

@NgModule({
  declarations: [GruposComponent, CotizarComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BsDatepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    TimepickerModule.forRoot()
  ]
})
export class GruposModule { }
