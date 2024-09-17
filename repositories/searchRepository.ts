import db from '../config/config-db'; // Asegúrate de que db esté correctamente configurado

export default class SearchRepository {

  // Método para buscar chalets
  static async searchChalets(searchTerm: string): Promise<any[]> {
    const query = `
      SELECT
        c.id_chalet AS id,
        c.nombre_chalet,
        c.municipio_chalet,
        c.ubicacion_chalet,
        c.caracteristicas,
        c.email_usuario,
        c.fecha_registro
      FROM chalet c
      WHERE c.nombre_chalet LIKE ?
    `;
    const values = [`%${searchTerm}%`];
    
    try {
      const [chalets]: any = await db.execute(query, values);

      // Ahora obtén las imágenes, servicios y tarifas para cada chalet
      const results = await Promise.all(chalets.map(async (chalet: any) => {
        const imagesQuery = 'SELECT image FROM chalet_images WHERE id_chalet = ?';
        const servicesQuery = 'SELECT servicio FROM chalet_servicios WHERE chalet_id = ?';
        const tarifasQuery = 'SELECT precio, tipo_habitacion, temporada FROM tarifasChalet WHERE id_chalet_usuario = ?';

        const [images]: any = await db.execute(imagesQuery, [chalet.id]);
        const [services]: any = await db.execute(servicesQuery, [chalet.id]);
        const [tarifas]: any = await db.execute(tarifasQuery, [chalet.id]);

        return {
          ...chalet,
          imagenes: images.map((img: any) => img.image),
          servicios: services.map((srv: any) => srv.servicio),
          tarifas: tarifas.map((tar: any) => ({
            precio: tar.precio,
            tipo_habitacion: tar.tipo_habitacion,
            temporada: tar.temporada
          }))
        };
      }));

      return results;
    } catch (error) {
      console.error('Error al buscar chalets en el repositorio:', error);
      throw new Error('Error al buscar chalets en la base de datos');
    }
  }

  // Método para buscar planes vacacionales (ajustar de manera similar)
  static async searchPlans(searchTerm: string): Promise<any[]> {
    const query = `
      SELECT
        p.id_planV AS id,
        p.nombre_planV,
        p.municipio_planV,
        p.ubicacion_planV,
        p.descripcion AS caracteristicas,
        p.email_usuario,
        p.fecha_registro
      FROM planVacacional p
      WHERE p.nombre_planV LIKE ?
    `;
    const values = [`%${searchTerm}%`];
    
    try {
      const [plans]: any = await db.execute(query, values);

      const results = await Promise.all(plans.map(async (plan: any) => {
        const imagesQuery = 'SELECT image FROM planVacacional_images WHERE id_planV_usuario = ?';
        const tarifasQuery = 'SELECT precio, temporada, hora_salida, hora_llegada FROM tarifasPlanVacacional WHERE id_planV_usuario = ?';

        const [images]: any = await db.execute(imagesQuery, [plan.id]);
        const [tarifas]: any = await db.execute(tarifasQuery, [plan.id]);

        return {
          ...plan,
          imagenes: images.map((img: any) => img.image),
          tarifas: tarifas.map((tar: any) => ({
            precio: tar.precio,
            temporada: tar.temporada,
            hora_salida: tar.hora_salida,
            hora_llegada: tar.hora_llegada
          }))
        };
      }));

      return results;
    } catch (error) {
      console.error('Error al buscar planes vacacionales en el repositorio:', error);
      throw new Error('Error al buscar planes vacacionales en la base de datos');
    }
  }

  // Método para buscar tanto chalets como planes vacacionales
  static async searchBoth(searchTerm: string): Promise<any[]> {
    try {
      const chalets = await this.searchChalets(searchTerm);
      const plans = await this.searchPlans(searchTerm);
      return [...chalets, ...plans];
    } catch (error) {
      console.error('Error al buscar chalets y planes vacacionales en el repositorio:', error);
      throw new Error('Error al buscar chalets y planes vacacionales en la base de datos');
    }
  }
}
