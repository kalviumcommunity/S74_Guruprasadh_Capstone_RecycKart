import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom'

export default function Cart() {
  const { cartItems, removeFromCart, clearCart } = useCart()
  const navigate = useNavigate()
  const total = cartItems.reduce((a, i) => a + i.price, 0)

  return (
    <div className="max-w-3xl mx-auto mt-24 px-4">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Your Cart</h2>
      {!cartItems.length ? <p>Empty cart</p> : (
        <div className="space-y-4">
          {cartItems.map(item => (
            <div key={item._id || item.id} className="flex items-center justify-between border rounded p-4 bg-white shadow-sm">
              <div>
                <h4 className="font-semibold">{item.name}</h4>
                <p className="text-green-700">₹{item.price}</p>
              </div>
              <button className="bg-red-500 hover:bg-red-600" onClick={() => removeFromCart(item)}>Remove</button>
            </div>
          ))}
        </div>
      )}
      {cartItems.length > 0 && (
        <div className="mt-6 flex items-center justify-between">
          <h3 className="text-xl font-semibold">Total: ₹{total}</h3>
          <button onClick={() => { clearCart(); navigate('/order-confirmation', { state: { total } }) }}>
            Place Order
          </button>
        </div>
      )}
    </div>
  )
}
