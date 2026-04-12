import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { depositar, levantar } from '../store/atmSlice';

export default function ATM() {
  const [valor, setValor] = useState(0);
  const saldo = useSelector((state) => state.atm.saldo);
  const dispatch = useDispatch();

  return (
    <div style={{ fontFamily: 'Arial, sans-serif' }}>
      <div style={{ 
        backgroundColor: '#cbdcf7',
        padding: '60px 20px', 
        textAlign: 'center', 
        minHeight: '100vh' 
      }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold', marginBottom: '10px' }}>
          Máquina Multibanco 
        </h1>
        <h2 style={{ fontSize: '32px', fontWeight: 'bold', marginBottom: '30px' }}>
          Saldo Atual: {saldo} €
        </h2>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center' }}>
          <input 
            type="number" 
            value={valor} 
            onChange={(e) => setValor(Number(e.target.value))} 
            style={{ 
              padding: '15px', 
              fontSize: '20px', 
              width: '250px', 
              border: '1px solid #999',
              borderRadius: '2px'
            }}
          />
          
          <button 
            onClick={() => dispatch(depositar(valor))} 
            style={{ 
              padding: '15px 30px', 
              fontSize: '20px', 
              cursor: 'pointer',
              backgroundColor: '#0bd236ff',
              border: '1px solid #999',
              borderRadius: '5px'
            }}
          >
            Depositar 
          </button>
          
          <button 
            onClick={() => dispatch(levantar(valor))} 
            style={{ 
              padding: '15px 30px', 
              fontSize: '20px', 
              cursor: 'pointer',
              backgroundColor: '#df2222ff',
              border: '1px solid #999',
              borderRadius: '5px'
            }}
          >
            Levantar
          </button>
        </div>
      </div>
    </div>
  );
}