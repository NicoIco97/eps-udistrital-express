import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';
import { Paciente } from '../models/paciente.model';
import { Cita } from '../models/cita.model';
import { Doctor } from '../models/doctores.model';

dotenv.config();

// Configuración de la conexión a la base de datos
const connection = new Sequelize({
  dialect: 'mysql', // Puedes cambiar esto según tu base de datos (ej. 'postgres', 'sqlite', etc.)
  host: process.env.HOST,
  username: 'root', // Usuario de la base de datos
  port: Number(process.env.DATABASE_PORT),
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  logging: false, // Desactiva los logs de SQL en la consola
  models: [Paciente, Cita, Doctor], // Modelos que Sequelize debe cargar para la gestión de la base de datos
});

export default connection;
