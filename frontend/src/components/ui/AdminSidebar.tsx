import React from 'react'
import { Menu } from 'antd'
import { Link } from 'react-router-dom'


const AdminSidebar: React.FC = ()=> (
<div style={{ width:240 }}>
<Menu mode="inline" style={{ height:'100%' }}>
<Menu.Item key="dashboard"><Link to="/admin">Dashboard</Link></Menu.Item>
<Menu.Item key="products"><Link to="/admin/products">Products</Link></Menu.Item>
<Menu.Item key="orders"><Link to="/admin/orders">Orders</Link></Menu.Item>
<Menu.Item key="users"><Link to="/admin/users">Users</Link></Menu.Item>
</Menu>
</div>
)
export default AdminSidebar