import React, { useState } from 'react';
import QRCode from 'react-qr-code';
import { Bundle } from '../types';
import { COMPANY_INFO } from '../constants';

interface PaymentQRProps {
  bundle: Bundle;
  onClose: () => void;
  onConfirm: () => void;
}

const PaymentQR: React.FC<PaymentQRProps> = ({ bundle, onClose, onConfirm }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [copied, setCopied] = useState(false);

  // Construct standard UPI Payment URI
  // format: upi://pay?pa=UPI_ID&pn=NAME&am=AMOUNT&cu=CURRENCY&tn=NOTE
  const upiUri = `upi://pay?pa=${COMPANY_INFO.upiId}&pn=Sarath%20SK&am=${bundle.price}&cu=INR&tn=Order%20for%20${encodeURIComponent(bundle.name)}`;

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      onConfirm();
      setIsProcessing(false);
    }, 2000);
  };

  const copyUpiId = () => {
    navigator.clipboard.writeText(COMPANY_INFO.upiId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-[#f8faff] text-slate-900 w-full max-w-md rounded-[2.5rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header with Brand Logo */}
        <div className="pt-8 pb-4 flex flex-col items-center gap-3">
          <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
            <i className="fas fa-dove text-pink-500 text-xl"></i>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight uppercase">SARATH SK</h2>
        </div>

        {/* QR Code Section */}
        <div className="px-8 pb-4">
          <div className="bg-white rounded-[2rem] p-8 shadow-xl border border-slate-100 flex flex-col items-center">
            <div className="relative p-2 bg-white rounded-xl">
              <div style={{ height: "auto", margin: "0 auto", maxWidth: 220, width: "100%" }}>
                <QRCode
                  size={256}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                  value={upiUri}
                  viewBox={`0 0 256 256`}
                  level="M" // Medium error correction to allow for center logo
                />
              </div>
              
              {/* Google Pay Style Center Logo Overlay */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-lg border-2 border-white overflow-hidden p-1">
                 <div className="flex flex-wrap w-full h-full rounded-full overflow-hidden">
                    <div className="w-1/2 h-1/2 bg-[#4285F4]"></div>
                    <div className="w-1/2 h-1/2 bg-[#EA4335]"></div>
                    <div className="w-1/2 h-1/2 bg-[#FBBC05]"></div>
                    <div className="w-1/2 h-1/2 bg-[#34A853]"></div>
                 </div>
              </div>
            </div>

            <div className="mt-8 w-full">
               <div 
                onClick={copyUpiId}
                className="group cursor-pointer bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col items-center transition-all hover:bg-slate-100"
               >
                 <span className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em] mb-1">UPI ID</span>
                 <div className="flex items-center gap-2">
                    <span className="text-slate-900 font-bold text-base">{COMPANY_INFO.upiId}</span>
                    <i className={`fas ${copied ? 'fa-check text-green-500' : 'fa-copy text-slate-300 group-hover:text-blue-500'} text-xs transition-colors`}></i>
                 </div>
                 {copied && <span className="text-[10px] text-green-600 font-bold mt-1">Copied!</span>}
               </div>
            </div>
          </div>
        </div>

        {/* Action Section */}
        <div className="p-8 pt-4 bg-white/50 space-y-4">
          <div className="flex justify-between items-center px-4 py-3 bg-white rounded-2xl border border-slate-100">
            <div>
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Payable Amount</p>
              <p className="text-2xl font-black text-slate-900">{COMPANY_INFO.currency}{bundle.price}</p>
            </div>
            <div className="text-right">
              <p className="text-[9px] text-slate-400 uppercase font-black tracking-widest">Course</p>
              <p className="text-xs font-bold text-slate-600 max-w-[140px] truncate">{bundle.name}</p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em]">Scan to pay with any UPI app</p>
            <div className="flex gap-4 opacity-40 grayscale scale-75">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/Google_Pay_Logo.svg" className="h-4" alt="GPay" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/2/24/PhonePe_Logo.svg" className="h-4" alt="PhonePe" />
              <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Paytm_Logo.qt" className="h-4" alt="Paytm" />
            </div>
          </div>

          <div className="pt-2 flex flex-col gap-3">
            <button 
              disabled={isProcessing}
              onClick={handleConfirm}
              className={`w-full py-5 rounded-[1.5rem] font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 shadow-xl ${isProcessing ? 'bg-slate-100 text-slate-400' : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95 shadow-slate-200'}`}
            >
              {isProcessing ? (
                <><i className="fas fa-circle-notch animate-spin"></i> Checking Server...</>
              ) : (
                <>I HAVE COMPLETED PAYMENT <i className="fas fa-shield-check"></i></>
              )}
            </button>
            
            <button onClick={onClose} className="w-full text-slate-400 text-[10px] font-black uppercase tracking-[0.3em] hover:text-slate-600 transition-colors py-2">
              Cancel Transaction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentQR;