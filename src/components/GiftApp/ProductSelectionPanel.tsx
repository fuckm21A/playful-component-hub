import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { fetchAllProducts } from '@/services/productsApi';
import { Input } from "@/components/ui/input";
import { Product } from '@/types/product';
import { Search, Filter } from 'lucide-react';

interface ProductSelectionPanelProps {
  onItemDrop: (item: Product) => void;
}

const ProductSelectionPanel = ({ onItemDrop }: ProductSelectionPanelProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 });

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: fetchAllProducts
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category_product === selectedCategory;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const categories = ['all', ...new Set(products.map(p => p.category_product))];

  const handleDragStart = (e: React.DragEvent, item: Product) => {
    e.dataTransfer.setData('application/json', JSON.stringify(item));
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-4">
      <div className="space-y-4">
        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          <Input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Categories */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-[#700100] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 gap-4">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              draggable
              onDragStart={(e) => handleDragStart(e, product)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-sm p-2 cursor-move"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-32 object-contain mb-2"
              />
              <h3 className="text-sm font-medium text-gray-900 truncate">
                {product.name}
              </h3>
              <p className="text-sm text-gray-500">{product.price} TND</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductSelectionPanel;