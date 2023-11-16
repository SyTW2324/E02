import mongoose, {Schema, Document} from 'mongoose';

interface Vacations_interface extends Document {
  email:string,
  beginningDate: string,
  endDate: string
}

const vacationsSchema: Schema = new Schema({
  email: {type: String, require:true, unique:true},
  beginningDate: {type: String, require:true},
  endDate: {type: String, require:true}
});

// Crear el modelo Usuario
const vacation = mongoose.model<Vacations_interface>('vacations', vacationsSchema);

// Exportamos el modelo de datos
export default vacation;
