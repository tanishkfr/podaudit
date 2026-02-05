import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './views/Home';
import { Spectrum } from './views/Spectrum';
import { Studio } from './views/Studio';
import { Contact } from './views/Contact';

function App() {
  const [activePage, setActivePage] = useState<'home' | 'spectrum' | 'studio' | 'contact'>('home');

  const renderPage = () => {
    switch (activePage) {
        case 'home': return <Home setPage={setActivePage} />;
        case 'spectrum': return <Spectrum />;
        case 'studio': return <Studio />;
        case 'contact': return <Contact />;
        default: return <Home setPage={setActivePage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F1E6] flex flex-col font-[Plus Jakarta Sans]">
      <Navbar activePage={activePage} setPage={setActivePage} />
      
      {renderPage()}

      <Footer setPage={setActivePage} />
    </div>
  );
}

export default App;