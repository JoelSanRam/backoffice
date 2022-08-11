import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MicroblogComponent } from './microblog.component';
import { RouterModule, Routes } from '@angular/router';
import { BlogItemComponent } from './blog-item/blog-item.component';
import { MicroblogDetailComponent } from './microblog-detail/microblog-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MicroblogComponent
  },
  {
    path: 'detail',
    component: MicroblogDetailComponent
  }
];

@NgModule({
  declarations: [MicroblogComponent, BlogItemComponent, MicroblogDetailComponent],
  imports: [
    CommonModule,
    // SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class MicroblogModule { }
