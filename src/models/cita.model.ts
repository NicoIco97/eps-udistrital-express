import { Table, Column, Model, DataType, PrimaryKey, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Doctor } from './doctores.model';
import { Paciente } from './paciente.model';

/**
 * @typedef {Object} Cita
 * @property {Date} fecha_hora - Fecha y hora de la cita (Clave primaria).
 * @property {number} id_profesional - ID del profesional (Clave primaria, clave externa).
 * @property {number} id_numeroCedula - ID del paciente (Clave primaria, clave externa).
 * @property {Doctor} doctor - Relación con el modelo Doctor.
 * @property {Paciente} paciente - Relación con el modelo Paciente.
 */

@Table({
  timestamps: false,
  tableName: 'cita'
})
export class Cita extends Model {
  /**
   * @type {Date}
   */
  @Column({
    type: DataType.DATE,
    allowNull: false,
    primaryKey: true
  })
  fecha_hora!: Date;

  /**
   * @type {number}
   */
  @PrimaryKey
  @ForeignKey(() => Doctor)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_profesional!: number;

  /**
   * @type {number}
   */
  @PrimaryKey
  @ForeignKey(() => Paciente)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  id_numeroCedula!: number;

  /**
   * @type {Doctor}
   */
  @BelongsTo(() => Doctor)
  doctor!: Doctor;

  /**
   * @type {Paciente}
   */
  @BelongsTo(() => Paciente)
  paciente!: Paciente;
}
