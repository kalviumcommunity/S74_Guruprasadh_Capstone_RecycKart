import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import AddProduct from './pages/AddProduct'
import Contribution from './pages/Contribution'
import Products from './pages/Products'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import OrderConfirmation from './pages/OrderConfirmation'
import Partner from './pages/Partner'
import ProtectedRoute from './components/ProtectedRoute'

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/partner" element={<Partner />} />
        <Route path="/add-product" element={
          <ProtectedRoute roles={['seller', 'admin']}><AddProduct /></ProtectedRoute>
        } />
        <Route path="/contribute" element={
          <ProtectedRoute roles={['user', 'seller', 'admin']}><Contribution /></ProtectedRoute>
        } />
      </Routes>
    </>
  )
}
