import { Button, InputNumber, Divider, Empty, Badge } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchCart, checkout, deleteCartItem, updateCartItem, clearCart } from "../store/cartSlice";
import { ShoppingCartOutlined, DeleteOutlined, CreditCardOutlined, ArrowLeftOutlined, TruckOutlined, SafetyCertificateOutlined, TagOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";

export default function CartPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items } = useSelector((s: RootState) => s.cart);
  
  useEffect(() => {
    dispatch(fetchCart() as any);
  }, [dispatch]);

  const handleCheckout = () => {
    dispatch(checkout() as any);
    alert("Checkout complete - invoice generated");
  };

  const handleRemove = (id: number) => {
    dispatch(deleteCartItem(id) as any);
  };

  const handleQuantityChange = (id: number, value: number) => {
    if (value > 0) {
      dispatch(updateCartItem({ id, quantity: value }) as any);
    }
  };

  const handleClearCart = () => {
    if (window.confirm('Êtes-vous sûr de vouloir vider votre panier ?')) {
      dispatch(clearCart() as any);
    }
  };

  // Calcul du total et autres métriques
  const { total, itemCount, savings } = useMemo(() => {
    const total = items.reduce((sum: number, it: any) => sum + it.price * it.quantity, 0);
    const itemCount = items.reduce((sum: number, it: any) => sum + it.quantity, 0);
    const savings = total * 0.1; // Simulation de 10% d'économie
    return { total, itemCount, savings };
  }, [items]);

  const shippingCost = total > 50 ? 0 : 5;
  const finalTotal = total + shippingCost;

  const API_URL = "http://localhost:5000"; 

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <Button 
              type="text" 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/shop')}
              className="mb-4 text-gray-600 hover:text-indigo-600"
            >
              Continuer les achats
            </Button>
            <h1 className="text-3xl font-bold text-gray-900">Mon Panier</h1>
          </div>

          {/* Empty State */}
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center">
            <Empty
              image={<ShoppingCartOutlined className="text-6xl text-gray-300 mx-auto mb-4" />}
              description={
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Votre panier est vide</h3>
                  <p className="text-gray-500">Découvrez nos produits et ajoutez vos articles favoris !</p>
                </div>
              }
            >
              <Button 
                type="primary" 
                size="large"
                onClick={() => navigate('/shop')}
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-3 h-auto rounded-xl font-semibold"
              >
                Découvrir nos produits
              </Button>
            </Empty>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            type="text" 
            icon={<ArrowLeftOutlined />} 
            onClick={() => navigate('/shop')}
            className="mb-4 text-gray-600 hover:text-indigo-600"
          >
            Continuer les achats
          </Button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                <ShoppingCartOutlined className="text-indigo-600" />
                Mon Panier
              </h1>
              <p className="text-gray-600 mt-1">
                {itemCount} {itemCount === 1 ? 'article' : 'articles'} dans votre panier
              </p>
            </div>
            <Button 
              danger 
              type="text"
              onClick={handleClearCart}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              <DeleteOutlined className="mr-2" />
              Vider le panier
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item: any) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm p-6 hover:shadow-md transition-shadow duration-300">
                <div className="flex gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 bg-gray-100 rounded-xl overflow-hidden">
                      <img
                        src={`${API_URL}/images/${item.image}`}
                        alt={item.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {item.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-3">
                      Prix unitaire: {item.price} DA
                    </p>
                    
                    {/* Quantity and Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">Qté:</span>
                          <InputNumber
                            min={1}
                            max={99}
                            value={item.quantity}
                            onChange={(val) => handleQuantityChange(item.id, val as number)}
                            className="w-20"
                            size="small"
                          />
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">
                            {(item.price * item.quantity).toFixed(2)} DA
                          </div>
                          <div className="text-sm text-gray-500">
                            {item.quantity} × {item.price} DA
                          </div>
                        </div>
                        
                        <Button
                          type="text"
                          danger
                          size="small"
                          icon={<DeleteOutlined />}
                          onClick={() => handleRemove(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Récapitulatif</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Sous-total ({itemCount} articles)</span>
                  <span>{total.toFixed(2)} DA</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Livraison</span>
                  <span className={shippingCost === 0 ? 'text-green-600 font-medium' : ''}>
                    {shippingCost === 0 ? 'Gratuite' : `${shippingCost} DA`}
                  </span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Économies</span>
                    <span>-{savings.toFixed(2)} DA</span>
                  </div>
                )}
                
                <Divider className="my-4" />
                
                <div className="flex justify-between text-lg font-bold text-gray-900">
                  <span>Total</span>
                  <span>{finalTotal.toFixed(2)} DA</span>
                </div>
              </div>

              {/* Shipping Info */}
              {shippingCost > 0 && (
                <div className="bg-blue-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 text-blue-600">
                    <TruckOutlined />
                    <span className="text-sm font-medium">
                      Ajoutez {(50 - total).toFixed(2)} DA pour la livraison gratuite
                    </span>
                  </div>
                </div>
              )}

              {/* Checkout Button */}
              <Button
                type="primary"
                size="large"
                block
                icon={<CreditCardOutlined />}
                onClick={handleCheckout}
                className="bg-indigo-600 hover:bg-indigo-700 border-none h-12 font-semibold rounded-xl mb-4"
              >
                Passer commande
              </Button>

              {/* Features */}
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-center gap-3">
                  <SafetyCertificateOutlined className="text-green-500" />
                  <span>Paiement 100% sécurisé</span>
                </div>
                <div className="flex items-center gap-3">
                  <TruckOutlined className="text-blue-500" />
                  <span>Livraison sous 24-48h</span>
                </div>
                <div className="flex items-center gap-3">
                  <TagOutlined className="text-purple-500" />
                  <span>Retour gratuit sous 30 jours</span>
                </div>
              </div>
            </div>

            {/* Promo Code */}
            {/* <div className="bg-white rounded-2xl shadow-sm p-6 mt-6">
              <h3 className="font-semibold text-gray-900 mb-4">Code promo</h3>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Entrez votre code"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <Button type="primary" className="bg-indigo-600 hover:bg-indigo-700 border-none">
                  Appliquer
                </Button>
              </div>
            </div> */}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 bg-white rounded-2xl shadow-sm p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <SafetyCertificateOutlined className="text-2xl text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Paiement Sécurisé</h3>
              <p className="text-gray-600 text-sm">Vos données sont protégées par SSL</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <TruckOutlined className="text-2xl text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Livraison Rapide</h3>
              <p className="text-gray-600 text-sm">Expédition sous 24h ouvrées</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <TagOutlined className="text-2xl text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Retour Gratuit</h3>
              <p className="text-gray-600 text-sm">30 jours pour changer d'avis</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}