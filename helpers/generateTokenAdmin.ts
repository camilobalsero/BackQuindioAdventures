import jwt from "jsonwebtoken";

function generateToken(email: string, role : string){
    try {
        const token = jwt.sign({ email: email, role: role },  'camilo', { expiresIn: '5h'});
        return token;
    } catch (error) {
        console.error('Error al generar el token:', error);
        throw new Error('Error al generar el token');
    }
}

export default generateToken;