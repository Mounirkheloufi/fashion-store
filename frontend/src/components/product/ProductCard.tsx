import React, { useState } from "react";
import { Card, Button, InputNumber, Rate } from "antd";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import type { AppDispatch } from "../../store";

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
  };

  return (
    <Card
      hoverable
      style={{ width: 260 }}
      cover={<img alt={name} src={image} style={{ height: 200, objectFit: "cover" }} />}
    >
      <Card.Meta title={name} description={description} />
      <div style={{ marginTop: 8, fontWeight: "bold" }}>{price} DA</div>

      {/* Score */}
      <Rate disabled defaultValue={score || 0} style={{ fontSize: 14, margin: "6px 0" }} />

      {/* Choix quantité */}
      <div style={{ marginBottom: 12 }}>
        <InputNumber
          min={1}
          max={stock}
          value={quantity}
          onChange={(val) => setQuantity(val || 1)}
        />
        <span style={{ marginLeft: 8, color: "gray" }}>Stock: {stock}</span>
      </div>

      {/* Bouton */}
      <Button type="primary" block onClick={handleAdd} disabled={added}>
        {added ? "Added" : "Add to cart"}
      </Button>
    </Card>
  );
};

export default ProductCard;
