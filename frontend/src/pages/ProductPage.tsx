import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api/api'
import { Typography, Button } from 'antd'


export default function ProductPage(){
const { id } = useParams()
const [product, setProduct] = useState<any>(null)
useEffect(()=>{ if(id) API.get(`/products/${id}`).then(r=> setProduct(r.data)) }, [id])
if(!product) return <div>Loading...</div>
return (
<div style={{ background:'#fff', padding:24 }}>
<Typography.Title>{product.name}</Typography.Title>
<img src={product.image} style={{ width:300, height:300, objectFit:'cover' }} />
<p>{product.description}</p>
<p>{product.price} DA</p>
<p>Category: {product.category}</p>
<p>Stock: {product.stock}</p>
<Button type="primary">Add to cart</Button>
</div>
)
}