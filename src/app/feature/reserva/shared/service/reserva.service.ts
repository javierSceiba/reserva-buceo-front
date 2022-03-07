import { Injectable } from '@angular/core';
import { HttpService } from '@core-service/http.service';
import { environment } from 'src/environments/environment';
import { Reserva } from '../model/reserva';
import { ResponseReserva } from '../model/responseReserva';


@Injectable()
export class ReservaService {

  constructor(protected http: HttpService) {}

  public consultar(reserva: Reserva) {
    return this.http.doGet<Reserva>(`${environment.endpoint}/buceo/${reserva.id}`, this.http.optsName('consultar productos'));
  }

  public guardar(reserva: Reserva) {
    return this.http.doPost<Reserva, ResponseReserva>(`${environment.endpoint}/buceo`, reserva,
                                                this.http.optsName('crear reserva'));
  }

  public actualizar(reserva: Reserva) {
    return this.http.doPut<Reserva, boolean>(`${environment.endpoint}/buceo/${reserva.id}`, reserva,
                                                 this.http.optsName('eliminar productos'));
  }
}
