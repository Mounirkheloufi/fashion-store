import React from "react";
import { Row, Col } from "antd";
import ProductCard from "./ProductCard";
import { Product } from "../../store/productSlice";

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <Row gutter={[16, 16]}>
      {products.map((p) => (
        <Col key={p.id} xs={24} sm={12} md={8} lg={6}>
          <ProductCard {...p} />
        </Col>
      ))}
    </Row>
  );
}
