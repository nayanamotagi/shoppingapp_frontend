import React, { useState, useEffect } from 'react';

const ProductImage = ({ src, alt, className = "w-full h-48 object-cover" }) => {
  const [imgSrc, setImgSrc] = useState('');
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setImgSrc(src || '');
    setHasError(false);
  }, [src]);

  const handleError = () => {
    if (!hasError) {
      setHasError(true);
      setImgSrc('https://via.placeholder.com/300?text=No+Image+Available');
    }
  };

  // Convert relative URLs to absolute
  const getImageUrl = (url) => {
    if (!url) return 'https://via.placeholder.com/300?text=No+Image';
    
    // If it's already a full URL, return as is
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    
    // If it's a relative path starting with /uploads, make it absolute
    if (url.startsWith('/uploads/')) {
      const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
      return `${API_URL}${url}`;
    }
    
    return url;
  };

  return (
    <div className="w-full bg-gray-200 flex items-center justify-center overflow-hidden">
      <img
        src={getImageUrl(imgSrc)}
        alt={alt || 'Product image'}
        className={className}
        onError={handleError}
      />
    </div>
  );
};

export default ProductImage;
