import React from 'react'
import { Form, Input, Button, Card, Checkbox, Typography } from 'antd'
import { useDispatch } from 'react-redux'
import { login } from '../store/userSlice'
import { useNavigate, Link } from 'react-router-dom'

const { Text } = Typography

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onFinish = async (values: any) => {
    try {
      await dispatch(login(values) as any)
      if (values.remember) {
        localStorage.setItem("userEmail", values.email)
      }
      navigate('/')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <Card style={{ maxWidth: 400, margin: '40px auto', padding: '20px' }}>
      <Form onFinish={onFinish} layout="vertical" initialValues={{ remember: true }}>
        
        {/* Email */}
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Email is required' }]}>
          <Input />
        </Form.Item>

        {/* Password */}
        <Form.Item label="Password" name="password" rules={[{ required: true, message: 'Password is required' }]}>
          <Input.Password />
        </Form.Item>

        {/* Remember me + Forgot password */}
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
        <Link to="/forgot-password" style={{ float: 'right' }}>
          Forgot password?
        </Link>

        {/* Submit */}
        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        {/* Sign up */}
        <div style={{ textAlign: 'center', marginTop: 10 }}>
          <Text>Don't have an account? </Text>
          <Link to="/register">Sign up</Link>
        </div>
      </Form>
    </Card>
  )
}
