// src/components/ProductCard.jsx

import React from "react";
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

const ProductCard = ({ product }) => {
  const { addToCart } = useCart()
  
  return (
    <div className="bg-white border rounded-xl shadow-sm hover:shadow-md transition flex flex-col hover:-translate-y-0.5 duration-200 h-full">
      <div className="relative">
        <img 
          src={`http://localhost:5000${product.image}`} 
          alt={product.name}
          className="w-full h-48 object-cover rounded-t-xl"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Available';
          }}
        />
        <div className="absolute top-2 right-2 text-[12px] bg-white/90 border rounded px-2 py-0.5 font-semibold">₹{product.price}</div>
      </div>
      <div className="flex flex-col justify-between p-4 flex-1">
        <div>
          <h3 className="text-[14px] font-semibold text-gray-800">{product.name}</h3>
          {product.description && (
            <p className="text-[12px] text-gray-500 mt-1 line-clamp-2">{product.description}</p>
          )}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            to={`/products/${product._id || product.id}`}
            className="text-center bg-white border text-green-700 border-green-600 text-[13px] py-2 rounded hover:bg-green-50"
          >
            View
          </Link>
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="text-center bg-green-600 text-white text-[13px] py-2 rounded hover:bg-green-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
