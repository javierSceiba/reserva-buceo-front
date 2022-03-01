import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CrearReservaComponent } from './crear-reserva.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ReservaService } from '../../shared/service/reserva.service';
import { HttpService } from 'src/app/core/services/http.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
const MENSAJE_CONFIRMACION_CREAR_RESERVA = "Reserva creada correctamente id de reserva: ";
describe('CrearReservaComponent', () => {
  let component: CrearReservaComponent;
  let fixture: ComponentFixture<CrearReservaComponent>;
  let reservaService: ReservaService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CrearReservaComponent ],
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
    fixture = TestBed.createComponent(CrearReservaComponent);
    component = fixture.componentInstance;
    reservaService = TestBed.inject(ReservaService);
    spyOn(reservaService, 'guardar').and.returnValue(
      of(true)
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Formulario invalido cuando es vacio', () => {
    expect(component.reservaForm.valid).toBeFalsy();
  });

  it('Registrando reserva', () => {
    expect(component.reservaForm.valid).toBeFalsy();
    component.reservaForm.controls.nombreCliente.setValue('Javier Prueba');
    component.reservaForm.controls.tipoUsuario.setValue(1);
    component.reservaForm.controls.numeroDocumento.setValue(1011);
    expect(component.reservaForm.valid).toBeTruthy();
    component.crear();
    expect(component.mensajeModal).toContain(MENSAJE_CONFIRMACION_CREAR_RESERVA);
  });

});
