class Chalet {
    _nombreChalet: string;
    _ubicacionChalet: string;
    _caracteristicas:string;
    _email:string
    constructor(
        nombreChalet: string, ubicacionChalet: string, caracteristicas: string, email:string
    ) {
        this._nombreChalet = nombreChalet,
        this._ubicacionChalet= ubicacionChalet,
        this._caracteristicas= caracteristicas,
        this._email = email
    }
        //Getters
        get nombreChalet(): string{
            return this._nombreChalet
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

        //Setters
        set nombreChalet(nombreChalet:string){
            this._nombreChalet = nombreChalet
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
}

export default Chalet;