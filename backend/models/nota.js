import { model, Schema } from 'mongoose'
const Nota = new Schema(
  {
    titulo: { type: String, require: true },
    contenido: { type: String, require: true },
    completada: { type: Boolean, default: false },
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    nombreUsuario: { type: String }
  },
  {
    timestamps: true
  }
)
const NotasSchema = model('Notas', Nota)
export default NotasSchema
