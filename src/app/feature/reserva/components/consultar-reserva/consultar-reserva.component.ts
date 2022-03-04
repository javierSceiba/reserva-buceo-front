import { Component, OnInit } from '@angular/core';
import { Reserva } from '@reserva/shared/model/reserva';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';
import { ManejadorError } from '@core/interceptor/manejador-error';
const LONGITUD_MINIMA_PERMITIDA_TEXTO = 1;
const MENSAJE_ERROR_CONSULTA_RESERVA = 'Fallo consulta de la reserva: ';
@Component({
  selector: 'app-consultar-reserva',
  templateUrl: './consultar-reserva.component.html',
  styleUrls: ['./consultar-reserva.component.css']
})
export class ConsultarReservaComponent implements OnInit {
  public reserva: Reserva;
  public manejadorError: ManejadorError;
  public listaReservas: Reserva[] = [];
  consultaForm: FormGroup;
  disTabla = false;
  mensajeModal?: string;
  constructor(protected reservaServices: ReservaService) { }

  ngOnInit(): void {
    this.construirFormularioConsulta();
  }

  consultar() {
    this.reservaServices.consultar(this.consultaForm.value).subscribe(result => {
      this.listaReservas = [];
      this.reserva = new Reserva(result.id, result.nombreCliente, result.tipoUsuario,
      result.numeroDocumento, result.costoReserva, result.fechaReserva);
      this.listaReservas.push(this.reserva);
      this.disTabla = true;
    },
      error => {
        this.disTabla = false;
        this.mensajeModal = MENSAJE_ERROR_CONSULTA_RESERVA + error.error.mensaje;
        const element: HTMLElement = document.getElementsByClassName('bModal')[0] as HTMLElement;
        element.click();
        this.manejadorError.handleError(error);
      });
  }

  private construirFormularioConsulta() {
    this.consultaForm = new FormGroup({
      id: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)])
    });
  }
}
