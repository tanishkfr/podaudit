import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';
import { Profile } from './views/Profile';
import { StudioState, UserProfile } from './types';

function App() {
  const [activePage, setActivePageState] = useState<'home' | 'spectrum' | 'studio' | 'contact' | 'profile'>('home');

  // Global User State
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
    platform: 'General',
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
      <Navbar activePage={activePage} setPage={setActivePage} />
      
      <main className="flex-grow">
        {renderPage()}
      </main>

      <Footer setPage={setActivePage} activePage={activePage} />
    </div>
  );
}

export default App;