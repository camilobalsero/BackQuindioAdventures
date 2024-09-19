import db from '../config/config-db';

class recommendedRepository{
    static async recommended(): Promise<any[]> {
        const sql = `SELECT 
    c.id_chalet,
    c.nombre_chalet,
    c.municipio_chalet,
    c.ubicacion_chalet,
    c.caracteristicas,
    c.email_usuario,
    
    -- Seleccionar la primera imagen asociada al chalet basada en el ID de la imagen (orden de inserción)
    (SELECT ci.image 
     FROM chalet_images ci 
     WHERE ci.id_chalet = c.id_chalet 
     ORDER BY ci.id_image ASC 
     LIMIT 1) AS imagen_principal,
    
    -- Agrupar todos los servicios asociados al chalet en un arreglo
    GROUP_CONCAT(DISTINCT cs.servicio ORDER BY cs.id_servicio SEPARATOR ',') AS servicios,
    
    -- Agrupar todas las tarifas asociadas al chalet con una estructura de campos identificables
    GROUP_CONCAT(
        DISTINCT CONCAT(
            '{ "tipo_habitacion": "', tc.tipo_habitacion, 
            '", "precio": ', tc.precio, 
            ', "temporada": "', tc.temporada, '" }'
        ) 
        ORDER BY tc.id_tarifa_chalet SEPARATOR '|'
    ) AS tarifas

    FROM 
        chalet c
    LEFT JOIN 
        chalet_servicios cs ON c.id_chalet = cs.chalet_id
    LEFT JOIN 
        tarifasChalet tc ON c.id_chalet = tc.id_chalet_usuario

    WHERE
        c.estado = TRUE  -- Solo seleccionar chalets cuyo estado sea true

    GROUP BY 
        c.id_chalet

    ORDER BY 
        RAND()  -- Orden aleatorio

    LIMIT 3;  -- Limitar a 3 resultados`;
        try {
            const [rows]: any = await db.execute(sql);
            return rows;
        } catch (error) {
            console.error("Error en la ejecución del procedimiento almacenado:", error);
            throw error;
        }
    }
}

export default recommendedRepository;