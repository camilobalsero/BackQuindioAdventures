class UserRegister {
    _documento:string;
    _email: string;
    _password: string;
    _nombres: string;
    _apellidos:string;
    _edad: number;
    _telefono: string;
    _direccion:string;
    constructor(
        documento: string, email: string, password: string, nombres: string, 
        apellidos:string, edad:number, telefono: string,
        direccion:string
    ) {
        this._email = email;
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._password = password;
        this._edad = edad;
        this._documento = documento;
        this._direccion = direccion;
    }
        //Getters
        get email(): string{
            return this._email
        }
    
        get nombres(): string{
            return this._nombres
        }

        get apellidos(): string{
            return this._apellidos
        }
    
        get direccion(): string{
            return this._direccion
        }
    
        get telefono(): string{
            return this._telefono
        }
        get password(): string{
            return this._password
        }
        get edad(): number{
            return this._edad
        }

        get documento(): string{
            return this._documento
        }
    
        //Setters
        set email(email:string){
            this._email = email
        }
    
        set nombres(nombres:string){
            this._nombres = nombres
        }

        set apellidos(apellidos:string){
            this._apellidos = apellidos
        }
    
        set direccion(direccion:string){
            this._direccion = direccion
        }
    
        set telefono(telefono:string){
            this._telefono = telefono
        }
    
        set password(password:string){
            this._password = password
        }
    
        set edad(edad:number){
            this._edad = edad
        }

        set documento(documento:string){
            this._documento = documento
        }
        
}

export default UserRegister;