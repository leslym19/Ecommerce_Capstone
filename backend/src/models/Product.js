import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true }, // in cents
  category: { type: String, index: true },
  image: { type: String }, // Cloudinary URL or any URL
  description: { type: String }
}, { timestamps: true })

export default mongoose.model('Product', productSchema)
