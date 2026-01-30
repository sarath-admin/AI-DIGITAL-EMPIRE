
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { INITIAL_BUNDLES, COMPANY_INFO } from './constants';
import { Bundle, CartItem, SaleRecord, User } from './types';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CourseCard from './components/CourseCard';
import Cart from './components/Cart';
import AdminDashboard from './components/AdminDashboard';
import PaymentQR from './components/PaymentQR';

const App: React.FC = () => {
  const [bundles, setBundles] = useState<Bundle[]>(INITIAL_BUNDLES);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showPayment, setShowPayment] = useState<Bundle | null>(null);
  const { pathname, hash } = useLocation();

  const [sales, setSales] = useState<SaleRecord[]>([
    { id: 'S1', bundleName: 'AI Tools Master List', amount: 199, customerName: 'John Doe', customerEmail: 'john@example.com', date: '2025-01-20', status: 'Completed' },
    { id: 'S2', bundleName: 'Python Mastery Course', amount: 299, customerName: 'Alice Smith', customerEmail: 'alice@test.com', date: '2025-01-22', status: 'Completed' },
  ]);
  
  const [users, setUsers] = useState<User[]>([
    { id: 'U1', name: 'Sarathkumar', email: 'admin@skinfotech.com', role: 'Admin', joinDate: '2025-01-01' },
    { id: 'U2', name: 'Demo User', email: 'demo@user.com', role: 'User', joinDate: '2025-01-05' },
  ]);

  useEffect(() => {
    if (pathname === '/' && hash) {
      const element = document.getElementById(hash.slice(1));
      if (element) {
        window.scrollTo({
          top: element.offsetTop - 100,
          behavior: 'smooth'
        });
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [pathname, hash]);

  const addToCart = (bundle: Bundle) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === bundle.id);
      if (existing) {
        return prev.map(item => item.id === bundle.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...bundle, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const handlePurchase = (bundle: Bundle) => {
    setShowPayment(bundle);
  };

  const completePayment = (bundle: Bundle) => {
    const saleId = `S${Date.now()}`;
    const newSale: SaleRecord = {
      id: saleId,
      bundleName: bundle.name,
      amount: bundle.price,
      customerName: 'Verified Student',
      customerEmail: 'student@example.com',
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };
    setSales(prev => [...prev, newSale]);
    setShowPayment(null);
    
    const message = `🚀 *NEW PURCHASE ALERT!* \n\n` +
                    `👤 Customer: Verified Student\n` +
                    `🎓 Course: *${bundle.name}*\n` +
                    `💰 Amount: ${COMPANY_INFO.currency}${bundle.price}\n` +
                    `🆔 Transaction ID: ${saleId}\n\n` +
                    `_Please provide access link to this customer._`;
    
    const whatsappUrl = `https://wa.me/${COMPANY_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    alert(`Enrollment Successful! We have sent a purchase notification to Sarath on WhatsApp for your instant course access.`);
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-500/30 bg-slate-950">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={
            <div className="w-full space-y-0 pb-32">
              <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden bg-[#020617] group shadow-2xl">
                <div className="absolute inset-0 z-0">
                  <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[150px] rounded-full animate-pulse"></div>
                  <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" style={{animationDelay: '2s'}}></div>
                  <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                </div>

                <div className="relative z-20 px-6 max-w-[1400px] w-full flex flex-col items-center justify-center text-center">
                  <div className="animate-float mb-8">
                    <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-blue-400 text-xs font-black uppercase tracking-[0.3em] backdrop-blur-2xl">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                      </span>
                      Next-Gen Digital Assets
                    </div>
                  </div>
                  
                  <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[1.1] uppercase drop-shadow-2xl">
                    <span className="text-white block">AI DIGITAL</span>
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">EMPIRE</span>
                  </h1>
                  
                  <p className="mt-8 text-lg md:text-2xl text-slate-300 font-medium max-w-3xl mx-auto leading-relaxed">
                    Transform your career with <span className="text-white font-bold italic border-b-2 border-blue-500 pb-1">Lifetime Access</span> to high-impact toolkits, premium codebases, and masterclasses.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 pt-12">
                    <a href="#bundles" className="px-10 py-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl text-lg transition-all hover:scale-105 shadow-xl flex items-center gap-3">
                      View Courses <i className="fas fa-arrow-right text-xs"></i>
                    </a>
                    <Link to="/admin" className="px-10 py-5 glass border-white/10 hover:bg-white/10 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 backdrop-blur-3xl">
                      Admin Access <i className="fas fa-shield-halved text-sm opacity-50"></i>
                    </Link>
                  </div>
                </div>

                <div className="hidden lg:block absolute top-1/2 left-10 w-32 h-32 glass rounded-2xl animate-float opacity-20 border border-white/10 -rotate-12" style={{animationDelay: '1s'}}></div>
                <div className="hidden lg:block absolute bottom-20 right-20 w-48 h-48 glass rounded-[2.5rem] animate-float opacity-20 border border-white/10 rotate-12" style={{animationDelay: '3s'}}></div>
              </section>

              {/* Stats Section with smaller text */}
              <div className="w-full bg-slate-900/50 border-y border-white/5">
                <div className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 py-16 px-6">
                  <div className="text-center group">
                    <div className="text-4xl font-black text-white italic mb-1">Instant</div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Course Delivery</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl font-black text-white mb-1">Elite</div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Quality Content</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl font-black text-white mb-1">Lifetime</div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Permanent Access</div>
                  </div>
                  <div className="text-center group">
                    <div className="text-4xl font-black text-white mb-1">24/7</div>
                    <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Expert Support</div>
                  </div>
                </div>
              </div>

              <section id="bundles" className="w-full py-24 px-6 md:px-12">
                <div className="max-w-[1400px] mx-auto space-y-20">
                  <div className="flex flex-col md:flex-row items-end justify-between gap-6 border-l-4 border-blue-600 pl-8">
                    <div className="space-y-2">
                      <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-tight">Master The <br/><span className="text-blue-500">Digital</span> Art</h2>
                      <p className="text-slate-400 max-w-xl text-lg font-medium italic">"Elite resources for tomorrow's leaders. Buy once, own forever."</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {bundles.map(bundle => (
                      <CourseCard 
                        key={bundle.id} 
                        bundle={bundle} 
                        onAddToCart={() => addToCart(bundle)} 
                        onBuyNow={() => handlePurchase(bundle)}
                      />
                    ))}
                  </div>
                </div>
              </section>
            </div>
          } />
          
          <Route path="/admin" element={
            <div className="max-w-[1200px] mx-auto px-6 py-16">
              <AdminDashboard 
                bundles={bundles} 
                setBundles={setBundles} 
                sales={sales} 
                users={users} 
                setUsers={setUsers}
              />
            </div>
          } />
        </Routes>
      </main>

      <Footer />

      <Cart 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart} 
        onRemove={removeFromCart} 
        onUpdateQuantity={updateCartQuantity}
        onCheckout={() => {
          if (cart.length > 0) handlePurchase(cart[0]); 
          setIsCartOpen(false);
        }}
      />

      {showPayment && (
        <PaymentQR 
          bundle={showPayment} 
          onClose={() => setShowPayment(null)} 
          onConfirm={() => completePayment(showPayment)} 
        />
      )}
    </div>
  );
};

export default App;
