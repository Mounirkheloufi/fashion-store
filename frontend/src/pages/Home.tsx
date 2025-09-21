import React, { useEffect, useState } from 'react'
import { Carousel, Button } from 'antd'
import { ArrowRightOutlined, ShoppingOutlined, CrownOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons'
import ProductGrid from '../components/product/ProductGrid'
import API from '../api/api'

export default function Home() {
    const [products, setProducts] = useState<any[]>([])
    
    useEffect(() => { 
        API.get('/products').then(r => setProducts(r.data)).catch(() => {}) 
    }, [])

    const bannerSlides = [
        {
            id: 1,
            title: "Promotion Exclusive",
            subtitle: "Jusqu'à 40% de réduction",
            description: "Découvrez notre collection automne-hiver avec des prix exceptionnels sur tous vos articles préférés.",
            buttonText: "Profiter maintenant",
            buttonLink: "/shop",
            image: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=600&fit=crop&crop=entropy",
            gradient: "from-red-20 to-yellow-20",
            icon: <CrownOutlined className="text-4xl" />
        },
        {
            id: 2,
            title: "Shopping à Domicile",
            subtitle: "Achetez en toute tranquillité",
            description: "Commandez depuis chez vous et profitez de la livraison gratuite dès 50€ d'achat. Confort et simplicité garantis.",
            buttonText: "Commander maintenant",
            buttonLink: "/shop",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop&crop=face",
            gradient: "from-blue-20 to-cyan-20",
            icon: <HomeOutlined className="text-4xl" />
        },
        {
            id: 3,
            title: "Qualité & Choix",
            subtitle: "Des milliers d'articles disponibles",
            description: "Un catalogue varié avec les meilleures marques et une qualité irréprochable pour satisfaire tous vos goûts.",
            buttonText: "Voir le catalogue",
            buttonLink: "/shop",
            image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&crop=entropy",
            gradient: "from-purple-20 to-pink-20",
            icon: <StarOutlined className="text-4xl" />
        },
        {
            id: 4,
            title: "Norme Européenne",
            subtitle: "Vêtements certifiés EU",
            description: "Tous nos vêtements respectent les standards européens de qualité et sont fabriqués dans le respect de l'environnement.",
            buttonText: "En savoir plus",
            buttonLink: "/about",
            image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=600&fit=crop&crop=face",
            gradient: "from-green-20 to-teal-20",
            icon: <ShoppingOutlined className="text-4xl" />
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Carousel de bannières publicitaires */}
            <div className="relative">
                <Carousel 
                    autoplay 
                    dots={{ className: 'custom-dots' }}
                    autoplaySpeed={3000}
                    effect="fade"
                    className="banner-carousel"
                >
                    {bannerSlides.map((slide) => (
                        <div key={slide.id}>
                            <div className="relative h-[500px] md:h-[600px] overflow-hidden">
                                {/* Image de fond */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="absolute inset-0 bg-black/40"></div>
                                </div>
                                
                                {/* Overlay gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} opacity-75`}></div>
                                
                                {/* Contenu */}
                                <div className="relative z-10 h-full flex items-center">
                                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                                            {/* Texte à gauche */}
                                            <div className="text-white space-y-6 animate-fade-in-up">
                                                {/* Icône */}
                                                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6">
                                                    {slide.icon}
                                                </div>
                                                
                                                {/* Badge */}
                                                <div className="inline-block">
                                                    <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold tracking-wider border border-white/20">
                                                        OFFRE SPÉCIALE
                                                    </span>
                                                </div>
                                                
                                                {/* Titre principal */}
                                                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                                                    {slide.title}
                                                </h1>
                                                
                                                {/* Sous-titre */}
                                                <h2 className="text-xl md:text-2xl font-medium text-white/90">
                                                    {slide.subtitle}
                                                </h2>
                                                
                                                {/* Description */}
                                                <p className="text-lg text-white/80 max-w-lg leading-relaxed">
                                                    {slide.description}
                                                </p>
                                                
                                                {/* Bouton CTA */}
                                                <div className="pt-4">
                                                    <Button 
                                                        type="primary" 
                                                        size="large"
                                                        href={slide.buttonLink}
                                                        className="bg-white text-gray-900 border-none font-semibold px-8 py-6 h-auto rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {slide.buttonText}
                                                            <ArrowRightOutlined />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/* Image/contenu à droite sur desktop */}
                                            <div className="hidden lg:flex items-center justify-center">
                                                <div className="relative">
                                                    <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500">
                                                        <div className="text-center text-white">
                                                            <div className="text-6xl mb-4">{slide.icon}</div>
                                                            <h3 className="text-2xl font-bold">{slide.title}</h3>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Éléments décoratifs */}
                                                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-white/20 rounded-full animate-bounce"></div>
                                                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-white/30 rounded-full animate-pulse"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Indicateur de scroll */}
                                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block">
                                    <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                                        <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Section des produits */}
            <div className="py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nos Produits Tendance
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez notre sélection de vêtements et accessoires de mode pour un style unique et moderne.
                        </p>
                    </div>
                    
                    <ProductGrid products={products} />
                </div>
            </div>

            {/* Styles personnalisés */}
            <style>{`
                .banner-carousel .slick-dots {
                    bottom: 30px;
                }
                
                .banner-carousel .slick-dots li button {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.5);
                    border: 2px solid rgba(255, 255, 255, 0.7);
                }
                
                .banner-carousel .slick-dots li.slick-active button {
                    background-color: white;
                    transform: scale(1.2);
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                .animate-fade-in-up {
                    animation: fade-in-up 0.8s ease-out;
                }
                
                @media (max-width: 768px) {
                    .banner-carousel .slick-dots {
                        bottom: 20px;
                    }
                }
            `}</style>
        </div>
    )
}