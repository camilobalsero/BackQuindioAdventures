class Opinion {
    _email: string;
    _idPlan: number;
    _opinion: string;
    _fechaCreacion: string;
    _hora: string;
    _calificacion: number;
    constructor(
        email: string,
        idPlan: number,
        opinion: string,
        fechaCreacion: string,
        hora:string,
        calificacion: number
    ) {
        this._email = email;
        this._idPlan = idPlan;
        this._opinion = opinion;
        this._fechaCreacion = fechaCreacion;
        this._hora = hora;
        this._calificacion = calificacion;
    }

    // Getters y Setters
    get email(): string { return this._email; }
    set email(value: string) { this._email = value; }


    get idPlan(): number { return this._idPlan; }
    set idPlan(value: number) { this._idPlan = value; }

    
    get opinion(): string { return this._opinion; }
    set opinion(value: string) { this._opinion = value; }


    get fechaCreacion(): string { return this._fechaCreacion; }
    set fechaCreacion(value: string) { this._fechaCreacion = value; }

    get hora(): string { return this._hora; }
    set hora(value: string) { this._hora = value; }


    get calificacion(): number { return this._calificacion; }
    set calificacion(value: number) { this._calificacion = value; }
}

export default Opinion;
