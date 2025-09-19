import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Badge, Drawer, Button, Avatar, Dropdown } from 'antd'
import { ShoppingCartOutlined, MenuOutlined, CloseOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../store/userSlice' // Importez votre action logout

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
        dispatch(logout()) // Utilisation de l'action Redux
        navigate('/') // Redirection vers la page d'accueil
        setOpen(false) // Fermer le drawer si ouvert
    }

    const userMenuItems = [
        {
            key: 'profile',
            label: (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <UserOutlined />
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
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ef4444' }}>
                    <LogoutOutlined />
                    Déconnexion
                </div>
            ),
            onClick: handleLogout
        }
    ]

    return (
        <>
            <nav style={styles.navbar}>
                <div style={styles.container}>
                    <div style={styles.navContent}>
                        {/* Logo */}
                        <div 
                            style={styles.logoContainer}
                            onClick={() => navigate('/')}
                            onMouseEnter={(e) => {
                                const icon = e.currentTarget.querySelector('.logo-icon') as HTMLElement
                                if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)'
                            }}
                            onMouseLeave={(e) => {
                                const icon = e.currentTarget.querySelector('.logo-icon') as HTMLElement
                                if (icon) icon.style.transform = 'scale(1) rotate(0deg)'
                            }}
                        >
                            <div style={styles.logoIconWrapper}>
                                <div style={styles.logoIcon} className="logo-icon">
                                    <ShoppingCartOutlined style={styles.logoIconSvg} />
                                </div>
                                <div style={styles.logoDot}></div>
                            </div>
                            <div>
                                <h1 style={styles.logoTitle}>Fashion Store</h1>
                                <p style={styles.logoSubtitle}>Mode & Style</p>
                            </div>
                        </div>

                        {/* Navigation Desktop - Cachée sur mobile */}
                        {!isMobile && (
                            <div style={styles.desktopNav}>
                                {navLinks.map((link, index) => (
                                    <Link
                                        key={index}
                                        to={link.path}
                                        style={styles.navLink}
                                        onMouseEnter={(e) => {
                                            const target = e.target as HTMLElement
                                            target.style.color = '#667eea'
                                            target.style.transform = 'translateY(-2px)'
                                            const underline = document.createElement('div')
                                            underline.className = 'nav-underline'
                                            underline.style.cssText = `
                                                position: absolute;
                                                bottom: 8px;
                                                left: 50%;
                                                transform: translateX(-50%);
                                                width: 0;
                                                height: 2px;
                                                background: #667eea;
                                                transition: width 0.3s ease;
                                                border-radius: 1px;
                                            `
                                            if (!target.querySelector('.nav-underline')) {
                                                target.appendChild(underline)
                                                setTimeout(() => underline.style.width = '80%', 10)
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            const target = e.target as HTMLElement
                                            target.style.color = '#374151'
                                            target.style.transform = 'translateY(0)'
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
                        <div style={styles.actions}>
                            {/* Cart Icon */}
                            <div 
                                style={styles.cartContainer}
                                onMouseEnter={(e) => {
                                    const target = e.currentTarget as HTMLElement
                                    target.style.transform = 'scale(1.1)'
                                    const icon = target.querySelector('.cart-icon') as HTMLElement
                                    if (icon) icon.style.animation = 'bounce 0.6s ease'
                                }}
                                onMouseLeave={(e) => {
                                    const target = e.currentTarget as HTMLElement
                                    target.style.transform = 'scale(1)'
                                }}
                            >
                                <Badge count={items.length} overflowCount={99}>
                                    <Link to="/cart" style={styles.cartLink}>
                                        <ShoppingCartOutlined style={styles.cartIcon} className="cart-icon" />
                                    </Link>
                                </Badge>
                            </div>

                            {/* Desktop Auth Section - Cachée sur mobile */}
                            {!isMobile && (
                                <div style={styles.desktopAuth}>
                                    {isAuthenticated && user ? (
                                        <Dropdown 
                                            menu={{ items: userMenuItems }} 
                                            placement="bottomRight"
                                            arrow
                                            trigger={['click']}
                                        >
                                            <div 
                                                style={styles.userProfile}
                                                onMouseEnter={(e) => {
                                                    const target = e.currentTarget as HTMLElement
                                                    target.style.backgroundColor = '#f8fafc'
                                                    target.style.transform = 'translateY(-1px)'
                                                }}
                                                onMouseLeave={(e) => {
                                                    const target = e.currentTarget as HTMLElement
                                                    target.style.backgroundColor = 'transparent'
                                                    target.style.transform = 'translateY(0)'
                                                }}
                                            >
                                                <Avatar 
                                                    src={user.profile_picture} 
                                                    icon={!user.profile_picture ? <UserOutlined /> : undefined}
                                                    style={styles.avatar}
                                                />
                                                <div style={styles.userInfo}>
                                                    <span style={styles.userName}>{user.name}</span>
                                                    <span style={styles.userStatus}>En ligne</span>
                                                </div>
                                                <div style={styles.dropdownArrow}>▼</div>
                                            </div>
                                        </Dropdown>
                                    ) : (
                                        <Link 
                                            to="/login"
                                            style={styles.loginButton}
                                            onMouseEnter={(e) => {
                                                const target = e.target as HTMLElement
                                                target.style.background = 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)'
                                                target.style.transform = 'scale(1.05)'
                                                target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)'
                                            }}
                                            onMouseLeave={(e) => {
                                                const target = e.target as HTMLElement
                                                target.style.background = 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                                                target.style.transform = 'scale(1)'
                                                target.style.boxShadow = 'none'
                                            }}
                                        >
                                            <UserOutlined style={{ marginRight: '8px' }} />
                                            Connexion
                                        </Link>
                                    )}
                                </div>
                            )}

                            {/* Mobile Menu Button - Affiché seulement sur mobile */}
                            {isMobile && (
                                <Button
                                    type="text"
                                    icon={<MenuOutlined style={styles.mobileMenuIcon} />}
                                    onClick={() => setOpen(true)}
                                    style={styles.mobileMenuButton}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Drawer */}
            <Drawer
                title={
                    <div style={styles.drawerHeader}>
                        <div style={styles.drawerTitle}>
                            <div style={styles.drawerIcon}>
                                <ShoppingCartOutlined style={styles.drawerIconSvg} />
                            </div>
                            <span style={styles.drawerTitleText}>Menu</span>
                        </div>
                        
                        {/* User Section in Drawer */}
                        <div style={styles.drawerUserSection}>
                            {isAuthenticated && user ? (
                                <div style={styles.drawerUserProfile}>
                                    <Avatar 
                                        src={user.profile_picture} 
                                        icon={!user.profile_picture ? <UserOutlined /> : undefined}
                                        style={styles.drawerAvatar}
                                    />
                                    <div style={styles.drawerUserInfo}>
                                        <div style={styles.drawerUserName}>{user.name}</div>
                                        <div style={styles.drawerUserEmail}>{user.email}</div>
                                        <Button 
                                            type="link" 
                                            size="small" 
                                            icon={<LogoutOutlined />}
                                            onClick={handleLogout}
                                            style={styles.logoutBtn}
                                        >
                                            Déconnexion
                                        </Button>
                                    </div>
                                </div>
                            ) : (
                                <Link 
                                    to="/login" 
                                    style={styles.drawerLoginBtn}
                                    onClick={() => setOpen(false)}
                                >
                                    <UserOutlined style={{ marginRight: '8px' }} />
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
                closeIcon={<CloseOutlined style={styles.closeIcon} />}
            >
                <div style={styles.drawerContent}>
                    {[...navLinks, { path: '/cart', label: 'Panier' }].map((link, index) => (
                        <Link
                            key={index}
                            to={link.path}
                            onClick={() => setOpen(false)}
                            style={styles.drawerLink}
                            onMouseEnter={(e) => {
                                const target = e.target as HTMLElement
                                target.style.color = '#667eea'
                                target.style.backgroundColor = '#f3f4ff'
                                target.style.transform = 'translateX(8px)'
                            }}
                            onMouseLeave={(e) => {
                                const target = e.target as HTMLElement
                                target.style.color = '#374151'
                                target.style.backgroundColor = 'transparent'
                                target.style.transform = 'translateX(0)'
                            }}
                        >
                            <div style={styles.drawerLinkContent}>
                                {link.path === '/cart' ? (
                                    <Badge count={items.length} size="small">
                                        <ShoppingCartOutlined style={styles.drawerLinkIcon} />
                                    </Badge>
                                ) : (
                                    <div style={styles.drawerLinkDot}></div>
                                )}
                                <span>{link.label}</span>
                            </div>
                            {link.path === '/cart' && items.length > 0 && (
                                <span style={styles.cartCount}>
                                    {items.length}
                                </span>
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Footer */}
                <div style={styles.drawerFooter}>
                    <div style={styles.drawerFooterContent}>
                        <h3 style={styles.drawerFooterTitle}>Fashion Store</h3>
                        <p style={styles.drawerFooterSubtitle}>
                            {isAuthenticated && user ? `Bienvenue, ${user.name.split(' ')[0]}!` : 'Votre destination mode'}
                        </p>
                    </div>
                </div>
            </Drawer>

            {/* CSS Animations */}
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
                
                .logo-icon {
                    transition: transform 0.3s ease !important;
                }
            `}</style>
        </>
    )
}

const styles = {
    navbar: {
        position: 'sticky' as const,
        top: 0,
        zIndex: 1000,
        backgroundColor: '#ffffff',
        boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
        borderBottom: '1px solid #f0f0f0'
    },
    container: {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px'
    },
    navContent: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '70px'
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        cursor: 'pointer'
    },
    logoIconWrapper: {
        position: 'relative' as const
    },
    logoIcon: {
        width: '45px',
        height: '45px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.3s ease'
    },
    logoIconSvg: {
        fontSize: '22px',
        color: '#ffffff'
    },
    logoDot: {
        position: 'absolute' as const,
        top: '-4px',
        right: '-4px',
        width: '14px',
        height: '14px',
        backgroundColor: '#ec4899',
        borderRadius: '50%',
        animation: 'pulse 2s infinite'
    },
    logoTitle: {
        fontSize: '22px',
        fontWeight: '700',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        margin: 0,
        lineHeight: 1.2
    },
    logoSubtitle: {
        fontSize: '12px',
        color: '#6b7280',
        margin: 0,
        marginTop: '-2px'
    },
    desktopNav: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px'
    },
    navLink: {
        position: 'relative' as const,
        padding: '12px 20px',
        color: '#374151',
        fontWeight: '500',
        textDecoration: 'none',
        borderRadius: '8px',
        transition: 'all 0.3s ease'
    },
    actions: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    cartContainer: {
        transition: 'transform 0.3s ease'
    },
    cartLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '44px',
        height: '44px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px',
        color: '#374151',
        textDecoration: 'none',
        transition: 'all 0.3s ease'
    },
    cartIcon: {
        fontSize: '20px'
    },
    desktopAuth: {
        display: 'flex',
        alignItems: 'center'
    },
    userProfile: {
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        padding: '8px 16px',
        borderRadius: '12px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        border: '1px solid #e5e7eb'
    },
    avatar: {
        width: '40px',
        height: '40px',
        border: '2px solid #667eea'
    },
    userInfo: {
        display: 'flex',
        flexDirection: 'column' as const,
        alignItems: 'flex-start'
    },
    userName: {
        fontWeight: '600',
        color: '#1f2937',
        fontSize: '14px',
        lineHeight: 1.2
    },
    userStatus: {
        fontSize: '12px',
        color: '#10b981',
        fontWeight: '500'
    },
    dropdownArrow: {
        fontSize: '10px',
        color: '#9ca3af',
        marginLeft: '4px'
    },
    loginButton: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 20px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        fontWeight: '500',
        textDecoration: 'none',
        borderRadius: '12px',
        transition: 'all 0.3s ease'
    },
    mobileMenuButton: {
        width: '44px',
        height: '44px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '12px',
        border: 'none',
        boxShadow: 'none',
        backgroundColor: '#f8fafc'
    },
    mobileMenuIcon: {
        fontSize: '20px',
        color: '#374151'
    },
    drawerHeader: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '16px'
    },
    drawerTitle: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
    },
    drawerIcon: {
        width: '36px',
        height: '36px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    drawerIconSvg: {
        fontSize: '18px',
        color: '#ffffff'
    },
    drawerTitleText: {
        fontWeight: '600',
        color: '#1f2937',
        fontSize: '18px'
    },
    drawerUserSection: {
        paddingTop: '12px',
        borderTop: '1px solid #f0f0f0'
    },
    drawerUserProfile: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        borderRadius: '12px'
    },
    drawerAvatar: {
        width: '48px',
        height: '48px',
        border: '2px solid #667eea',
        flexShrink: 0
    },
    drawerUserInfo: {
        flex: 1,
        minWidth: 0
    },
    drawerUserName: {
        fontWeight: '600',
        color: '#1f2937',
        fontSize: '15px',
        marginBottom: '2px'
    },
    drawerUserEmail: {
        fontSize: '12px',
        color: '#6b7280',
        marginBottom: '6px',
        wordBreak: 'break-all' as const
    },
    logoutBtn: {
        padding: '0',
        height: 'auto',
        color: '#ef4444',
        fontSize: '12px',
        fontWeight: '500'
    },
    drawerLoginBtn: {
        display: 'flex',
        alignItems: 'center',
        padding: '12px 16px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: '#ffffff',
        textDecoration: 'none',
        borderRadius: '12px',
        fontSize: '14px',
        fontWeight: '500',
        width: '100%',
        justifyContent: 'center'
    },
    closeIcon: {
        color: '#6b7280',
        fontSize: '16px'
    },
    drawerContent: {
        display: 'flex',
        flexDirection: 'column' as const,
        gap: '6px',
        marginTop: '24px'
    },
    drawerLink: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px 20px',
        color: '#374151',
        textDecoration: 'none',
        borderRadius: '12px',
        fontWeight: '500',
        transition: 'all 0.3s ease'
    },
    drawerLinkContent: {
        display: 'flex',
        alignItems: 'center',
        gap: '16px'
    },
    drawerLinkIcon: {
        fontSize: '18px'
    },
    drawerLinkDot: {
        width: '8px',
        height: '8px',
        backgroundColor: '#cbd5e1',
        borderRadius: '50%'
    },
    cartCount: {
        fontSize: '12px',
        color: '#667eea',
        fontWeight: '700',
        backgroundColor: '#f3f4ff',
        padding: '4px 8px',
        borderRadius: '12px',
        minWidth: '24px',
        textAlign: 'center' as const
    },
    drawerFooter: {
        position: 'absolute' as const,
        bottom: '20px',
        left: '20px',
        right: '20px'
    },
    drawerFooterContent: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '16px',
        padding: '20px',
        color: '#ffffff',
        textAlign: 'center' as const
    },
    drawerFooterTitle: {
        fontWeight: '700',
        margin: '0 0 6px 0',
        fontSize: '18px'
    },
    drawerFooterSubtitle: {
        fontSize: '14px',
        opacity: 0.9,
        margin: 0
    }
}

export default Navbar