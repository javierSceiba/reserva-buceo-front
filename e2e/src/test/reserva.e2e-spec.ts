import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { ReservaPage } from '../page/reserva/reserva.po';

describe('workspace-project Reserva', () => {
    let page: AppPage;
    let navBar: NavbarPage;
    let reserva: ReservaPage;
    const MENSAJE_CONFIRMACION_CREAR_RESERVA = "Reserva creada correctamente id de reserva: ";
    const MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA = "Reserva actualizada correctamente, puede verificarla en el area de consultas";


    beforeEach(() => {
        page = new AppPage();
        navBar = new NavbarPage();
        reserva = new ReservaPage();
    });

    it('Deberia crear reserva', () => {
        const NOMBRE_CLIENTE = 'Javier';
        const TIPO_USUARIO = "Nativo";
        const NUMERO_DOCUMENTO = 123415;

        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonCrearReservas();
        reserva.ingresarNombreCliente(NOMBRE_CLIENTE);
        reserva.ingresarTipoUsuario(TIPO_USUARIO);
        reserva.ingresarNumeroDocumento(NUMERO_DOCUMENTO);
        reserva.clickBotonCrearReserva();
        expect(reserva.obtenerMensajeCreacion()).toContain(MENSAJE_CONFIRMACION_CREAR_RESERVA);
    });

    it('Deberia consultar reserva', () => {
        const ID_RESERVA = 1;
        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonListarReservas();
        reserva.ingresarId(ID_RESERVA);
        reserva.clickBotonConsultarReserva();
        expect(1).toBe(reserva.contarReservas());
    });

    it('Deberia actualizar reserva', () => {
        const ID_RESERVA = 1;
        const FECHA_RESERVA = "05-04-2022";
        page.navigateTo();
        navBar.clickBotonReservas();
        reserva.clickBotonActualizarReservas();
        reserva.ingresarId(ID_RESERVA);
        reserva.ingresarFechaReserva(FECHA_RESERVA);
        reserva.clickBotonActualizarReserva();
        expect(reserva.obtenerMensajeActualizacion()).toContain(MENSAJE_CONFIRMACION_ACTUALIZACION_RESERVA);
    });

});