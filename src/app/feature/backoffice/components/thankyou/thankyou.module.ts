import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThankyouComponent } from './thankyou.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: ThankyouComponent,
  },
];

@NgModule({
  declarations: [ThankyouComponent],
  imports: [CommonModule, 
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,],
})
export class ThankyouModule { }
