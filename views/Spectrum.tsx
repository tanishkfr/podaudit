import React from 'react';
import { AlertCircle, AlertTriangle, ShieldAlert, Info, ArrowRight } from 'lucide-react';

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
    riskLevel: number; // 1-10
}> = ({ color, bg, textColor, icon, title, desc, bullets, exampleBefore, exampleAfter, riskLevel }) => (
    <div className={`w-full py-24 px-6 border-b-8 border-[#1A1A1A]/5 ${bg} ${textColor}`}>
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

export const Spectrum: React.FC = () => {
    return (
        <div className="w-full pt-20 bg-[#F5F1E6]">
             <div className="py-32 px-6 text-center">
                <h1 className="text-[12vw] font-black text-[#1A1A1A] leading-[0.8] tracking-tighter mb-8">
                    THE LOGIC.
                </h1>
                <p className="text-2xl font-bold text-gray-500 max-w-2xl mx-auto">
                    A deep dive into our 4-tier classification system.
                </p>
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