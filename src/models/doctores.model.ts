import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model';

/**
 * @typedef {('medicina_interna' | 'medicina_general')} Especialidad - Tipo de especialidad del doctor.
 */

/**
 * @typedef {Object} DoctorAttributes - Atributos del modelo Doctor.
 * @property {number} id_profesional - ID único del doctor (clave primaria).
 * @property {string} nombre - Nombre del doctor.
 * @property {string} apellido - Apellido del doctor.
 * @property {string} correo - Correo electrónico del doctor.
 * @property {string} telefono - Número de teléfono del doctor.
 * @property {Especialidad} especialidad - Especialidad del doctor.
 */

/**
 * @apiDefine DoctorModel
 *
 * @apiSuccess {number} id_profesional ID único del doctor.
 * @apiSuccess {string} nombre Nombre del doctor.
 * @apiSuccess {string} apellido Apellido del doctor.
 * @apiSuccess {string} correo Correo electrónico del doctor.
 * @apiSuccess {string} telefono Número de teléfono del doctor.
 * @apiSuccess {Especialidad} especialidad Especialidad del doctor.
 * @apiSuccess {Object[]} cita Lista de citas asociadas al doctor.
 */

/**
 * @apiDefine DoctorSuccess
 *
 * @apiSuccess {String} message Mensaje de éxito.
 * @apiSuccess {Object} data Detalles del doctor.
 * @apiSuccessExample {json} Success
 *    HTTP/1.1 200 OK
 *    {
 *      "message": "Operación exitosa",
 *      "data": {
 *        "id_profesional": 1,
 *        "nombre": "Dr. Ejemplo",
 *        "apellido": "Apellido",
 *        "correo": "ejemplo@correo.com",
 *        "telefono": "123456789",
 *        "especialidad": "medicina_general",
 *        "cita": [cita1, cita2, ...]
 *      }
 *    }
 */

/**
 * @apiDefine DoctorError
 *
 * @apiError {String} message Mensaje de error.
 * @apiError {String} error Descripción detallada del error.
 * @apiErrorExample {json} Error
 *    HTTP/1.1 500 Internal Server Error
 *    {
 *      "message": "Error al realizar la operación",
 *      "error": "Descripción del error"
 *    }
 */

/**
 * @class
 * @extends Model
 * @classdesc Modelo para la tabla 'doctor'.
 * @swagger
 * @swaggerDefinition
 *   Doctor:
 *     properties:
 *       id_profesional:
 *         type: integer
 *         description: ID único del doctor.
 *       nombre:
 *         type: string
 *         description: Nombre del doctor.
 *       apellido:
 *         type: string
 *         description: Apellido del doctor.
 *       correo:
 *         type: string
 *         description: Correo electrónico del doctor.
 *       telefono:
 *         type: string
 *         description: Número de teléfono del doctor.
 *       especialidad:
 *         type: string
 *         enum: ['medicina_interna', 'medicina_general']
 *         description: Especialidad del doctor.
 */
@Table({
  timestamps: false,
  tableName: 'doctor',
})
export class Doctor extends Model {
  /**
   * @member {number}
   * @description ID único del doctor (clave primaria).
   */
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  })
  id_profesional!: number;

  /**
   * @member {string}
   * @description Nombre del doctor.
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;

  /**
   * @member {string}
   * @description Apellido del doctor.
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido!: string;

  /**
   * @member {string}
   * @description Correo electrónico del doctor.
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  correo!: string;

  /**
   * @member {string}
   * @description Número de teléfono del doctor.
   */
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telefono!: string;

  /**
   * @member {Especialidad}
   * @description Especialidad del doctor.
   */
  @Column({
    type: DataType.ENUM('medicina_interna', 'medicina_general'),
    allowNull: false,
  })
  especialidad!: string;

  /**
   * @member {Cita[]}
   * @description Lista de citas asociadas al doctor.
   */
  @HasMany(() => Cita)
  cita!: Cita[];
}
