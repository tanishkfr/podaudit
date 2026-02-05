import React from 'react';
import { Button } from '../components/Button';
import { Sparkles, ArrowRight } from 'lucide-react';

export const Contact: React.FC = () => {
    return (
        <div className="w-full pt-32 pb-20 px-6 min-h-[90vh] bg-[#F5F1E6]">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                
                {/* Left Column: Messaging */}
                <div className="space-y-10">
                    <h1 className="text-7xl md:text-9xl font-black text-[#1A1A1A] tracking-tighter leading-[0.85]">
                        LET'S <br/>
                        <span className="text-[#F0543C]">SECURE</span> <br/>
                        YOUR <br/>
                        BRAND.
                    </h1>
                    <p className="text-2xl font-bold text-gray-500 max-w-md leading-relaxed">
                        Enterprise-grade protection for networks, agencies, and high-volume creators.
                    </p>
                    <div className="flex items-center gap-4 text-[#1A1A1A] font-black uppercase tracking-widest">
                        <div className="w-16 h-1 bg-[#1A1A1A]"></div>
                        Priority Access
                    </div>
                </div>

                {/* Right Column: Form */}
                <div className="bg-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden border-4 border-white">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#7BC65C] rounded-bl-[3rem] -mr-4 -mt-4 z-0"></div>
                    
                    <form className="relative z-10 space-y-8" onSubmit={(e) => e.preventDefault()}>
                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-[#1A1A1A] ml-4">Full Name</label>
                            <input 
                                type="text" 
                                className="w-full bg-[#F5F1E6] rounded-full px-8 py-5 font-bold text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-4 border-transparent focus:border-[#1A1A1A]"
                                placeholder="Your Name"
                            />
                        </div>

                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-[#1A1A1A] ml-4">Network / Channel</label>
                            <input 
                                type="text" 
                                className="w-full bg-[#F5F1E6] rounded-full px-8 py-5 font-bold text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-4 border-transparent focus:border-[#1A1A1A]"
                                placeholder="@channel"
                            />
                        </div>
                        
                        <div className="space-y-3">
                            <label className="text-sm font-black uppercase tracking-widest text-[#1A1A1A] ml-4 flex items-center gap-2">
                                 Risk Profile <Sparkles size={14} className="text-[#F0543C]" />
                            </label>
                            <div className="relative">
                                <select className="w-full bg-[#F5F1E6] rounded-full px-8 py-5 font-bold text-[#1A1A1A] outline-none focus:ring-4 ring-[#1A1A1A]/10 transition-all border-4 border-transparent focus:border-[#1A1A1A] appearance-none cursor-pointer">
                                    <option>Standard (Safety First)</option>
                                    <option>Aggressive (Max Reach)</option>
                                    <option>Experimental (New Formats)</option>
                                </select>
                                <div className="absolute right-8 top-1/2 transform -translate-y-1/2 pointer-events-none text-[#1A1A1A]">
                                    <ArrowRight className="rotate-90" />
                                </div>
                            </div>
                        </div>

                        <Button variant="primary" size="lg" className="w-full text-xl py-6 mt-4 shadow-xl">
                            Request Demo
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};