class Reserva {
    private _documento: string;
    private _precio: number;
    private _cantPersonas: number;
    private _estancia: number;
    private _fechaInicio: Date;
    private _fechaFin: Date;

    constructor(documento: string, precio: number, cantPersonas: number, estancia: number, fechaInicio: Date, fechaFin: Date) {
        this._documento = documento;
        this._precio = precio;
        this._cantPersonas = cantPersonas;
        this._estancia = estancia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
    }

    get documento(): string {
        return this._documento;
    }

    get precio(): number {
        return this._precio;
    }

    get cantPersonas(): number {
        return this._cantPersonas;
    }

    get estancia(): number {
        return this._estancia;
    }

    get fechaInicio(): Date {
        return this._fechaInicio;
    }

    get fechaFin(): Date {
        return this._fechaFin;
    }

    set documento(documento: string) {
        this._documento = documento;
    }

    set precio(precio: number) {
        this._precio = precio;
    }

    set cantPersonas(cantPersonas: number) {
        this._cantPersonas = cantPersonas;
    }

    set estancia(estancia: number) {
        this._estancia = estancia;
    }

    set fechaInicio(fechaInicio: Date) {
        this._fechaInicio = fechaInicio;
    }

    set fechaFin(fechaFin: Date) {
        this._fechaFin = fechaFin;
    }
}

export default Reserva;
