import mongoose, {Schema, Document} from 'mongoose';

// Primero generamos la interfaz con los los nombrs y los tipos del modelo de datos:

interface User_interface extends Document {
  name: string;
  surnames: string;
  dni: string;
  phone: number;
  email: string;
  password: string;
  administrator: number;
  afiliateNumber: number;
  vacationsDays: number;
}

// Definimos el esquema para el modelo de Usuario

const userSchema: Schema = new Schema({
  name: {type: String},
  surnames: {type: String},
  dni: {type: String, require:true},
  phone: {type: Number},
  email: {type: String, require:true, unique:true},
  password: {type: String, require: true},
  administrator: {type: Number, require:true},
  afiliateNumber: {type: Number, require:true},
  vacationsDays: {type: Number, require:false}
});

// Crear el modelo Usuario
const user = mongoose.model<User_interface>('user', userSchema);

// Exportamos el modelo de datos
export default user;

