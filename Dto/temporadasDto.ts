class Temporada {
    private _estadoTemporada: string;

    constructor(estadoTemporada: string) {
        this._estadoTemporada = estadoTemporada;
    }

    get estadoTemporada(): string {
        return this._estadoTemporada;
    }
}

export default Temporada;
