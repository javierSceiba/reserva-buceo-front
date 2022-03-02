import { by, element } from 'protractor';

export class ReservaPage {
    private linkCrearReserva = element(by.id('linkCrearReserva'));
    private linkConsultarReserva = element(by.id('linkConsultarReserva'));
    private linkActualizarReserva = element(by.id('linkActualizarReserva'));
    private inputIdReserva = element(by.id('id'));
    private inputNombreCliente = element(by.id('nombreCliente'));
    private inputTipoUsuario = element(by.id('tipoUsuario'));
    private inputNumeroDocumento = element(by.id('numeroDocumento'));
    private inputFechaReserva = element(by.id('fechaReserva'));
    private consultarReservas = element.all(by.css('tbody tr'));
    private btnCrearReserva = element(by.id('botonCrear'));
    private btnConsultarReserva = element(by.id('botonConsultar'));
    private btnActualizarReserva = element(by.id('botonActualizar'));
    private obtenerMensajeActualizar =  element(by.css('#actualizaModal div.modal-body h6'));
    private obtenerMensajeCrear =  element(by.css('#crearModal div.modal-body h6'));

    async clickBotonCrearReservas() {
        await this.linkCrearReserva.click();
    }

    async clickBotonListarReservas() {
        await this.linkConsultarReserva.click();
    }

    async clickBotonActualizarReservas() {
        await this.linkActualizarReserva.click();
    }

    async ingresarId(idReserva) {
        await this.inputIdReserva.sendKeys(idReserva);
    }

    async ingresarNombreCliente(nombreCliente) {
        await this.inputNombreCliente.sendKeys(nombreCliente);
    }

    async ingresarTipoUsuario(tipoUsuario) {
        await this.inputTipoUsuario.sendKeys(tipoUsuario);
    }

    async ingresarNumeroDocumento(numeroDocumento) {
        await this.inputNumeroDocumento.sendKeys(numeroDocumento);
    }

    async ingresarFechaReserva(fechaReserva) {
        await this.inputFechaReserva.sendKeys(fechaReserva);
    }

    async contarReservas() {
        return this.consultarReservas.count();
    }

    async clickBotonCrearReserva() {
        await this.btnCrearReserva.submit();
    }

    async clickBotonConsultarReserva() {
        await this.btnConsultarReserva.submit();
    }

    async clickBotonActualizarReserva() {
        await this.btnActualizarReserva.submit();
    }

    obtenerMensajeCreacion() {
       return this.obtenerMensajeCrear.getText() as Promise<string>;
    }

    obtenerMensajeActualizacion() {
        return this.obtenerMensajeActualizar.getText() as Promise<string>;
     }

}
