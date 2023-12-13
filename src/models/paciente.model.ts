import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import { Cita } from './cita.model';

/**
 * @typedef {Model} Paciente
 * @property {number} id_numeroCedula - ID del paciente (Clave primaria).
 * @property {string} nombre - Nombre del paciente.
 * @property {string} apellido - Apellido del paciente.
 * @property {Date} fecha_nacimiento - Fecha de nacimiento del paciente.
 * @property {string} telefono - Número de teléfono del paciente.
 * @property {Cita[]} cita - Lista de citas asociadas al paciente.
 */

@Table({
  timestamps: false,
  tableName: 'paciente'
})
export class Paciente extends Model {
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true
  })
  id_numeroCedula!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nombre!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  apellido!: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  fecha_nacimiento!: Date;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  telefono!: string;

  @HasMany(() => Cita)
  cita!: Cita[];
}
