import React, { useEffect, useState } from 'react'
import { Typography, Row, Col } from 'antd'
import ProductGrid from '../components/product/ProductGrid'
import API from '../api/api'


export default function Home(){
const [products, setProducts] = useState<any[]>([])
useEffect(()=>{ API.get('/products').then(r=> setProducts(r.data)).catch(()=>{}) }, [])


return (
<div>
<Row gutter={[24,24]}>
<Col span={24}>
<div style={{ background:'#fff', padding:20, borderRadius:8 }}>
<Typography.Title level={2}>Welcome to Fashion Store</Typography.Title>
<p>Shop latest clothes and accessories.</p>
</div>
</Col>
</Row>


<div style={{ marginTop:20 }}>
<ProductGrid products={products} />
</div>
</div>
)
}