import { model, Schema } from 'mongoose'
const Nota = new Schema(
  {
    titulo: { type: String, require: true },
    tareas: [
      {
        tareaTitulo: { type: String, required: true },
        tareaCompletada: { type: Boolean, default: false }
      }
    ],
    usuario: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
)
const NotasSchema = model('Notas', Nota)
export default NotasSchema
