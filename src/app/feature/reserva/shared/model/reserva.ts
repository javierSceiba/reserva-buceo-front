export class Reserva {
    id: number;
    nombreCliente: string;
    tipoUsuario: number;
    numeroDocumento: number;
    costoReserva: number;
    fechaReserva: string;

    constructor(id: number, nombreCliente: string, tipoUsuario: number,
        numeroDocumento: number, costoReserva: number, fechaReserva: string) {
        this.id = id;
        this.nombreCliente = nombreCliente;
        this.tipoUsuario = tipoUsuario;
        this.numeroDocumento = numeroDocumento;
        this.costoReserva = costoReserva;
        this.fechaReserva = fechaReserva;
    }
}
