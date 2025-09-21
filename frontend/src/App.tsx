import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import Navbar from './components/ui/Navbar'
import AppFooter from './components/ui/Footer'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductPage from './pages/ProductPage'
import CartPage from './pages/CartPage'
import Login from './pages/Login'
import Register from './pages/Register'
import Blogs from './pages/Blogs'
import AdminDashboard from './pages/AdminDashboard'
import Profile from './pages/ProfilePage'


const { Content } = Layout


export default function App() {
return (
<Layout style={{ minHeight: '100vh' }}>
<Navbar />
{/* style={{ padding: '5px 5px', marginTop: 5 }} */}
<Content style ={{ marginTop: 0 }}>
<Routes>
<Route path="/" element={<Home />} />
<Route path="/shop" element={<Shop />} />
<Route path="/product/:id" element={<ProductPage />} />
<Route path="/cart" element={<CartPage />} />
<Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />
<Route path="/blogs" element={<Blogs />} />
<Route path="/profile" element={<Profile />} />
<Route path="/admin" element={<AdminDashboard />} />
</Routes>
</Content>
<AppFooter />
</Layout>
)
}