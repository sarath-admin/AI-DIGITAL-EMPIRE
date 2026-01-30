
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
    <div className="glass rounded-[2rem] overflow-hidden card-hover flex flex-col group border border-white/5 transition-all duration-500">
      <div className="relative h-[250px] overflow-hidden">
        <img 
          src={bundle.image} 
          alt={bundle.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60"></div>
        
        <div className="absolute top-4 left-4 bg-blue-600 px-4 py-1.5 rounded-full border border-white/20 shadow-xl backdrop-blur-md">
          <span className="text-[10px] font-black text-white uppercase tracking-widest">Lifetime Access</span>
        </div>
        
        <div className="absolute bottom-4 left-4">
          <span className="text-[9px] font-black text-cyan-400 uppercase tracking-widest bg-slate-950/80 px-3 py-1.5 rounded-lg border border-white/10 backdrop-blur-md">
            {bundle.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-grow space-y-6">
        <div>
          <h3 className="text-2xl font-black group-hover:text-blue-400 transition-colors leading-tight tracking-tight uppercase">{bundle.name}</h3>
          <p className="text-sm text-slate-400 mt-3 font-medium leading-relaxed line-clamp-2">{bundle.description}</p>
        </div>

        <ul className="space-y-3 flex-grow">
          {bundle.features.map((f, i) => (
            <li key={i} className="text-xs text-slate-300 flex items-center gap-3">
              <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                <i className="fas fa-check text-blue-400 text-[8px]"></i>
              </div> 
              {f}
            </li>
          ))}
        </ul>

        <div className="flex items-center justify-between pt-6 border-t border-white/5">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-1">Enrollment Fee</span>
            <span className="text-3xl font-black text-white leading-none tracking-tighter">{COMPANY_INFO.currency}{bundle.price}</span>
          </div>
          <div className="flex gap-2">
            <button 
              onClick={onAddToCart}
              className="w-12 h-12 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-blue-400 rounded-xl transition-all border border-white/5"
              title="Add to Cart"
            >
              <i className="fas fa-cart-plus text-lg"></i>
            </button>
            <button 
              onClick={onBuyNow}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-sm rounded-xl transition-all shadow-lg"
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
