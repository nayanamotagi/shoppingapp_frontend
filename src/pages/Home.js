import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useAbility } from '../context/AbilityContext';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ability = useAbility();
  const { addToCart } = useCart();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/products`);
      // Show latest 8 products
      setProducts(response.data.slice(0, 8));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleAddToCart = (e, product) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Promotional Banner */}
      <div className="relative bg-gradient-to-r from-red-600 via-pink-600 to-red-500 rounded-2xl shadow-2xl overflow-hidden mb-12">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="relative px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-center md:text-left mb-6 md:mb-0 flex-1">
              <div className="inline-block bg-yellow-400 text-red-800 px-4 py-2 rounded-full text-sm font-bold mb-4 animate-pulse">
                🔥 LIMITED TIME OFFER
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
                MEGA SALE
              </h2>
              <h3 className="text-2xl md:text-3xl font-bold text-yellow-300 mb-4">
                Up to 70% OFF
              </h3>
              <p className="text-lg md:text-xl text-white/90 mb-6">
                Shop the biggest sale of the year! Don't miss out on amazing deals.
              </p>
              <Link
                to="/products"
                className="inline-block bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-lg"
              >
                Shop Now →
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="text-9xl opacity-20 text-white">🎉</div>
            </div>
          </div>
        </div>
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-400 rounded-full -mr-32 -mt-32 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400 rounded-full -ml-24 -mb-24 opacity-20"></div>
      </div>

      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Welcome to E-Commerce Store
        </h1>
        <p className="text-xl text-gray-600">
          Your one-stop shop for all your needs
        </p>
      </div>

      {/* Featured Products Section */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
          <Link
            to="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
          >
            View All
            <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-xl text-gray-500">Loading products...</div>
          </div>
        ) : products.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-600 text-lg">No products available at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <Link
                to={`/products/${product._id}`}
                key={product._id}
                className="block group"
              >
                <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col">
                  {/* Sale Badge */}
                  <div className="relative">
                    <ProductImage
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      SALE
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-sm mb-2">{product.category}</p>
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-2xl font-bold text-blue-600">₹{product.price}</span>
                      <span className="text-sm text-gray-400 line-through">₹{(product.price * 1.5).toFixed(0)}</span>
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">33% OFF</span>
                    </div>
                    <div className="mt-auto">
                      {ability.can('create', 'Order') && product.stock > 0 && (
                        <button
                          onClick={(e) => handleAddToCart(e, product)}
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition-colors"
                        >
                          Add to Cart
                        </button>
                      )}
                      {product.stock === 0 && (
                        <div className="w-full px-4 py-2 bg-gray-300 text-gray-600 rounded text-center font-semibold">
                          Out of Stock
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Additional Promotional Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-3">🚚</div>
          <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
          <p className="text-blue-100">On orders above ₹500</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-3">💳</div>
          <h3 className="text-xl font-bold mb-2">Secure Payment</h3>
          <p className="text-green-100">100% secure transactions</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
          <div className="text-4xl mb-3">↩️</div>
          <h3 className="text-xl font-bold mb-2">Easy Returns</h3>
          <p className="text-purple-100">30-day return policy</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
