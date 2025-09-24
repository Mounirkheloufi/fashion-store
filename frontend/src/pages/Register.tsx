import React, { useState } from 'react'
import { Form, Input, Button, Card, Upload, message } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { register } from '../store/userSlice'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)

  const onFinish = async (values: any) => {
    try {
      const formData = new FormData()
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('password', values.password)

      if (file) {
        formData.append('profile_picture', file)
      }

      await dispatch(register(formData) as any)
      message.success("✅ Account created successfully!")
      setFile(null) // reset file
      navigate('/login')
    } catch (e) {
      console.error(e)
      message.error("❌ Registration failed")
    }
  }

  const handleBeforeUpload = (file: File) => {
    setFile(file)
    return false // Empêche Ant Design d’uploader directement
  }

  return (
    <Card style={{ maxWidth: 400, margin: '40px auto', padding: 20 }}>
      <Form onFinish={onFinish} layout="vertical">

        {/* Name */}
        <Form.Item label="Name" name="name" rules={[{ required: true, message: "Name is required" }]}>
          <Input />
        </Form.Item>

        {/* Email */}
        <Form.Item label="Email" name="email" rules={[{ required: true, message: "Email is required" }]}>
          <Input type="email" />
        </Form.Item>

        {/* Password */}
        <Form.Item label="Password" name="password" rules={[{ required: true, message: "Password is required" }]}>
          <Input.Password />
        </Form.Item>

        {/* Confirm Password */}
        <Form.Item
          label="Confirm Password"
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
        >
          <Input.Password />
        </Form.Item>

        {/* Profile Picture */}
        <Form.Item label="Profile Picture">
          <Upload
            beforeUpload={handleBeforeUpload}
            showUploadList={{ showPreviewIcon: false }}
            accept="image/*"
          >
            <Button icon={<UploadOutlined />}>Choose Profile Picture</Button>
          </Upload>
          {file && <p style={{ marginTop: 8 }}>📸 Selected: {file.name}</p>}
        </Form.Item>

        {/* Submit */}
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>

      </Form>
    </Card>
  )
}