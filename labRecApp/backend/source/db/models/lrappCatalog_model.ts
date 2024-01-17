import mongoose, {Schema, Document} from 'mongoose';

interface lrappCatalog_interface extends Document {
  catalogType: string;
  catalogValue: string;
}

// esquema del catalogo
const lrappCatalogSchema: Schema = new Schema({
  catalogType: {type: String, require:true},
  catalogValue: {type: String, require:true}
});

// Crear el modelo Usuario
const catalog = mongoose.model<lrappCatalog_interface>('catalog', lrappCatalogSchema);

// Exportamos el modelo de datos
export default catalog;
