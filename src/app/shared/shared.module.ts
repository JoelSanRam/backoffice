import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { CurrencyformatPipe, CalculateTCDPipe, CategoriaPipe, RangePipe } from './pipes/filter.pipe';
import { NavbarComponent } from './components/masterpage/navbar/navbar.component';
import { SidebarComponent } from './components/masterpage/sidebar/sidebar.component';
import { BannerComponent } from './components/banner/banner.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ItemCarouselComponent } from './components/carousel/item-carousel/item-carousel.component';
import { FlyersComponent } from './components/flyers/flyers.component';
import { PublicidadComponent } from './components/publicidad/publicidad.component';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
@NgModule({
  declarations: [
    NavbarComponent,
    SidebarComponent,
    CurrencyformatPipe,
    CategoriaPipe,
    CalculateTCDPipe,
    RangePipe,
    NavbarComponent,
    SidebarComponent,
    BannerComponent,
    CarouselComponent,
    ItemCarouselComponent,
    FlyersComponent,
    PublicidadComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    CarouselModule,
    TooltipModule.forRoot()
  ],
  exports: [
    NavbarComponent,
    SidebarComponent,
    FormsModule,
    ReactiveFormsModule,
    CurrencyformatPipe,
    CategoriaPipe,
    RangePipe,
    CalculateTCDPipe,
    BannerComponent,
    CarouselModule,
    CarouselComponent,
    ItemCarouselComponent,
    FlyersComponent,
    PublicidadComponent,
    TooltipModule
  ],
})
export class SharedModule { }
