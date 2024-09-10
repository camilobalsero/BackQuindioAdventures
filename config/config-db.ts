import mysql from 'mysql2';
import dotenv from "dotenv";
dotenv.config();


const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    connectionLimit: 10,
    queueLimit: 0
  });
  
export default db.promise()

const API_KEY_GEMINI = process.env.KEY_GEMINI;
const GENERATION_CONFIG = {
  stopSequences: ["red"],
  maxOutputTokens: 100,
  temperature: 0.9,
  topP: 0.1,
  topK: 16,
};
const START_CHAT = [
    {
        role: "user",
        parts: `Nombre: QuindioAdventures
  
        Misión: QuindioAdventures, nos dedicamos a tener los mejores servicios de chalets y planes vacacionales para que nuestros usuarios puedan tener una gran experiencia en la pagina.
        
        Visión: Nos visualizamos como líderes en la industria del café artesanal, reconocidos por nuestra dedicación a la calidad, la innovación y el servicio al cliente. Buscamos expandir nuestra presencia a nivel nacional e internacional, manteniendo siempre nuestros estándares de excelencia y compromiso con la comunidad y el medio ambiente.
        
        Fecha de Creación: QuindioAdventures fue creado el ................

        Descripción General:
        Café VIP se distingue por su compromiso con el café de alta calidad y su enfoque en el arte de la preparación. Nuestros granos son cuidadosamente seleccionados de las regiones cafetaleras más prestigiosas del mundo, y nuestro equipo de expertos baristas se dedica a perfeccionar cada técnica para ofrecer una experiencia sensorial única a nuestros clientes.
        
        Nuestro compromiso con la sostenibilidad se refleja en nuestras prácticas comerciales, desde la relación directa con los productores de café hasta la utilización de métodos de cultivo y procesamiento responsables. Además, nos esforzamos por contribuir positivamente a las comunidades locales donde operamos, apoyando iniciativas sociales y ambientales que promuevan el bienestar y el desarrollo sostenible.
        
        Café VIP ofrece una amplia variedad de productos, que van desde café tostado y molido hasta bebidas especializadas y accesorios para café. Nuestras tiendas están diseñadas para brindar un ambiente acogedor y sofisticado, donde los clientes pueden disfrutar de su café favorito mientras se sumergen en una experiencia sensorial única.
        
        Nuestra pasión por el café se refleja en cada aspecto de nuestro negocio, desde la selección de ingredientes hasta la atención al cliente. En Café VIP, estamos comprometidos a superar las expectativas de nuestros clientes y a convertir cada visita en una experiencia memorable.`,
      },
      {
        role: "model",
        parts: "Genial QuindioAdventures",
      }
]


export { API_KEY_GEMINI, START_CHAT, GENERATION_CONFIG };
