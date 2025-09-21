import React, { useEffect } from "react";
import { Button, List, Typography } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, checkout, deleteCartItem } from "../store/cartSlice";
import type { RootState } from "../store";

export default function CartPage() {
  const dispatch = useDispatch();
  const { items } = useSelector((s: RootState) => s.cart);

  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkout() as any);
    alert("Checkout complete - invoice generated");
  };

  const handleRemove = (id: number) => {
    dispatch(deleteCartItem(id) as any);
  };

  return (
    <div>
      <Typography.Title level={3}>Your cart</Typography.Title>
      <List
        dataSource={items}
        renderItem={(it: any) => (
          <List.Item
            actions={[
              <Button size="small" danger onClick={() => handleRemove(it.id)}>
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={it.name}
              description={`Quantity: ${it.quantity}`}
            />
            <div>{it.price} DA</div>
          </List.Item>
        )}
      />
      <Button type="primary" onClick={handleCheckout} style={{ marginTop: 12 }}>
        Checkout
      </Button>
    </div>
  );
}