import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../store/ui-slice'; 

export default function Navbar() {
  const dispatch = useDispatch();
  
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);

  const toggleCartHandler = () => {
    dispatch(uiActions.toggle());
  };

  return (
    <nav style={{ 
      padding: '10px 2rem', 
      background: '#5fa4d6', 
      display: 'flex', 
      gap: '20px',
      alignItems: 'center',
      color: 'white'
    }}>
      <div style={{ display: 'flex', gap: '20px' }}>
        <Link href="/" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          Home
        </Link>
        <Link href="/p03e04" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          P03 e P04
        </Link>
        <Link href="/p05" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          P05 (ATM)
        </Link>
        <Link href="/p06" style={{ color: 'white', textDecoration: 'none', fontWeight: 'bold' }}>
          P06 (Loja)
        </Link>
      </div>
      
      <button 
        onClick={toggleCartHandler}
        style={{ 
          marginLeft: 'auto',
          backgroundColor: '#1a1a1a',
          color: '#31ead2',
          border: '1px solid #31ead2',
          padding: '8px 16px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}
      >
        <span>Meu Carrinho</span>
        <span style={{ 
          backgroundColor: '#31ead2', 
          color: '#1a1a1a', 
          padding: '2px 8px', 
          borderRadius: '10px',
          fontSize: '14px'
        }}>
          {cartQuantity}
        </span>
      </button>
    </nav>
  );
}