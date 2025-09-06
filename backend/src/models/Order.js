import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    qty: { type: Number, default: 1 },
    price: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['pending','paid','shipped','delivered'], default: 'pending' },
  paid: { type: Boolean, default: false }
}, { timestamps: true })

export default mongoose.model('Order', orderSchema)
