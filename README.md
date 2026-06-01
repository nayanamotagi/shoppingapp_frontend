# E-Commerce Store - Client Documentation

## 📋 Table of Contents
1. [Overview](#overview)
2. [Getting Started](#getting-started)
3. [User Roles & Permissions](#user-roles--permissions)
4. [Features Guide](#features-guide)
5. [Navigation Guide](#navigation-guide)
6. [API Integration](#api-integration)
7. [Environment Variables](#environment-variables)
8. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

This is the frontend React application for the E-Commerce Store. It provides a complete shopping experience with role-based access control for Admin, Seller, and Customer users.

### Technology Stack
- **React 18.2.0** - UI Framework
- **React Router DOM 6.20.1** - Client-side routing
- **Tailwind CSS 3.3.6** - Styling
- **Axios 1.6.2** - HTTP client
- **CASL 6.7.1** - Authorization library
- **Context API** - State management

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Backend server running on port 5000

### Installation

1. **Navigate to client directory**
   ```bash
   cd client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the `client` directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Open in browser**
   The application will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

---

## 👥 User Roles & Permissions

### 🔑 Admin
**Permissions:**
- ✅ Manage all users (view, block, delete)
- ✅ Manage all products (create, edit, delete)
- ✅ View all orders
- ✅ Update order status
- ✅ Create and manage categories
- ✅ View analytics dashboard

**Accessible Pages:**
- Admin Dashboard (`/admin/dashboard`)
- User Management (`/admin/users`)
- All Products (`/products`)
- All Orders (`/orders`)
- Category Management (`/admin/categories`)

### 🏪 Seller
**Permissions:**
- ✅ Create products
- ✅ Edit/Delete own products only
- ✅ View orders containing their products
- ✅ Update order status for their products
- ✅ Create and manage categories

**Accessible Pages:**
- My Products (`/seller/products`)
- Add Product (`/seller/products/add`)
- Edit Product (`/seller/products/edit/:id`)
- Orders (`/orders`) - filtered to their products
- Category Management (`/seller/categories`)

### 🛒 Customer
**Permissions:**
- ✅ Browse products and categories
- ✅ Add products to cart
- ✅ Place orders
- ✅ View own order history
- ✅ Make payments (Online/COD)

**Accessible Pages:**
- Home (`/`)
- Products (`/products`)
- Product Details (`/products/:id`)
- Categories (`/categories`)
- Category Products (`/categories/:categoryName`)
- Shopping Cart (`/cart`)
- Orders (`/orders`) - own orders only
- Payment (`/payment`)

---

## ✨ Features Guide

### 1. Home Page (`/`)
- **Promotional Banner**: Displays current sales and offers
- **Featured Products**: Shows latest 8 products with:
  - Product images
  - Prices with discount badges
  - "Add to Cart" button
  - Sale indicators
- **Service Highlights**: Free shipping, secure payment, easy returns

### 2. Products Page (`/products`)
- **View All Products**: Grid layout with product cards
- **Product Information**:
  - Product image
  - Name and category
  - Price in ₹ (Indian Rupees)
  - Stock availability
- **Actions**:
  - Click product card to view details
  - Add to cart (customers only)
  - Edit/Delete (sellers for own products, admins for all)
- **Add Product Button**: Visible to sellers and admins

### 3. Product Details (`/products/:id`)
- **Full Product Information**:
  - Large product image
  - Detailed description
  - Category and seller information
  - Stock status
  - Price
- **Actions**:
  - Add to cart
  - Edit product (seller for own products)
  - Delete product (seller for own products, admin for all)
  - Back to products navigation

### 4. Categories (`/categories`)
- **Browse by Category**: View all available product categories
- **Category Cards**: Display category name, icon, and product count
- **Navigation**: Click category to view products in that category

### 5. Category Products (`/categories/:categoryName`)
- **Filtered Products**: Shows only products in selected category
- **Same Features**: As products page but filtered

### 6. Shopping Cart (`/cart`)
- **Cart Items**: List of added products with:
  - Product image
  - Name and price
  - Quantity controls (+/-)
  - Remove button
- **Order Summary**:
  - Shipping address input
  - Payment method selection:
    - **Pay Online**: Redirects to payment page
    - **Cash on Delivery**: Places order directly
  - Total amount
  - Checkout button

### 7. Payment Page (`/payment`)
- **Payment Details**:
  - Order ID
  - Total amount
  - Payment method (Online)
- **Payment Processing**:
  - Simulated payment system
  - "Pay Now" button
  - 2-second processing delay
  - Success confirmation
- **Note**: This is a simulated payment for educational purposes

### 8. Orders Page (`/orders`)
- **Order List**: All orders (filtered by role)
- **Order Information**:
  - Order ID
  - Date
  - Items list
  - Shipping address
  - Payment method and status
  - Order status
  - Total amount
- **Status Management** (Admin/Seller):
  - Dropdown to change order status
  - Options: Pending, Processing, Shipped, Delivered, Cancelled

### 9. Add Product (`/seller/products/add` or `/admin/products/add`)
- **Product Form**:
  - Product Name (required)
  - Description (required)
  - Price in ₹ (required)
  - Stock quantity (required)
  - **Category Dropdown** (required):
    - Select from existing categories
    - Shows category icon
    - Link to create category if none exist
  - Product Image (required):
    - File upload
    - Image preview
    - Supported: JPG, PNG, GIF, WEBP (Max 5MB)
- **Actions**:
  - Create Product
  - Cancel

### 10. Edit Product (`/seller/products/edit/:id`)
- **Same Form as Add Product**
- **Current Image Display**: Shows existing product image
- **Update Image**: Optional - upload new image or keep existing
- **Actions**:
  - Update Product
  - Cancel

### 11. Category Management (`/seller/categories` or `/admin/categories`)
- **Category List**: Grid of all categories
- **Category Information**:
  - Category icon
  - Name
  - Description
  - Product count
  - Created by
- **Actions**:
  - Create Category
  - Edit Category (own categories for sellers, all for admins)
  - Delete Category (only if no products use it)
  - View Products in category

### 12. Admin Dashboard (`/admin/dashboard`)
- **Statistics Overview**:
  - Total Users
  - Total Products
  - Total Orders
  - Total Revenue (in ₹)

### 13. User Management (`/admin/users`)
- **User List**: All registered users
- **User Information**:
  - Name and email
  - Role (Admin, Seller, Customer)
  - Account status (Active/Blocked)
- **Actions**:
  - Block/Unblock user
  - Delete user

---

## 🧭 Navigation Guide

### Navigation Bar
The top navigation bar shows different links based on user role:

**All Users:**
- Products
- Categories

**Customers:**
- Cart (with item count badge)
- Orders

**Sellers:**
- My Products
- Manage Categories
- Orders

**Admins:**
- Admin Dashboard
- User Management
- Manage Categories
- Orders

**Authentication:**
- Login (if not logged in)
- Register (if not logged in)
- Hello, [Name] + Logout (if logged in)

---

## 🔌 API Integration

### Base URL
```
http://localhost:5000/api
```

### Authentication
All protected routes require a JWT token in the Authorization header:
```javascript
headers: {
  'Authorization': `Bearer ${localStorage.getItem('token')}`
}
```

### API Endpoints Used

#### Authentication
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `GET /auth/me` - Get current user

#### Products
- `GET /products` - Get all products
- `GET /products/:id` - Get product by ID
- `POST /products` - Create product (Seller/Admin)
- `PUT /products/:id` - Update product (Seller/Admin)
- `DELETE /products/:id` - Delete product (Seller/Admin)

#### Categories
- `GET /categories` - Get all categories
- `GET /categories/:name` - Get category by name
- `POST /categories` - Create category (Seller/Admin)
- `PUT /categories/:id` - Update category
- `DELETE /categories/:id` - Delete category

#### Orders
- `GET /orders` - Get orders (filtered by role)
- `GET /orders/:id` - Get order by ID
- `POST /orders` - Create order (Customer)
- `POST /orders/:id/payment` - Process payment (Customer)
- `PATCH /orders/:id/status` - Update order status (Admin/Seller)

#### Upload
- `POST /upload/product-image` - Upload product image

#### Users (Admin only)
- `GET /users` - Get all users
- `PATCH /users/:id/block` - Block user
- `PATCH /users/:id/unblock` - Unblock user
- `DELETE /users/:id` - Delete user

---

## 🔧 Environment Variables

Create a `.env` file in the `client` directory:

```env
# API Base URL
REACT_APP_API_URL=http://localhost:5000/api
```

**Note**: For production, update this to your production API URL.

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Cannot connect to API**
**Problem**: `Network Error` or `404 Not Found`

**Solutions**:
- Ensure backend server is running on port 5000
- Check `REACT_APP_API_URL` in `.env` file
- Verify CORS is enabled on backend
- Check browser console for detailed error

#### 2. **Authentication Issues**
**Problem**: "Unauthorized" or redirected to login

**Solutions**:
- Check if token exists: `localStorage.getItem('token')`
- Try logging out and logging back in
- Clear browser cache and localStorage
- Verify token hasn't expired (7 days default)

#### 3. **Images Not Displaying**
**Problem**: Product images show placeholder

**Solutions**:
- Check if image URL is correct
- Verify backend is serving static files from `/uploads`
- Check browser console for 404 errors
- Ensure image was uploaded successfully

#### 4. **Category Dropdown Empty**
**Problem**: No categories in dropdown

**Solutions**:
- Create categories first via "Manage Categories"
- Check if API is returning categories: `GET /api/categories`
- Verify user has permission to create categories

#### 5. **Payment Not Working**
**Problem**: 404 error on payment route

**Solutions**:
- Restart backend server
- Verify route is registered: `POST /api/orders/:id/payment`
- Check server console for route registration logs
- Ensure order payment method is "online"

#### 6. **Order Status Update Fails**
**Problem**: "Error updating order status"

**Solutions**:
- Verify user is seller/admin
- Check if order contains seller's products (for sellers)
- Check browser console for detailed error
- Verify authorization token is valid

#### 7. **Build Errors**
**Problem**: `npm run build` fails

**Solutions**:
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check for TypeScript/ESLint errors
- Verify all dependencies are installed
- Check Node.js version compatibility

---

## 📱 Responsive Design

The application is fully responsive and works on:
- 📱 Mobile devices (320px+)
- 📱 Tablets (768px+)
- 💻 Desktops (1024px+)
- 🖥️ Large screens (1280px+)

---

## 🎨 Styling

### Tailwind CSS
The application uses Tailwind CSS for styling. Key features:
- Utility-first CSS framework
- Responsive breakpoints
- Custom color scheme (blue, green, red, yellow)
- Hover effects and transitions
- Shadow and border utilities

### Color Scheme
- **Primary**: Blue (#2563eb)
- **Success**: Green (#16a34a)
- **Warning**: Yellow (#eab308)
- **Danger**: Red (#dc2626)
- **Gray**: Various shades for text and backgrounds

---

## 🔐 Security Features

1. **JWT Authentication**: Secure token-based authentication
2. **Role-Based Access Control**: CASL authorization
3. **Protected Routes**: PrivateRoute component
4. **Input Validation**: Form validation on client side
5. **XSS Protection**: React's built-in XSS protection
6. **Secure API Calls**: Authorization headers on all requests

---

## 📝 Code Structure

```
client/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── PrivateRoute.js
│   │   └── ProductImage.js
│   ├── context/
│   │   ├── AbilityContext.js
│   │   ├── AuthContext.js
│   │   └── CartContext.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Login.js
│   │   ├── Register.js
│   │   ├── Products.js
│   │   ├── ProductDetail.js
│   │   ├── Categories.js
│   │   ├── CategoryProducts.js
│   │   ├── Cart.js
│   │   ├── Payment.js
│   │   ├── Orders.js
│   │   ├── AddProduct.js
│   │   ├── EditProduct.js
│   │   ├── SellerProducts.js
│   │   ├── ManageCategories.js
│   │   ├── AdminDashboard.js
│   │   └── UserManagement.js
│   ├── App.js
│   └── index.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
1. Build the application
2. Upload the `build` folder to your hosting service
3. Configure environment variables on hosting platform
4. Update API URL to production endpoint

### Recommended Hosting Services
- **Vercel** - Easy React deployment
- **Netlify** - Static site hosting
- **AWS S3 + CloudFront** - Scalable hosting
- **GitHub Pages** - Free hosting for public repos

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review browser console for errors
3. Check server logs for backend errors
4. Verify environment variables are set correctly

---

## 📄 License

This project is for educational purposes.

---

## 🎓 Learning Resources

- [React Documentation](https://react.dev/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Axios](https://axios-http.com/)
- [CASL](https://casl.js.org/)

---

**Last Updated**: February 2026
**Version**: 1.0.0
