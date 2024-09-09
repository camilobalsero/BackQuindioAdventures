class Reserva {
    private _email: string;
    private _idChalet: number;
    private _documento: string;
    private _cantPersonas: number;
    private _nombre: string;
    private _apellido: string;
    private _telefono: string;
    private _direccion: string;
    private _precioFinal: number;
    private _estancia: number; // Cambiado a string si se almacena como TEXT
    private _fechaInicio: string;
    private _fechaFin: string;
    private _fechaRegistro: string;
    private _tarifa: any; // JSON

    constructor(
        email: string,
        idChalet: number,
        documento: string,
        cantPersonas: number,
        nombre: string,
        apellido: string,
        telefono: string,
        direccion: string,
        precioFinal: number,
        estancia: number,
        fechaInicio: string,
        fechaFin: string,
        fechaRegistro: string,
        tarifa: any
    ) {
        this._email = email;
        this._idChalet = idChalet;
        this._documento = documento;
        this._cantPersonas = cantPersonas;
        this._nombre = nombre;
        this._apellido = apellido;
        this._telefono = telefono;
        this._direccion = direccion;
        this._precioFinal = precioFinal;
        this._estancia = estancia;
        this._fechaInicio = fechaInicio;
        this._fechaFin = fechaFin;
        this._fechaRegistro = fechaRegistro;
        this._tarifa = tarifa;
    }

    // Getters
    get email(): string { return this._email; }
    get idChalet(): number { return this._idChalet; }
    get documento(): string { return this._documento; }
    get cantPersonas(): number { return this._cantPersonas; }
    get nombre(): string { return this._nombre; }
    get apellido(): string { return this._apellido; }
    get telefono(): string { return this._telefono; }
    get direccion(): string { return this._direccion; }
    get precioFinal(): number { return this._precioFinal; }
    get estancia(): number { return this._estancia; }
    get fechaInicio(): string { return this._fechaInicio; }
    get fechaFin(): string { return this._fechaFin; }
    get fechaRegistro(): string { return this._fechaRegistro; }
    get tarifa(): any { return this._tarifa; }

    // Setters
    set email(value: string) { this._email = value; }
    set idChalet(value: number) { this._idChalet = value; }
    set documento(value: string) { this._documento = value; }
    set cantPersonas(value: number) { this._cantPersonas = value; }
    set nombre(value: string) { this._nombre = value; }
    set apellido(value: string) { this._apellido = value; }
    set telefono(value: string) { this._telefono = value; }
    set direccion(value: string) { this._direccion = value; }
    set precioFinal(value: number) { this._precioFinal = value; }
    set estancia(value: number) { this._estancia = value; }
    set fechaInicio(value: string) { this._fechaInicio = value; }
    set fechaFin(value: string) { this._fechaFin = value; }
    set fechaRegistro(value: string) { this._fechaRegistro = value; }
    set tarifa(value: any) { this._tarifa = value; }
}

export default Reserva;
