import React, { useState } from 'react'
import { Form, Input, Button, Card, Upload, message, Typography } from 'antd'
import { UploadOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { register } from '../store/userSlice'
import { useNavigate, Link } from 'react-router-dom'

const { Text } = Typography

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)
      if (file) {
        formData.append('profile_picture', file)
      }
      //console.log("Sending data:", Array.from(formData.entries()));
      await dispatch(register(formData) as any)
      message.success("✅ Account created successfully!")
      setFile(null) // reset file
      form.resetFields()
      navigate('/login')
    } catch (e) {
      console.error(e)
      message.error("❌ Registration failed")
    }
  }

  const handleBeforeUpload = (file: File) => {
    setFile(file)
    return false // Empêche Ant Design d'uploader directement
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="!bg-white !shadow-2xl !border-0 !rounded-2xl overflow-hidden">
          <div className="p-8">
            {/* Header */}
            <div className="text-center mb-8">
              {/* <div className="w-20 h-20 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <UserOutlined className="text-3xl text-white" />
              </div> */}
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h1>
              <p className="text-gray-600">Join us today and get started</p>
            </div>

            <Form onFinish={onFinish} layout="vertical" form={form} className="space-y-6">
              {/* Profile Picture - Premier comme demandé */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Profile Picture</span>}
                className="mb-6"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full border-4 border-gray-200 bg-gray-50 flex items-center justify-center overflow-hidden">
                      {file ? (
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt="Preview" 
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserOutlined className="text-3xl text-gray-400" />
                      )}
                    </div>
                  </div>
                  <Upload
                    beforeUpload={handleBeforeUpload}
                    showUploadList={false}
                    accept="image/*"
                    className="w-full"
                  >
                    <Button 
                      icon={<UploadOutlined />} 
                      className="!rounded-xl !border-2 !border-dashed !border-indigo-300 hover:!border-indigo-500 !text-indigo-600 hover:!bg-indigo-50 transition-all duration-300"
                      block
                    >
                      {file ? 'Change Picture' : 'Choose Profile Picture'}
                    </Button>
                  </Upload>
                  {file && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-2 w-full">
                      <p className="text-sm text-green-700 text-center">📸 {file.name}</p>
                    </div>
                  )}
                </div>
              </Form.Item>

              {/* Name */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Full Name</span>} 
                name="name" 
                rules={[{ required: true, message: "Name is required" }]}
                className="mb-6"
              >
                <Input 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-indigo-400 focus:!border-indigo-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Enter your full name"
                />
              </Form.Item>

              {/* Email */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Email Address</span>} 
                name="email" 
                rules={[{ required: true, message: "Email is required" }]}
                className="mb-6"
              >
                <Input 
                  type="email" 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-indigo-400 focus:!border-indigo-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Enter your email"
                />
              </Form.Item>

              {/* Password */}
              <Form.Item 
                label={<span className="text-sm font-semibold text-gray-700">Password</span>} 
                name="password" 
                rules={[{ required: true, message: "Password is required" }]}
                className="mb-6"
              >
                <Input.Password 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-indigo-400 focus:!border-indigo-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Create a strong password"
                />
              </Form.Item>

              {/* Confirm Password */}
              <Form.Item
                label={<span className="text-sm font-semibold text-gray-700">Confirm Password</span>}
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                  { required: true, message: "Please confirm your password" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error("Passwords do not match"))
                    }
                  })
                ]}
                className="mb-8"
              >
                <Input.Password 
                  size="large"
                  className="!rounded-xl !border-gray-200 !py-3 hover:!border-indigo-400 focus:!border-indigo-500 focus:!shadow-lg transition-all duration-300"
                  placeholder="Confirm your password"
                />
              </Form.Item>

              {/* Submit */}
              <Form.Item className="!mb-6">
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  block 
                  size="large"
                  className="!h-12 !rounded-xl !bg-gradient-to-r !from-indigo-600 !to-purple-600 !border-0 hover:!from-indigo-700 hover:!to-purple-700 !font-semibold !text-lg !shadow-lg hover:!shadow-xl transition-all duration-300 transform hover:!scale-[1.02]"
                >
                  Create Account
                </Button>
              </Form.Item>

              {/* Divider */}
              <div className="relative mb-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">Already have an account?</span>
                </div>
              </div>

              {/* Sign in link */}
              <div className="text-center">
                <Link 
                  to="/login" 
                  className="text-indigo-600 hover:text-indigo-800 font-semibold text-lg transition-colors duration-200"
                >
                  Sign In Instead
                </Link>
              </div>
            </Form>
          </div>

          {/* Decorative bottom border */}
          <div className="h-2 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>
        </Card>
      </div>
    </div>
  )
}