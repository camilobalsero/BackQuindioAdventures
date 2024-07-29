class Reserva {
    private _email: string;
    private _documento: number;
    private _precio: number;
    private _cantPersonas: number;
    private _estancia: number;
    private _fechaInicio: Date;
    private _fechaFin: Date;

    constructor(email: string, documento: number, precio:number, cantPersonas: number, estancia:number, fechaInicio:Date, fechaFin:Date) {
        this._email = email;
        this._documento = documento;
        this._precio = precio;
        this._cantPersonas = cantPersonas;
        this._estancia = estancia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
    }

    get email(): string {
        return this._email;
    }

    get documento(): number {
        return this._documento;
    }

    get precio(): number {
        return this._precio;
    }

    get cantPersonas(): number {
        return this._cantPersonas;
    }

    get estancia(): number {
        return this.estancia;
    }

    get fechaInicio(): Date {
        return this.fechaInicio;
    }

    get fechaFin(): Date {
        return this.fechaFin;
    }


    set email(email: string) {
        this._email = email;
    }

    set id(documento: number) {
        this._documento = documento;
    }

    set precio(precio: number) {
        this._precio = precio;
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