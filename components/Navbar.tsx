import React from 'react';
import { Mic } from 'lucide-react';
import { Button } from './Button';

interface NavbarProps {
  activePage: string;
  setPage: (page: 'home' | 'spectrum' | 'studio' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setPage }) => {
  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6">
      <nav className="bg-white/95 backdrop-blur-md rounded-full px-3 py-2 shadow-2xl flex items-center gap-2 max-w-5xl w-full justify-between ring-1 ring-black/5">
        
        {/* Logo */}
        <div 
          className="flex items-center gap-2 pl-4 cursor-pointer group" 
          onClick={() => setPage('home')}
        >
          <div className="w-10 h-10 bg-[#F0543C] rounded-full flex items-center justify-center text-white group-hover:rotate-12 transition-transform shadow-md border-2 border-white">
            <Mic size={20} fill="currentColor" />
          </div>
          <span className="text-2xl font-extrabold tracking-tight text-[#1A1A1A]">AUDIT-POP</span>
        </div>

        {/* Links */}
        <div className="hidden md:flex items-center bg-[#F5F1E6] rounded-full p-1.5 gap-1">
          {['home', 'spectrum', 'studio', 'contact'].map((page) => (
            <button 
              key={page}
              onClick={() => setPage(page as any)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 ${
                activePage === page 
                ? 'bg-white shadow-md text-[#1A1A1A]' 
                : 'text-gray-500 hover:text-[#1A1A1A] hover:bg-white/50'
              }`}
            >
              {page}
            </button>
          ))}
        </div>

        {/* CTA */}
        <Button 
          size="md" 
          variant="primary" 
          className="hidden sm:flex"
          icon={<span className="text-xl">⚡</span>}
          onClick={() => setPage('studio')}
        >
          Audit Now
        </Button>
      </nav>
    </div>
  );
};