import mongoose, {Schema, Document} from 'mongoose';

interface Record_interface extends Document {
  name: string;
  email: string;
  estado: string;
  ubication: string;
  action: string;
  dateTime: string;
  jornada: string;
}

const recordSchema: Schema = new Schema({
  name: {type: String, require:true},
  email: { type: String, require: true, unique: true},
  estado: {type: String, require:false},
  dateTime: {type: String, require:false},
  ubication: {type: String, require:false},
  action: {type: String, require:false},
  jornada: {type: String, require: false}
});

// Crear el modelo Usuario
const record = mongoose.model<Record_interface>('record', recordSchema);

// Exportamos el modelo de datos
export default record;
