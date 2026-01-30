
import React, { useState } from 'react';
import { Bundle } from '../types';
import { COMPANY_INFO } from '../constants';

interface PaymentQRProps {
  bundle: Bundle;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentQR: React.FC<PaymentQRProps> = ({ bundle, onClose, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-white text-slate-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header with Brand Logo */}
        <div className="pt-8 pb-4 flex flex-col items-center gap-2">
          <div className="w-12 h-12 bg-slate-900 rounded-full flex items-center justify-center">
            <i className="fas fa-dove text-pink-500 text-lg"></i>
          </div>
          <h2 className="text-xl font-bold text-slate-700 tracking-tight uppercase">SARATH SK</h2>
        </div>

        {/* QR Code Section */}
        <div className="px-8 pb-4">
          <div className="bg-white border-[1px] border-slate-100 rounded-3xl p-6 shadow-sm flex flex-col items-center">
            <div className="relative w-full aspect-square bg-slate-50 rounded-2xl flex items-center justify-center border-dashed border-2 border-slate-200">
              {/* Displaying User provided QR representation */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <i className="fas fa-qrcode text-[10rem] text-slate-800 opacity-90"></i>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white overflow-hidden">
                   <div className="flex flex-wrap w-full h-full p-1">
                      <div className="w-1/2 h-1/2 bg-blue-500"></div>
                      <div className="w-1/2 h-1/2 bg-red-500"></div>
                      <div className="w-1/2 h-1/2 bg-yellow-400"></div>
                      <div className="w-1/2 h-1/2 bg-green-500"></div>
                   </div>
                </div>
              </div>
            </div>
            <div className="mt-6 text-center">
               <p className="text-slate-500 text-sm font-medium">UPI ID: <span className="text-slate-900 font-bold">{COMPANY_INFO.upiId}</span></p>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="p-8 pt-2 bg-slate-50 space-y-4">
          <div className="flex justify-between items-center px-2">
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Course Amount</p>
              <p className="text-2xl font-black text-slate-900">{COMPANY_INFO.currency}{bundle.price}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Selected Course</p>
              <p className="text-sm font-bold text-slate-700 max-w-[150px] truncate">{bundle.name}</p>
            </div>
          </div>

          <p className="text-center text-slate-400 text-xs py-2">Scan to pay with any UPI app</p>

          <button 
            disabled={isProcessing}
            onClick={handleConfirm}
            className={`w-full py-4 rounded-2xl font-black transition-all flex items-center justify-center gap-2 shadow-lg ${isProcessing ? 'bg-slate-200 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800'}`}
          >
            {isProcessing ? (
              <><i className="fas fa-sync-alt animate-spin"></i> Confirming Payment...</>
            ) : (
              'I HAVE PAID'
            )}
          </button>
          
          <button onClick={onClose} className="w-full text-slate-400 text-xs font-bold uppercase tracking-widest hover:text-slate-600 transition-colors">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentQR;
