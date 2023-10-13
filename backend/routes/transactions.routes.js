import { Router } from 'express'
import { createTransaction } from '../controllers/Transactions/createTransaction.js'
import { getTransactions } from '../controllers/Transactions/getTransactions.js'
import { deleteTransactions } from '../controllers/Transactions/deleteTransaction.js'

const transactionRoutes = Router()

transactionRoutes.get('/api/transactions', getTransactions)
transactionRoutes.post('/api/transactions', createTransaction)
transactionRoutes.delete('/api/transactions/:id', deleteTransactions)

export default transactionRoutes
