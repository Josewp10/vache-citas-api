const {CitasDAO} = require('../DAO/Citas'); 
const _citasDAO = new CitasDAO;


class CitasController {

 /**
  * @description Se toma el parametro con la información de la cita y se valida:
  *  - Que no sea vacio.
  * @param {Object} cita 
  */
   validarCita(cita){
    if (!cita){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.id_cita){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.id_paciente){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.id_prestadorservicios){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.descripcion){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.fecha){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.hora){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }
};

/**
  * @description Se consulta todas las citas que hayan 
  */

   async consultarCitas(){
    let resp = await _citasDAO.consultarCitas();
    return resp.rows;
      
    }

/**
  * @description Se consulta una cita en especifico 
  * @param {Object} id_paciente 
  */

    async consultarCitaPorPaciente(id_paciente){
        let resp = await _citasDAO.consultarCitaPorPaciente(id_paciente);
        switch (resp.rowCount ) {      
            case 0:               
               throw 'Elemento no encontrado';
            case 1:
                return resp.rows;
        }
    }

 /**
  * @description Se consulta una cita en especifico 
  * @param {Object} id_prestadorservicios
  */

     async consultarCitaPorPrestadorDeServicios(id_prestadorservicios){
        let resp = await _citasDAO.consultarCitaPorPrestadorDeServicios(id_prestadorservicios);
        switch (resp.rowCount ) {      
            case 0:               
               throw 'Elemento no encontrado';
            case 1:
                return resp.rows;
        }
    }
/**
  * @description Se crea una cita con su respectiva información
  * @param {Object} cita 
 
  */

    async guardarCita(cita){
        await _citasDAO.guardarCita(cita);
    }

  /**
  * @description Se edita una cita con su respectiva información por id_cita
  * @param {Object} cita 
  * @param {Object} id_cita 
  */

    async editarCita(cita,id_cita){
        if (cita.id_cita != id_cita) {
            throw {
              ok: false,
              mensaje: "id de la cita no corresponde al enviado",
            };
          }
         await _citasDAO.editarCita(cita);
    }



  
}
module.exports={CitasController}