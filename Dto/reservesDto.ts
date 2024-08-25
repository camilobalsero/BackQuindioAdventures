class Reserva {
    private _email: string;
    private _idChalet: number;
    private _precio: number;
    private _cantPersonas: number;
    private _estancia: number;
    private _fechaInicio: Date;
    private _fechaFin: Date;
    private _nombre: string;

    constructor(idChalet: number, precio: number, cantPersonas: number, estancia: number, fechaInicio: Date, fechaFin: Date, nombre: string, email: string) {
        this._idChalet = idChalet;
        this._precio = precio;
        this._cantPersonas = cantPersonas;
        this._estancia = estancia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._nombre = nombre;
        this._email = email;
    }

    get email(): string {
        return this._email;
    }

    get idChalet(): number {
        return this._idChalet;
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

    get nombre(): string {
        return this._nombre;
    }
}

export default Reserva;
