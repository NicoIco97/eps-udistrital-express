import { RequestHandler } from 'express';
import { Cita } from '../models/cita.model';

/**
 * @api {get} /ruta/citas Obtener todas las citas
 * @apiName ObtenerCitas
 * @apiGroup Citas
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object[]} data Lista de citas.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Operación exitosa",
 *      "data": [cita1, cita2, ...]
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al obtener las citas",
 *      "error": "Descripción del error"
 *    }
 */
export const getCitas: RequestHandler = async (req, res) => {
  try {
    const citas = await Cita.findAll()

    res.status(200).json({
      message: 'Operación exitosa',
      data: citas
    })
  } catch (error) {
    const err = error as Error
    res.status(500).json({
      message: 'Error al obtener las citas',
      error: err.message
    })
  }
}

/**
 * @api {get} /ruta/citas/uno Obtener una cita por parámetros
 * @apiName ObtenerUnaCita
 * @apiGroup Citas
 *
 * @apiParam {String} profesional ID del profesional.
 * @apiParam {String} paciente ID del paciente.
 * @apiParam {String} fecha Fecha y hora de la cita.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles de la cita encontrada.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Cita encontrada",
 *      "data": citaEncontrada
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al obtener los doctores",
 *      "error": "Descripción del error"
 *    }
 */
export const getOneCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      res.status(200).json({
        message: 'Cita encontrada',
        data: cita
      })
    } else {
      res.status(404).json({
        message: 'Cita no encontrada'
      })
    }

  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener los doctores',
      error: error.message
    })
  }
}

/**
 * @api {post} /ruta/citas Crear una nueva cita
 * @apiName CrearCita
 * @apiGroup Citas
 *
 * @apiParam (Body) {Object} cita Detalles de la cita a crear.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles de la cita creada.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Cita creada!",
 *      "data": citaCreada
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "No se pudo crear la cita",
 *      "error": "Descripción del error"
 *    }
 */
export const createCita: RequestHandler = async (req, res) => {
  try {
    const cita = await Cita.create(req.body)

    res.status(201).json({
      message: 'Cita creada!',
      data: cita
    })
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'No se pudo crear la cita',
      error: err.message
    })
  }
}

/**
 * @api {put} /ruta/citas Actualizar una cita
 * @apiName ActualizarCita
 * @apiGroup Citas
 *
 * @apiParam {String} profesional ID del profesional.
 * @apiParam {String} paciente ID del paciente.
 * @apiParam {String} fecha Fecha y hora de la cita.
 * @apiParam (Body) {Object} cita Detalles actualizados de la cita.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Cita actualizada"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al modificar la cita",
 *      "error": "Descripción del error"
 *    }
 */
export const updateCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      await Cita.update(req.body, {
        where: {
          fecha_hora: fecha,
          id_profesional: profesional,
          id_numeroCedula: paciente
        }
      })
      res.status(200).json({
        message: 'Cita actualizada'
      })
    } else {
      res.status(404).json({
        message: 'Cita no existe'
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al modificar la cita',
      error: error.message
    })
  }
}

/**
 * @api {delete} /ruta/citas Eliminar una cita
 * @apiName EliminarCita
 * @apiGroup Citas
 *
 * @apiParam {String} profesional ID del profesional.
 * @apiParam {String} paciente ID del paciente.
 * @apiParam {String} fecha Fecha y hora de la cita.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Cita eliminada"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al eliminar la cita",
 *      "error": "Descripción del error"
 *    }
 */
export const deleteCita: RequestHandler = async (req, res) => {
  try {
    const { profesional, paciente, fecha } = req.query

    const cita = await Cita.findOne({
      where: {
        fecha_hora: fecha,
        id_profesional: profesional,
        id_numeroCedula: paciente
      }
    })

    if (cita) {
      await Cita.destroy({
        where: {
          fecha_hora: fecha,
          id_profesional: profesional,
          id_numeroCedula: paciente
        }
      })
      res.status(200).json({
        message: 'Cita eliminada'
      })
    } else {
      res.status(404).json({
        message: 'Cita no existe'
      })
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al eliminar la cita',
      error: error.message
    })
  }
}
