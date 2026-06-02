import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { getApiBaseUrl } from '../config/apiConfig';

const API_URL = getApiBaseUrl();

const Cart = () => {
  const { cart, updateQuantity, removeFromCart, getCartTotal, getCartItems, clearCart } = useCart();
  const [shippingAddress, setShippingAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cod');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!shippingAddress.trim()) {
      alert('Please enter shipping address');
      return;
    }

    if (!paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      const items = getCartItems();
      const response = await axios.post(`${API_URL}/orders`, {
        items,
        shippingAddress,
        paymentMethod
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const orderId = response.data._id;
      const totalAmount = response.data.totalAmount;

      // If payment method is online, redirect to payment page
      if (paymentMethod === 'online') {
        clearCart();
        navigate('/payment', {
          state: { orderId, totalAmount }
        });
      } else {
        // For COD, order is placed directly
        clearCart();
        alert('Order placed successfully! You will pay when the order is delivered.');
        navigate('/orders');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Error placing order');
    }
    setLoading(false);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg">Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {cart.map((item) => (
              <div key={item.productId} className="p-6 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <ProductImage
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{item.product.name}</h3>
                    <p className="text-gray-600">₹{item.product.price}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="px-4">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                  <p className="text-lg font-semibold">
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.productId)}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Shipping Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows="3"
                placeholder="Enter your shipping address"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="online"
                    checked={paymentMethod === 'online'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">Pay Online</span>
                      <span className="ml-2 text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Recommended</span>
                    </div>
                    <p className="text-sm text-gray-500">Pay securely with credit/debit card</p>
                  </div>
                </label>
                <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === 'cod'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                  />
                  <div className="ml-3 flex-1">
                    <div className="flex items-center">
                      <span className="font-medium text-gray-900">Cash on Delivery (COD)</span>
                    </div>
                    <p className="text-sm text-gray-500">Pay when you receive the order</p>
                  </div>
                </label>
              </div>
            </div>
            <div className="border-t border-gray-200 pt-4 mb-4">
              <div className="flex justify-between text-lg font-semibold">
                <span>Total:</span>
                <span>₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
            >
              {loading ? 'Processing...' : paymentMethod === 'online' ? 'Proceed to Payment' : 'Place Order'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
