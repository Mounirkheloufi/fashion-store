import React from 'react'
import { Form, Input, Button, Card } from 'antd'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'


export default function Login(){
const dispatch = useDispatch()
const navigate = useNavigate()
const onFinish = async (values:any) => {
try{
await dispatch(login(values) as any)
navigate('/')
}catch(e){ console.error(e) }
}


return (
<Card style={{ maxWidth:400, margin:'40px auto' }}>
<Form onFinish={onFinish} layout="vertical">
<Form.Item label="Email" name="email" rules={[{ required:true }]}>
<Input />
</Form.Item>
<Form.Item label="Password" name="password" rules={[{ required:true }]}>
<Input.Password />
</Form.Item>
<Form.Item>
<Button type="primary" htmlType="submit" block>Login</Button>
</Form.Item>
</Form>
</Card>
)
}