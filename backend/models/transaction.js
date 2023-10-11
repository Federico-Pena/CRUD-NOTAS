import { Schema, model } from 'mongoose'

const transactionSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  type: {
    type: String,
    enum: ['ingreso', 'gasto'],
    required: true
  },
  date: {
    type: Date,
    default: Date.now()
  }
})

const Transaction = model('Transaction', transactionSchema)

export default Transaction
