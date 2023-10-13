import Transaction from '../../models/transaction.js'
export const getTransactions = async (req, res) => {
  try {
    const { userId } = req.user
    const { startDate, endDate } = req.query
    const dateFilter = { user: userId }
    let transactions
    if (startDate && endDate) {
      dateFilter.date = { $gte: new Date(startDate), $lte: new Date(endDate) }
      transactions = await Transaction.find(dateFilter).sort({ date: -1 })
    } else {
      transactions = await Transaction.find({ user: userId }).sort({ date: -1 })
    }
    // Envía las transacciones como respuesta
    res.json({ data: transactions })
  } catch (error) {
    console.error('Error al obtener las transacciones:', error)
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
}
