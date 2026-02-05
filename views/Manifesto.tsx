import React from 'react';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { Button } from '../components/Button';

const StatCard: React.FC<{ value: string; label: string; icon: React.ReactNode; color: string }> = ({ value, label, icon, color }) => (
  <div className="bg-white p-8 rounded-[2rem] shadow-xl flex flex-col items-center justify-center text-center gap-4 hover:-translate-y-2 transition-transform duration-300 border border-black/5">
    <div className={`w-16 h-16 ${color} rounded-full flex items-center justify-center text-white shadow-lg`}>
      {icon}
    </div>
    <div>
      <h3 className="text-5xl font-extrabold text-[#2D2D2D] tracking-tight">{value}</h3>
      <p className="font-bold text-gray-500 uppercase tracking-wide text-sm mt-2">{label}</p>
    </div>
  </div>
);

export const Manifesto: React.FC = () => {
  return (
    <div className="w-full">
      
      {/* 1. HERO SECTION: Tomato Red */}
      <section className="bg-[#F0543C] min-h-[85vh] flex flex-col justify-center items-center text-center px-6 relative overflow-hidden pt-32 pb-20 rounded-b-[4rem]">
        
        {/* Abstract "Spice" Shapes */}
        <div className="absolute top-32 left-10 w-40 h-40 bg-[#FF823A] rounded-full blur-3xl opacity-60 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#2D2D2D] rounded-full blur-3xl opacity-20"></div>

        <div className="max-w-7xl mx-auto z-10 space-y-8">
           <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full border border-white/30 text-white font-bold text-sm uppercase tracking-widest mb-4">
              <span className="w-2 h-2 bg-white rounded-full animate-ping"></span>
              Live Prototype v1.0
           </div>

           <h1 className="text-[12vw] md:text-[8rem] font-extrabold text-[#2D2D2D] leading-[0.85] tracking-tighter drop-shadow-sm">
             NO MORE <br/>
             <span className="text-white relative">
               CHAOS.
               <span className="absolute -top-4 -right-12 text-6xl rotate-12 hidden md:block">💥</span>
             </span>
           </h1>
           
           <p className="text-xl md:text-2xl font-bold text-[#2D2D2D]/80 max-w-2xl mx-auto leading-relaxed">
             The creator economy’s first proactive safety net. 
             We scan your podcast for liability <span className="underline decoration-4 decoration-white/50">before</span> the algorithm strikes.
           </p>

           {/* Green Sub-Hero Block */}
           <div className="mt-12 bg-[#7BC65C] p-8 md:p-12 rounded-[3rem] shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-500 max-w-4xl mx-auto relative border-4 border-white/20">
              <div className="absolute -top-6 -right-6 bg-yellow-300 text-black font-black uppercase text-sm px-4 py-2 rounded-full rotate-12 border-2 border-black shadow-[4px_4px_0px_black]">
                Beta Access
              </div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                 <div className="text-left">
                    <h3 className="text-3xl font-extrabold text-white mb-2">Audit your episode.</h3>
                    <p className="text-white/90 font-medium text-lg">Drag & Drop. 30 Seconds. Zero Risk.</p>
                 </div>
                 <div className="bg-white p-2 rounded-full">
                    <Button size="lg" variant="primary" icon={<ArrowRight />}>Try It Now</Button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* 2. STATS SECTION: Stacked Cards */}
      <section className="bg-[#F5F1E6] py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-6xl md:text-7xl font-extrabold text-[#2D2D2D] tracking-tighter mb-6">
              THE <span className="text-[#7BC65C]">NUMBERS</span> DON'T LIE
            </h2>
            <p className="text-xl text-gray-500 font-medium">Proven reliability for the world's top creators.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatCard 
              value="98%" 
              label="Accuracy Rate" 
              color="bg-blue-500"
              icon={<ShieldCheck size={32} />}
            />
            <StatCard 
              value="10k+" 
              label="Episodes Scanned" 
              color="bg-[#F0543C]"
              icon={<Zap size={32} />}
            />
            <StatCard 
              value="0" 
              label="False Strikes" 
              color="bg-[#7BC65C]"
              icon={<Star size={32} />}
            />
          </div>
        </div>
      </section>

      {/* 3. CTA FOOTER: Centered Dark Grey */}
      <section className="bg-[#2D2D2D] py-32 px-6 rounded-t-[4rem] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full max-w-3xl h-full bg-white/5 blur-3xl rounded-full pointer-events-none"></div>
        
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center justify-center space-y-10">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter leading-tight">
            Ready to keep your<br/>channel <span className="text-[#7BC65C]">safe?</span>
          </h2>
          <p className="text-gray-400 text-xl font-medium max-w-xl">
            Join the movement of creators who prioritize safety without sacrificing their voice.
          </p>
          <Button variant="secondary" size="lg" className="scale-125">
            Enter The Studio
          </Button>
        </div>
      </section>

    </div>
  );
};