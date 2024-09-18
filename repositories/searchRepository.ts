import db from '../config/config-db'; // Asegúrate de que db esté correctamente configurado

export default class SearchRepository {

  // Método para buscar tanto chalets como planes vacacionales usando el procedimiento almacenado
  static async searchBoth(searchTerm: string): Promise<{ chalets: any[], plans: any[] }> {
    try {
      // Ejecutamos el procedimiento almacenado
      const [results]: any = await db.query('CALL searchChaletsAndPlans(?)', [searchTerm]);

      // results es un array que contiene dos conjuntos de resultados: [chalets, plans]
      const chalets = results[0]; // El primer conjunto es para los chalets
      const plans = results[1];   // El segundo conjunto es para los planes vacacionales

      return {
        chalets,
        plans
      };
    } catch (error) {
      console.error('Error al buscar chalets y planes vacacionales con el procedimiento almacenado:', error);
      throw new Error('Error al buscar chalets y planes vacacionales en la base de datos');
    }
  }
}
