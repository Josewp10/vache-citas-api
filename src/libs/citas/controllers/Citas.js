const {CitasDAO} = require('../DAO/citas'); 
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
    }else if(!cita.nombre_cliente){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.veterinario){
        throw{
            ok: false,
            mensaje: 'Ingrese la información de la cita'
        };
    }else if(!cita.descripcion){
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
  * @param {Object} id_cita 
  */

    async consultarCita(id_cita){
        let resp = await _citasDAO.consultarCita(id_cita);
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