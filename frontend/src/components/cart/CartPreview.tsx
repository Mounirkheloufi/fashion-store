import React from 'react'
import { List, Button } from 'antd'
import { useSelector } from 'react-redux'
import type { RootState } from '../../store'


type CartItem = {
  product_id: string;
  quantity: number;
  // add other fields if needed
};

export default function CartPreview(){
const items = useSelector((s:RootState)=> s.cart.items || []) as CartItem[];
return (
<div>
<List dataSource={items} renderItem={(item: CartItem) => (
<List.Item actions={[<Button size="small">Remove</Button>]}>
<List.Item.Meta title={item.product_id} description={`Qty: ${item.quantity}`}/>
</List.Item>
)} />
</div>
)
}