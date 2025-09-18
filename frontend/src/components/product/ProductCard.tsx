import React from 'react'
import { Card, Button } from 'antd'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../store/cartSlice'
import type { AppDispatch } from '../../store'


type Props = { id:number; name:string; price:string; image?:string }

const ProductCard: React.FC<Props> = ({ id, name, price, image }) => {
  const dispatch = useDispatch<AppDispatch>();
  return (
	<Card hoverable style={{ width:240 }} cover={<img alt={name} src={image} style={{ height:200, objectFit:'cover' }} />}>
	  <Card.Meta title={name} description={`${price} DA`} />
	  <div style={{ marginTop:12 }}>
		<Button type="primary" block onClick={()=>dispatch(addToCart({ productId:id, quantity:1 }))}>Add to cart</Button>
	  </div>
	</Card>
  )
}
export default ProductCard