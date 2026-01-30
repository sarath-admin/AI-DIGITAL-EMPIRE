
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
    const newSale: SaleRecord = {
      id: `S${Date.now()}`,
      bundleName: bundle.name,
      amount: bundle.price,
      customerName: 'Verified Student',
      customerEmail: 'student@example.com',
      date: new Date().toISOString().split('T')[0],
      status: 'Completed'
    };
    setSales(prev => [...prev, newSale]);
    setShowPayment(null);
    alert(`Enrollment Successful! Access to "${bundle.name}" (Lifetime Access) has been activated.`);
  };

  return (
    <div className="flex flex-col min-h-screen selection:bg-blue-500/30">
      <Navbar cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="flex-grow pt-20">
        <Routes>
          <Route path="/" element={
            <div className="px-4 md:px-8 max-w-7xl mx-auto space-y-24 pb-32">
              {/* Hero Section */}
              <section className="relative h-[650px] flex items-center justify-center overflow-hidden rounded-[3.5rem] mt-12 bg-slate-900 border border-white/10 group shadow-2xl">
                <div 
                  className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=1600&auto=format&fit=crop')] bg-cover bg-center opacity-40 scale-105 group-hover:scale-100 transition-transform duration-[10s] ease-out"
                ></div>
                
                <div className="absolute inset-0 z-10 opacity-30 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/20 to-slate-950/95 z-10"></div>
                
                <div className="relative text-center space-y-10 z-20 px-4 max-w-4xl animate-in fade-in zoom-in duration-700">
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-black uppercase tracking-[0.4em] mb-4 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                    </span>
                    The Ultimate AI Knowledge Hub
                  </div>
                  
                  <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-none">
                    AI DIGITAL <br/>
                    <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">EMPIRE</span>
                  </h1>
                  
                  <p className="text-xl md:text-2xl text-slate-300 font-medium max-w-2xl mx-auto drop-shadow-lg">
                    Build your future with world-class <span className="text-white font-bold italic">Lifetime Access</span> to AI courses, 
                    <span className="text-white font-bold"> Premium Source Codes</span>, and 
                    <span className="text-white font-bold"> Industry-Standard Toolkits</span>.
                  </p>
                  
                  <div className="flex flex-wrap justify-center gap-6 pt-6">
                    <a href="#bundles" className="px-12 py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[2rem] transition-all hover:scale-110 shadow-2xl shadow-blue-600/50 flex items-center gap-3">
                      Access Courses <i className="fas fa-arrow-right text-[10px]"></i>
                    </a>
                    <Link to="/admin" className="px-12 py-5 glass border-white/20 hover:bg-white/10 rounded-[2rem] font-bold transition-all flex items-center gap-3 backdrop-blur-xl">
                      Admin Portal <i className="fas fa-shield-halved text-xs opacity-60"></i>
                    </Link>
                  </div>
                </div>
              </section>

              {/* Stats Section */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 px-8 glass rounded-[4rem] border-white/5 relative overflow-hidden">
                <div className="text-center space-y-3 group">
                  <div className="w-12 h-12 bg-blue-500/10 rounded-2xl mx-auto flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <i className="fas fa-bolt text-2xl"></i>
                  </div>
                  <div className="text-4xl font-black text-white italic">Instant</div>
                  <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Course Delivery</div>
                </div>
                <div className="text-center space-y-3 group">
                  <div className="w-12 h-12 bg-purple-500/10 rounded-2xl mx-auto flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                    <i className="fas fa-award text-2xl"></i>
                  </div>
                  <div className="text-4xl font-black text-white">Elite</div>
                  <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Quality Content</div>
                </div>
                <div className="text-center space-y-3 group">
                  <div className="w-12 h-12 bg-cyan-500/10 rounded-2xl mx-auto flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                    <i className="fas fa-lock text-2xl"></i>
                  </div>
                  <div className="text-4xl font-black text-white">Lifetime</div>
                  <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Permanent Access</div>
                </div>
                <div className="text-center space-y-3 group">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl mx-auto flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                    <i className="fas fa-headset text-2xl"></i>
                  </div>
                  <div className="text-4xl font-black text-white">24/7</div>
                  <div className="text-[10px] uppercase font-black text-slate-500 tracking-[0.2em]">Expert Support</div>
                </div>
              </div>

              {/* Bundles Grid */}
              <section id="bundles" className="space-y-16">
                <div className="flex flex-col md:flex-row items-center text-center md:text-left justify-between gap-8">
                  <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter uppercase">Master The Digital Frontier</h2>
                    <p className="text-slate-400 max-w-xl text-lg font-medium italic">"Empowering Thoughtful Leaders with high-impact digital toolkits. All courses include Lifetime Access."</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                  {bundles.map(bundle => (
                    <CourseCard 
                      key={bundle.id} 
                      bundle={bundle} 
                      onAddToCart={() => addToCart(bundle)} 
                      onBuyNow={() => handlePurchase(bundle)}
                    />
                  ))}
                </div>
              </section>
            </div>
          } />
          
          <Route path="/admin" element={
            <AdminDashboard 
              bundles={bundles} 
              setBundles={setBundles} 
              sales={sales} 
              users={users} 
              setUsers={setUsers}
            />
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
