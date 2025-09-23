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
    <div className="filter-sidebar">
      <div className="filter-header">
        <Title level={4}>Filtres</Title>
        {activeFiltersCount > 0 && (
          <Button 
            type="link" 
            size="small" 
            onClick={clearAllFilters}
            className="clear-filters-btn"
          >
            Effacer tout ({activeFiltersCount})
          </Button>
        )}
      </div>

      {/* Recherche */}
      <div className="filter-section">
        <Text strong>Rechercher</Text>
        <Search
          placeholder="Nom du produit..."
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          style={{ marginTop: 8 }}
        />
      </div>

      <Divider />

      {/* Catégories */}
      <div className="filter-section">
        <Text strong>Catégories</Text>
        <div className="category-list">
          {categories.map(cat => (
            <div 
              key={cat.key}
              className={`category-item ${filters.category === cat.key ? 'active' : ''}`}
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
      <div className="filter-section">
        <Text strong>Prix (DA)</Text>
        <Slider
          range
          min={0}
          max={10000}
          step={100}
          value={filters.priceRange}
          onChange={(value) => updateFilter('priceRange', value)}
          style={{ margin: '16px 0' }}
        />
        <div className="price-display">
          <span>{filters.priceRange[0]} DA</span>
          <span>{filters.priceRange[1]} DA</span>
        </div>
      </div>

      <Divider />

      {/* Note minimale */}
      <div className="filter-section">
        <Text strong>Note minimale</Text>
        <Rate
          value={filters.rating}
          onChange={(value) => updateFilter('rating', value)}
          style={{ display: 'block', margin: '8px 0' }}
        />
      </div>

      <Divider />

      {/* En stock */}
      <div className="filter-section">
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
    <div className="shop-page">
      {/* Header */}
      <div className="shop-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shop-header-content">
            <div>
              <Title level={2} style={{ margin: 0 }}>Boutique</Title>
              <Text type="secondary">
                {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
              </Text>
            </div>
            
            <div className="shop-controls">
              {/* Bouton filtres mobile */}
              <Button 
                className="mobile-filter-btn lg:hidden"
                icon={<FilterOutlined />}
                onClick={() => setMobileFiltersVisible(true)}
              >
                Filtres
                {activeFiltersCount > 0 && (
                  <Badge count={activeFiltersCount} size="small" />
                )}
              </Button>

              {/* Mode d'affichage */}
              <div className="view-mode-toggle hidden sm:flex">
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

      <div className="shop-content">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shop-layout">
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

      {/* Styles */}
      <style>{`
        .shop-page {
          min-height: 100vh;
          background-color: #f8f9fa;
        }

        .shop-header {
          background: white;
          border-bottom: 1px solid #e8e9ea;
          padding: 24px 0;
        }

        .shop-header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 16px;
        }

        .shop-controls {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .mobile-filter-btn {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .shop-content {
          padding: 24px 0;
        }

        .shop-layout {
          display: flex;
          gap: 32px;
          align-items: flex-start;
        }

        /* Sidebar Styles */
        .filter-sidebar {
          background: white;
          border-radius: 12px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
          border: 1px solid #f0f0f0;
          position: sticky;
          top: 24px;
        }

        .filter-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
        }

        .clear-filters-btn {
          padding: 0 !important;
          font-size: 12px;
          color: #1890ff;
        }

        .filter-section {
          margin-bottom: 16px;
        }

        .filter-section .ant-typography {
          display: block;
          margin-bottom: 12px;
          color: #262626;
        }

        /* Categories */
        .category-list {
          space-y: 8px;
        }

        .category-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 8px 12px;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          border: 1px solid transparent;
        }

        .category-item:hover {
          background-color: #f0f2ff;
          border-color: #d6e4ff;
        }

        .category-item.active {
          background-color: #e6f7ff;
          border-color: #1890ff;
          color: #1890ff;
          font-weight: 500;
        }

        /* Checkboxes */
        .checkbox-list,
        .color-grid {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
        }

        .size-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .size-checkbox {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 8px;
          border: 1px solid #d9d9d9;
          border-radius: 6px;
          transition: all 0.2s ease;
        }

        .size-checkbox:hover {
          border-color: #1890ff;
          background-color: #f0f2ff;
        }

        .size-checkbox.ant-checkbox-wrapper-checked {
          border-color: #1890ff;
          background-color: #e6f7ff;
        }

        /* Colors */
        .color-item {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .color-circle {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          border: 1px solid #d9d9d9;
        }

        /* Price Display */
        .price-display {
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          color: #666;
        }

        /* Mobile Responsive */
        @media (max-width: 1024px) {
          .shop-layout {
            flex-direction: column;
          }
          
          .filter-sidebar {
            position: static;
          }
        }

        @media (max-width: 640px) {
          .shop-header {
            padding: 16px 0;
          }
          
          .shop-header-content {
            flex-direction: column;
            align-items: stretch;
            gap: 12px;
          }
          
          .shop-controls {
            justify-content: space-between;
          }
        }

        /* View Mode */
        .view-mode-toggle .ant-btn-group {
          display: flex;
        }

        /* Animations */
        .filter-sidebar,
        .category-item,
        .size-checkbox {
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </div>
  );
}