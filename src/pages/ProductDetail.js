import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAbility } from '../context/AbilityContext';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { getApiBaseUrl } from '../config/apiConfig';

const API_URL = getApiBaseUrl();

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const ability = useAbility();
  const { user } = useAuth();
  const { addToCart } = useCart();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_URL}/products/${id}`);
      if (response.data) {
        setProduct(response.data);
      } else {
        setProduct(null);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      setProduct(null);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await axios.delete(`${API_URL}/products/${id}`);
        navigate('/products');
      } catch (error) {
        alert('Error deleting product');
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!product && !loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <button
            onClick={() => navigate('/products')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button
        onClick={() => navigate('/products')}
        className="mb-4 text-blue-600 hover:text-blue-800 font-medium flex items-center"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <ProductImage
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
            <p className="text-gray-600 mb-4 text-lg">{product.description}</p>
            <div className="space-y-2 mb-6">
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Category:</span> {product.category}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Seller:</span> {product.sellerName || (product.sellerId?.name || 'N/A')}
              </p>
              <p className="text-sm text-gray-500">
                <span className="font-semibold">Stock:</span> {product.stock > 0 ? `${product.stock} available` : 'Out of stock'}
              </p>
            </div>
            <p className="text-4xl font-bold text-blue-600 mb-6">₹{product.price}</p>
            <div className="flex space-x-4">
              {ability.can('create', 'Order') && product.stock > 0 && (
                <button
                  onClick={handleAddToCart}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
                >
                  Add to Cart
                </button>
              )}
              {ability.can('update', 'Product') && user && user.role === 'seller' && (product.sellerId._id || product.sellerId) === user.id && (
                <button
                  onClick={() => navigate(`/seller/products/edit/${product._id}`)}
                  className="px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 font-semibold"
                >
                  Edit Product
                </button>
              )}
              {ability.can('delete', 'Product') && (
                (user && user.role === 'admin') ||
                (user && user.role === 'seller' && (product.sellerId._id || product.sellerId) === user.id)
              ) && (
                  <button
                    onClick={handleDelete}
                    className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold"
                  >
                    Delete Product
                  </button>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
