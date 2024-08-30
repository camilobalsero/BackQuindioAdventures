class Chalet {
    _nombreChalet: string;
    _municipioChalet: string;
    _ubicacionChalet: string;
    _caracteristicas:string;
    _email:string;
    _fechaRegistro: string;
    constructor(
        nombreChalet: string, municipioChalet:string, ubicacionChalet: string, caracteristicas: 
        string, email:string, fechaRegistro: string
    ) {
        this._nombreChalet = nombreChalet,
        this._municipioChalet = municipioChalet,
        this._ubicacionChalet= ubicacionChalet,
        this._caracteristicas= caracteristicas,
        this._email = email,
        this._fechaRegistro = fechaRegistro
    }
        //Getters
        get nombreChalet(): string{
            return this._nombreChalet
        }

        get municipioChalet(): string{
            return this._municipioChalet
        }
    
        get ubicacionChalet(): string{
            return this._ubicacionChalet
        }

        get caracteristicas(): string{
            return this._caracteristicas
        }

        get email():string{
            return this._email
        }

        get fechaRegistro():string{
            return this._fechaRegistro
        }

        //Setters
        set nombreChalet(nombreChalet:string){
            this._nombreChalet = nombreChalet
        }

        set municipioChalet(municipioChalet:string){
            this._municipioChalet = municipioChalet
        }
    
        set ubicacionChalet(ubicacionChalet:string){
            this._ubicacionChalet = ubicacionChalet
        }

        set caracteristicas(caracteristicas:string){
            this._caracteristicas = caracteristicas
        }

        set email(email:string){
            this._email = email
        }

        set fechaRegistro(fechaRegistro:string){
            this._fechaRegistro = fechaRegistro
        }
}

export default Chalet;