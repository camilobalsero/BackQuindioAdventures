class Reserva {
    [x: string]: any;
    private _documento: string;
    private _precio: number;
    private _cantNinos: number;
    private _cantAdultos: number;
    private _estancia: number;
    private _fechaInicio: Date;
    private _fechaFin: Date;

    constructor(documento: string, precio: number, cantNinos: number, cantAdultos: number ,estancia: number, fechaInicio: Date, fechaFin: Date) {
        this._documento = documento;
        this._precio = precio;
        this._cantNinos = cantNinos;
        this._cantAdultos = cantAdultos;
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

    get cantNinos(): number {
        return this._cantNinos;
    }

    get cantAdultos(): number {
        return this._cantAdultos;
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

    set cantNinos(cantNinos: number) {
        this._cantNinos = cantNinos;
    }

    set cantAdultos(cantAdultos: number) {
        this._cantAdultos = cantAdultos;
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
