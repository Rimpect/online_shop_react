function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">О нас</h3>
            <p className="text-gray-300">
              Ваш премиальный магазин мужской моды. Качественная одежда для современного джентльмена.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Быстрые ссылки</h3>
            <ul className="space-y-2">
              <li><a href="/products" className="text-gray-300 hover:text-white">Каталог</a></li>
              <li><a href="/cart" className="text-gray-300 hover:text-white">Корзина</a></li>
              <li><a href="#" className="text-gray-300 hover:text-white">Размерная сетка</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Контакты</h3>
            <ul className="space-y-2 text-gray-300">
              <li>Email: contact@mensfashion.ru</li>
              <li>Телефон: 8 (800) 123-45-67</li>
              <li>Адрес: ул. Модная, 123, Москва</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Мужская одежда. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;