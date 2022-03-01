import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReservaService } from '@reserva/shared/service/reserva.service';
const LONGITUD_MINIMA_PERMITIDA_TEXTO = 1;
const LONGITUD_MAXIMA_NOMBRE = 40;
const LONGITUD_MAXIMA_NUMERO_DOCUMENTO = 10;
const MENSAJE_ERROR_CREAR_RESERVA = "Fallo creación de la reserva: ";
const MENSAJE_CONFIRMACION_CREAR_RESERVA = "Reserva creada correctamente id de reserva: ";
@Component({
  selector: 'app-crear-reserva',
  templateUrl: './crear-reserva.component.html',
  styleUrls: ['./crear-reserva.component.css']
})
export class CrearReservaComponent implements OnInit {
  reservaForm: FormGroup;
  constructor(protected reservaServices: ReservaService) { }
  mensajeModal?: string;
  ngOnInit(): void {
    this.construirFormularioReserva();
  }

  crear() {
    this.reservaServices.guardar(this.reservaForm.value).subscribe(result => {
      console.log(result);
      console.log(JSON.stringify(result));
      this.mensajeModal = MENSAJE_CONFIRMACION_CREAR_RESERVA + result['valor'];
      this.reservaForm.reset();
      let element: HTMLElement = document.getElementsByClassName('bModal')[0] as HTMLElement;
      element.click();
    },
      error => {
        this.mensajeModal = MENSAJE_ERROR_CREAR_RESERVA + error['error']['mensaje'];
        let element: HTMLElement = document.getElementsByClassName('bModal')[0] as HTMLElement;
        element.click();
      });
  }

  private construirFormularioReserva() {
    this.reservaForm = new FormGroup({
      nombreCliente: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_NOMBRE)]),
      tipoUsuario: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO)]),
      numeroDocumento: new FormControl('', [Validators.required, Validators.minLength(LONGITUD_MINIMA_PERMITIDA_TEXTO), Validators.maxLength(LONGITUD_MAXIMA_NUMERO_DOCUMENTO), Validators.pattern(/^[0-9]\d*$/)])
    });
  }
}
