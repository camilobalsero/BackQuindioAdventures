class Reserva {
    private _documento: string;
    private _cantNinos: number;
    private _cantAdultos: number;
    private _nombre: string;
    private _fechaInicio: Date;
    private _fechaFin: Date;

    constructor(nombre: string, documento: string, cantNinos: number, cantAdultos: number , fechaInicio: Date, fechaFin: Date) {
        this._documento = documento;
        this._nombre = nombre;
        this._cantNinos = cantNinos;
        this._cantAdultos = cantAdultos;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
    }

    get documento(): string {
        return this._documento;
    }

    get nombre(): string {
        return this._nombre;
    }

    get cantNinos(): number {
        return this._cantNinos;
    }

    get cantAdultos(): number {
        return this._cantAdultos;
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

    set nombre(nombre: string) {
        this._nombre = nombre;
    }

    set cantNinos(cantNinos: number) {
        this._cantNinos = cantNinos;
    }

    set cantAdultos(cantAdultos: number) {
        this._cantAdultos = cantAdultos;
    }

    set fechaInicio(fechaInicio: Date) {
        this._fechaInicio = fechaInicio;
    }

    set fechaFin(fechaFin: Date) {
        this._fechaFin = fechaFin;
    }
}

export default Reserva;
