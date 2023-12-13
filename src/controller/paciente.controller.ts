import { RequestHandler } from 'express';
import { Paciente } from '../models/paciente.model';

/**
 * @api {get} /ruta/pacientes Obtener todos los pacientes
 * @apiName ObtenerPacientes
 * @apiGroup Pacientes
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object[]} data Lista de pacientes.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Operación exitosa",
 *      "data": [paciente1, paciente2, ...]
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al obtener los pacientes",
 *      "error": "Descripción del error"
 *    }
 */
export const getPacientes: RequestHandler = async (req, res) => {
  try {
    const pacientes = await Paciente.findAll();

    res.status(200).json({
      message: 'Operación exitosa',
      data: pacientes
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Error al obtener los pacientes',
      error: err.message
    });
  }
};

/**
 * @api {get} /ruta/pacientes/:id Obtener un paciente por ID
 * @apiName ObtenerPacientePorId
 * @apiGroup Pacientes
 *
 * @apiParam {String} id ID del paciente.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles del paciente encontrado.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Paciente encontrado",
 *      "data": pacienteEncontrado
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al obtener los pacientes",
 *      "error": "Descripción del error"
 *    }
 */
export const getPacienteById: RequestHandler = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);

    if (paciente) {
      res.status(200).json({
        message: 'Paciente encontrado',
        data: paciente
      });
    } else {
      res.status(404).json({
        message: 'Paciente no encontrado'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener los pacientes',
      error: error.message
    });
  }
};

/**
 * @api {post} /ruta/pacientes Crear un nuevo paciente
 * @apiName CrearPaciente
 * @apiGroup Pacientes
 *
 * @apiParam (Body) {Object} paciente Detalles del paciente a crear.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles del paciente creado.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Paciente creado!",
 *      "data": pacienteCreado
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "No se pudo crear el paciente",
 *      "error": "Descripción del error"
 *    }
 */
export const createPaciente: RequestHandler = async (req, res) => {
  try {
    const paciente = await Paciente.create(req.body);

    res.status(201).json({
      message: 'Paciente creado!',
      data: paciente
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'No se pudo crear el paciente',
      error: err.stack
    });
  }
};

/**
 * @api {put} /ruta/pacientes/:id Actualizar un paciente
 * @apiName ActualizarPaciente
 * @apiGroup Pacientes
 *
 * @apiParam {String} id ID del paciente.
 * @apiParam (Body) {Object} paciente Detalles actualizados del paciente.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Paciente actualizado"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al modificar el paciente",
 *      "error": "Descripción del error"
 *    }
 */
export const updatePaciente: RequestHandler = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);

    if (paciente) {
      await Paciente.update(req.body, {
        where: {
          id_numeroCedula: req.params.id
        }
      });
      res.status(200).json({
        message: 'Paciente actualizado'
      });
    } else {
      res.status(404).json({
        message: 'Paciente no existe'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Paciente modificado',
      error: error.message
    });
  }
};

/**
 * @api {delete} /ruta/pacientes/:id Eliminar un paciente
 * @apiName EliminarPaciente
 * @apiGroup Pacientes
 *
 * @apiParam {String} id ID del paciente.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Paciente eliminado"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al eliminar el paciente",
 *      "error": "Descripción del error"
 *    }
 */
export const deletePaciente: RequestHandler = async (req, res) => {
  try {
    const paciente = await Paciente.findByPk(req.params.id);

    if (paciente) {
      await Paciente.destroy({
        where: {
          id_numeroCedula: req.params.id
        }
      });
      res.status(200).json({
        message: 'Paciente eliminado'
      });
    } else {
      res.status(404).json({
        message: 'Paciente no existe'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al eliminar el paciente',
      error: error.message
    });
  }
};
