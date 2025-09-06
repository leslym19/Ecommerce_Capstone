import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const [items, setItems] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    setItems(JSON.parse(localStorage.getItem('cart')||'[]'))
  }, [])

  const total = items.reduce((acc, i) => acc + i.price * i.qty, 0)

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Your Cart</h2>
      {items.length === 0 ? <p>Your cart is empty.</p> : (
        <div className="space-y-3">
          {items.map((i, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white border rounded p-3">
              <img src={i.image} className="w-16 h-16 object-cover rounded" />
              <div className="flex-1">
                <div className="font-medium">{i.name}</div>
                <div className="text-sm text-gray-600">${(i.price/100).toFixed(2)} × {i.qty}</div>
              </div>
              <button className="px-3 py-1 border rounded" onClick={() => {
                const arr = items.filter((_, j) => j !== idx)
                setItems(arr); localStorage.setItem('cart', JSON.stringify(arr))
              }}>Remove</button>
            </div>
          ))}
          <div className="text-right font-semibold">Total: ${(total/100).toFixed(2)}</div>
          <button className="bg-black text-white px-4 py-2 rounded" onClick={() => navigate('/checkout')}>Checkout</button>
        </div>
      )}
    </div>
  )
}
