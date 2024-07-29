class Tarifa {
    _id_chalet_usuario: number;
    _precio: number;
    _tipo_habitacion: string;
    _temporada: string;

    constructor(id_chalet_usuario: number, precio: number, tipo_habitacion: string, temporada: string) {
        this._id_chalet_usuario = id_chalet_usuario;
        this._precio = precio;
        this._tipo_habitacion = tipo_habitacion;
        this._temporada = temporada;
    }

    get id_chalet_usuario(): number{
        return this._id_chalet_usuario
    }

    get precio(): number{
        return this._precio
    }

    get tipo_habitacion(): string{
        return this._tipo_habitacion
    }

    get temporada(): string{
        return this._temporada
    }
}

export default Tarifa;
