class Tarifa {
    _id_plan_usuario: number;
    _precio: number;
    _temporada: string;

    constructor(id_plan_usuario: number, precio: number, temporada: string) {
        this._id_plan_usuario = id_plan_usuario;
        this._precio = precio;
        this._temporada = temporada;
    }

    get id_plan_usuario(): number{
        return this._id_plan_usuario
    }

    get precio(): number{
        return this._precio
    }

    get temporada(): string{
        return this._temporada
    }
}

export default Tarifa;
