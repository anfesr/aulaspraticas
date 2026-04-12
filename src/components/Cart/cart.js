import { useSelector } from 'react-redux';
import Card from '../UI/card'; // Importa o componente de moldura da pasta UI
import classes from './Cart.module.css'; // IMPORTAÇÃO CORRETA: Usa o CSS da própria pasta Cart
import CartItem from './cartItem';

const Cart = (props) => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{ 
              id: item.id, 
              title: item.name, 
              quantity: item.quantity, 
              total: item.totalPrice, 
              price: item.price 
            }}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;