import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { getApiBaseUrl } from '../config/apiConfig';

const API_URL = getApiBaseUrl();

const Payment = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { orderId, totalAmount } = location.state || {};
  const [processing, setProcessing] = useState(false);

  const handlePayment = async () => {
    if (!orderId) {
      alert('Order not found');
      navigate('/cart');
      return;
    }

    setProcessing(true);

    try {
      // Simulate payment processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Process payment
      const response = await axios.post(
        `${API_URL}/orders/${orderId}/payment`,
        {},
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        }
      );

      if (response.data.success) {
        // Show success message
        alert('Payment Successful! ✅\n\nYour order has been confirmed and is being processed.');
        navigate('/orders');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Payment failed. Please try again.');
    }

    setProcessing(false);
  };

  if (!orderId) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Order not found</h2>
          <button
            onClick={() => navigate('/cart')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Back to Cart
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Payment</h1>
          <p className="text-gray-600">Order ID: {orderId}</p>
        </div>

        <div className="bg-gray-50 rounded-lg p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold text-gray-700">Total Amount:</span>
            <span className="text-3xl font-bold text-blue-600">₹{totalAmount?.toFixed(2) || '0.00'}</span>
          </div>
        </div>

        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Method: Online Payment</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-white rounded border border-gray-200">
              <input type="radio" id="card" name="payment" defaultChecked className="w-4 h-4 text-blue-600" />
              <label htmlFor="card" className="flex-1 cursor-pointer">
                <span className="font-medium">Credit/Debit Card</span>
                <span className="text-sm text-gray-500 ml-2">(Simulated)</span>
              </label>
            </div>
            <div className="bg-yellow-50 border border-yellow-200 rounded p-4">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> This is a simulated payment system for educational purposes.
                No real money will be charged.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={handlePayment}
            disabled={processing}
            className="w-full px-6 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
          >
            {processing ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Processing Payment...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Pay Now</span>
              </>
            )}
          </button>
          <button
            onClick={() => navigate('/cart')}
            className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
