import React, { useState } from "react";
import { Card, Button, InputNumber, Rate } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import type { AppDispatch } from "../../store";
import { ShoppingCartOutlined } from "@ant-design/icons";

type Props = {
  id: number;
  name: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  score?: number;
};

const ProductCard: React.FC<Props> = ({ id, name, description, price, image, stock, score }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    dispatch(addToCart({ productId: id, quantity }));
    setAdded(true);
    setTimeout(() => setAdded(false), 2000); // Reset after 2 seconds
  };

  return (
    <>
      <Card
        hoverable
        className="mobile-product-card"
        cover={
          <div className="mobile-card-image-container">
            <img 
              alt={name} 
              src={`http://localhost:5000/images/${image}`}
              className="mobile-card-image"
              onError={(e) => {
                e.currentTarget.src = '/placeholder-image.jpg';
              }}
            />
            {stock < 5 && stock > 0 && (
              <div className="stock-badge low-stock">
                Stock faible: {stock}
              </div>
            )}
            {stock === 0 && (
              <div className="stock-badge out-of-stock">
                Épuisé
              </div>
            )}
          </div>
        }
      >
        <div className="mobile-card-content">
          <Card.Meta 
            title={<h3 className="mobile-card-title">{name}</h3>} 
            description={<p className="mobile-card-description">{description}</p>} 
          />
          
          <div className="mobile-price-section">
            <span className="mobile-price">{price} DA</span>
          </div>
          
          {/* Score */}
          <div className="mobile-rating-section">
            <Rate 
              disabled 
              defaultValue={score || 0} 
              className="mobile-rating" 
              allowHalf
            />
            <span className="mobile-rating-text">({score?.toFixed(1) || "0.0"})</span>
          </div>
          
          {/* Quantity and Stock */}
          <div className="mobile-quantity-section">
            <div className="quantity-input-wrapper">
              <span className="quantity-label">Qté:</span>
              <InputNumber
                min={1}
                max={stock}
                value={quantity}
                onChange={(val) => setQuantity(val || 1)}
                size="small"
                className="mobile-quantity-input"
                disabled={stock === 0}
              />
            </div>
            <span className="mobile-stock-info">Stock: {stock}</span>
          </div>
          
          {/* Add to Cart Button */}
          <Button 
            type="primary" 
            block 
            onClick={handleAdd} 
            disabled={added || stock === 0}
            className={`mobile-add-to-cart ${added ? 'added' : ''}`}
            icon={<ShoppingCartOutlined />}
            size="small"
          >
            {added ? "Ajouté ✓" : stock === 0 ? "Épuisé" : "Ajouter"}
          </Button>
        </div>
      </Card>
      
      <style>{`
        .mobile-product-card {
          height: 100% !important;
          border-radius: 12px !important;
          overflow: hidden !important;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08) !important;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
          border: 1px solid #f0f0f0 !important;
          width: 100% !important;
          max-width: none !important;
        }
        
        /* Desktop hover effects */
        @media (min-width: 768px) {
          .mobile-product-card:hover {
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.12) !important;
            transform: translateY(-4px) !important;
            border-color: #d9d9d9 !important;
          }
          
          .mobile-product-card:hover .mobile-card-image {
            transform: scale(1.05);
          }
        }
        
        /* Mobile touch effects */
        @media (max-width: 767px) {
          .mobile-product-card {
            -webkit-tap-highlight-color: transparent;
          }
          
          .mobile-product-card:active {
            transform: scale(0.98) !important;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
          }
          
          .mobile-product-card:active .mobile-card-image {
            transform: scale(1.02);
          }
        }
        
        .mobile-card-image-container {
          position: relative;
          height: 140px; /* Optimisé pour mobile */
          overflow: hidden;
          background: #f8f9fa;
        }
        
        @media (min-width: 576px) {
          .mobile-card-image-container {
            height: 160px;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-card-image-container {
            height: 200px; /* Taille originale pour desktop */
          }
        }
        
        .mobile-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s ease;
        }
        
        .stock-badge {
          position: absolute;
          top: 8px;
          right: 8px;
          padding: 2px 6px;
          border-radius: 12px;
          font-size: 10px;
          font-weight: 600;
          color: white;
          backdrop-filter: blur(4px);
        }
        
        .low-stock {
          background: rgba(255, 193, 7, 0.9);
        }
        
        .out-of-stock {
          background: rgba(220, 53, 69, 0.9);
        }
        
        .mobile-card-content {
          padding: 12px !important; /* Compact pour mobile */
          display: flex;
          flex-direction: column;
          height: 100%;
        }
        
        @media (min-width: 768px) {
          .mobile-card-content {
            padding: 16px !important; /* Padding original pour desktop */
          }
        }
        
        .mobile-card-title {
          font-size: 14px !important; /* Compact pour mobile */
          font-weight: 600 !important;
          margin: 0 !important;
          line-height: 1.3 !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        @media (min-width: 576px) {
          .mobile-card-title {
            font-size: 15px !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-card-title {
            font-size: 16px !important; /* Taille originale pour desktop */
            line-height: 1.4 !important;
          }
        }
        
        .mobile-card-description {
          font-size: 11px !important; /* Compact pour mobile */
          color: #666 !important;
          margin: 4px 0 8px 0 !important;
          line-height: 1.3 !important;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        
        @media (min-width: 576px) {
          .mobile-card-description {
            font-size: 12px !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-card-description {
            font-size: 14px !important; /* Taille originale pour desktop */
            margin: 6px 0 12px 0 !important;
            line-height: 1.4 !important;
          }
        }
        
        .mobile-price-section {
          margin: 6px 0;
        }
        
        .mobile-price {
          font-weight: 700 !important;
          font-size: 16px !important; /* Compact pour mobile */
          color: #1890ff !important;
        }
        
        @media (min-width: 576px) {
          .mobile-price {
            font-size: 18px !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-price {
            font-size: 20px !important; /* Taille originale pour desktop */
          }
        }
        
        .mobile-rating-section {
          display: flex;
          align-items: center;
          gap: 6px;
          margin: 6px 0;
        }
        
        .mobile-rating {
          font-size: 12px !important; /* Compact pour mobile */
        }
        
        @media (min-width: 768px) {
          .mobile-rating {
            font-size: 14px !important; /* Taille originale pour desktop */
          }
        }
        
        .mobile-rating-text {
          font-size: 11px;
          color: #666;
        }
        
        .mobile-quantity-section {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin: 8px 0;
          flex-wrap: wrap;
          gap: 4px;
        }
        
        .quantity-input-wrapper {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        
        .quantity-label {
          font-size: 11px;
          color: #666;
          font-weight: 500;
        }
        
        .mobile-quantity-input {
          width: 50px !important;
          height: 24px !important;
        }
        
        .mobile-quantity-input .ant-input-number-input {
          font-size: 11px !important;
          padding: 0 4px !important;
        }
        
        .mobile-stock-info {
          font-size: 10px;
          color: #999;
          font-weight: 500;
        }
        
        .mobile-add-to-cart {
          margin-top: auto !important;
          height: 32px !important; /* Compact pour mobile */
          font-size: 12px !important;
          font-weight: 600 !important;
          border-radius: 8px !important;
          transition: all 0.3s ease !important;
        }
        
        @media (min-width: 576px) {
          .mobile-add-to-cart {
            height: 36px !important;
            font-size: 13px !important;
          }
        }
        
        @media (min-width: 768px) {
          .mobile-add-to-cart {
            height: 40px !important; /* Taille originale pour desktop */
            font-size: 14px !important;
          }
        }
        
        .mobile-add-to-cart.added {
          background: #52c41a !important;
          border-color: #52c41a !important;
        }
        
        .mobile-add-to-cart:disabled {
          background: #f5f5f5 !important;
          border-color: #d9d9d9 !important;
          color: #bfbfbf !important;
        }
        
        /* Touch feedback for buttons */
        @media (max-width: 767px) {
          .mobile-add-to-cart:active:not(:disabled) {
            transform: scale(0.96);
          }
          
          .mobile-quantity-input:active {
            transform: scale(0.98);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 480px) {
          .mobile-card-content {
            padding: 8px !important;
          }
          
          .mobile-quantity-section {
            flex-direction: column;
            align-items: flex-start;
            gap: 4px;
          }
          
          .quantity-input-wrapper {
            align-self: stretch;
            justify-content: space-between;
          }
          
          .mobile-stock-info {
            align-self: flex-end;
          }
        }
        
        /* Desktop spacing adjustments */
        @media (min-width: 768px) {
          .mobile-price-section {
            margin: 8px 0;
          }
          
          .mobile-rating-section {
            margin: 8px 0;
          }
          
          .mobile-quantity-section {
            margin: 12px 0;
          }
          
          .quantity-label {
            font-size: 12px;
          }
          
          .mobile-quantity-input {
            width: 60px !important;
            height: 28px !important;
          }
          
          .mobile-stock-info {
            font-size: 11px;
          }
          
          .mobile-rating-text {
            font-size: 12px;
          }
        }
      `}</style>
    </>
  );
};

export default ProductCard;