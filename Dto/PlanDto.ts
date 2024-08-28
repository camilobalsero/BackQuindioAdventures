class Plan {
    _nombrePlan: string;
    _ubicacionPlan: string;
    _caracteristicas:string;
    _email:string
    constructor(
        nombrePlan: string, ubicacionPlan: string, caracteristicas: string, email:string
    ) {
        this._nombrePlan = nombrePlan,
        this._ubicacionPlan = ubicacionPlan,
        this._caracteristicas= caracteristicas,
        this._email = email
    }
        //Getters
        get nombrePlan(): string{
            return this._nombrePlan
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

        //Setters
        set nombrePlan(nombrePlan:string){
            this._nombrePlan = nombrePlan
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
}

export default Plan;