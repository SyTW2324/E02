import mongoose, {Schema, Document} from 'mongoose';

// Primero generamos la interfaz con los los nombrs y los tipos del modelo de datos:

interface User_interface extends Document {
  name: string;
  surnames: string;
  email: string;
  password: string;
  user_type: number;
}

// Definimos el esquema para el modelo de Usuario

const userSchema: Schema = new Schema({
  name: {type: String},
  surnames: {type: String},
  email: {type: String, require:true, unique:true},
  password: {type: String, require: true},
  user_type: {type: Number, require:true}
});

// Crear el modelo Usuario
const user = mongoose.model<User_interface>('user', userSchema);

// Exportamos el modelo de datos
export default user;

