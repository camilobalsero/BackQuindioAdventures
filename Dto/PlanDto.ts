class Plan {
    _nombrePlan: string;
    _municipio: string;
    _ubicacionPlan: string;
    _caracteristicas:string;
    _email:string
    _fechaRegistro:string;
    constructor(
        nombrePlan: string, municipio:string, ubicacionPlan: string, caracteristicas: string, email:string,
        fechaRegistro: string
    ) {
        this._nombrePlan = nombrePlan,
        this._municipio = municipio,
        this._ubicacionPlan = ubicacionPlan,
        this._caracteristicas= caracteristicas,
        this._email = email,
        this._fechaRegistro = fechaRegistro
    }
        //Getters
        get nombrePlan(): string{
            return this._nombrePlan
        }

        get municipioPlan(): string{
            return this._municipio
        }
    
        get ubicacionPlan(): string{
            return this._ubicacionPlan
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
        set nombrePlan(nombrePlan:string){
            this._nombrePlan = nombrePlan
        }

        set municipioPlan(municipio:string){
            this._municipio = municipio
        }
    
        set ubicacionPlan(ubicacionPlan:string){
            this._ubicacionPlan = ubicacionPlan
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

export default Plan;