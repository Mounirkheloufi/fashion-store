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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="!bg-white !shadow-2xl !border-0 !rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h1>
              <p className="text-gray-600">Sign in to your account</p>
            </div>

            <Form onFinish={onFinish} layout="vertical" initialValues={{ remember: true }} className="space-y-6">
              {/* Email */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Email</span>} 
                name="email" 
                rules={[{ required: true, message: 'Email is required' }]}
                className="mb-6"
              >
                <Input 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-blue-400 focus:!border-blue-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Enter your email"
                />
              </Form.Item>

              {/* Password */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Password</span>} 
                name="password" 
                rules={[{ required: true, message: 'Password is required' }]}
                className="mb-6"
              >
                <Input.Password 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-blue-400 focus:!border-blue-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Enter your password"
                />
              </Form.Item>

              {/* Remember me + Forgot password */}
              <div className="flex items-center justify-between mb-6">
                <Form.Item name="remember" valuePropName="checked" className="!mb-0">
                  <Checkbox className="text-sm text-gray-600">Remember me</Checkbox>
                </Form.Item>
                <Link 
                  to="/forgot-password" 
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit */}
              <Form.Item className="!mb-6">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  className="!h-12 !rounded-xl !bg-gradient-to-r !from-blue-600 !to-indigo-600 !border-0 hover:!from-blue-700 hover:!to-indigo-700 !font-semibold !text-lg !shadow-lg hover:!shadow-xl transition-all duration-300 transform hover:!scale-[1.02]"
                >
                  Sign In
                </Button>
              </Form.Item>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">or</span>
                </div>
              </div>

              {/* Sign up */}
              <div className="text-center">
                <Text className="text-gray-600">Don't have an account? </Text>
                <Link 
                  to="/register" 
                  className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition-colors duration-200"
                >
                  Create Account
                </Link>
              </div>
            </Form>
          </div>

          {/* Decorative bottom border */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        </Card>
      </div>
    </div>
  )
}
