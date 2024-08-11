class Admin {
    _documento: string;
    _email: string;
    _password: string;
    _nombres: string;
    _apellidos: string;
    _edad: number;
    _telefono: string;
    _direccion: string;

    constructor(
        documento: string,
        email: string,
        password: string,
        nombres: string,
        apellidos: string,
        edad: number,
        telefono: string,
        direccion: string
    ) {
        this._documento = documento;
        this._email = email;
        this._password = password;
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._edad = edad;
        this._telefono = telefono;
        this._direccion = direccion;
    }

    // Getters y Setters
    get documento(): string { return this._documento; }
    set documento(value: string) { this._documento = value; }

    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }

    get password(): string { return this._password; }
    set password(value: string) { this._password = value; }

    get nombres(): string { return this._nombres; }
    set nombres(value: string) { this._nombres = value; }

    get apellidos(): string { return this._apellidos; }
    set apellidos(value: string) { this._apellidos = value; }

    get edad(): number { return this._edad; }
    set edad(value: number) { this._edad = value; }

    get telefono(): string { return this._telefono; }
    set telefono(value: string) { this._telefono = value; }

    get direccion(): string { return this._direccion; }
    set direccion(value: string) { this._direccion = value; }
}

export default Admin;
