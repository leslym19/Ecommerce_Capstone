import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'

dotenv.config()

const sample = [
  { name: 'Wireless Headphones', price: 8999, category: 'Electronics', image: 'https://picsum.photos/seed/hp/600/400', description: 'Noise-cancelling over-ear.' },
  { name: 'Classic Tee', price: 1999, category: 'Clothing', image: 'https://picsum.photos/seed/tee/600/400', description: 'Soft cotton unisex tee.' },
  { name: 'Running Shoes', price: 6499, category: 'Shoes', image: 'https://picsum.photos/seed/run/600/400', description: 'Lightweight and comfy.' }
]

async function run(){
  await mongoose.connect(process.env.MONGO_URI)
  await Product.deleteMany({})
  await Product.insertMany(sample)
  console.log('Seeded', sample.length, 'products')
  process.exit(0)
}

run().catch(e => { console.error(e); process.exit(1) })
