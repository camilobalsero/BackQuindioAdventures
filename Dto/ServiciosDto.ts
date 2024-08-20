class ServiciosChalet {
    _id_chalet: number;
    _servicio: string;

    constructor(id_chalet: number, servicio:string) {
        this._id_chalet = id_chalet;
        this._servicio = servicio;
    }

    get servicio(): string{
        return this._servicio
    }
}

export default ServiciosChalet;
