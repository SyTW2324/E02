import mongoose, {Schema, Document} from 'mongoose';

interface Record_interface extends Document {
  email:string;
  ubication: string;
  action: string;
  type: string;
  dateTime: string;
  labor: string;
}

const recordSchema: Schema = new Schema({
  email: {type: String, require:true},
  ubication: {type: String, require:true},
  action: {type: String, require:true},
  type: {type: String, require:true},
  dateTime: {type: String, require:true},
  labor: {type: String, require:true}
});

// Crear el modelo Usuario
const record = mongoose.model<Record_interface>('record', recordSchema);

// Exportamos el modelo de datos
export default record;
