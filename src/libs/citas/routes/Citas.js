const express = require('express');
const { CitasController } = require('../controllers/Citas');
const {success, errorResponse} = require('../../../utils/responses');

const router = express.Router();
const _citasController = new CitasController;

/**
 * Petición: Traer todos las citas
 * Parámetros: Vacío
 * Cuerpo: Vacío
 * Respuesta: Citas consultados o mensaje de error
 */
 router.get('/citas', async (req, res) => {
    try {
       let resp = await _citasController.consultarCitas();
        success(req, res, 'citas', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

 
/**
 * Petición: Traer una cita específico
 * Parámetros: id_paciente
 * Cuerpo: Vacío
 * Respuesta: Cita consultado o mensaje de error
 */
 router.get('/citas/citaspaciente/:id_paciente', async (req, res) => {
    let id_paciente = req.params.id_paciente;
    try {
       let resp = await _citasController.consultarCitaPorPaciente(id_paciente);
        success(req, res, 'citas', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});

/**
 * Petición: Traer una cita específico
 * Parámetros: id_prestadorservicios
 * Cuerpo: Vacío
 * Respuesta: Cita consultado o mensaje de error
 */
 router.get('/citas/citaprestadorservicios/:id_prestadorservicios', async (req, res) => {
    let id_prestadorservicios = req.params.id_prestadorservicios;
    try {
       let resp = await _citasController.consultarCitaPorPrestadorDeServicios(id_prestadorservicios);
        success(req, res, 'citas', resp, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
});


/**
 * Petición: Crear cita
 * Cuerpo: Vacío
 * Respuesta: Cita creada
 */
router.post('/citas', async (req, res) => {
    try {
      let citas = req.body;
  
      await _citasController.guardarCita(citas);
      success(req, res, 'Cita creada', null, 200);
    } catch (error) {
      errorResponse(req, res, 'ERROR', error);
    }
  });

/**
 * Petición: Editar cita
 * Cuerpo: Vacío
 * Respuesta: Cita modificada
 */
  router.put("/citas/:id_cita", async (req, res) => {
    try {
      let id_cita = req.params.id_cita;
      let cita = req.body;
  
      await _citasController.editarCita( cita, id_cita);
      success(req, res, 'Cita modificada', null, 200);
    } catch (error) {
        errorResponse(req, res, 'ERROR', error);
    }
  });

  module.exports = router;
