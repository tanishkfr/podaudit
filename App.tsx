import React, { useState, useEffect, useRef } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { StudioState, UserProfile } from './types';

// --- COMPONENTS: SPLASH & CURSOR ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Progress Bar Animation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);

    // Dismiss Logic
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onComplete, 800); // Wait for fade out
    }, 2500);

    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, [onComplete]);

  return (
    <div className={`fixed inset-0 z-[100] bg-[#E86D44] flex flex-col items-center justify-center transition-opacity duration-700 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center relative">
        <h1 className="text-9xl font-black text-white tracking-tighter animate-in zoom-in fade-in duration-1000">VOUCH</h1>
        <div className="mt-8 w-64 h-1 bg-black/20 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-white transition-all duration-75 ease-out" style={{ width: `${progress}%` }}></div>
        </div>
        <p className="mt-4 text-xs font-black uppercase tracking-widest text-black/40 animate-pulse">Syncing Integrity Engine...</p>
      </div>
    </div>
  );
};

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [variant, setVariant] = useState<'default' | 'pointer' | 'danger'>('default');

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Hit testing for cursor variant
      const target = e.target as HTMLElement;
      
      if (target.closest('[data-cursor="danger"]')) {
        setVariant('danger');
      } else if (
        target.tagName === 'BUTTON' || 
        target.tagName === 'A' || 
        target.closest('button') || 
        target.closest('a') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'SELECT' ||
        target.tagName === 'TEXTAREA' ||
        target.getAttribute('role') === 'button'
      ) {
        setVariant('pointer');
      } else {
        setVariant('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  // Smooth follow logic via CSS transition on transform
  return (
    <div 
      ref={cursorRef}
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transition-transform duration-100 ease-out mix-blend-difference flex items-center justify-center`}
      style={{ 
        transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        width: variant === 'default' ? '20px' : '64px',
        height: variant === 'default' ? '20px' : '64px',
        backgroundColor: variant === 'danger' ? '#F0543C' : (variant === 'pointer' ? 'white' : 'transparent'),
        border: variant === 'danger' ? 'none' : '2px solid white',
        opacity: variant === 'default' ? 1 : 0.8
      }}
    >
      {variant === 'danger' && <span className="text-[10px] font-black text-white uppercase">NUKE</span>}
    </div>
  );
};

// --- MAIN APP ---

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activePage, setActivePageState] = useState<'home' | 'spectrum' | 'studio' | 'contact' | 'profile'>('home');

  // Global User State - Lifted for Live Sync
  const [user, setUser] = useState<UserProfile>({
    name: 'Tanishk',
    role: 'HCD / UI UX Design',
  });

  // Persistent Studio State
  const [studioState, setStudioState] = useState<StudioState>({
    file: null,
    status: 'idle',
    progress: 0,
    flags: [],
    waveformBars: [],
    platform: 'YouTube', 
    showDownload: false,
    smartSummary: ''
  });

  const setActivePage = (page: 'home' | 'spectrum' | 'studio' | 'contact' | 'profile') => {
    setActivePageState(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  const renderPage = () => {
    switch (activePage) {
        case 'home': return <Home setPage={setActivePage} />;
        case 'spectrum': return <Spectrum />;
        case 'studio': return <Studio studioState={studioState} setStudioState={setStudioState} />;
        case 'contact': return <Contact />;
        case 'profile': return <Profile setPage={setActivePage} user={user} setUser={setUser} />;
        default: return <Home setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col font-[Plus Jakarta Sans] overflow-x-hidden selection:bg-[#F0543C] selection:text-white">
      <CustomCursor />
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <div className="animate-in fade-in duration-1000">
           <Navbar activePage={activePage} setPage={setActivePage} user={user} />
           <main className="flex-grow">
             {renderPage()}
           </main>
           <Footer setPage={setActivePage} activePage={activePage} />
        </div>
      )}
    </div>
  );
}

export default App;