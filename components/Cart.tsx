
import React from 'react';
import { CartItem } from '../types';
import { COMPANY_INFO } from '../constants';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: (total: number) => void;
}

const Cart: React.FC<CartProps> = ({ isOpen, onClose, items, onRemove, onUpdateQuantity, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative w-full max-w-md bg-slate-900 border-l border-white/10 h-full flex flex-col shadow-2xl">
        <div className="p-6 border-b border-white/5 flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <i className="fas fa-shopping-bag text-cyan-500"></i> Your Cart
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg">
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
              <i className="fas fa-shopping-cart text-6xl opacity-20"></i>
              <p>Your cart is empty</p>
            </div>
          ) : (
            items.map(item => (
              <div key={item.id} className="flex gap-4 group">
                <img src={item.image} className="w-20 h-20 object-cover rounded-xl border border-white/10" alt={item.name} />
                <div className="flex-grow space-y-1">
                  <h4 className="font-bold text-sm leading-tight">{item.name}</h4>
                  <p className="text-cyan-400 font-bold text-sm">{COMPANY_INFO.currency}{item.price}</p>
                  <div className="flex items-center gap-3 mt-2">
                    <button onClick={() => onUpdateQuantity(item.id, -1)} className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700">-</button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button onClick={() => onUpdateQuantity(item.id, 1)} className="w-6 h-6 rounded bg-slate-800 flex items-center justify-center hover:bg-slate-700">+</button>
                  </div>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-slate-500 hover:text-red-400 self-start">
                  <i className="fas fa-trash-alt"></i>
                </button>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-white/5 bg-slate-950/50 space-y-4">
            <div className="flex justify-between items-center text-lg">
              <span className="text-slate-400">Total:</span>
              <span className="font-black text-2xl">{COMPANY_INFO.currency}{total}</span>
            </div>
            <button 
              onClick={() => onCheckout(total)}
              className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Secure Checkout <i className="fas fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
