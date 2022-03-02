import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { ActualizarReservaComponent } from './actualizar-reserva.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReservaService } from '../../shared/service/reserva.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Reserva } from '@reserva/shared/model/reserva';
describe('ActualizarReservaComponent', () => {
  let component: ActualizarReservaComponent;
  let fixture: ComponentFixture<ActualizarReservaComponent>;
  let reservaService: ReservaService;
  const MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA = 'Reserva actualizada correctamente, puede verificarla en el area de consultas';
  const reserva: Reserva = new Reserva(2, 'Javier Prueba', 1, 101, 160000, '2022-02-28');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActualizarReservaComponent ],
      imports: [
        CommonModule,
        HttpClientModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [ReservaService, HttpService],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ActualizarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'actualizar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando es vacio', () => {
    expect(component.actualizarForm.valid).toBeFalsy();
  });

  it('Actualizando reserva', () => {
    expect(component.actualizarForm.valid).toBeFalsy();
    component.actualizarForm.controls.id.setValue(1);
    component.actualizarForm.controls.fechaReserva.setValue('25-03-2022');
    expect(component.actualizarForm.valid).toBeTruthy();
    spyOn(reservaService, 'consultar').and.callFake(() => {
      return of(reserva)
    });
    component.consultar();
    expect(reservaService.consultar).toHaveBeenCalled();
    component.actualizar();
    expect(component.mensajeModal).toContain(MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA);
  });

  it('Crear fecha permitida', () => {
    component.calcularFechaPermitida();
    expect(component.fechaPermitida).toBe('2022-03-03');
  });

  it('Falla Actualizar Reserva', () => {
    reservaService.consultar = jasmine.createSpy().and.returnValue(throwError({
      "nombreExcepcion": "EmptyResultDataAccessException",
      "mensaje": "Ocurrio un error favor contactar al administrador."
    }));
    component.consultar();
    reservaService.actualizar = jasmine.createSpy().and.returnValue(throwError({
      "nombreExcepcion": "ExcepcionDuplicidad",
      "mensaje": "La reserva no existe en el sistema"
    }));
    component.actualizar();
    expect(reservaService.actualizar).toHaveBeenCalled();
  });
});
