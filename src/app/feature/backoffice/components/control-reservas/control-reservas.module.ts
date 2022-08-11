import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ControlReservasComponent } from './control-reservas.component';

const routes: Routes = [
  {
    path: '',
    component: ControlReservasComponent,
  },
];

@NgModule({
  declarations: [ControlReservasComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot()
  ],
})
export class ControlReservasModule { }
