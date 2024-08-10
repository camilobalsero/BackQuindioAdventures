class UpdateUser{
    _email:string;
    _nombres: string;
    _apellidos:string;
    _edad: number;
    _telefono: string;
    _direccion:string;
    _image:string;
    constructor(email: string, nombres: string,
        apellidos:string, edad:number, telefono: string,
        direccion:string, image:string
    ){
        this._email = email;
        this._nombres = nombres;
        this._apellidos = apellidos;
        this._telefono = telefono;
        this._edad = edad;
        this._direccion = direccion;
        this._image = image;
    }

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

    get edad(): number{
        return this._edad
    }

    get image(): string{
        return this._image
    }

    set documento(email:string){
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

    set edad(edad:number){
        this._edad = edad
    }

    set image(image:string){
        this._image = image
    }

}

export default UpdateUser;