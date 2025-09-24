import React, { useEffect, useState } from 'react';
import { 
  Drawer, 
  Button, 
  Checkbox, 
  Slider, 
  Rate, 
  Input, 
  Select, 
  Badge, 
  Divider,
  Space,
  Typography
} from 'antd';
import { 
  FilterOutlined, 
  SearchOutlined, 
  CloseOutlined,
  AppstoreOutlined,
  UnorderedListOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import ProductGrid from '../components/product/ProductGrid';
import { Product } from '../store/productSlice';
import API from '../api/api';

const { Title, Text } = Typography;
const { Search } = Input;
const { Option } = Select;

const categories = [
  { key: "all", label: "Tous les produits", count: 0 },
  { key: "t-shirt", label: "T-shirts", count: 15 },
  { key: "ensemble", label: "Ensembles", count: 8 },
  { key: "survetement", label: "Survêtements", count: 12 },
  { key: "basket", label: "Baskets", count: 20 },
  { key: "short", label: "Shorts", count: 7 },
  { key: "jeans", label: "Jeans", count: 18 },
  { key: "vestes", label: "Vestes", count: 10 }
];

const brands = [
  { key: "nike", label: "Nike", count: 25 },
  { key: "adidas", label: "Adidas", count: 22 },
  { key: "puma", label: "Puma", count: 15 },
  { key: "zara", label: "Zara", count: 18 },
  { key: "h&m", label: "H&M", count: 12 }
];

const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
const colors = [
  { name: "Noir", hex: "#000000" },
  { name: "Blanc", hex: "#FFFFFF" },
  { name: "Rouge", hex: "#FF0000" },
  { name: "Bleu", hex: "#0066CC" },
  { name: "Vert", hex: "#00AA00" },
  { name: "Gris", hex: "#666666" }
];

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  
  // État des filtres
  const [filters, setFilters] = useState({
    category: "all",
    brands: [],
    priceRange: [0, 10000],
    sizes: [],
    colors: [],
    rating: 0,
    inStock: false,
    search: ""
  });

  // État UI
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('name');
  const [activeFiltersCount, setActiveFiltersCount] = useState(0);

  // Charger les produits
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await API.get('/products');
        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadProducts();
  }, []);

  // Appliquer les filtres
  useEffect(() => {
    let filtered = [...products];
    let activeCount = 0;

    // Filtre par recherche
    if (filters.search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.description.toLowerCase().includes(filters.search.toLowerCase())
      );
      activeCount++;
    }

    // Filtre par catégorie
    if (filters.category !== "all") {
      filtered = filtered.filter(product => product.category === filters.category);
      activeCount++;
    }


    // Filtre par prix
    filtered = filtered.filter(product => 
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1]
    );


    setFilteredProducts(filtered);
    setActiveFiltersCount(activeCount);
  }, [products, filters, sortBy]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => {
    setFilters({
      category: "all",
      brands: [],
      priceRange: [0, 10000],
      sizes: [],
      colors: [],
      rating: 0,
      inStock: false,
      search: ""
    });
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 sticky top-6">
      <div className="flex justify-between items-center mb-4">
        <Title level={4} className="!m-0">Filtres</Title>
        {activeFiltersCount > 0 && (
          <Button 
            type="link" 
            size="small" 
            onClick={clearAllFilters}
            className="!p-0 !text-xs text-blue-500"
          >
            Effacer tout ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Recherche */}
      <div className="mb-4">
        <Text strong className="block mb-3 text-gray-800">Rechercher</Text>
        <Search
          placeholder="Nom du produit..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
        />
      </div>

      <Divider />

      {/* Catégories */}
      <div className="mb-4">
        <Text strong className="block mb-3 text-gray-800">Catégories</Text>
        <div className="space-y-2">
          {categories.map(cat => (
            <div 
              key={cat.key}
              className={`flex justify-between items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border border-transparent hover:bg-blue-50 hover:border-blue-200 ${
                filters.category === cat.key 
                  ? 'bg-blue-50 border-blue-500 text-blue-600 font-medium' 
                  : ''
              }`}
              onClick={() => updateFilter('category', cat.key)}
            >
              <span>{cat.label}</span>
              <Badge count={cat.count} showZero style={{ backgroundColor: '#f0f0f0', color: '#666' }} />
            </div>
          ))}
        </div>
      </div>

      <Divider />

      {/* Prix */}
      <div className="mb-4">
        <Text strong className="block mb-3 text-gray-800">Prix (DA)</Text>
        <Slider
          range
          min={0}
          max={10000}
          step={100}
          value={filters.priceRange}
          onChange={(value) => updateFilter('priceRange', value)}
          style={{ margin: '16px 0' }}
        />
        <div className="flex justify-between text-xs text-gray-600">
          <span>{filters.priceRange[0]} DA</span>
          <span>{filters.priceRange[1]} DA</span>
        </div>
      </div>

      <Divider />

      {/* Note minimale */}
      <div className="mb-4">
        <Text strong className="block mb-3 text-gray-800">Note minimale</Text>
        <Rate
          value={filters.rating}
          onChange={(value) => updateFilter('rating', value)}
          style={{ display: 'block', margin: '8px 0' }}
        />
      </div>

      <Divider />

      {/* En stock */}
      <div className="mb-4">
        <Checkbox
          checked={filters.inStock}
          onChange={(e) => updateFilter('inStock', e.target.checked)}
        >
          Produits en stock uniquement
        </Checkbox>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center flex-wrap gap-4 sm:gap-3">
            <div>
              <Title level={2} className="!m-0">Boutique</Title>
              <Text type="secondary">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </Text>
            </div>
            
            <div className="flex flex-row justify-between sm:justify-start items-center gap-4 w-full sm:w-auto">
              {/* Bouton filtres mobile */}
              <Button 
                className="flex lg:hidden items-center gap-2"
                icon={<FilterOutlined />}
                onClick={() => setMobileFiltersVisible(true)}
              >
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge count={activeFiltersCount} size="small" />
                )}
              </Button>

              {/* Mode d'affichage */}
              <div className="hidden sm:flex">
                <Button.Group>
                  <Button
                    type={viewMode === 'grid' ? 'primary' : 'default'}
                    icon={<AppstoreOutlined />}
                    onClick={() => setViewMode('grid')}
                  />
                  <Button
                    type={viewMode === 'list' ? 'primary' : 'default'}
                    icon={<UnorderedListOutlined />}
                    onClick={() => setViewMode('list')}
                  />
                </Button.Group>
              </div>

              {/* Tri */}
              <Select
                value={sortBy}
                onChange={setSortBy}
                style={{ minWidth: 150 }}
                suffixIcon={<SortAscendingOutlined />}
              >
                <Option value="name">Nom A-Z</Option>
                <Option value="price-asc">Prix croissant</Option>
                <Option value="price-desc">Prix décroissant</Option>
                <Option value="rating">Mieux notés</Option>
                <Option value="newest">Plus récents</Option>
              </Select>
            </div>
          </div>
        </div>
      </div>

      <div className="py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Sidebar Desktop */}
            <div className="hidden lg:block lg:w-1/4 xl:w-1/5">
              <FilterSidebar />
            </div>

            {/* Contenu principal */}
            <div className="flex-1 lg:ml-8">
              <ProductGrid products={filteredProducts}/>
            </div>
          </div>
        </div>
      </div>

      {/* Drawer mobile pour les filtres */}
      <Drawer
        title={
          <div className="flex justify-between items-center">
            <span>Filtres</span>
            {activeFiltersCount > 0 && (
              <Button size="small" type="link" onClick={clearAllFilters}>
                Effacer tout
              </Button>
            )}
          </div>
        }
        placement="left"
        closable={false}
        onClose={() => setMobileFiltersVisible(false)}
        open={mobileFiltersVisible}
        width={320}
        extra={
          <Button 
            type="text" 
            icon={<CloseOutlined />} 
            onClick={() => setMobileFiltersVisible(false)}
          />
        }
      >
        <FilterSidebar />
      </Drawer>
    </div>
  );
}