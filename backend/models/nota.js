import { model, Schema } from 'mongoose'
const NotasSchema = new Schema(
  {
    titulo: { type: String, require: true },
    contenido: { type: String, require: true },
    completada: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
)
export default model('Notas', NotasSchema)
