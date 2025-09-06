import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import productRoutes from './routes/products.js'
import checkoutRoutes from './routes/checkout.js'

dotenv.config()
const app = express()

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.get('/api/health', (req, res) => res.json({ ok: true }))

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/checkout', checkoutRoutes)

const PORT = process.env.PORT || 5000
mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(PORT, () => console.log('Server running on ' + PORT))
}).catch(err => {
  console.error('Mongo connection error:', err.message)
  process.exit(1)
})
