import { NgModule } from '@angular/core';
import { CrearReservaComponent } from './components/crear-reserva/crear-reserva.component';
import { ConsultarReservaComponent } from './components/consultar-reserva/consultar-reserva.component';
import { ActualizarReservaComponent } from './components/actualizar-reserva/actualizar-reserva.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { ReservaRoutingModule } from './reserva-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ReservaService } from './shared/service/reserva.service';



@NgModule({
  declarations: [
    CrearReservaComponent,
    ConsultarReservaComponent,
    ActualizarReservaComponent,
    ReservaComponent
  ],
  imports: [
    ReservaRoutingModule,
    SharedModule
  ],
  providers: [ReservaService]
})
export class ReservaModule { }
