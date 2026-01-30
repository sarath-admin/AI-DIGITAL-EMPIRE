
import React from 'react';
import { Bundle } from '../types';
import { COMPANY_INFO } from '../constants';

interface CourseCardProps {
  bundle: Bundle;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ bundle, onAddToCart, onBuyNow }) => {
  return (
    <div className="glass rounded-[2rem] overflow-hidden card-hover flex flex-col group border border-white/5 transition-all duration-300">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={bundle.image} 
          alt={bundle.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-4 left-4 bg-blue-600/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-lg">
          <span className="text-[10px] font-black text-white uppercase tracking-[0.2em]">Lifetime Access</span>
        </div>
        <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10">
          <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">{bundle.category}</span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow space-y-5">
        <div>
          <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors leading-tight">{bundle.name}</h3>
          <p className="text-sm text-slate-400 line-clamp-2 mt-3 font-medium">{bundle.description}</p>
        </div>

        <ul className="space-y-3 flex-grow">
          {bundle.features.map((f, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-center gap-3">
              <i className="fas fa-check-circle text-blue-500"></i> {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Enrollment Fee</span>
            <span className="text-3xl font-black text-white">{COMPANY_INFO.currency}{bundle.price}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onAddToCart}
              className="w-12 h-12 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-2xl transition-all shadow-lg"
              title="Add to Cart"
            >
              <i className="fas fa-cart-plus text-lg"></i>
            </button>
            <button 
              onClick={onBuyNow}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/20"
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
