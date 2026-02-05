import React from 'react';
import { AlertCircle, AlertTriangle, ShieldAlert, Info, ArrowRight, Search } from 'lucide-react';

const SpectrumSection: React.FC<{ 
    color: string; 
    bg: string; 
    textColor: string;
    icon: React.ReactNode; 
    title: string; 
    desc: string; 
    bullets: string[];
    exampleBefore: string;
    exampleAfter: string;
    riskLevel: number; 
}> = ({ color, bg, textColor, icon, title, desc, bullets, exampleBefore, exampleAfter, riskLevel }) => (
    <div className={`w-full py-24 px-6 mb-6 ${bg} ${textColor}`}>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Info */}
            <div>
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-8 bg-black/10 backdrop-blur-md shadow-lg`}>
                    {icon}
                </div>
                <h2 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-none">{title}</h2>
                <p className="text-2xl font-bold opacity-80 mb-10 leading-relaxed">{desc}</p>
                
                <h3 className="text-xl font-black uppercase tracking-widest mb-6 opacity-60">What we look for:</h3>
                <ul className="space-y-4 mb-10">
                    {bullets.map((b, i) => (
                        <li key={i} className="flex items-center gap-4 text-xl font-bold">
                            <div className="w-3 h-3 rounded-full bg-current opacity-50"></div>
                            {b}
                        </li>
                    ))}
                </ul>

                <div className="bg-black/10 rounded-2xl p-6 backdrop-blur-sm inline-block">
                    <span className="text-sm font-black uppercase tracking-widest opacity-60 block mb-2">Risk Meter</span>
                    <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className={`w-3 h-8 rounded-sm ${i < riskLevel ? 'bg-current' : 'bg-current opacity-10'}`}></div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Example */}
            <div className="bg-white/90 backdrop-blur-xl p-10 rounded-[3rem] shadow-2xl text-[#1A1A1A] border-4 border-white/50">
                <h3 className="text-3xl font-black mb-8 border-b-4 border-[#1A1A1A]/10 pb-4">Real World Example</h3>
                
                <div className="space-y-8">
                    <div>
                        <div className="flex items-center gap-3 mb-2 text-[#F0543C] font-black uppercase tracking-wide text-sm">
                            <AlertTriangle size={16} /> Flagged Content
                        </div>
                        <p className="text-2xl font-bold leading-snug">"{exampleBefore}"</p>
                    </div>

                    <div className="flex justify-center opacity-20">
                        <ArrowRight size={40} className="rotate-90 lg:rotate-0" />
                    </div>

                    <div>
                        <div className="flex items-center gap-3 mb-2 text-[#7BC65C] font-black uppercase tracking-wide text-sm">
                            <ShieldAlert size={16} /> Audit Fix
                        </div>
                        <p className="text-2xl font-bold leading-snug">"{exampleAfter}"</p>
                    </div>
                </div>
            </div>

        </div>
    </div>
);

// Custom "Corporate Memphis" style SVG Illustration
const InvestigatorIllustration = () => (
    <svg viewBox="0 0 400 400" className="w-full h-full max-h-[600px] animate-in fade-in slide-in-from-bottom-10 duration-1000">
        {/* Background Blob */}
        <path d="M50 200 C 50 100, 350 100, 350 200 C 350 300, 50 300, 50 200" fill="#FFFFFF" fillOpacity="0.4" />
        
        {/* Body */}
        <path d="M150 350 L 250 350 L 230 180 L 170 180 Z" fill="#2D2D2D" />
        
        {/* Head */}
        <circle cx="200" cy="140" r="50" fill="#F0543C" />
        
        {/* Arms holding Magnifying Glass */}
        <path d="M170 200 Q 120 250 140 280" stroke="#2D2D2D" strokeWidth="20" strokeLinecap="round" fill="none" />
        <path d="M230 200 Q 280 250 260 280" stroke="#2D2D2D" strokeWidth="20" strokeLinecap="round" fill="none" />
        
        {/* Magnifying Glass */}
        <g transform="translate(180, 220) rotate(-30)">
            <circle cx="50" cy="50" r="60" stroke="#1A1A1A" strokeWidth="12" fill="rgba(255,255,255,0.3)" />
            <path d="M50 110 L 50 180" stroke="#1A1A1A" strokeWidth="12" strokeLinecap="round" />
            <circle cx="50" cy="50" r="40" fill="#00E8FF" fillOpacity="0.3" />
            {/* Reflection */}
            <path d="M30 30 Q 50 10 70 30" stroke="white" strokeWidth="6" fill="none" opacity="0.8" />
        </g>
        
        {/* Floating Abstract Elements */}
        <circle cx="320" cy="80" r="20" fill="#FACC15" className="animate-bounce" style={{ animationDuration: '3s' }} />
        <rect x="50" y="100" width="30" height="30" fill="#2D2D2D" transform="rotate(15)" className="animate-pulse" />
        <path d="M350 300 L 370 330 L 330 330 Z" fill="#F0543C" />
    </svg>
);

export const Spectrum: React.FC = () => {
    return (
        <div className="w-full pt-32 pb-0 bg-[#F5F1E6]">
             {/* Neutral Hero Section (Soft Cream) */}
             <div className="w-full bg-[#F5F1E6] min-h-[80vh] flex flex-col items-center justify-center text-center p-8 relative overflow-hidden border-b-2 border-black/5">
                <div className="max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-left space-y-8">
                        <div className="inline-block bg-[#1A1A1A] text-white px-6 py-2 rounded-full font-black uppercase tracking-widest text-sm transform -rotate-2">
                            The Methodology
                        </div>
                        <h1 className="text-8xl md:text-[9rem] font-black text-[#1A1A1A] leading-[0.8] tracking-tighter">
                            THE <br/> SPECTRUM.
                        </h1>
                        <p className="text-3xl font-bold text-[#1A1A1A]/70 leading-tight max-w-lg">
                            We don't just ban. We categorize risk so you can keep the spice without the strike.
                        </p>
                    </div>
                    <div className="h-[500px] flex items-center justify-center">
                        <InvestigatorIllustration />
                    </div>
                </div>
            </div>

            <SpectrumSection 
                bg="bg-blue-500" 
                textColor="text-white"
                color="blue"
                icon={<Info size={40} />}
                title="Citation Needed" 
                desc="Flags missing sources, unverified statistics, or potential misinformation that needs a citation overlay."
                bullets={["Unverified Statistics", "Historical Inaccuracies", "Missing Context"]}
                riskLevel={2}
                exampleBefore="Studies show 90% of people hate kale."
                exampleAfter="[Overlay]: 'Source: 2023 Kale Appreciation Study, Sample Size 100'"
            />

            <SpectrumSection 
                bg="bg-[#FACC15]" 
                textColor="text-[#1A1A1A]"
                color="yellow"
                icon={<AlertCircle size={40} />}
                title="Hot Take" 
                desc="Marks controversial or subjective opinions that are safe but might require a generic disclaimer to avoid suppression."
                bullets={["Subjective Opinions", "Polarizing Topics", "Slight Profanity"]}
                riskLevel={5}
                exampleBefore="This entire industry is a scam run by lizards."
                exampleAfter="[Disclaimer]: 'The views expressed are solely those of the host.'"
            />

            <SpectrumSection 
                bg="bg-[#FB923C]" 
                textColor="text-white"
                color="orange"
                icon={<AlertTriangle size={40} />}
                title="Borderline" 
                desc="Statements that approach the line of advertiser safety. High risk of limited monetization."
                bullets={["Aggressive Conflict", "Graphic Descriptions", "Sexual Innuendo"]}
                riskLevel={8}
                exampleBefore="I'm going to punch him in the throat next time."
                exampleAfter="I'm going to [bleep] him up next time."
            />

            <SpectrumSection 
                bg="bg-[#F0543C]" 
                textColor="text-white"
                color="red"
                icon={<ShieldAlert size={40} />}
                title="The Nuke Zone" 
                desc="Direct TOS violations. Hate speech, dangerous medical misinformation, or illegal incitement."
                bullets={["Hate Speech", "Medical Misinfo", "Incitement to Violence"]}
                riskLevel={10}
                exampleBefore="Drink bleach to cure your cold."
                exampleAfter="[SEGMENT REMOVED / AUDIO SILENCED]"
            />
        </div>
    );
};