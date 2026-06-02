import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAbility } from '../context/AbilityContext';
import { useAuth } from '../context/AuthContext';
import { getApiBaseUrl } from '../config/apiConfig';

const API_URL = getApiBaseUrl();

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: '📦'
  });
  const [submitting, setSubmitting] = useState(false);
  const ability = useAbility();
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      setCategories(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      if (editingCategory) {
        // Update category
        await axios.put(
          `${API_URL}/categories/${editingCategory._id}`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
      } else {
        // Create category
        await axios.post(
          `${API_URL}/categories`,
          formData,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
      }

      setFormData({ name: '', description: '', icon: '📦' });
      setShowAddForm(false);
      setEditingCategory(null);
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || 'Error saving category');
    }
    setSubmitting(false);
  };

  const handleEdit = (category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      description: category.description || '',
      icon: category.icon || '📦'
    });
    setShowAddForm(true);
  };

  const handleDelete = async (categoryId, categoryName) => {
    if (!window.confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/categories/${categoryId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      fetchCategories();
    } catch (error) {
      alert(error.response?.data?.message || 'Error deleting category');
    }
  };

  const canEdit = (category) => {
    return user?.role === 'admin' || (category.createdBy?._id || category.createdBy) === user?.id;
  };

  const canDelete = (category) => {
    return user?.role === 'admin' || (category.createdBy?._id || category.createdBy) === user?.id;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading categories...</div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Manage Categories</h1>
        {ability.can('create', 'Category') && (
          <button
            onClick={() => {
              setShowAddForm(!showAddForm);
              setEditingCategory(null);
              setFormData({ name: '', description: '', icon: '📦' });
            }}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold shadow-md transition duration-200 flex items-center space-x-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>{showAddForm ? 'Cancel' : 'Add New Category'}</span>
          </button>
        )}
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {editingCategory ? 'Edit Category' : 'Add New Category'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Electronics, Clothing"
                disabled={!!editingCategory}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                name="description"
                rows="3"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Brief description of the category"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Icon (Emoji)
              </label>
              <input
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="📦"
                maxLength="2"
              />
              <p className="mt-1 text-sm text-gray-500">Enter an emoji icon (e.g., 📦, 🎮, 👕)</p>
            </div>
            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold disabled:opacity-50"
              >
                {submitting ? 'Saving...' : editingCategory ? 'Update Category' : 'Create Category'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingCategory(null);
                  setFormData({ name: '', description: '', icon: '📦' });
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 font-semibold"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {categories.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-12 text-center">
          <p className="text-gray-600 text-lg">No categories found.</p>
          {ability.can('create', 'Category') && (
            <p className="text-gray-500 mt-2">Click "Add New Category" to create your first category.</p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="text-center mb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-3xl">{category.icon || '📦'}</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 capitalize mb-1">{category.name}</h3>
                <p className="text-sm text-gray-500">{category.productCount || 0} products</p>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                )}
                <p className="text-xs text-gray-400 mt-2">
                  Created by: {category.createdBy?.name || 'Unknown'}
                </p>
              </div>
              <div className="flex space-x-2 mt-4">
                {canEdit(category) && (
                  <button
                    onClick={() => handleEdit(category)}
                    className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 text-sm font-medium"
                  >
                    Edit
                  </button>
                )}
                {canDelete(category) && (
                  <button
                    onClick={() => handleDelete(category._id, category.name)}
                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 text-sm font-medium"
                  >
                    Delete
                  </button>
                )}
                <button
                  onClick={() => navigate(`/categories/${encodeURIComponent(category.name)}`)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm font-medium"
                >
                  View Products
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageCategories;
