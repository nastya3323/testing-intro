const QTY_ERROR = 'Количество товара должно быть положительным числом';
const STOCK_ERROR = 'Указано максимально доступное количество товара';

function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, qty) {
  if (!Number.isFinite(qty) || qty <= 0) {
    throw RangeError(QTY_ERROR);
  }

  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    const value = existing.quantity + qty;

    if (value > product.stock) {
      throw RangeError(STOCK_ERROR);
    }

    existing.quantity = value;
  } else {
    if (qty > product.stock) {
      throw RangeError(STOCK_ERROR);
    }

    cart.push({ ...product, quantity: qty });
  }

  return cart;
}

function changeQuantity(cart, productId, qty) {
  const product = cart.find((p) => p.id === productId);

  if (!product) {
    return cart;
  }

  if (!Number.isFinite(qty) || qty <= 0) {
    throw new RangeError(QTY_ERROR);
  }

  if (qty > product.stock) {
    throw new RangeError(STOCK_ERROR);
  }

  product.quantity = qty;

  return cart;
}

function removeFromCart(cart, productId) {
  return cart.filter((p) => p.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((sum, item) => {
    return sum + item.price * item.quantity;
  }, 0);
}

function calculateOrderTotal() {
  return notImplemented();
}

const cartApi = {
  addToCart,
  changeQuantity,
  removeFromCart,
  calculateCartSubtotal,
  calculateOrderTotal,
};

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
