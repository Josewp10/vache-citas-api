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
    let sql = `SELECT id_cita, id_paciente, id_prestadorservicios, descripcion, fecha, hora
	FROM public."Citas";`;
    let respuesta = await _servicio.executeSQL(sql);
    return respuesta
};


/**
 * @description Consulta una cita en específico en la base de datos.
 * @param {int} id_paciente
 * @returns
 */
async consultarCitaPorPaciente(id_paciente){   
    let sql = `SELECT id_cita, id_paciente, id_prestadorservicios, descripcion, fecha, hora
	FROM public."Citas"where id_paciente=$1;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_paciente]);
    return respuesta;
  };

  /**
 * @description Consulta una cita en específico en la base de datos.
 * @param {int} id_prestadorservicios
 * @returns
 */
async consultarCitaPorPrestadorDeServicios(id_prestadorservicios){   
    let sql = `SELECT id_cita, id_paciente, id_prestadorservicios, descripcion, fecha, hora
	FROM public."Citas" where id_prestadorservicios=$1;`;
      
    let respuesta = await _servicio.executeSQL(sql, [id_prestadorservicios]);
    return respuesta;
  };
  

/**
 * @description Almacena una nueva cita en la base de datos.
 * @param {Object} cita
 * @returns 
 */
async guardarCita(cita) {
    let sql = `INSERT INTO public."Citas"( id_paciente, id_prestadorservicios, descripcion, fecha, hora)
                VALUES ($1, $2, $3, $4, $5);`;
    let valores = [cita.id_paciente,cita.id_prestadorservicios,cita.descripcion,cita.fecha,cita.hora];
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
        SET   id_paciente=$1, id_prestadorservicios=$2, descripcion=$3, fecha=$4, hora=$5
        WHERE id_cita = $6;`;
    let valores = [ cita.id_paciente,cita.id_prestadorservicios,cita.descripcion,cita.fecha,cita.hora,cita.id_cita,];
     await _servicio.executeSQL(sql, valores);
   
  };
}
module.exports={CitasDAO}