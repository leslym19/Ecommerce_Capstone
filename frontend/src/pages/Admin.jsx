import { useState, useEffect } from 'react'
import axios from 'axios'

export default function Admin() {
  const [products, setProducts] = useState([])
  const [form, setForm] = useState({ name:'', price:0, category:'', image:'', description:'' })

  useEffect(() => { axios.get('/api/products').then(r => setProducts(r.data)) }, [])

  async function addProduct(e){
    e.preventDefault()
    const res = await axios.post('/api/products', form)
    setProducts([res.data, ...products])
    setForm({ name:'', price:0, category:'', image:'', description:'' })
  }

  async function remove(id){
    await axios.delete('/api/products/'+id)
    setProducts(products.filter(p => p._id !== id))
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <form onSubmit={addProduct} className="bg-white border rounded p-4 space-y-2">
        <h3 className="font-semibold text-lg">Add Product</h3>
        <input className="border px-3 py-2 w-full" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} />
        <input className="border px-3 py-2 w-full" placeholder="Price (in cents)" type="number" value={form.price} onChange={e=>setForm({...form, price:Number(e.target.value)})} />
        <input className="border px-3 py-2 w-full" placeholder="Category" value={form.category} onChange={e=>setForm({...form, category:e.target.value})} />
        <input className="border px-3 py-2 w-full" placeholder="Image URL" value={form.image} onChange={e=>setForm({...form, image:e.target.value})} />
        <textarea className="border px-3 py-2 w-full" placeholder="Description" value={form.description} onChange={e=>setForm({...form, description:e.target.value})} />
        <button className="bg-black text-white px-4 py-2 rounded">Create</button>
      </form>

      <div className="space-y-3">
        {products.map(p => (
          <div key={p._id} className="flex items-center gap-3 bg-white border rounded p-3">
            <img src={p.image} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1">
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-600">${(p.price/100).toFixed(2)} · {p.category}</div>
            </div>
            <button className="px-3 py-1 border rounded" onClick={()=>remove(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}
