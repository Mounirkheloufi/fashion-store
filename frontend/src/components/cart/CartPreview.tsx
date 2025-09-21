import React from "react";
import { List, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store";
import { deleteCartItem } from "../../store/cartSlice";

export default function CartPreview() {
  const dispatch = useDispatch();
  const items = useSelector((s: RootState) => s.cart.items);

  const handleRemove = (id: number) => {
    dispatch(deleteCartItem(id) as any);
  };

  return (
    <div>
      <List
        dataSource={items}
        renderItem={(item: any) => (
          <List.Item
            actions={[
              <Button size="small" danger onClick={() => handleRemove(item.id)}>
                Remove
              </Button>,
            ]}
          >
            <List.Item.Meta
              title={item.name}
              description={`Qty: ${item.quantity}`}
            />
            <div>{item.price} DA</div>
          </List.Item>
        )}
      />
    </div>
  );
}