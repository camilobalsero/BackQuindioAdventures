class Reserva {
    private _email: string;
    private _idPlan: number;
    private _documento: string;
    private _cantPersonas: number;
    private _nombre: string;
    private _apellido: string;
    private _telefono: string;
    private _direccion: string;
    private _precioFinal: number;
    private _fechaReserva: string;
    private _fechaRegistro: string;
    private _tarifa: any; // JSON

    constructor(
        email: string,
        idPlan: number,
        documento: string,
        cantPersonas: number,
        nombre: string,
        apellido: string,
        telefono: string,
        direccion: string,
        precioFinal: number,
        fechaReserva: string,
        fechaRegistro: string,
        tarifa: any
    ) {
        this._email = email;
        this._idPlan = idPlan;
        this._documento = documento;
        this._cantPersonas = cantPersonas;
        this._nombre = nombre;
        this._apellido = apellido;
        this._telefono = telefono;
        this._direccion = direccion;
        this._precioFinal = precioFinal;
        this._fechaReserva = fechaReserva;
        this._fechaRegistro = fechaRegistro;
        this._tarifa = tarifa;
    }

    // Getters
    get email(): string { return this._email; }
    get idPlan(): number { return this._idPlan; }
    get documento(): string { return this._documento; }
    get cantPersonas(): number { return this._cantPersonas; }
    get nombre(): string { return this._nombre; }
    get apellido(): string { return this._apellido; }
    get telefono(): string { return this._telefono; }
    get direccion(): string { return this._direccion; }
    get precioFinal(): number { return this._precioFinal; }
    get fechaReserva(): string { return this._fechaReserva; }
    get fechaRegistro(): string { return this._fechaRegistro; }
    get tarifa(): any { return this._tarifa; }

    // Setters
    set email(value: string) { this._email = value; }
    set idPlan(value: number) { this._idPlan = value; }
    set documento(value: string) { this._documento = value; }
    set cantPersonas(value: number) { this._cantPersonas = value; }
    set nombre(value: string) { this._nombre = value; }
    set apellido(value: string) { this._apellido = value; }
    set telefono(value: string) { this._telefono = value; }
    set direccion(value: string) { this._direccion = value; }
    set precioFinal(value: number) { this._precioFinal = value; }
    set fechaReserva(value: string) { this._fechaReserva = value; }
    set fechaRegistro(value: string) { this._fechaRegistro = value; }
    set tarifa(value: any) { this._tarifa = value; }
}

export default Reserva;
