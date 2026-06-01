import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AbilityProvider } from './context/AbilityContext';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Categories from './pages/Categories';
import CategoryProducts from './pages/CategoryProducts';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import AdminDashboard from './pages/AdminDashboard';
import UserManagement from './pages/UserManagement';
import SellerProducts from './pages/SellerProducts';
import AddProduct from './pages/AddProduct';
import EditProduct from './pages/EditProduct';
import ManageCategories from './pages/ManageCategories';
import Payment from './pages/Payment';

function App() {
  return (
    <AbilityProvider>
      <AuthProvider>
        <CartProvider>
          <Router>
            <div className="min-h-screen bg-gray-50">
              <Navbar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/products" element={<Products />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/categories/:categoryName" element={<CategoryProducts />} />
                <Route
                  path="/cart"
                  element={
                    <PrivateRoute>
                      <Cart />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/payment"
                  element={
                    <PrivateRoute>
                      <Payment />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/orders"
                  element={
                    <PrivateRoute>
                      <Orders />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/dashboard"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <AdminDashboard />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/users"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <UserManagement />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/products"
                  element={
                    <PrivateRoute requiredRole="seller">
                      <SellerProducts />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/products/add"
                  element={
                    <PrivateRoute>
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/products/add"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <AddProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/products/edit/:id"
                  element={
                    <PrivateRoute requiredRole="seller">
                      <EditProduct />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/seller/categories"
                  element={
                    <PrivateRoute>
                      <ManageCategories />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin/categories"
                  element={
                    <PrivateRoute requiredRole="admin">
                      <ManageCategories />
                    </PrivateRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </AbilityProvider>
  );
}

export default App;
