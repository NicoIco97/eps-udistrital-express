import { RequestHandler } from 'express';
import { Doctor } from '../models/doctores.model';

/**
 * @api {get} /ruta/doctores Obtener todos los doctores
 * @apiName ObtenerDoctores
 * @apiGroup Doctores
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object[]} data Lista de doctores.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Operación exitosa",
 *      "data": [doctor1, doctor2, ...]
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
export const getDoctores: RequestHandler = async (req, res) => {
  try {
    const doctores = await Doctor.findAll();

    res.status(200).json({
      message: 'Operación exitosa',
      data: doctores
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'Error al obtener los doctores',
      error: err.message
    });
  }
};

/**
 * @api {get} /ruta/doctores/:id Obtener un doctor por ID
 * @apiName ObtenerDoctorPorId
 * @apiGroup Doctores
 *
 * @apiParam {String} id ID del doctor.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles del doctor encontrado.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Doctor encontrado",
 *      "data": doctorEncontrado
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
export const getDoctorById: RequestHandler = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (doctor) {
      res.status(200).json({
        message: 'Doctor encontrado',
        data: doctor
      });
    } else {
      res.status(404).json({
        message: 'Doctor no encontrado'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al obtener los doctores',
      error: error.message
    });
  }
};

/**
 * @api {post} /ruta/doctores Crear un nuevo doctor
 * @apiName CrearDoctor
 * @apiGroup Doctores
 *
 * @apiParam (Body) {Object} doctor Detalles del doctor a crear.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles del doctor creado.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 201 Created
 *    {
 *      "message": "Doctor creado!",
 *      "data": doctorCreado
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "No se pudo crear el doctor",
 *      "error": "Descripción del error"
 *    }
 */
export const createDoctor: RequestHandler = async (req, res) => {
  try {
    const doctor = await Doctor.create(req.body);

    res.status(201).json({
      message: 'Doctor creado!',
      data: doctor
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({
      message: 'No se pudo crear el doctor',
      error: err.stack
    });
  }
};

/**
 * @api {put} /ruta/doctores/:id Actualizar un doctor
 * @apiName ActualizarDoctor
 * @apiGroup Doctores
 *
 * @apiParam {String} id ID del doctor.
 * @apiParam (Body) {Object} doctor Detalles actualizados del doctor.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Doctor actualizado"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al modificar el doctor",
 *      "error": "Descripción del error"
 *    }
 */
export const updateDoctor: RequestHandler = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (doctor) {
      await Doctor.update(req.body, {
        where: {
          id_profesional: req.params.id
        }
      });
      res.status(200).json({
        message: 'Doctor actualizado'
      });
    } else {
      res.status(404).json({
        message: 'Doctor no existe'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al modificar el doctor',
      error: error.message
    });
  }
};

/**
 * @api {delete} /ruta/doctores/:id Eliminar un doctor
 * @apiName EliminarDoctor
 * @apiGroup Doctores
 *
 * @apiParam {String} id ID del doctor.
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Doctor eliminado"
 *    }
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al eliminar el doctor",
 *      "error": "Descripción del error"
 *    }
 */
export const deleteDoctor: RequestHandler = async (req, res) => {
  try {
    const doctor = await Doctor.findByPk(req.params.id);

    if (doctor) {
      await Doctor.destroy({
        where: {
          id_profesional: req.params.id
        }
      });
      res.status(200).json({
        message: 'Doctor eliminado'
      });
    } else {
      res.status(404).json({
        message: 'Doctor no existe'
      });
    }
  } catch (error: any) {
    res.status(500).json({
      message: 'Error al eliminar el doctor',
      error: error.message
    });
  }
};
