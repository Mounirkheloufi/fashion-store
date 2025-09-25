import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Drawer, Button, Avatar, Dropdown } from 'antd'
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../store/userSlice'

const Navbar: React.FC = () => {
    const [open, setOpen] = useState(false)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    
    // Utilisation de Redux pour l'état utilisateur
    const dispatch = useDispatch()
    const { token, user } = useSelector((state: RootState) => state.user)
    const items = useSelector((s: RootState) => s.cart.items || [])
    const navigate = useNavigate()

    // L'utilisateur est authentifié s'il y a un token ET un user
    const isAuthenticated = !!(token && user)

    // Gérer le responsive
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768)
        }
        
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const navLinks = [
        { path: '/', label: 'Accueil' },
        { path: '/shop', label: 'Boutique' },
        { path: '/blogs', label: 'Blog' },
        { path: '/about', label: 'À propos' }
    ]

    const handleLogout = () => {
        dispatch(logout())
        navigate('/')
        setOpen(false)
    }

    const userMenuItems = [
        {
            key: 'profile',
            label: (
          <div className="flex items-center gap-2">
            {user?.profile_picture ? (
              <img
                src={`http://localhost:5000${user.profile_picture}`}
                alt="profile"
                className="w-6 h-6 rounded-full object-cover"
              />
            ) : (
              <UserOutlined />
            )}
                    Mon Profil
                </div>
            ),
            onClick: () => navigate('/profile')
        },
        {
            type: 'divider' as const
        },
        {
            key: 'logout',
            label: (
                <div className="flex items-center gap-2 text-red-500">
                    <LogoutOutlined />
                    Déconnexion
                </div>
            ),
            onClick: handleLogout
        }
    ]

    return (
        <>
            <nav className="sticky top-0 z-[1000] bg-white shadow-lg border-b border-gray-100">
                <div className="max-w-[1200px] mx-auto px-5">
                    <div className="flex justify-between items-center h-[70px]">
                        {/* Logo */}
                        <div 
                            className="flex items-center gap-3 cursor-pointer group"
                            onClick={() => navigate('/')}
                        >
                            <div className="relative">
                                <div className="w-[45px] h-[45px] bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[14px] flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-[5deg] logo-icon">
                                    <ShoppingCartOutlined className="text-[22px] text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-[14px] h-[14px] bg-pink-500 rounded-full animate-pulse"></div>
                            </div>
                            <div>
                                <h1 className="text-[22px] font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent m-0 leading-tight">
                                    Fashion Store
                                </h1>
                                <p className="text-[12px] text-gray-500 m-0 -mt-0.5">Mode & Style</p>
                            </div>
                        </div>

                        {/* Navigation Desktop - Cachée sur mobile */}
                        {!isMobile && (
                            <div className="flex items-center gap-2">
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        className="relative px-5 py-3 text-gray-700 font-medium no-underline rounded-lg transition-all duration-300 hover:text-indigo-500 hover:-translate-y-0.5 nav-link"
                                        onMouseEnter={(e) => {
                                            const target = e.target as HTMLElement
                                            const underline = document.createElement('div')
                                            underline.className = 'nav-underline absolute bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-indigo-500 transition-all duration-300 rounded-sm'
                                            if (!target.querySelector('.nav-underline')) {
                                                target.appendChild(underline)
                                                setTimeout(() => {
                                                    underline.style.width = '80%'
                                                }, 10)
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.target as HTMLElement
                                            const underline = target.querySelector('.nav-underline')
                                            if (underline) {
                                                (underline as HTMLElement).style.width = '0'
                                                setTimeout(() => underline.remove(), 300)
                                            }
                                        }}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-4">
                            {/* Cart Icon */}
                            <div className="transition-transform duration-300 hover:scale-110 cart-container">
                                <Badge count={items.length} overflowCount={99}>
                                    <Link 
                                        to="/cart" 
                                        className="flex items-center justify-center w-11 h-11 bg-slate-50 rounded-xl text-gray-700 no-underline transition-all duration-300"
                                    >
                                        <ShoppingCartOutlined className="text-xl cart-icon" />
                                    </Link>
                                </Badge>
                            </div>

                            {/* Desktop Auth Section - Cachée sur mobile */}
                            {!isMobile && (
                                <div className="flex items-center">
                                    {isAuthenticated && user ? (
                                        <Dropdown 
                                            menu={{ items: userMenuItems }} 
                                            placement="bottomRight"
                                            arrow
                                            trigger={['click']}
                                        >
                                            <div className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 border border-gray-200 hover:bg-slate-50 hover:-translate-y-px">
                                                <Avatar
                                                 src={user?.profile_picture ? `http://localhost:5000${user.profile_picture}` : undefined}
                                                 icon={!user?.profile_picture ? <UserOutlined /> : undefined}
                                                 className="w-10 h-10 border-2 border-indigo-500"
                                               />
                                                <div className="flex flex-col items-start">
                                                    <span className="font-semibold text-gray-800 text-sm leading-tight">{user.name}</span>
                                                    <span className="text-xs text-green-500 font-medium">En ligne</span>
                                                </div>
                                                <div className="text-xs text-gray-400 ml-1">▼</div>
                                            </div>
                                        </Dropdown>
                                    ) : (
                                        <Link 
                                            to="/login"
                                            className="flex items-center px-5 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium no-underline rounded-xl transition-all duration-300 hover:from-indigo-600 hover:to-purple-700 hover:scale-105 hover:shadow-lg hover:shadow-indigo-500/40"
                                        >
                                            <UserOutlined className="mr-2" />
                                            Connexion
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Mobile Menu Button - Affiché seulement sur mobile */}
                            {isMobile && (
                                <Button
                                    type="text"
                                    icon={<MenuOutlined className="text-xl text-gray-700" />}
                                    onClick={() => setOpen(true)}
                                    className="w-11 h-11 flex items-center justify-center rounded-xl border-0 shadow-none bg-slate-50"
                                />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-[10px] flex items-center justify-center">
                                <ShoppingCartOutlined className="text-lg text-white" />
                            </div>
                            <span className="font-semibold text-gray-800 text-lg">Menu</span>
                        </div>
                        
                        {/* User Section in Drawer */}
                        <div className="pt-3 border-t border-gray-100">
                            {isAuthenticated && user ? (
                                <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-xl">
                                    <Avatar
                                     src={user?.profile_picture ? `http://localhost:5000${user.profile_picture}` : undefined}
                                     icon={!user?.profile_picture ? <UserOutlined /> : undefined}
                                     className="w-12 h-12 border-2 border-indigo-500 flex-shrink-0"
                                   />                                               
                                    <div className="flex-1 min-w-0">
                                        <div className="font-semibold text-gray-800 text-[15px] mb-0.5">{user.name}</div>
                                        <div className="text-xs text-gray-500 mb-1.5 break-all">{user.email}</div>
                                        <Button 
                                            type="link" 
                                            size="small" 
                                            icon={<LogoutOutlined />}
                                            onClick={handleLogout}
                                            className="p-0 h-auto text-red-500 text-xs font-medium"
                                        >
                                            Déconnexion
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    className="flex items-center justify-center w-full px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white no-underline rounded-xl text-sm font-medium"
                                    onClick={() => setOpen(false)}
                                >
                                    <UserOutlined className="mr-2" />
                                    Se connecter
                                </Link>
                            )}
                        </div>
                    </div>
                }
                placement="right"
                onClose={() => setOpen(false)}
                open={open}
                width={320}
                closeIcon={<CloseOutlined className="text-gray-500 text-base" />}
            >
                <div className="flex flex-col gap-1.5 mt-6">
                    {[...navLinks, { path: '/cart', label: 'Panier' }].map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            className="flex items-center justify-between px-5 py-4 text-gray-700 no-underline rounded-xl font-medium transition-all duration-300 hover:text-indigo-500 hover:bg-indigo-50 hover:translate-x-2"
                        >
                            <div className="flex items-center gap-4">
                                {link.path === '/cart' ? (
                                    <Badge count={items.length} size="small">
                                        <ShoppingCartOutlined className="text-lg" />
                                    </Badge>
                                ) : (
                                    <div className="w-2 h-2 bg-slate-300 rounded-full"></div>
                                )}
                                <span>{link.label}</span>
                            </div>
                            {link.path === '/cart' && items.length > 0 && (
                                <span className="text-xs text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded-xl min-w-[24px] text-center">
                                    {items.length}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Footer */}
                <div className="absolute bottom-5 left-5 right-5">
                    <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-5 text-white text-center">
                        <h3 className="font-bold m-0 mb-1.5 text-lg">Fashion Store</h3>
                        <p className="text-sm opacity-90 m-0">
                            {isAuthenticated && user ? `Bienvenue, ${user.name.split(' ')[0]}!` : 'Votre destination mode'}
                        </p>
                    </div>
                </div>
            </Drawer>

            {/* CSS Animations - Nécessaires pour les animations personnalisées */}
            <style>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.8; transform: scale(1); }
                    50% { opacity: 1; transform: scale(1.1); }
                }
                
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    25% { transform: translateY(-5px); }
                    50% { transform: translateY(-10px); }
                    75% { transform: translateY(-5px); }
                }
                
                .cart-container:hover .cart-icon {
                    animation: bounce 0.6s ease;
                }
            `}</style>
        </>
    )
}

export default Navbar