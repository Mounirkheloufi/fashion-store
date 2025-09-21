import React from 'react'
import { Link } from 'react-router-dom'
import { Input, Button, Divider } from 'antd'
import { 
    ShoppingCartOutlined, 
    MailOutlined, 
    PhoneOutlined, 
    EnvironmentOutlined,
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    YoutubeOutlined,
    LinkedinOutlined,
    SendOutlined,
    CreditCardOutlined,
    SafetyCertificateOutlined,
    TruckOutlined,
    CustomerServiceOutlined
} from '@ant-design/icons'

const Footer: React.FC = () => {
    const currentYear = new Date().getFullYear()

    const footerLinks = {
        company: [
            { label: 'À propos', href: '/about' },
            { label: 'Notre histoire', href: '/story' },
            { label: 'Carrières', href: '/careers' },
            { label: 'Presse', href: '/press' },
            { label: 'Blog', href: '/blog' }
        ],
        customer: [
            { label: 'Contact', href: '/contact' },
            { label: 'FAQ', href: '/faq' },
            { label: 'Guide des tailles', href: '/size-guide' },
            { label: 'Retours', href: '/returns' },
            { label: 'Suivi commande', href: '/track-order' }
        ],
        legal: [
            { label: 'Conditions générales', href: '/terms' },
            { label: 'Politique de confidentialité', href: '/privacy' },
            { label: 'Mentions légales', href: '/legal' },
            { label: 'Cookies', href: '/cookies' },
            { label: 'CGV', href: '/sales-terms' }
        ],
        categories: [
            { label: 'Homme', href: '/shop/men' },
            { label: 'Femme', href: '/shop/women' },
            { label: 'Enfant', href: '/shop/kids' },
            { label: 'Accessoires', href: '/shop/accessories' },
            { label: 'Soldes', href: '/shop/sale' }
        ]
    }

    const socialLinks = [
        { icon: <FacebookOutlined />, href: '#', color: 'hover:text-blue-600' },
        { icon: <InstagramOutlined />, href: '#', color: 'hover:text-pink-500' },
        { icon: <TwitterOutlined />, href: '#', color: 'hover:text-blue-400' },
        { icon: <YoutubeOutlined />, href: '#', color: 'hover:text-red-500' },
        { icon: <LinkedinOutlined />, href: '#', color: 'hover:text-blue-700' }
    ]

    const features = [
        {
            icon: <TruckOutlined className="text-xl" />,
            title: 'Livraison gratuite',
            description: 'Dès 50€ d\'achat'
        },
        {
            icon: <CustomerServiceOutlined className="text-xl" />,
            title: 'Support 24/7',
            description: 'Service client disponible'
        },
        {
            icon: <SafetyCertificateOutlined className="text-xl" />,
            title: 'Paiement sécurisé',
            description: 'SSL & cryptage'
        },
        {
            icon: <CreditCardOutlined className="text-xl" />,
            title: 'Retour gratuit',
            description: '30 jours pour changer d\'avis'
        }
    ]

    return (
        <footer className="bg-gray-900 text-gray-300">
            {/* Section des avantages */}
            <div className="bg-gray-800 py-8">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {features.map((feature, index) => (
                            <div key={index} className="flex items-center gap-4 p-4 rounded-lg hover:bg-gray-700 transition-colors duration-300">
                                <div className="flex-shrink-0 w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                                    <p className="text-xs text-gray-400 mt-1">{feature.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Section principale du footer */}
            <div className="py-12">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="grid grid-cols-1 lg:grid-cols-6 gap-8">
                        {/* Logo et description */}
                        <div className="lg:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                                    <ShoppingCartOutlined className="text-xl text-white" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-white">Fashion Store</h2>
                                    <p className="text-sm text-gray-400">Mode & Style</p>
                                </div>
                            </div>
                            
                            <p className="text-gray-400 mb-6 leading-relaxed">
                                Découvrez les dernières tendances mode avec notre collection exclusive. 
                                Qualité premium et style contemporain pour tous vos looks.
                            </p>

                            {/* Informations de contact */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <EnvironmentOutlined className="text-indigo-500" />
                                    <span className="text-sm">123 Rue de la Mode, 75001 Paris</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <PhoneOutlined className="text-indigo-500" />
                                    <span className="text-sm">+33 1 23 45 67 89</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <MailOutlined className="text-indigo-500" />
                                    <span className="text-sm">contact@fashionstore.fr</span>
                                </div>
                            </div>

                            {/* Réseaux sociaux */}
                            <div className="flex gap-4">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 transition-all duration-300 hover:scale-110 ${social.color}`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Liens rapides */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Entreprise</h3>
                            <ul className="space-y-3">
                                {footerLinks.company.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-4">Service Client</h3>
                            <ul className="space-y-3">
                                {footerLinks.customer.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-semibold text-white mb-4">Catégories</h3>
                            <ul className="space-y-3">
                                {footerLinks.categories.map((link, index) => (
                                    <li key={index}>
                                        <Link 
                                            to={link.href}
                                            className="text-gray-400 hover:text-white transition-colors duration-300 text-sm"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Newsletter */}
                        <div>
                            <h3 className="font-semibold text-white mb-4">Newsletter</h3>
                            <p className="text-gray-400 text-sm mb-4">
                                Recevez nos dernières actualités et offres exclusives
                            </p>
                            
                            <div className="flex gap-2 mb-4">
                                <Input 
                                    placeholder="Votre email"
                                    className="flex-1"
                                    style={{ 
                                        backgroundColor: '#374151',
                                        border: '1px solid #4B5563',
                                        color: 'white'
                                    }}
                                />
                                <Button 
                                    type="primary"
                                    icon={<SendOutlined />}
                                    className="bg-indigo-600 border-indigo-600 hover:bg-indigo-700"
                                />
                            </div>
                            
                            <p className="text-xs text-gray-500">
                                En vous abonnant, vous acceptez notre politique de confidentialité
                            </p>

                            {/* Méthodes de paiement */}
                            <div className="mt-6">
                                <h4 className="text-sm font-semibold text-white mb-3">Paiements acceptés</h4>
                                <div className="flex gap-2 flex-wrap">
                                    {['VISA', 'MC', 'AMEX', 'PAYPAL'].map((payment, index) => (
                                        <div 
                                            key={index}
                                            className="px-3 py-1 bg-gray-800 rounded text-xs text-gray-300 border border-gray-700"
                                        >
                                            {payment}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Divider className="m-0 border-gray-700" />

            {/* Footer bottom */}
            <div className="py-6">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-400">
                            © {currentYear} Fashion Store. Tous droits réservés.
                        </div>
                        
                        <div className="flex items-center gap-6">
                            <Link to="/terms" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Conditions d'utilisation
                            </Link>
                            <Link to="/privacy" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Confidentialité
                            </Link>
                            <Link to="/cookies" className="text-sm text-gray-400 hover:text-white transition-colors">
                                Cookies
                            </Link>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <SafetyCertificateOutlined className="text-green-500" />
                            <span>Site sécurisé SSL</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer