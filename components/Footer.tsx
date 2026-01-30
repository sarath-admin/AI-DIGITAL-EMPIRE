
import React from 'react';
import { COMPANY_INFO } from '../constants';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 py-24 px-10">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-8">
          <div className="flex items-center gap-4 group">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center transition-transform group-hover:rotate-12">
              <i className="fas fa-graduation-cap text-white text-2xl"></i>
            </div>
            <span className="text-3xl font-black tracking-tighter uppercase">AI DIGITAL <span className="text-blue-400">EMPIRE</span></span>
          </div>
          <p className="text-base text-slate-400 leading-relaxed font-medium">
            Empowering Thoughtful Leaders with premium digital resources. All courses include <span className="text-blue-400 font-bold">Lifetime Access</span> and dedicated support.
          </p>
          <div className="flex gap-6">
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white"><i className="fab fa-facebook-f text-lg"></i></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white"><i className="fab fa-twitter text-lg"></i></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white"><i className="fab fa-instagram text-lg"></i></a>
            <a href="#" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center hover:bg-blue-600 transition-colors text-slate-400 hover:text-white"><i className="fab fa-youtube text-lg"></i></a>
          </div>
        </div>

        <div>
          <h4 className="font-black mb-10 uppercase text-[12px] tracking-[0.4em] text-blue-500">Learning Paths</h4>
          <ul className="space-y-4 text-base text-slate-400 font-medium">
            <li><a href="#" className="hover:text-blue-400 transition-colors">AI & Machine Learning</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Full-Stack Development</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Career Acceleration</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Digital Content Creation</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-10 uppercase text-[12px] tracking-[0.4em] text-blue-500">Empire Support</h4>
          <ul className="space-y-6 text-base text-slate-400 font-medium">
            <li className="flex items-start gap-4">
              <i className="fas fa-envelope mt-1.5 text-blue-500 text-lg"></i>
              <span>{COMPANY_INFO.email}</span>
            </li>
            <li className="flex items-start gap-4">
              <i className="fas fa-headset mt-1.5 text-blue-500 text-lg"></i>
              <span>24/7 Priority Support</span>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-black mb-10 uppercase text-[12px] tracking-[0.4em] text-blue-500">Secure Payments</h4>
          <p className="text-sm text-slate-500 mb-10 font-bold leading-relaxed">Scan to pay with any UPI app. Instant delivery of course credentials.</p>
          <div className="flex flex-wrap gap-8 grayscale opacity-50">
            <i className="fab fa-google-pay text-5xl"></i>
            <i className="fab fa-apple-pay text-5xl"></i>
            <i className="fas fa-university text-4xl"></i>
          </div>
        </div>
      </div>
      <div className="max-w-[1800px] mx-auto mt-24 pt-12 border-t border-white/5 text-center">
        <p className="text-[12px] font-black uppercase tracking-[0.5em] text-slate-600">
          &copy; {new Date().getFullYear()} {COMPANY_INFO.name}. Developed by {COMPANY_INFO.developer}
        </p>
      </div>
    </footer>
  );
};
export default Footer;
