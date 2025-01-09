import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function Cart({ cartItems, updateCart }) {
  const [isModalOpen, setIsModalOpen] = useState(false); // Для модального окна оформления заказа

  const updateQuantity = (productId, size, newQuantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === productId && item.selectedSize === size) {
        return { ...item, quantity: Math.max(1, newQuantity) };
      }
      return item;
    });
    updateCart(updatedCart);
  };

  const removeItem = (productId, size) => {
    const updatedCart = cartItems.filter(
      item => !(item.id === productId && item.selectedSize === size)
    );
    updateCart(updatedCart);
  };

  const handleCheckout = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
    updateCart([]);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ваша корзина пуста</h2>
        <Link to="/products" className="text-blue-600 hover:text-blue-800">
          Перейти к покупкам
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Корзина</h2>
      
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div key={`${item.id}-${item.selectedSize}`} className="flex flex-col md:flex-row items-start md:items-center border-b pb-4 gap-4">
            <img 
              src={item.image} 
              alt={item.name}
              className="w-24 h-24 object-cover rounded"
            />
            <div className="flex-grow">
              <h3 className="font-semibold">{item.name}</h3>
              <p className="text-gray-600">Размер: {item.selectedSize}</p>
              <p className="text-gray-600">{item.price} ₽</p>
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity - 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.selectedSize, item.quantity + 1)}
                className="px-2 py-1 border rounded hover:bg-gray-100"
              >
                +
              </button>
            </div>
            <button
              onClick={() => removeItem(item.id, item.selectedSize)}
              className="text-red-600 hover:text-red-800"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 text-right">
        <p className="text-xl font-bold">Итого: {total.toFixed(2)} ₽</p>
        <button 
          onClick={handleCheckout}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Оформить заказ
        </button>
      </div>

      {/* Модальное окно для подтверждения оформления заказа */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4">Заказ успешно оформлен!</h2>
            <p className="mb-4">Спасибо за ваш заказ. Мы свяжемся с вами в ближайшее время.</p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

Cart.propTypes = {
  cartItems: PropTypes.array.isRequired,
  updateCart: PropTypes.func.isRequired
};

export default Cart;