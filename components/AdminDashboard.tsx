
import React, { useState } from 'react';
import { Bundle, SaleRecord, User, Category } from '../types';
import { COMPANY_INFO } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AdminDashboardProps {
  bundles: Bundle[];
  setBundles: React.Dispatch<React.SetStateAction<Bundle[]>>;
  sales: SaleRecord[];
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ bundles, setBundles, sales, users, setUsers }) => {
  const [activeTab, setActiveTab] = useState<'stats' | 'bundles' | 'users' | 'sales'>('bundles');
  const [editingBundle, setEditingBundle] = useState<Bundle | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = '123@elgae';

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect Admin Password');
    }
  };

  const totalRevenue = sales.reduce((sum, sale) => sum + sale.amount, 0);
  
  const salesByBundle = bundles.map(b => ({
    name: b.name.substring(0, 10) + '...',
    sales: sales.filter(s => s.bundleName === b.name).length,
    revenue: sales.filter(s => s.bundleName === b.name).reduce((sum, s) => sum + s.amount, 0)
  }));

  const handleSaveBundle = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingBundle) {
      if (editingBundle.id === 'NEW') {
        const newB = { ...editingBundle, id: Date.now().toString() };
        setBundles([...bundles, newB]);
      } else {
        setBundles(bundles.map(b => b.id === editingBundle.id ? editingBundle : b));
      }
      setEditingBundle(null);
    }
  };

  const deleteBundle = (id: string) => {
    if (window.confirm('Are you sure you want to remove this course from the store?')) {
      setBundles(bundles.filter(b => b.id !== id));
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-32 px-4 animate-in fade-in zoom-in duration-500">
        <div className="glass p-10 rounded-[2.5rem] border border-blue-500/20 space-y-8">
          <div className="text-center space-y-2">
            <div className="w-20 h-20 bg-blue-600 rounded-3xl mx-auto flex items-center justify-center shadow-2xl shadow-blue-600/30 rotate-3">
              <i className="fas fa-lock text-white text-3xl"></i>
            </div>
            <h2 className="text-2xl font-black mt-6 tracking-tight">ADMIN ACCESS</h2>
            <p className="text-slate-400 text-sm">Protected by AI Digital Empire Security</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] text-slate-500 font-black uppercase tracking-[0.2em] ml-2">Secure Password</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full bg-slate-900/50 border border-white/10 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-center tracking-widest"
                required
              />
              {error && <p className="text-red-400 text-[10px] font-bold text-center uppercase tracking-widest mt-2">{error}</p>}
            </div>
            <button 
              type="submit" 
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all"
            >
              UNLOCK DASHBOARD
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row gap-8 min-h-[600px] animate-in fade-in duration-700">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 space-y-2">
        <div className="p-6 glass rounded-[2rem] mb-6 border-blue-500/20">
          <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.2em] mb-2">Admin Panel</p>
          <p className="font-extrabold text-white text-lg">AI DIGITAL EMPIRE</p>
        </div>
        
        <button 
          onClick={() => setActiveTab('stats')}
          className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeTab === 'stats' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        >
          <i className="fas fa-chart-line"></i> Analytics
        </button>
        <button 
          onClick={() => setActiveTab('bundles')}
          className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeTab === 'bundles' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        >
          <i className="fas fa-layer-group"></i> Manage Courses
        </button>
        <button 
          onClick={() => setActiveTab('sales')}
          className={`w-full flex items-center gap-3 px-6 py-4 rounded-2xl transition-all ${activeTab === 'sales' ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-500/20' : 'hover:bg-white/5 text-slate-400'}`}
        >
          <i className="fas fa-history"></i> Sales Records
        </button>
        <button 
          onClick={() => setIsAuthenticated(false)}
          className="w-full flex items-center gap-3 px-6 py-4 rounded-2xl text-red-400 hover:bg-red-400/10 transition-all font-bold mt-10"
        >
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </aside>

      {/* Admin Content Area */}
      <main className="flex-grow space-y-6">
        {activeTab === 'stats' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="glass p-8 rounded-3xl border-t-2 border-blue-500">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Revenue</p>
                <h3 className="text-4xl font-black mt-2">{COMPANY_INFO.currency}{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="glass p-8 rounded-3xl border-t-2 border-purple-500">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Enrollments</p>
                <h3 className="text-4xl font-black mt-2">{sales.length}</h3>
              </div>
              <div className="glass p-8 rounded-3xl border-t-2 border-emerald-500">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Active Courses</p>
                <h3 className="text-4xl font-black mt-2">{bundles.length}</h3>
              </div>
            </div>

            <div className="glass p-8 rounded-3xl h-[400px]">
              <h4 className="font-bold mb-6 text-slate-300 text-sm uppercase tracking-widest">Performance Chart</h4>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={salesByBundle}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={10} axisLine={false} tickLine={false} />
                  <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{fill: 'rgba(255,255,255,0.05)'}}
                    contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', border: '1px solid #1e293b', padding: '12px' }}
                  />
                  <Bar dataKey="revenue" fill="#3b82f6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {activeTab === 'bundles' && (
          <div className="glass rounded-3xl overflow-hidden border-white/5">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">Course Inventory</h3>
                <p className="text-[10px] text-slate-500 mt-1 font-bold uppercase tracking-widest italic">Update Pricing & Details</p>
              </div>
              <button 
                onClick={() => setEditingBundle({ id: 'NEW', name: '', description: '', price: 0, category: Category.WEB, image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800&auto=format&fit=crop', features: ['Lifetime Access'] })}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-widest transition-all transform hover:scale-105 shadow-lg shadow-blue-600/20"
              >
                + Create Course
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="p-6">Course Item</th>
                    <th className="p-6">Price</th>
                    <th className="p-6">Category</th>
                    <th className="p-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {bundles.map(b => (
                    <tr key={b.id} className="group hover:bg-white/5 transition-all">
                      <td className="p-6">
                        <div className="flex items-center gap-4">
                          <img src={b.image} className="w-14 h-14 rounded-2xl object-cover border border-white/10 group-hover:scale-110 transition-transform" />
                          <div>
                            <div className="font-bold text-slate-200">{b.name}</div>
                            <div className="text-[9px] text-slate-500 mt-1 uppercase tracking-widest">ID: {b.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-6 font-black text-blue-400">{COMPANY_INFO.currency}{b.price}</td>
                      <td className="p-6">
                        <span className="text-[9px] font-black px-3 py-1 bg-white/5 border border-white/10 rounded-full text-slate-400 uppercase tracking-widest">
                          {b.category}
                        </span>
                      </td>
                      <td className="p-6 text-right space-x-2">
                        <button onClick={() => setEditingBundle(b)} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-blue-600 text-slate-400 hover:text-white transition-all inline-flex items-center justify-center">
                          <i className="fas fa-edit text-xs"></i>
                        </button>
                        <button onClick={() => deleteBundle(b.id)} className="w-9 h-9 rounded-xl bg-white/5 hover:bg-red-600 text-slate-400 hover:text-white transition-all inline-flex items-center justify-center">
                          <i className="fas fa-trash-alt text-xs"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'sales' && (
          <div className="glass rounded-3xl overflow-hidden">
            <div className="p-8 border-b border-white/5 bg-white/5">
              <h3 className="text-xl font-black uppercase tracking-tight">Financial History</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="p-6">Customer</th>
                    <th className="p-6">Course</th>
                    <th className="p-6">Amount</th>
                    <th className="p-6">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {sales.map(s => (
                    <tr key={s.id} className="hover:bg-white/5">
                      <td className="p-6">
                        <div className="text-sm font-bold text-slate-200">{s.customerName}</div>
                        <div className="text-[10px] text-slate-500 font-bold">{s.customerEmail}</div>
                      </td>
                      <td className="p-6 font-bold text-slate-400 text-sm">{s.bundleName}</td>
                      <td className="p-6 font-black text-white">{COMPANY_INFO.currency}{s.amount}</td>
                      <td className="p-6">
                        <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-3 py-1 rounded-full font-black uppercase tracking-widest">
                          Verified
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>

      {/* Course Edit/Add Modal */}
      {editingBundle && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-md" onClick={() => setEditingBundle(null)}></div>
          <div className="relative glass w-full max-w-xl rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-white/5 bg-slate-900/50 flex justify-between items-center">
              <h3 className="text-2xl font-black text-white">{editingBundle.id === 'NEW' ? 'Create Course' : 'Modify Course'}</h3>
              <button onClick={() => setEditingBundle(null)} className="p-2 hover:bg-white/5 rounded-full"><i className="fas fa-times text-slate-500"></i></button>
            </div>
            <form onSubmit={handleSaveBundle} className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Title</label>
                  <input 
                    type="text" 
                    value={editingBundle.name} 
                    onChange={e => setEditingBundle({...editingBundle, name: e.target.value})}
                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Price ({COMPANY_INFO.currency})</label>
                  <input 
                    type="number" 
                    value={editingBundle.price} 
                    onChange={e => setEditingBundle({...editingBundle, price: Number(e.target.value)})}
                    className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500 transition-all font-bold text-blue-400"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Image URL</label>
                <input 
                  type="url" 
                  value={editingBundle.image} 
                  onChange={e => setEditingBundle({...editingBundle, image: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm focus:outline-none focus:border-blue-500"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] text-slate-500 font-black uppercase tracking-widest ml-1">Description</label>
                <textarea 
                  value={editingBundle.description} 
                  onChange={e => setEditingBundle({...editingBundle, description: e.target.value})}
                  className="w-full bg-slate-900 border border-white/10 rounded-2xl px-5 py-3 text-sm h-24 focus:outline-none focus:border-blue-500 transition-all resize-none"
                  required
                ></textarea>
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button type="submit" className="px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/20 transform hover:-translate-y-1 transition-all">
                  Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
