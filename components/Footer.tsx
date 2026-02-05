import React from 'react';
import { Twitter, Instagram, Linkedin, Github, Globe } from 'lucide-react';
import { Button } from './Button';

export const Footer: React.FC<{ setPage: (page: any) => void }> = ({ setPage }) => {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-40 pb-12 px-6 rounded-t-[4rem] mt-auto relative overflow-hidden -mx-2">
      
      {/* Massive Logo */}
      <div className="w-full border-b border-white/10 pb-12 mb-12">
        <h1 className="text-[16vw] font-black leading-none text-center tracking-tighter text-white select-none pointer-events-none mix-blend-overlay opacity-50">
          AUDIT-POP
        </h1>
      </div>

      {/* Links */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-gray-400 font-bold">
        <div className="flex gap-8 text-sm uppercase tracking-widest">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Security</a>
        </div>
        
        <div className="flex gap-4">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all hover:scale-110 text-white">
            <Twitter size={20}/>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all hover:scale-110 text-white">
            <Instagram size={20}/>
          </div>
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all hover:scale-110 text-white">
            <Linkedin size={20}/>
          </div>
        </div>

        <div className="opacity-50 text-xs">
          © 2024 AUDIT-POP INC.
        </div>
      </div>
    </footer>
  );
};