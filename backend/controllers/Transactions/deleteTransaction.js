import Transaction from '../../models/transaction.js'
export const deleteTransactions = async (req, res) => {
  try {
    const id = req.params.id
    const deleted = await Transaction.findByIdAndRemove(id)
    res.json({ data: deleted })
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las transacciones' })
  }
}
