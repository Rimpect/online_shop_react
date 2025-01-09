import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products } from '../data/products';

function ProductList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedProducts, setDisplayedProducts] = useState([]);
  const [itemsPerRow, setItemsPerRow] = useState(4);

  const productsPerPage = itemsPerRow * 2; 

  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setDisplayedProducts(products.slice(startIndex, endIndex));
  }, [currentPage, productsPerPage]);

  const totalPages = Math.ceil(products.length / productsPerPage);

  const gridClassName = itemsPerRow === 2 
    ? "grid grid-cols-1 sm:grid-cols-2 gap-6"
    : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6";

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Товаров в строке:
        </label>
        <select
          value={itemsPerRow}
          onChange={(e) => setItemsPerRow(Number(e.target.value))}
          className="border rounded px-2 py-1"
        >
          <option value={2}>2</option>
          <option value={4}>4</option>
        </select>
      </div>

      <div className={gridClassName}>
        {displayedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <div className="mt-8 flex justify-center space-x-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Назад
        </button>
        <span className="px-4 py-2">
          Страница {currentPage} из {totalPages}
        </span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
        >
          Вперед
        </button>
      </div>
    </div>
  );
}

export default ProductList;