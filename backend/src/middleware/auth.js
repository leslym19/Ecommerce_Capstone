import jwt from 'jsonwebtoken'

export function requireAuth(req, res, next){
  const token = req.cookies.token
  if (!token) return res.status(401).json({ error: 'Not authenticated' })
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = payload
    next()
  } catch {
    res.status(401).json({ error: 'Invalid token' })
  }
}

export function requireAdmin(req, res, next){
  if (req.user?.role !== 'admin') return res.status(403).json({ error: 'Admin only' })
  next()
}
