import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { 
    Card, 
    Avatar, 
    Button, 
    Form, 
    Input, 
    Upload, 
    message, 
    Tabs,
    List,
    Badge,
    Typography,
    Divider,
    Row,
    Col,
    Space,
    Modal
} from 'antd'
import {
    UserOutlined,
    EditOutlined,
    CameraOutlined,
    MailOutlined,
    PhoneOutlined,
    ShoppingOutlined,
    HeartOutlined,
    SettingOutlined,
    LogoutOutlined,
    UploadOutlined
} from '@ant-design/icons'
import { RootState } from '../store'
import { logout } from '../store/userSlice'

const { Title, Text } = Typography
const { TabPane } = Tabs

const Profile: React.FC = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { user } = useSelector((state: RootState) => state.user)
    const cartItems = useSelector((state: RootState) => state.cart.items || [])
    
    const [editMode, setEditMode] = useState(false)
    const [form] = Form.useForm()
    const [uploadModalVisible, setUploadModalVisible] = useState(false)

    // Données simulées pour les commandes et favoris
    const [orders] = useState([
        { id: '001', date: '2024-01-15', total: 89.99, status: 'Livrée', items: 3 },
        { id: '002', date: '2024-01-10', total: 159.50, status: 'En cours', items: 2 },
        { id: '003', date: '2024-01-05', total: 45.00, status: 'Expédiée', items: 1 }
    ])

    const [favorites] = useState([
        { id: 1, name: 'T-shirt Premium', price: 29.99, image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop' },
        { id: 2, name: 'Jean Slim', price: 79.99, image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop' },
        { id: 3, name: 'Sneakers', price: 89.99, image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop' }
    ])

    if (!user) {
        navigate('/login')
        return null
    }

    const handleSave = (values: any) => {
        console.log('Données à sauvegarder:', values)
        // Ici vous pouvez ajouter la logique pour mettre à jour le profil
        message.success('Profil mis à jour avec succès!')
        setEditMode(false)
    }

    const handleLogout = () => {
        Modal.confirm({
            title: 'Déconnexion',
            content: 'Êtes-vous sûr de vouloir vous déconnecter ?',
            onOk: () => {
                dispatch(logout())
                navigate('/')
                message.info('Vous avez été déconnecté')
            }
        })
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Livrée': return 'success'
            case 'En cours': return 'processing'
            case 'Expédiée': return 'warning'
            default: return 'default'
        }
    }

    return (
        <div style={styles.container}>
            <div style={styles.content}>
                {/* Header avec infos utilisateur */}
                <Card style={styles.headerCard}>
                    <Row gutter={24} align="middle">
                        <Col>
                            <div style={styles.avatarContainer}>
                                <Avatar 
                                    size={120}
                                    src={user.profile_picture}
                                    icon={!user.profile_picture ? <UserOutlined /> : undefined}
                                    style={styles.avatar}
                                />
                                <Button
                                    type="primary"
                                    shape="circle"
                                    icon={<CameraOutlined />}
                                    style={styles.cameraButton}
                                    onClick={() => setUploadModalVisible(true)}
                                />
                            </div>
                        </Col>
                        <Col flex={1}>
                            <div style={styles.userInfo}>
                                <Title level={2} style={styles.userName}>{user.name}</Title>
                                <Space direction="vertical" size="small">
                                    <Text type="secondary">
                                        <MailOutlined style={styles.icon} /> {user.email}
                                    </Text>
                                    <Text type="secondary">
                                        <UserOutlined style={styles.icon} /> Membre depuis janvier 2024
                                    </Text>
                                    <Badge 
                                        status="success" 
                                        text="Compte vérifié" 
                                        style={styles.badge}
                                    />
                                </Space>
                            </div>
                        </Col>
                        <Col>
                            <Space>
                                <Button
                                    type={editMode ? "default" : "primary"}
                                    icon={<EditOutlined />}
                                    onClick={() => setEditMode(!editMode)}
                                >
                                    {editMode ? 'Annuler' : 'Modifier'}
                                </Button>
                                <Button
                                    danger
                                    icon={<LogoutOutlined />}
                                    onClick={handleLogout}
                                >
                                    Déconnexion
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Card>

                {/* Statistiques rapides */}
                <Row gutter={16} style={styles.statsRow}>
                    <Col span={6}>
                        <Card style={styles.statCard}>
                            <div style={styles.statContent}>
                                <ShoppingOutlined style={styles.statIcon} />
                                <div>
                                    <div style={styles.statNumber}>{orders.length}</div>
                                    <div style={styles.statLabel}>Commandes</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={styles.statCard}>
                            <div style={styles.statContent}>
                                <HeartOutlined style={styles.statIcon} />
                                <div>
                                    <div style={styles.statNumber}>{favorites.length}</div>
                                    <div style={styles.statLabel}>Favoris</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={styles.statCard}>
                            <div style={styles.statContent}>
                                <div style={{...styles.statIcon, background: '#52c41a'}}>€</div>
                                <div>
                                    <div style={styles.statNumber}>294,49</div>
                                    <div style={styles.statLabel}>Total dépensé</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                    <Col span={6}>
                        <Card style={styles.statCard}>
                            <div style={styles.statContent}>
                                <div style={{...styles.statIcon, background: '#1890ff', color: 'white'}}>
                                    {cartItems.length}
                                </div>
                                <div>
                                    <div style={styles.statNumber}>Panier</div>
                                    <div style={styles.statLabel}>Articles</div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                </Row>

                {/* Contenu principal avec onglets */}
                <Card style={styles.mainCard}>
                    <Tabs defaultActiveKey="profile" type="card">
                        <TabPane 
                            tab={<span><UserOutlined />Profil</span>} 
                            key="profile"
                        >
                            {editMode ? (
                                <Form
                                    form={form}
                                    layout="vertical"
                                    initialValues={{
                                        name: user.name,
                                        email: user.email,
                                        phone: '',
                                        address: ''
                                    }}
                                    onFinish={handleSave}
                                    style={styles.form}
                                >
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Nom complet"
                                                name="name"
                                                rules={[{ required: true, message: 'Veuillez saisir votre nom' }]}
                                            >
                                                <Input prefix={<UserOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Email"
                                                name="email"
                                                rules={[
                                                    { required: true, message: 'Veuillez saisir votre email' },
                                                    { type: 'email', message: 'Email invalide' }
                                                ]}
                                            >
                                                <Input prefix={<MailOutlined />} />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row gutter={16}>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Téléphone"
                                                name="phone"
                                            >
                                                <Input prefix={<PhoneOutlined />} />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            <Form.Item
                                                label="Adresse"
                                                name="address"
                                            >
                                                <Input />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Form.Item>
                                        <Space>
                                            <Button type="primary" htmlType="submit">
                                                Sauvegarder
                                            </Button>
                                            <Button onClick={() => setEditMode(false)}>
                                                Annuler
                                            </Button>
                                        </Space>
                                    </Form.Item>
                                </Form>
                            ) : (
                                <div style={styles.profileView}>
                                    <Row gutter={[24, 24]}>
                                        <Col span={12}>
                                            <div style={styles.infoItem}>
                                                <Text strong>Nom complet</Text>
                                                <div style={styles.infoValue}>{user.name}</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={styles.infoItem}>
                                                <Text strong>Email</Text>
                                                <div style={styles.infoValue}>{user.email}</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={styles.infoItem}>
                                                <Text strong>Téléphone</Text>
                                                <div style={styles.infoValue}>+33 6 12 34 56 78</div>
                                            </div>
                                        </Col>
                                        <Col span={12}>
                                            <div style={styles.infoItem}>
                                                <Text strong>Adresse</Text>
                                                <div style={styles.infoValue}>123 Rue de la Mode, 75001 Paris</div>
                                            </div>
                                        </Col>
                                        <Col span={24}>
                                            <div style={styles.infoItem}>
                                                <Text strong>Rôle</Text>
                                                <Badge 
                                                    color={user.role === 'admin' ? 'gold' : 'blue'} 
                                                    text={user.role === 'admin' ? 'Administrateur' : 'Utilisateur'}
                                                />
                                            </div>
                                        </Col>
                                    </Row>
                                </div>
                            )}
                        </TabPane>

                        <TabPane 
                            tab={<span><ShoppingOutlined />Commandes</span>} 
                            key="orders"
                        >
                            <List
                                itemLayout="horizontal"
                                dataSource={orders}
                                renderItem={(order) => (
                                    <List.Item
                                        style={styles.orderItem}
                                        actions={[
                                            <Button type="link">Voir détails</Button>
                                        ]}
                                    >
                                        <List.Item.Meta
                                            title={
                                                <div style={styles.orderHeader}>
                                                    <span>Commande #{order.id}</span>
                                                    <Badge 
                                                        status={getStatusColor(order.status)} 
                                                        text={order.status}
                                                    />
                                                </div>
                                            }
                                            description={
                                                <div>
                                                    <div>Date: {order.date}</div>
                                                    <div>{order.items} articles - {order.total}€</div>
                                                </div>
                                            }
                                        />
                                    </List.Item>
                                )}
                            />
                        </TabPane>

                        <TabPane 
                            tab={<span><HeartOutlined />Favoris</span>} 
                            key="favorites"
                        >
                            <Row gutter={[16, 16]}>
                                {favorites.map((item) => (
                                    <Col span={8} key={item.id}>
                                        <Card
                                            hoverable
                                            cover={
                                                <img 
                                                    alt={item.name} 
                                                    src={item.image}
                                                    style={styles.favoriteImage}
                                                />
                                            }
                                            actions={[
                                                <Button type="primary" size="small">Ajouter au panier</Button>,
                                                <Button type="text" size="small" danger>Retirer</Button>
                                            ]}
                                        >
                                            <Card.Meta
                                                title={item.name}
                                                description={<Text strong>{item.price}€</Text>}
                                            />
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </TabPane>

                        <TabPane 
                            tab={<span><SettingOutlined />Paramètres</span>} 
                            key="settings"
                        >
                            <div style={styles.settingsContent}>
                                <Title level={4}>Paramètres du compte</Title>
                                <List
                                    itemLayout="horizontal"
                                    dataSource={[
                                        { title: 'Changer le mot de passe', description: 'Modifier votre mot de passe' },
                                        { title: 'Notifications', description: 'Gérer vos préférences de notification' },
                                        { title: 'Confidentialité', description: 'Paramètres de confidentialité' },
                                        { title: 'Supprimer le compte', description: 'Supprimer définitivement votre compte' }
                                    ]}
                                    renderItem={(item) => (
                                        <List.Item
                                            actions={[<Button type="link">Modifier</Button>]}
                                        >
                                            <List.Item.Meta
                                                title={item.title}
                                                description={item.description}
                                            />
                                        </List.Item>
                                    )}
                                />
                            </div>
                        </TabPane>
                    </Tabs>
                </Card>
            </div>

            {/* Modal pour upload photo */}
            <Modal
                title="Changer la photo de profil"
                open={uploadModalVisible}
                onCancel={() => setUploadModalVisible(false)}
                footer={null}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    beforeUpload={() => {
                        message.success('Photo mise à jour!')
                        setUploadModalVisible(false)
                        return false
                    }}
                >
                    <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Choisir une photo</div>
                    </div>
                </Upload>
            </Modal>
        </div>
    )
}

const styles = {
    container: {
        minHeight: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '24px'
    },
    content: {
        maxWidth: '1200px',
        margin: '0 auto'
    },
    headerCard: {
        marginBottom: '24px',
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    avatarContainer: {
        position: 'relative' as const,
        display: 'inline-block'
    },
    avatar: {
        border: '4px solid #1890ff'
    },
    cameraButton: {
        position: 'absolute' as const,
        bottom: '8px',
        right: '8px',
        zIndex: 1
    },
    userInfo: {
        marginLeft: '24px'
    },
    userName: {
        margin: '0 0 16px 0',
        color: '#1890ff'
    },
    icon: {
        marginRight: '8px',
        color: '#1890ff'
    },
    badge: {
        marginTop: '8px'
    },
    statsRow: {
        marginBottom: '24px'
    },
    statCard: {
        textAlign: 'center' as const,
        borderRadius: '12px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    statContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '12px'
    },
    statIcon: {
        width: '40px',
        height: '40px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1890ff',
        color: 'white',
        fontSize: '18px'
    },
    statNumber: {
        fontSize: '24px',
        fontWeight: 'bold',
        color: '#1890ff'
    },
    statLabel: {
        fontSize: '14px',
        color: '#666'
    },
    mainCard: {
        borderRadius: '16px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    },
    form: {
        maxWidth: '800px'
    },
    profileView: {
        padding: '24px'
    },
    infoItem: {
        marginBottom: '16px'
    },
    infoValue: {
        fontSize: '16px',
        marginTop: '4px',
        color: '#333'
    },
    orderItem: {
        padding: '16px',
        border: '1px solid #f0f0f0',
        borderRadius: '8px',
        marginBottom: '16px'
    },
    orderHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    favoriteImage: {
        height: '200px',
        objectFit: 'cover' as const
    },
    settingsContent: {
        padding: '24px'
    }
}

export default Profile