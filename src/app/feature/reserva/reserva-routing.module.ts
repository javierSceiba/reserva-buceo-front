import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ConsultarReservaComponent } from './components/consultar-reserva/consultar-reserva.component';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';
import { ReservaComponent } from './components/reserva/reserva.component';


const routes: Routes = [
  {
    path: '',
    component: ReservaComponent,
    children: [
      {
        path: 'crear',
        component: CrearReservaComponent
      },
      {
        path: 'consultar',
        component: ConsultarReservaComponent
      },
      {
        path: 'actualizar',
        component: ActualizarReservaComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservaRoutingModule { }
