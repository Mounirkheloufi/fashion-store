import React, { useState } from 'react'
import { Menu, Badge, Avatar, Button, Tooltip } from 'antd'
import { Link, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { 
    DashboardOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    UserOutlined,
    BarChartOutlined,
    SettingOutlined,
    BellOutlined,
    TagOutlined,
    FileTextOutlined,
    MessageOutlined,
    GiftOutlined,
    CrownOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    LogoutOutlined
} from '@ant-design/icons'
import { RootState } from '../../store'

const AdminSidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false)
    const location = useLocation()
    const user = useSelector((state: RootState) => state.user.user)
    
    // Données simulées pour les badges
    const notifications = {
        orders: 12,
        messages: 5,
        reports: 3
    }

    const menuItems = [
        {
            key: '/admin',
            icon: <DashboardOutlined />,
            label: 'Dashboard',
            path: '/admin'
        },
        {
            key: 'catalog',
            icon: <ShoppingOutlined />,
            label: 'Catalogue',
            children: [
                {
                    key: '/admin/products',
                    label: 'Produits',
                    path: '/admin/products'
                },
                {
                    key: '/admin/categories',
                    label: 'Catégories',
                    path: '/admin/categories'
                },
                {
                    key: '/admin/brands',
                    label: 'Marques',
                    path: '/admin/brands'
                }
            ]
        },
        {
            key: '/admin/orders',
            icon: <ShoppingCartOutlined />,
            label: (
                <div className="flex items-center justify-between">
                    <span>Commandes</span>
                    {notifications.orders > 0 && (
                        <Badge count={notifications.orders} size="small" />
                    )}
                </div>
            ),
            path: '/admin/orders'
        },
        {
            key: '/admin/users',
            icon: <UserOutlined />,
            label: 'Utilisateurs',
            path: '/admin/users'
        },
        {
            key: 'marketing',
            icon: <TagOutlined />,
            label: 'Marketing',
            children: [
                {
                    key: '/admin/coupons',
                    label: 'Codes promo',
                    path: '/admin/coupons'
                },
                {
                    key: '/admin/campaigns',
                    label: 'Campagnes',
                    path: '/admin/campaigns'
                }
            ]
        },
        {
            key: '/admin/analytics',
            icon: <BarChartOutlined />,
            label: 'Analytics',
            path: '/admin/analytics'
        },
        {
            key: '/admin/reports',
            icon: <FileTextOutlined />,
            label: (
                <div className="flex items-center justify-between">
                    <span>Rapports</span>
                    {notifications.reports > 0 && (
                        <Badge count={notifications.reports} size="small" color="orange" />
                    )}
                </div>
            ),
            path: '/admin/reports'
        },
        {
            key: '/admin/messages',
            icon: <MessageOutlined />,
            label: (
                <div className="flex items-center justify-between">
                    <span>Messages</span>
                    {notifications.messages > 0 && (
                        <Badge count={notifications.messages} size="small" color="green" />
                    )}
                </div>
            ),
            path: '/admin/messages'
        },
        {
            key: '/admin/settings',
            icon: <SettingOutlined />,
            label: 'Paramètres',
            path: '/admin/settings'
        }
    ]

    const getSelectedKeys = () => {
        const currentPath = location.pathname
        return [currentPath]
    }

    const getOpenKeys = () => {
        const currentPath = location.pathname
        const openKeys = []
        
        if (currentPath.includes('/admin/products') || 
            currentPath.includes('/admin/categories') || 
            currentPath.includes('/admin/brands')) {
            openKeys.push('catalog')
        }
        
        if (currentPath.includes('/admin/coupons') || 
            currentPath.includes('/admin/campaigns')) {
            openKeys.push('marketing')
        }
        
        return openKeys
    }

    const renderMenuItem = (item: any) => {
        if (item.children) {
            return {
                key: item.key,
                icon: item.icon,
                label: item.label,
                children: item.children.map((child: any) => ({
                    key: child.key,
                    label: <Link to={child.path} className="text-gray-600 hover:text-indigo-600">{child.label}</Link>
                }))
            }
        }

        return {
            key: item.key,
            icon: item.icon,
            label: <Link to={item.path} className="text-gray-700 hover:text-indigo-600 font-medium">{item.label}</Link>
        }
    }

    return (
        <div className={`${collapsed ? 'w-20' : 'w-64'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col h-screen`}>
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

            {/* Profile section */}
            {!collapsed && (
                <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        <Avatar 
                            src={user?.profile_picture}
                            icon={<UserOutlined />}
                            className="border-2 border-indigo-200"
                            size={40}
                        />
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-gray-800 truncate">
                                {user?.name || 'Administrateur'}
                            </p>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-xs text-gray-600">En ligne</span>
                            </div>
                        </div>
                        <Tooltip title="Notifications">
                            <Button 
                                type="text" 
                                icon={<BellOutlined />} 
                                size="small"
                                className="text-gray-600 hover:text-indigo-600"
                            />
                        </Tooltip>
                    </div>
                </div>
            )}

            {/* Menu principal */}
            <div className="flex-1 overflow-y-auto">
                <Menu
                    mode="inline"
                    selectedKeys={getSelectedKeys()}
                    defaultOpenKeys={getOpenKeys()}
                    inlineCollapsed={collapsed}
                    items={menuItems.map(renderMenuItem)}
                    className="border-none bg-transparent"
                    style={{ 
                        fontSize: '14px',
                        fontWeight: 500
                    }}
                />
            </div>

            {/* Section des statistiques rapides */}
            {!collapsed && (
                <div className="p-4 border-t border-gray-200">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg p-4 text-white">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Ventes du jour</span>
                            <GiftOutlined />
                        </div>
                        <div className="text-2xl font-bold">1,234€</div>
                        <div className="text-xs opacity-80">+12% vs hier</div>
                    </div>
                </div>
            )}

            {/* Footer avec logout */}
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