const config = require('config');
const database = config.get('DB');
const ServicePg = require('../../../database/postgress');
const _servicio = new ServicePg(database);


class CitasDAO {

/**
 * @description Consulta toda la información de las citas en la base de datos.
 * @returns
 */
async consultarCitas()  {    
    let sql = `SELECT id_cita, nombre_cliente, veterinario, descripcion
	FROM public."Citas";`;
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta
};


/**
 * @description Consulta una cita en específico en la base de datos.
 * @param {int} id_cita
 * @returns
 */
async consultarCita(id_cita){   
    let sql = `SELECT nombre_cliente, veterinario, descripcion
    FROM public."Citas" where id_cita=$1;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_cita]);
    return respuesta;
  };
  

/**
 * @description Almacena una nueva cita en la base de datos.
 * @param {Object} cita
 * @returns 
 */
async guardarCita(cita) {
    let sql = `INSERT INTO public."Citas"(id_cita, nombre_cliente, veterinario, descripcion)
                VALUES ($1, $2, $3, $4);`;
    let valores = [cita.id_cita, cita.nombre_cliente,cita.veterinario,cita.descripcion];
    let respuesta = await _servicio.executeSQL(sql, valores);
    return respuesta
};

/**
 * @description Modifica la información de una cita .
 * @param {Object} cita 
 * @returns 
 */
 async editarCita (cita)  {
    let sql =
      `UPDATE public."Citas"
        SET   nombre_cliente=$1, veterinario=$2, descripcion=$3
        WHERE id_cita = $4;`;
    let valores = [ cita.nombre_cliente,cita.veterinario,cita.descripcion,cita.id_cita];
     await _servicio.executeSQL(sql, valores);
   
  };
}
module.exports={CitasDAO}