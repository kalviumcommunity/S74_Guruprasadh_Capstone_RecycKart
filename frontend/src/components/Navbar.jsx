import { Link, useNavigate } from 'react-router-dom'
import { logout, getRole } from '../utils/auth'

export default function Navbar() {
  const navigate = useNavigate()
  const role = getRole()

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md px-4 md:px-6 py-3">
      <div className="flex items-center gap-4">
        <div className="text-xl md:text-2xl font-extrabold text-green-700 whitespace-nowrap">
          <Link to="/">RecycKart</Link>
        </div>

        <div className="hidden md:flex space-x-6 text-gray-700 font-medium">
          <Link to="/products" className="hover:text-green-700">Products</Link>
          <Link to="/contribute" className="hover:text-green-700">Contribute</Link>
          <Link to="/partner" className="hover:text-green-700">Partner</Link>
        </div>

        <div className="flex-1 hidden md:flex justify-center">
          <div className="relative w-full max-w-sm">
            <input className="w-full border rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-600" placeholder="Search..." />
            <span className="absolute left-3 top-2.5 text-gray-500">🔍</span>
          </div>
        </div>

        <div className="ml-auto space-x-2 md:space-x-4 whitespace-nowrap">
        {role ? (
          <>
            {(role === 'admin' || role === 'seller') && (
              <Link to="/add-product" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">
                Add Product
              </Link>
            )}
            <button
              onClick={() => {
                logout()
                navigate('/login')
              }}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 font-medium border px-4 py-2 rounded-md hover:bg-gray-50">Sign In</Link>
            <Link to="/signup" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition">Sign Up</Link>
          </>
        )}
        </div>
      </div>
    </nav>
  )
}
