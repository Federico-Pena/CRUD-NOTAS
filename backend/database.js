import mongoose from 'mongoose'
import { config } from 'dotenv'
config()

const uri = process.env.URL_DB

const DB = mongoose
  .connect(uri)
  .then(() => console.log(`Conectad a la BD ${mongoose.connection.name}`))

export default DB
