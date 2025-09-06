import { Router } from 'express'
import Stripe from 'stripe'

const router = Router()
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-06-20' })

router.post('/session', async (req, res) => {
  const { items } = req.body
  const line_items = items.map(i => ({
    price_data: {
      currency: 'usd',
      product_data: { name: i.name },
      unit_amount: i.price
    },
    quantity: i.qty
  }))
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    line_items,
    success_url: (process.env.CLIENT_URL || 'http://localhost:5173') + '/checkout?success=1',
    cancel_url: (process.env.CLIENT_URL || 'http://localhost:5173') + '/cart'
  })
  res.json({ id: session.id })
})

export default router
