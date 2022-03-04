import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { Reserva } from '@reserva/shared/model/reserva';
import { ManejadorError } from '@core/interceptor/manejador-error';
const LONGITUD_MINIMA_PERMITIDA_TEXTO = 1;
const MENSAJE_ERROR_ACTUALIZACION_RESERVA = 'Fallo actualización de la reserva: ';
const MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA = 'Reserva actualizada correctamente, puede verificarla en el area de consultas';

@Component({
  selector: 'app-actualizar-reserva',
  templateUrl: './actualizar-reserva.component.html',
  styleUrls: ['./actualizar-reserva.component.css']
})
export class ActualizarReservaComponent implements OnInit {
  actualizarForm: FormGroup;
  public reserva: Reserva;
  fechaPermitida: string;
  mensajeModal?: string;
  public manejadorError: ManejadorError;
  constructor(protected reservaServices: ReservaService) { }

  ngOnInit(): void {
    this.construirFormularioActualizar();
    this.calcularFechaPermitida();
  }

  actualizar() {
    this.reservaServices.actualizar(this.reserva).subscribe((): void => {
      this.mensajeModal = MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA;
      const element: HTMLElement = document.getElementsByClassName('bModal')[0] as HTMLElement;
      element.click();
    },
      error => {
        this.mensajeModal = MENSAJE_ERROR_ACTUALIZACION_RESERVA + error.error.mensaje;
        const element: HTMLElement = document.getElementsByClassName('bModal')[0] as HTMLElement;
        element.click();
        this.manejadorError.handleError(error);
      });
  }

  consultar() {
    this.reservaServices.consultar(this.actualizarForm.value).subscribe(result => {
      this.reserva = new Reserva(this.actualizarForm.value.id, result.nombreCliente, result.tipoUsuario,
      result.numeroDocumento, result.costoReserva, this.actualizarForm.value.fechaReserva);
      this.actualizar();
    },
      error => {
        this.reserva = new Reserva(0, '', 0, 0, 0, '');
        this.manejadorError.handleError(error);
      });
  }

  private construirFormularioActualizar() {
    this.actualizarForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)]),
      fechaReserva: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }

  public calcularFechaPermitida() {
    const menosDos = -2;
    let date = new Date();
    date = this.sumarDias(date, 1);
    const day = `0${date.getDate()}`.slice(menosDos);
    const month = `0${date.getMonth() + 1}`.slice(menosDos);
    const year = date.getFullYear();
    this.fechaPermitida = `${year}-${month}-${day}`;
  }

  private sumarDias(fecha, dias) {
    fecha.setDate(fecha.getDate() + dias);
    return fecha;
  }

}
