import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../data/products';

function ProductDetail({ addToCart }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    const foundProduct = products.find(p => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      setModalMessage('Пожалуйста, выберите размер'); 
      setIsModalOpen(true); 
      return;
    }
    addToCart({ ...product, selectedSize });
   
  
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  if (!product) {
    return <div className="container mx-auto px-4 py-8">Загрузка...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Модальное окно */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">{modalMessage}</h2>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.category}</p>
          <p className="text-2xl font-bold mb-4">{product.price} ₽</p>
          <p className="mb-6">{product.description}</p>
          
          <div className="mb-6">
            <label className="block text-sm font-medium mb-2">Размер</label>
            <select 
              value={selectedSize} 
              onChange={(e) => setSelectedSize(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">Выберите размер</option>
              {product.sizes.map(size => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Добавить в корзину
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;