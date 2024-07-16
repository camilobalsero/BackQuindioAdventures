class Chalet {
    _nombreChalet: string;
    _ubicacionChalet: string;
    _capacidad: number;
    _caracteristicas:string;
    _imagen1: Blob;
    _imagen2: Blob;
    _imagen3: Blob;
    _imagen4: Blob;
    constructor(
        nombreChalet: string, ubicacionChalet: string, capacidad: number, caracteristicas: string,imagen1: Blob, imagen2: Blob, imagen3: Blob,imagen4: Blob,
    ) {
        this._nombreChalet = nombreChalet,
        this._ubicacionChalet= ubicacionChalet,
        this._capacidad= capacidad,
        this._caracteristicas= caracteristicas,
        this._imagen1= imagen1,
        this._imagen2= imagen2,
        this._imagen3= imagen3,
        this._imagen4= imagen4
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
    
        get imagen1(): Blob{
            return this._imagen1
        }

        get imagen2(): Blob{
            return this._imagen1
        }

        get imagen3(): Blob{
            return this._imagen3
        }

        get imagen4(): Blob{
            return this._imagen4
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

        set imagen1(imagen1:Blob){
            this._imagen1 = imagen1
        }
    
        set imagen2(imagen2:Blob){
            this._imagen2 = imagen2
        }

        set imagen3(imagen3:Blob){
            this._imagen3 = imagen3
        }
    

        set imagen4(imagen4:Blob){
            this._imagen4 = imagen4
        }
    

        set capacidad(capacidad:number){
            this._capacidad = capacidad
        }
}

export default Chalet;