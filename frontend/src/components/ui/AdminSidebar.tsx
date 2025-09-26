import React, { useState } from 'react'
import { Menu, Avatar, Button, Tooltip } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import {
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
  FileTextOutlined,
  MessageOutlined,
  HomeOutlined,
  CrownOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
} from '@ant-design/icons'
import { RootState } from '../../store'

const AdminSidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()
  const user = useSelector((state: RootState) => state.user.user)

  const menuItems = [
    {
      key: '/admin',
      icon: <DashboardOutlined />,
      label: <Link to="/admin">Dashboard</Link>,
    },
    {
      key: '/admin/products',
      icon: <ShoppingOutlined />,
      label: <Link to="/admin/products">Produits</Link>,
    },
    {
      key: '/admin/users',
      icon: <UserOutlined />,
      label: <Link to="/admin/users">Utilisateurs</Link>,
    },
    {
      key: '/admin/orders',
      icon: <ShoppingCartOutlined />,
      label: <Link to="/admin/orders">Commandes</Link>,
    },
    {
      key: '/admin/blogs',
      icon: <FileTextOutlined />,
      label: <Link to="/admin/blogs">Blogs</Link>,
    },
    {
      key: '/admin/contacts',
      icon: <MessageOutlined />,
      label: <Link to="/admin/contacts">Contacts</Link>,
    },
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: <Link to="/">Retour au site</Link>,
    },
  ]

  const getSelectedKeys = () => {
    const currentPath = location.pathname
    return [currentPath]
  }

  return (
    <div
      className={`${
        collapsed ? 'w-20' : 'w-64'
      } transition-all duration-300 bg-white border-r border-gray-200 flex flex-col h-screen`}
    >
      {/* Header avec logo et toggle */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CrownOutlined className="text-white text-lg" />
              </div>
              <div>
                <h2 className="font-bold text-gray-800">Admin Panel</h2>
                <p className="text-xs text-gray-500">Fashion Store</p>
              </div>
            </div>
          )}
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-600 hover:text-indigo-600"
          />
        </div>
      </div>

      {/* Profile */}
      {!collapsed && (
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <Avatar
              src={user?.profile_picture}
              icon={<UserOutlined />}
              className="border-2 border-indigo-200"
              size={40}
            />
            <div>
              <p className="font-semibold text-gray-800 truncate">
                {user?.name || 'Administrateur'}
              </p>
              <span className="text-xs text-gray-600">En ligne</span>
            </div>
          </div>
        </div>
      )}

      {/* Menu */}
      <div className="flex-1 overflow-y-auto">
        <Menu
          mode="inline"
          selectedKeys={getSelectedKeys()}
          inlineCollapsed={collapsed}
          items={menuItems}
          className="border-none bg-transparent"
        />
      </div>

      {/* Footer logout */}
      <div className="p-4 border-t border-gray-200">
        {collapsed ? (
          <Tooltip title="Déconnexion" placement="right">
            <Button
              type="text"
              icon={<LogoutOutlined />}
              className="w-full text-gray-600 hover:text-red-500"
            />
          </Tooltip>
        ) : (
          <Button
            type="text"
            icon={<LogoutOutlined />}
            className="w-full text-left text-gray-600 hover:text-red-500 font-medium"
          >
            Déconnexion
          </Button>
        )}
      </div>
    </div>
  )
}

export default AdminSidebar