import React from "react";
import { Row, Col } from "antd";
import ProductCard from "./ProductCard";
import { Product } from "../../store/productSlice";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <>
      <Row gutter={[12, 16]} className="product-grid-row">
        {products.map((p) => (
          <Col key={p.id} xs={12} sm={12} md={8} lg={6} xl={6} className="product-col">
            <ProductCard {...p} />
          </Col>
        ))}
      </Row>
      
      <style>{`
        .product-grid-row {
          margin: 0 !important;
        }
        
        .product-col {
          padding-left: 6px !important;
          padding-right: 6px !important;
        }
        
        /* Mobile specific adjustments */
        @media (max-width: 575px) {
          .product-col {
            padding-left: 4px !important;
            padding-right: 4px !important;
          }
          
          .product-grid-row {
            margin-left: -4px !important;
            margin-right: -4px !important;
          }
        }
        
        /* Tablet adjustments */
        @media (min-width: 576px) and (max-width: 767px) {
          .product-col {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }
        
        /* Desktop adjustments */
        @media (min-width: 768px) {
          .product-col {
            padding-left: 8px !important;
            padding-right: 8px !important;
          }
        }
      `}</style>
    </>
  );
}