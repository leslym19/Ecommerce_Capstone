import { Router } from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = Router()

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  try {
    const user = await User.create({ name, email, password })
    res.json({ id: user._id })
  } catch (e) {
    res.status(400).json({ error: e.message })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (!user || !(await user.comparePassword(password))) {
    return res.status(400).json({ error: 'Invalid credentials' })
  }
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' })
  res.json({ ok: true })
})

router.post('/logout', (req, res) => {
  res.clearCookie('token')
  res.json({ ok: true })
})

export default router
