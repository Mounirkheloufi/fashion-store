import React, { useEffect, useState } from 'react'
import { Carousel, Button } from 'antd'
import { ArrowRightOutlined, ShoppingOutlined, CrownOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons'
import ProductGrid from '../components/product/ProductGrid'
import API from '../api/api'
import shopBanner2 from '../assets/shop-banner2.jpg'
import shopBanner3 from '../assets/shop-banner3.jpg'
import shopBanner5 from '../assets/shop-banner5.jpg'
import shopBanner1 from '../assets/shop-banner1.jpg'

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
            image: shopBanner3,
            gradient: "from-red-30 to-yellow-30",
            icon: <CrownOutlined className="text-3xl md:text-4xl" />
        },
        {
            id: 2,
            title: "Shopping à Domicile",
            subtitle: "Achetez en toute tranquillité",
            description: "Commandez depuis chez vous et profitez de la livraison gratuite dès 50€ d'achat. Confort et simplicité garantis.",
            buttonText: "Commander maintenant",
            buttonLink: "/shop",
            image: shopBanner2,
            gradient: "from-blue-30 to-cyan-30",
            icon: <HomeOutlined className="text-3xl md:text-4xl" />
        },
        {
            id: 3,
            title: "Qualité & Choix",
            subtitle: "Des milliers d'articles disponibles",
            description: "Un catalogue varié avec les meilleures marques et une qualité irréprochable pour satisfaire tous vos goûts.",
            buttonText: "Voir le catalogue",
            buttonLink: "/shop",
            image: shopBanner5,
            gradient: "from-purple-30 to-pink-30",
            icon: <StarOutlined className="text-3xl md:text-4xl" />
        },
        {
            id: 4,
            title: "Norme Européenne",
            subtitle: "Vêtements certifiés EU",
            description: "Tous nos vêtements respectent les standards européens de qualité et sont fabriqués dans le respect de l'environnement.",
            buttonText: "En savoir plus",
            buttonLink: "/about",
            image: shopBanner1,
            gradient: "from-green-30 to-teal-30",
            icon: <ShoppingOutlined className="text-3xl md:text-4xl" />
        }
    ]

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Carousel de bannières publicitaires */}
            <div className="relative banner-carousel-container">
                <Carousel 
                    autoplay 
                    autoplaySpeed={4000}
                    effect="fade"
                    dots={true}
                    arrows={false}
                    pauseOnHover={false}
                    className="home-banner-carousel"
                >
                    {bannerSlides.map((slide) => (
                        <div key={slide.id} className="carousel-slide">
                            <div className="relative h-[450px] sm:h-[550px] md:h-[600px] overflow-hidden">
                                {/* Image de fond */}
                                <div 
                                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                                    style={{ backgroundImage: `url(${slide.image})` }}
                                >
                                    <div className="absolute inset-0 bg-black/30"></div>
                                </div>
                                
                                {/* Overlay gradient */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient}`}></div>
                                
                                {/* Contenu */}
                                <div className="relative z-20 h-full flex items-center pointer-events-none">
                                    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pointer-events-none">
                                        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center pointer-events-none">
                                            {/* Texte à gauche */}
                                            <div className="text-white space-y-4 md:space-y-6 text-center lg:text-left pointer-events-none">
                                                {/* Icône */}
                                                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto lg:mx-0">
                                                    {slide.icon}
                                                </div>
                                                
                                                {/* Badge */}
                                                <div className="inline-block">
                                                    <span className="bg-white/20 backdrop-blur-sm text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-semibold tracking-wider border border-white/20">
                                                        OFFRE SPÉCIALE
                                                    </span>
                                                </div>
                                                
                                                {/* Titre principal */}
                                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
                                                    {slide.title}
                                                </h1>
                                                
                                                {/* Sous-titre */}
                                                <h2 className="text-lg sm:text-xl md:text-2xl font-medium text-white/95">
                                                    {slide.subtitle}
                                                </h2>
                                                
                                                {/* Description */}
                                                <p className="text-sm sm:text-base md:text-lg text-white/85 leading-relaxed max-w-lg mx-auto lg:mx-0">
                                                    {slide.description}
                                                </p>
                                                
                                                {/* Bouton CTA */}
                                                <div className="pt-2 md:pt-4">
                                                    <Button 
                                                        type="primary" 
                                                        size="large"
                                                        href={slide.buttonLink}
                                                        className="bg-white text-gray-900 border-none font-semibold px-6 py-2 md:px-8 md:py-3 h-auto rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-xl text-sm md:text-base"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            {slide.buttonText}
                                                            <ArrowRightOutlined className="text-sm" />
                                                        </span>
                                                    </Button>
                                                </div>
                                            </div>
                                            
                                            {/* Contenu décoratif à droite - visible uniquement sur grand écran */}
                                            <div className="hidden xl:flex items-center justify-center pointer-events-none">
                                                <div className="relative pointer-events-none">
                                                    <div className="w-72 h-72 xl:w-80 xl:h-80 bg-white/10 backdrop-blur-sm rounded-3xl border border-white/20 flex items-center justify-center transform rotate-3 hover:rotate-0 transition-transform duration-500 pointer-events-none">
                                                        <div className="text-center text-white pointer-events-none">
                                                            <div className="text-5xl xl:text-6xl mb-4 pointer-events-none">{slide.icon}</div>
                                                            <h3 className="text-xl xl:text-2xl font-bold pointer-events-none">{slide.title}</h3>
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Éléments décoratifs */}
                                                    <div className="absolute -top-4 -right-4 w-12 h-12 xl:w-16 xl:h-16 bg-white/20 rounded-full animate-bounce pointer-events-none"></div>
                                                    <div className="absolute -bottom-4 -left-4 w-8 h-8 xl:w-12 xl:h-12 bg-white/30 rounded-full animate-pulse pointer-events-none"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                {/* Indicateur de scroll - masqué sur mobile */}
                                <div className="absolute bottom-6 md:bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce hidden md:block z-30">
                                    <div className="w-5 h-8 md:w-6 md:h-10 border-2 border-white/50 rounded-full flex justify-center">
                                        <div className="w-1 h-2 md:h-3 bg-white/70 rounded-full mt-1.5 md:mt-2 animate-pulse"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>

            {/* Section des produits */}
            <div className="py-12 md:py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-8 md:mb-12">
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Nos Produits Tendance
                        </h2>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto">
                            Découvrez notre sélection de vêtements et accessoires de mode pour un style unique et moderne.
                        </p>
                    </div>
                    
                    <ProductGrid products={products} />
                </div>
            </div>

            {/* Styles personnalisés */}
            <style>{`
                .banner-carousel-container {
                    position: relative;
                    z-index: 1;
                }
                
                .home-banner-carousel {
                    position: relative;
                }
                
                .home-banner-carousel .slick-slider {
                    position: relative;
                    z-index: 10;
                }
                
                .home-banner-carousel .slick-list {
                    position: relative;
                    z-index: 10;
                }
                
                .home-banner-carousel .slick-track {
                    position: relative;
                    z-index: 10;
                }
                
                .carousel-slide {
                    position: relative;
                    z-index: 10;
                }
                
                .home-banner-carousel .slick-dots {
                    bottom: 20px;
                    z-index: 40;
                    position: absolute;
                }
                
                .home-banner-carousel .slick-dots li {
                    margin: 0 4px;
                }
                
                .home-banner-carousel .slick-dots li button {
                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: rgba(255, 255, 255, 0.4);
                    border: 2px solid rgba(255, 255, 255, 0.6);
                    transition: all 0.3s ease;
                }
                
                .home-banner-carousel .slick-dots li.slick-active button {
                    background-color: white;
                    transform: scale(1.3);
                    border-color: white;
                }
                
                @keyframes fade-in-up {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                /* Mobile responsive adjustments */
                @media (max-width: 640px) {
                    .home-banner-carousel .slick-dots {
                        bottom: 15px;
                    }
                    
                    .home-banner-carousel .slick-dots li button {
                        width: 8px;
                        height: 8px;
                    }
                }
                
                /* Ensure carousel interactions work properly */
                .home-banner-carousel .slick-slide button,
                .home-banner-carousel .slick-slide a,
                .home-banner-carousel .slick-slide .pointer-events-auto {
                    pointer-events: auto;
                }
                
                .home-banner-carousel .slick-slider,
                .home-banner-carousel .slick-list,
                .home-banner-carousel .slick-track {
                    touch-action: pan-y;
                    pointer-events: auto;
                }
            `}</style>
        </div>
    )
}