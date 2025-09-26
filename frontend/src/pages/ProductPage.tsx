import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/api";
import { Button, Rate, Spin, message } from "antd";
import { ShoppingCartOutlined, CheckOutlined, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import type { AppDispatch } from "../store";

export default function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (id) {
      setLoading(true);
      API.get(`/products/${id}`)
        .then((res) => setProduct(res.data))
        .catch(() => message.error("Erreur de chargement du produit"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId: product.id, quantity }));
    setAdded(true);
    message.success(`${product.name} ajouté au panier !`);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading)
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <Spin size="large" className="mb-4" />
          <p className="text-gray-600 text-lg">Chargement du produit...</p>
        </div>
      </div>
    );

  if (!product) 
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-12 rounded-2xl shadow-xl">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Produit introuvable</h2>
          <p className="text-gray-600">Le produit que vous recherchez n'existe pas.</p>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Header avec breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 sm:py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="text-xs sm:text-sm text-gray-600">
            <span>Boutique</span>
            <span className="mx-1 sm:mx-2">→</span>
            <span className="capitalize">{product.category}</span>
            <span className="mx-1 sm:mx-2">→</span>
            <span className="text-gray-900 font-medium truncate">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* Section Image */}
            <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 p-4 sm:p-6">
              <div className="sticky top-4">
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300"></div>
                  <div className="relative bg-white rounded-xl p-3 shadow-lg">
                    <img
                      src={`http://localhost:5000/images/${product.image}`}
                      alt={product.name}
                      className="w-full h-[200px] sm:h-[280px] lg:h-[320px] object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.src = "/placeholder-image.jpg";
                      }}
                    />
                  </div>
                </div>
                
                {/* Actions flottantes */}
                <div className="absolute top-6 right-6 flex flex-col gap-2">
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<HeartOutlined />}
                    className={`!bg-white/90 backdrop-blur-sm !border-0 shadow-lg hover:!bg-red-50 transition-all duration-300 !w-8 !h-8 ${liked ? '!text-red-500' : '!text-gray-600'}`}
                    onClick={() => setLiked(!liked)}
                  />
                  <Button
                    type="text"
                    shape="circle"
                    size="small"
                    icon={<ShareAltOutlined />}
                    className="!bg-white/90 backdrop-blur-sm !border-0 shadow-lg hover:!bg-blue-50 !text-gray-600 transition-all duration-300 !w-8 !h-8"
                  />
                </div>
              </div>
            </div>

            {/* Section Informations */}
            <div className="p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6">
              {/* Titre et note */}
              <div className="space-y-2 sm:space-y-3">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 leading-tight">
                  {product.name}
                </h1>
                
                <div className="flex flex-col xs:flex-row xs:items-center gap-2 xs:gap-3">
                  <Rate 
                    disabled 
                    defaultValue={product.score || 0} 
                    allowHalf 
                    className="text-sm sm:text-base"
                  />
                  <span className="text-gray-500 font-medium text-sm">
                    ({product.score?.toFixed(1) || "0.0"} / 5)
                  </span>
                </div>
              </div>

              {/* Prix */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4">
                <div className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  {product.price} DA
                </div>
                <p className="text-gray-600 mt-1 text-xs sm:text-sm">Prix TTC, livraison incluse</p>
              </div>

              {/* Description */}
              <div className="bg-gray-50 rounded-xl p-3 sm:p-4">
                <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-700 leading-relaxed text-sm">{product.description}</p>
              </div>

              {/* Tags et stock */}
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-xs font-semibold shadow-lg">
                  {product.category}
                </span>
                {product.stock > 0 ? (
                  product.stock < 5 ? (
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-semibold shadow-lg animate-pulse">
                      Stock limité: {product.stock} restants
                    </span>
                  ) : (
                    <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-semibold shadow-lg">
                      En stock ({product.stock} disponibles)
                    </span>
                  )
                ) : (
                  <span className="px-3 py-1.5 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-semibold shadow-lg">
                    Épuisé
                  </span>
                )}
              </div>

              {/* Section Achat */}
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 space-y-4">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Ajouter au panier</h3>
                
                {/* Version mobile : stack vertical */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                  <div className="space-y-1 w-full sm:w-auto">
                    <label className="text-xs sm:text-sm font-medium text-gray-700">Quantité</label>
                    <input
                      type="number"
                      min={1}
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                      disabled={product.stock === 0}
                      className="w-full sm:w-18 h-10 border-2 border-gray-200 rounded-lg px-3 text-center text-sm font-semibold focus:border-blue-500 focus:outline-none transition-colors duration-300 disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  <div className="flex-1">
                    <Button
                      type="primary"
                      size="middle"
                      icon={added ? <CheckOutlined /> : <ShoppingCartOutlined />}
                      onClick={handleAddToCart}
                      disabled={product.stock === 0 || added}
                      className={`!w-full !h-10 !rounded-lg !font-semibold !text-sm !shadow-lg !border-0 transition-all duration-300 transform hover:!scale-105 ${
                        added 
                          ? '!bg-gradient-to-r !from-green-500 !to-emerald-500 hover:!from-green-600 hover:!to-emerald-600' 
                          : product.stock === 0
                            ? '!bg-gray-400 !cursor-not-allowed'
                            : '!bg-gradient-to-r !from-blue-600 !to-indigo-600 hover:!from-blue-700 hover:!to-indigo-700'
                      }`}
                    >
                      {added ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckOutlined /> 
                          <span className="hidden xs:inline">Ajouté !</span>
                        </span>
                      ) : product.stock === 0 ? (
                        "Épuisé"
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <ShoppingCartOutlined /> 
                          <span className="hidden xs:inline">Ajouter</span>
                        </span>
                      )}
                    </Button>
                  </div>
                </div>

                {/* Informations supplémentaires */}
                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-gray-200">
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg mb-1">🚚</div>
                    <div className="text-xs font-medium text-gray-700">Livraison</div>
                    <div className="text-xs text-gray-500">2-3 jours</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg mb-1">↩️</div>
                    <div className="text-xs font-medium text-gray-700">Retour</div>
                    <div className="text-xs text-gray-500">30 jours</div>
                  </div>
                  <div className="text-center p-2 bg-white rounded-lg">
                    <div className="text-lg mb-1">🛡️</div>
                    <div className="text-xs font-medium text-gray-700">Garantie</div>
                    <div className="text-xs text-gray-500">1 an</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}