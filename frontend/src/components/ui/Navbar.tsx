import React, { use, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Menu, Badge, Drawer, Button } from 'antd'
import { ShoppingCartOutlined, MenuOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const items = useSelector((s: RootState) => s.cart.items || [])
    const navigate = useNavigate()

    return (
        <div className="ant-layout-header" style={{ background:'#001529', display:'flex', alignItems:'center', padding:'0 16px' }}>
          <div style={{ color:'#fff', fontWeight:700, fontSize:18, cursor:'pointer' }} onClick={()=>navigate('/')}>Fashion Store</div>


            <div style={{ marginLeft: 'auto', display:'flex', alignItems:'center' }}>
            <Link to="/shop" style={{ color:'#fff', marginRight:16 }}>Shop</Link>
            <Link to="/blogs" style={{ color:'#fff', marginRight:16 }}>Blogs</Link>
            <Badge count={items.length} overflowCount={99} style={{ marginRight:12 }}>
              <Link to="/cart" style={{ color:'#fff' }}><ShoppingCartOutlined style={{ fontSize:20 }} /></Link>
            </Badge>


            <div style={{ marginLeft:12 }}>
              <Button type="primary" onClick={()=>setOpen(true)} icon={<MenuOutlined/>} />
            </div>
          </div>


        <Drawer title="Menu" placement="right" onClose={()=>setOpen(false)} open={open}>
          <Menu mode="vertical">
            <Menu.Item><Link to="/">Home</Link></Menu.Item>
            <Menu.Item><Link to="/shop">Shop</Link></Menu.Item>
            <Menu.Item><Link to="/cart">Cart</Link></Menu.Item>
            <Menu.Item><Link to="/login">Login</Link></Menu.Item>
          </Menu>
        </Drawer>
   </div>
)
}


export default Navbar