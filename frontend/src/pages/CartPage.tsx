import React, { useEffect } from 'react'
import { Button, List, Typography } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCart } from '../store/cartSlice'
import type { RootState } from '../store'
import API from '../api/api'


export default function CartPage(){
const dispatch = useDispatch()
const { cart, items } = useSelector((s:RootState)=> s.cart)


useEffect(()=>{ dispatch(fetchCart() as any) }, [])


const handleCheckout = async ()=>{
await API.post('/cart/checkout')
alert('Checkout complete - invoice will be available')
dispatch(fetchCart() as any)
}


return (
<div>
<Typography.Title level={3}>Your cart</Typography.Title>
<List dataSource={items} renderItem={(it:any)=> (
<List.Item>
<List.Item.Meta title={it.name} description={`Quantity: ${it.quantity}`} />
<div>{it.price} DA</div>
</List.Item>
)} />
<Button type="primary" onClick={handleCheckout} style={{ marginTop:12 }}>Checkout</Button>
</div>
)
}