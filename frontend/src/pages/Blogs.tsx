import React from 'react'
import { Typography, Card, Button } from 'antd'


export default function Blogs(){
return (
<div>
<Typography.Title>Blog</Typography.Title>
<Card style={{ marginBottom:16 }}>
<h3>How to style an oversize t-shirt</h3>
<p>Short excerpt...</p>
<Button type="link">Read more</Button>
</Card>


<Card>
<h3>New fall collection</h3>
<p>Short excerpt...</p>
</Card>
</div>
)
}