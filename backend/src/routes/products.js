import { Router } from 'express'
import Product from '../models/Product.js'
import { requireAuth, requireAdmin } from '../middleware/auth.js'

const router = Router()

router.get('/', async (req, res) => {
  const { q, category } = req.query
  const filter = {}
  if (q) filter.name = { $regex: q, $options: 'i' }
  if (category) filter.category = category
  const products = await Product.find(filter).sort({ createdAt: -1 })
  res.json(products)
})

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  try {
    const p = await Product.create(req.body)
    res.status(201).json(p)
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await Product.findByIdAndDelete(req.params.id)
  res.json({ ok: true })
})

export default router
