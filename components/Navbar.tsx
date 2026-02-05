import React, { useRef, useState, useEffect } from 'react';
import { Mic, Zap } from 'lucide-react';

interface NavbarProps {
  activePage: string;
  setPage: (page: 'home' | 'spectrum' | 'studio' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activePage, setPage }) => {
  const btnRef = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!btnRef.current) return;
      const rect = btnRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      if (distance < 100) { 
        // Magnetic pull effect
        setPosition({ x: distanceX * 0.4, y: distanceY * 0.4 });
      } else {
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed top-6 left-0 right-0 flex justify-center z-50 px-6 pointer-events-none">
      <nav className="bg-white/95 backdrop-blur-md rounded-full px-3 py-2 shadow-2xl flex items-center gap-2 max-w-5xl w-full justify-between ring-1 ring-black/5 pointer-events-auto">
        
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

        {/* Magnetic CTA */}
        <button
          ref={btnRef}
          onClick={() => setPage('studio')}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          className="hidden sm:flex items-center gap-2 bg-[#F0543C] text-white border-[3px] border-[#1A1A1A] px-8 py-3 rounded-full font-bold text-lg shadow-[4px_4px_0px_#1A1A1A] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#1A1A1A] active:translate-y-0 active:shadow-none transition-all duration-200 group"
        >
          <Zap className="fill-current group-hover:animate-pulse" size={20} />
          AUDIT NOW
        </button>
      </nav>
    </div>
  );
};