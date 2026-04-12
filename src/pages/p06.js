import { useSelector } from 'react-redux';
import Products from '../components/Shop/Products';
import Cart from '../components/Cart/cart';

export default function P06() {
  const showCart = useSelector((state) => state.ui.cartIsVisible);

  return (
    <div style={{ backgroundColor: '#3f3f3f', minHeight: '100vh', padding: '20px' }}>
      {showCart && <Cart />}
      <Products />
    </div>
  );
}