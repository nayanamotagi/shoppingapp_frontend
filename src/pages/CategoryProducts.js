import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAbility } from '../context/AbilityContext';
import { useCart } from '../context/CartContext';
import ProductImage from '../components/ProductImage';
import { getApiBaseUrl } from '../config/apiConfig';

const API_URL = getApiBaseUrl();

const CategoryProducts = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const ability = useAbility();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_URL}/products`);
        // Filter products by category
        const decodedCategory = decodeURIComponent(categoryName);
        const filteredProducts = response.data.filter(
          product => product.category === decodedCategory
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading products...</div>
      </div>
    );
  }

  const decodedCategory = decodeURIComponent(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <button
          onClick={() => navigate('/categories')}
          className="text-blue-600 hover:text-blue-800 font-medium flex items-center mb-4"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Categories
        </button>
        <h1 className="text-3xl font-bold text-gray-900">
          {decodedCategory} ({products.length} {products.length === 1 ? 'product' : 'products'})
        </h1>
      </div>
      {products.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <p className="text-gray-600 text-lg mb-4">No products found in this category.</p>
          <Link
            to="/categories"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold"
          >
            Browse All Categories
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
              <Link to={`/products/${product._id}`} className="block">
                <ProductImage
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
              </Link>
              <div className="p-4">
                <Link to={`/products/${product._id}`} className="block">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600">
                    {product.name}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-2">{product.category}</p>
                <p className="text-2xl font-bold text-blue-600 mb-4">₹{product.price}</p>
                <div className="flex items-center justify-between">
                  {ability.can('create', 'Order') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryProducts;
