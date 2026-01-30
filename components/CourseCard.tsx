
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
    <div className="glass rounded-[2.5rem] overflow-hidden card-hover flex flex-col group border border-white/5 transition-all duration-300">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={bundle.image} 
          alt={bundle.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-6 left-6 bg-blue-600/90 backdrop-blur-md px-5 py-2 rounded-full border border-white/20 shadow-lg">
          <span className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Lifetime Access</span>
        </div>
        <div className="absolute top-6 right-6 bg-slate-950/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
          <span className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">{bundle.category}</span>
        </div>
      </div>
      
      <div className="p-10 flex flex-col flex-grow space-y-6">
        <div>
          <h3 className="text-3xl font-black group-hover:text-blue-400 transition-colors leading-tight">{bundle.name}</h3>
          <p className="text-base text-slate-400 line-clamp-2 mt-4 font-medium leading-relaxed">{bundle.description}</p>
        </div>

        <ul className="space-y-4 flex-grow">
          {bundle.features.map((f, i) => (
            <li key={i} className="text-sm text-slate-300 flex items-center gap-4">
              <i className="fas fa-check-circle text-blue-500 text-lg"></i> {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-8 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[11px] text-slate-500 font-black uppercase tracking-widest">Enrollment Fee</span>
            <span className="text-4xl font-black text-white leading-none">{COMPANY_INFO.currency}{bundle.price}</span>
          </div>
          <div className="flex gap-3">
            <button 
              onClick={onAddToCart}
              className="w-14 h-14 flex items-center justify-center bg-slate-800 hover:bg-slate-700 text-blue-400 rounded-2xl transition-all shadow-lg text-xl"
              title="Add to Cart"
            >
              <i className="fas fa-cart-plus"></i>
            </button>
            <button 
              onClick={onBuyNow}
              className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-lg rounded-2xl transition-all transform hover:-translate-y-1 shadow-xl shadow-blue-600/20"
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
