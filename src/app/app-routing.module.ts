import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterpageComponent } from './shared/components/masterpage/masterpage.component';
import { AuthGuard } from './shared/guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MasterpageComponent,
    children: [
      {
        path: 'hotel',
        loadChildren: ()=>
        import('./feature/backoffice/components/hotel/hotel.module').then((m) => m.HotelModule),
      },
      {
        path: 'flyers',
        loadChildren: () =>
          import('./feature/portal/flyers/flyers.module').then((m) => m.FlyersModule),
     },
     {
      path: 'microblog',
      loadChildren: () =>
        import('./feature/portal/microblog/microblog.module').then((m) => m.MicroblogModule),
      },
      {
        path: 'grupos',
        loadChildren: () =>
          import('./feature/portal/grupos/grupos.module').then((m) => m.GruposModule),
        },
      {
        path: 'vuelos',
        loadChildren: ()=>
        import('./feature/backoffice/components/vuelos/vuelos.module').then((m) => m.VuelosModule),
      },
      {
        path: 'thankyou',
        loadChildren: ()=>
        import('./feature/backoffice/components/thankyou/thankyou.module').then((m) => m.ThankyouModule),
      },
      {
        path: 'traslado',
        loadChildren: ()=>
        import('./feature/backoffice/components/traslado/traslado.module').then((m) => m.TrasladoModule),
      },
      {
        path: 'tours',
        loadChildren: ()=>
        import('./feature/backoffice/components/tours/tours.module').then((m) => m.ToursModule),
      },
      {
        path: 'circuito',
        loadChildren: ()=>
        import('./feature/backoffice/components/circuito/circuito.module').then((m) => m.CircuitoModule),
      },
      {
        path: 'controlReservas',
        loadChildren: ()=>
        import('./feature/backoffice/components/control-reservas/control-reservas.module').then((m) => m.ControlReservasModule),
      },
      
      ],
    },
    { redirectTo: 'login', pathMatch: 'full', path: '**' },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
