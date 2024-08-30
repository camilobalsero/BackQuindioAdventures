class Tarifa {
    _id_plan_usuario: number;
    _precio: number;
    _temporada: string;
    _hora_salida: string;  // Cambiado a string para almacenar solo la hora
    _hora_llegada: string; // Cambiado a string para almacenar solo la hora

    constructor(id_plan_usuario: number, precio: number, temporada: string, hora_salida: string, hora_llegada: string) {
        this._id_plan_usuario = id_plan_usuario;
        this._precio = precio;
        this._temporada = temporada;
        this._hora_salida = hora_salida; // Guardar solo la hora como string
        this._hora_llegada = hora_llegada; // Guardar solo la hora como string
    }

    get id_plan_usuario(): number {
        return this._id_plan_usuario;
    }

    get precio(): number {
        return this._precio;
    }

    get temporada(): string {
        return this._temporada;
    }

    get hora_salida(): string {
        return this._hora_salida; // Devolver la hora de salida
    }

    get hora_llegada(): string {
        return this._hora_llegada; // Devolver la hora de llegada
    }
}

export default Tarifa;
