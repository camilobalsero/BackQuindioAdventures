class Chalet {
    _nombreChalet: string;
    _ubicacionChalet: string;
    _capacidad: number;
    _caracteristicas:string;
    constructor(
        nombreChalet: string, ubicacionChalet: string, capacidad: number, caracteristicas: string,
    ) {
        this._nombreChalet = nombreChalet,
        this._ubicacionChalet= ubicacionChalet,
        this._capacidad= capacidad,
        this._caracteristicas= caracteristicas
    }
        //Getters
        get nombreChalet(): string{
            return this._nombreChalet
        }
    
        get ubicacionChalet(): string{
            return this._ubicacionChalet
        }

        get capacidad(): number{
            return this._capacidad
        }
    
        get caracteristicas(): string{
            return this._caracteristicas
        }
    
        //Setters
        set nombreChalet(nombreChalet:string){
            this._nombreChalet = nombreChalet
        }
    
        set ubicacionChalet(ubicacionChalet:string){
            this._ubicacionChalet = ubicacionChalet
        }

        set capacidad(capacidad:number){
            this._capacidad = capacidad
        }
    
        set caracteristicas(caracteristicas:string){
            this._caracteristicas = caracteristicas
        }
}

export default Chalet;