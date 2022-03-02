import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConsultarReservaComponent } from './consultar-reserva.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReservaService } from '../../shared/service/reserva.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Reserva } from '@reserva/shared/model/reserva';
import { of, throwError } from 'rxjs';
describe('ConsultarReservaComponent', () => {
  let component: ConsultarReservaComponent;
  let fixture: ComponentFixture<ConsultarReservaComponent>;
  let reservaService: ReservaService;
  const reserva: Reserva = new Reserva(2, 'Javier Prueba', 1, 101, 160000, '2022-02-28');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultarReservaComponent],
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
    fixture = TestBed.createComponent(ConsultarReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'consultar').and.returnValue(
      of(reserva)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando es vacio', () => {
    expect(component.consultaForm.valid).toBeFalsy();
  });

  it('Consulta reserva por Id', () => {
    expect(component.consultaForm.valid).toBeFalsy();
    component.consultaForm.controls.id.setValue(2);
    expect(component.consultaForm.valid).toBeTruthy();
    component.consultar();
    expect(1).toBe(component.listaReservas.length);
  });

  it('Falla consultar Reserva', () => {
    reservaService.consultar = jasmine.createSpy().and.returnValue(throwError({
      "nombreExcepcion": "EmptyResultDataAccessException",
      "mensaje": "OcurriÃ³ un error favor contactar al administrador."
    }));
    component.consultar();
    expect(reservaService.consultar).toHaveBeenCalled();
  });
});
