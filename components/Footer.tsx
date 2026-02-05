import React from 'react';
import { Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {
  return (
    <footer className="bg-[#F5F1E6] text-[#1A1A1A] pt-32 pb-12 px-6 rounded-t-[4rem] mt-auto relative overflow-hidden -mx-2 border-t-[3px] border-[#1A1A1A]/5">
      
      {/* Massive Background Text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full pointer-events-none select-none flex justify-center items-center opacity-10">
        <h1 className="text-[20vw] font-black leading-none tracking-tighter" 
            style={{ WebkitTextStroke: '3px #1A1A1A', color: 'transparent' }}>
          AUDIT-POP
        </h1>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center text-center">
        
        {/* Center-Piece CTA */}
        <div className="mb-32 space-y-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-[#1A1A1A] leading-[0.9]">
            Ready to keep your<br/>channel safe?
          </h2>
          <div className="flex justify-center">
             <Button 
               variant="primary" 
               size="lg" 
               onClick={() => setPage('studio')} 
               className="scale-125 border-2 border-white/20 shadow-2xl"
             >
                Enter The Studio
             </Button>
          </div>
        </div>

        {/* Newsletter Input */}
        <div className="mb-24 w-full max-w-sm">
           <div className="flex items-center border-b-2 border-black pb-2 group focus-within:border-[#F0543C] transition-colors gap-2">
              <input 
                type="email" 
                placeholder="STAY SPICY" 
                className="bg-transparent w-full outline-none text-xl font-black placeholder:text-[#1A1A1A]/30 text-[#1A1A1A] uppercase tracking-wider"
              />
              <button className="text-[#1A1A1A] group-focus-within:translate-x-2 transition-transform duration-300">
                 <ArrowRight size={28} />
              </button>
           </div>
           <p className="text-left text-xs font-bold uppercase tracking-widest mt-2 opacity-50">Join the newsletter</p>
        </div>

        {/* Bottom Bar */}
        <div className="w-full flex flex-col md:flex-row justify-between items-center gap-8 border-t-2 border-[#1A1A1A]/10 pt-12">
          <div className="flex gap-8 text-sm font-black uppercase tracking-widest">
            <a href="#" className="hover:text-[#F0543C] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#F0543C] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#F0543C] transition-colors">Security</a>
          </div>
          
          <div className="text-xs font-black uppercase tracking-widest opacity-60">
            © 2026 AUDIT-POP INC. ALL RIGHTS RESERVED.
          </div>

          <div className="flex gap-6">
            <Twitter size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" />
            <Instagram size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" />
            <Linkedin size={24} className="hover:text-[#F0543C] cursor-pointer transition-colors hover:-translate-y-1 duration-300" />
          </div>
        </div>
      </div>
    </footer>
  );
};