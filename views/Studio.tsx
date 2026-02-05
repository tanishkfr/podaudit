import React, { useState, useEffect } from 'react';
import { Platform, Flag, StudioState } from '../types';
import { Button } from '../components/Button';
import { Waveform } from '../components/Waveform';
import { FlagCard } from '../components/FlagCard';
import { Upload, CheckCircle, RefreshCw, Trash2, Settings, Loader2, ListPlus, Video, Mic, Eye, Check, AlertTriangle, Shield, Power, ToggleLeft, ToggleRight, LayoutTemplate, Type, QrCode } from 'lucide-react';

interface StudioProps {
    studioState: StudioState;
    setStudioState: React.Dispatch<React.SetStateAction<StudioState>>;
}

export const Studio: React.FC<StudioProps> = ({ studioState, setStudioState }) => {
  const [nukingState, setNukingState] = useState<'confirm' | 'processing' | 'done' | null>(null);
  const [flagToNuke, setFlagToNuke] = useState<string | null>(null);
  const [nukeProgress, setNukeProgress] = useState(0);
  
  // Lockdown State (Emergency Override)
  const [lockdownState, setLockdownState] = useState<'confirm' | 'processing' | 'done' | null>(null);
  const [lockdownProgress, setLockdownProgress] = useState(0);

  // Overlay Engine State
  const [editingOverlayId, setEditingOverlayId] = useState<string | null>(null);

  // Export State
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const { file, status, progress, flags, waveformBars, platform, showDownload, smartSummary } = studioState;

  // Derived Metrics for Strike Shield
  const riskFlags = flags.filter(f => f.status !== 'resolved' && (f.severity === 'red' || f.severity === 'orange'));
  const riskLevel = Math.min(riskFlags.length * 20, 100);
  const isSafe = riskFlags.length === 0;

  const themeColors: Record<Platform, string> = {
    YouTube: '#FF0000',
    Spotify: '#1DB954',
    General: '#1A1A1A' 
  };

  const updateState = (updates: Partial<StudioState>) => {
      setStudioState(prev => ({ ...prev, ...updates }));
  };

  const generateRandomFlags = (mode: Platform) => {
    // IMPACT HIERARCHY TERMINOLOGY - REFINED SPACING
    const definitions = [
        { severity: 'red', category: 'THE KILL-SWITCH', transcript: "You know, some people say we should just [bleep] all of them.", reason: 'Hate speech detected.' },
        { severity: 'orange', category: 'THE AD-RISK', transcript: "It's a total scam. Don't buy their garbage products ever.", reason: 'Advertiser conflict risk.' },
        { severity: 'yellow', category: 'THE SPICY TAKE', transcript: "Honestly, that entire country is overrated and boring.", reason: 'Subjective opinion / Hyperbole.' },
        { severity: 'blue', category: 'THE RECEIPT', transcript: "Studies show 99% of doctors agree with me on this.", reason: 'Unverified statistical claim.' }
    ];

    const numFlags = mode === 'General' ? 6 : Math.floor(Math.random() * 4) + 2; 
    const newFlags: Flag[] = [];

    for (let i = 0; i < numFlags; i++) {
        const def = definitions[Math.floor(Math.random() * definitions.length)];
        let severity = def.severity;
        
        // Randomize logic slightly for flavor
        if (mode === 'General' && Math.random() > 0.7) severity = 'orange';

        const randomSec = Math.floor(Math.random() * 1600) + 100;
        const mins = Math.floor(randomSec / 60);
        const secs = randomSec % 60;
        
        newFlags.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: `${mins}:${secs.toString().padStart(2, '0')}`,
            seconds: randomSec,
            severity: severity as any,
            type: def.category, // Category uses Impact Hierarchy labels
            transcript: def.transcript,
            aiReason: def.reason,
            suggestedFix: severity === 'red' ? 'Nuke Segment' : 'Review & Overlay',
            status: 'active',
            publicInLedger: true
        });
    }
    return newFlags.sort((a, b) => a.seconds - b.seconds);
  };

  const generateSummary = (flags: Flag[]) => {
      const redCount = flags.filter(f => f.severity === 'red').length;
      if (redCount > 1) return "Whoa there! High voltage detected. ⚡ Multiple Kill-Switch threats found. Recommend immediate review before export.";
      if (flags.length > 3) return "Spicy episode! 🌶️ Several unverified claims found. A few Receipt overlays will keep the advertisers happy.";
      return "Safe vibe overall, but that medical claim at 12:04 is spicy. 🌶️";
  };

  const startSimulation = (selectedFile?: File) => {
    let activeFile = selectedFile || file;
    if (!activeFile) {
        activeFile = new File(["foo"], "audio_file.mp3", { type: "audio/mpeg" });
    }
    
    // Explicitly starting a NEW simulation overwrites existing state
    updateState({
        file: activeFile,
        waveformBars: Array.from({ length: 80 }, () => Math.floor(Math.random() * 60) + 20),
        status: 'analyzing', 
        progress: 0,
        flags: [],
        showDownload: false,
        smartSummary: ''
    });
  };

  const handleQueueNext = () => {
      alert("Episode #43 added to processing queue.");
      reset();
  };

  const handleAutoFix = (id: string) => {
      const processingFlags = flags.map(f => f.id === id ? { ...f, status: 'processing' } as Flag : f);
      updateState({ flags: processingFlags });
      setTimeout(() => {
        const resolvedFlags = studioState.flags.map(f => f.id === id ? { ...f, status: 'resolved' } as Flag : f);
        setStudioState(prev => ({ ...prev, flags: resolvedFlags, showDownload: true }));
      }, 2000);
  };

  const handleOverlaySelect = (style: 'minimal' | 'bold' | 'context') => {
      if (!editingOverlayId) return;
      const updatedFlags = flags.map(f => 
          f.id === editingOverlayId ? { ...f, overlayStyle: style } as Flag : f
      );
      setStudioState(prev => ({ ...prev, flags: updatedFlags }));
  };

  const toggleLedgerVisibility = (id: string) => {
      const updatedFlags = flags.map(f => 
          f.id === id ? { ...f, publicInLedger: !f.publicInLedger } as Flag : f
      );
      setStudioState(prev => ({ ...prev, flags: updatedFlags }));
  };

  const handleExport = (type: string) => {
      setExportingType(type);
      setTimeout(() => {
          setExportingType(null);
          setExportSuccess(type); // Triggers the toast
          setTimeout(() => setExportSuccess(null), 4000);
      }, 2000);
  };

  const onFlagClick = (flag: Flag) => {
      if (flag.severity === 'blue' || flag.severity === 'yellow') {
          setEditingOverlayId(flag.id);
      }
  };

  useEffect(() => {
    if (status === 'analyzing') {
      const interval = setInterval(() => {
        setStudioState(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            const generatedFlags = generateRandomFlags(prev.platform);
            return { 
                ...prev, 
                status: 'complete', 
                progress: 100,
                flags: generatedFlags,
                smartSummary: generateSummary(generatedFlags)
            };
          }
          return { ...prev, progress: prev.progress + 2 }; 
        });
      }, 30);
      return () => clearInterval(interval);
    }
  }, [status, setStudioState]);

  // Nuke Logic
  useEffect(() => {
    if (nukingState === 'processing') {
      setNukeProgress(0);
      const interval = setInterval(() => {
        setNukeProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setNukingState('done');
            if (flagToNuke) {
                setStudioState(current => ({
                    ...current,
                    flags: current.flags.filter(f => f.id !== flagToNuke),
                    showDownload: true
                }));
            }
            return 100;
          }
          return prev + 1;
        });
      }, 20);
      return () => clearInterval(interval);
    }
  }, [nukingState, flagToNuke, setStudioState]);

  // Lockdown Logic (Emergency Override)
  useEffect(() => {
    if (lockdownState === 'processing') {
      setLockdownProgress(0);
      const interval = setInterval(() => {
        setLockdownProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setLockdownState('done');
            // Resolve all Red and Orange flags
            setStudioState(current => ({
                ...current,
                flags: current.flags.map(f => 
                    (f.severity === 'red' || f.severity === 'orange') 
                    ? { ...f, status: 'resolved', suggestedFix: 'SILENCED (AUTO)' } as Flag 
                    : f
                ),
                showDownload: true
            }));
            return 100;
          }
          return prev + 1.5; // Slightly faster than individual nuke
        });
      }, 25);
      return () => clearInterval(interval);
    }
  }, [lockdownState, setStudioState]);

  const reset = () => {
    setStudioState({
        file: null,
        status: 'idle',
        progress: 0,
        flags: [],
        waveformBars: [],
        platform: platform,
        showDownload: false,
        smartSummary: ''
    });
    setNukingState(null);
    setLockdownState(null);
    setEditingOverlayId(null);
  };

  const activeOverlayFlag = flags.find(f => f.id === editingOverlayId);

  return (
    <div className={`w-full min-h-screen pt-32 pb-32 px-6 bg-[#F5F1E6] relative animate-in fade-in zoom-in-95 duration-700 transition-colors duration-500`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Panel: Upload & Engine */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Header Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 bg-white px-8 py-6 rounded-[2.5rem] shadow-[4px_4px_0px_rgba(0,0,0,0.05)] transition-all duration-500 border-l-[12px]" style={{ borderLeftColor: themeColors[platform] }}>
            <h2 className="text-6xl font-black tracking-tighter flex items-center gap-3 transition-colors duration-500 uppercase" style={{ color: themeColors[platform] }}>
                Studio
            </h2>
            <div className="flex bg-[#F5F1E6] p-2 rounded-full shadow-inner">
               {(['YouTube', 'Spotify', 'General'] as Platform[]).map(p => (
                 <button
                   key={p}
                   onClick={() => updateState({ platform: p })}
                   className={`px-6 py-3 rounded-full font-bold text-sm transition-all duration-300 ${
                     platform === p ? 'shadow-xl text-white scale-105' : 'text-gray-400 hover:text-[#1A1A1A]'
                   }`}
                   style={{ backgroundColor: platform === p ? themeColors[p] : 'transparent' }}
                   disabled={status !== 'idle' && status !== 'complete'}
                 >
                   {p}
                 </button>
               ))}
            </div>
          </div>

          <div className={`bg-white rounded-[2.5rem] p-10 shadow-2xl min-h-[600px] flex flex-col relative overflow-hidden transition-all duration-500 border-4 border-white`}>
            
            <div className="flex-1 flex flex-col justify-center">
              
              {status === 'idle' && (
                <div 
                  className="flex-1 border-4 border-dashed border-[#E5E0D6] rounded-[2rem] flex flex-col items-center justify-center text-center p-12 hover:border-[#1A1A1A] hover:bg-gray-50 transition-all cursor-pointer group gap-6"
                  onClick={() => document.getElementById('file-upload')?.click()}
                >
                  <input 
                    id="file-upload" 
                    type="file" 
                    className="hidden" 
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        startSimulation(e.target.files[0]);
                      }
                    }} 
                  />
                  
                  <div className="w-32 h-32 bg-[#F5F1E6] rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-inner text-[#1A1A1A]">
                      <Upload size={48} className="opacity-50" />
                  </div>
                  <div>
                      <h3 className="text-4xl font-black text-[#1A1A1A] mb-3">Initialize Engine</h3>
                      <p className="text-gray-400 font-bold text-lg">Drop Audio File to Scan</p>
                  </div>
                </div>
              )}

              {status === 'analyzing' && (
                 <div className="w-full max-w-2xl mx-auto text-center space-y-8">
                    <h3 className="text-4xl font-black text-[#1A1A1A] animate-pulse">Running Neural Scan...</h3>
                    <div className="w-full h-16 bg-[#F5F1E6] rounded-full overflow-hidden relative shadow-inner ring-4 ring-[#F5F1E6]">
                       <div 
                         className="h-full rounded-full transition-all duration-75 ease-linear flex items-center justify-end pr-6 shadow-[0_0_30px_rgba(0,0,0,0.2)]"
                         style={{ width: `${progress}%`, backgroundColor: themeColors[platform] }}
                       >
                         <span className="text-xl font-black text-white/90 tracking-tighter">{Math.round(progress)}%</span>
                       </div>
                    </div>
                 </div>
              )}

              {status === 'complete' && (
                <div className="space-y-10 animate-in fade-in duration-700">
                  <div className="flex justify-between items-end px-4">
                     <h3 className="text-2xl font-black text-[#1A1A1A] flex items-center gap-3">
                        <CheckCircle className="w-8 h-8" style={{ color: themeColors.Spotify }} />
                        Audit Complete
                     </h3>
                  </div>

                  <Waveform 
                    isScanning={false} 
                    scanComplete={true} 
                    flags={flags}
                    themeColor={themeColors[platform]}
                    bars={waveformBars}
                    onFlagClick={onFlagClick}
                  />
                  
                  {/* Transparency Ledger */}
                  <div className="bg-[#1A1A1A] text-white rounded-3xl p-8 border-4 border-white shadow-lg animate-in slide-in-from-bottom-6">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="text-xl font-black uppercase tracking-widest flex items-center gap-3">
                            <ListPlus className="text-[#7BC65C]" /> Transparency Ledger
                        </h4>
                        <span className="text-xs font-bold bg-white/10 px-3 py-1 rounded-full">Public Log</span>
                      </div>
                      
                      <div className="space-y-4">
                          {flags.filter(f => f.status === 'resolved').length === 0 ? (
                              <p className="text-white/30 font-bold italic text-center py-4">No resolved items yet. Fix or Nuke segments to populate.</p>
                          ) : (
                              flags.filter(f => f.status === 'resolved').map(flag => (
                                  <div key={flag.id} className="flex items-center justify-between bg-white/5 p-4 rounded-xl border border-white/10">
                                      <div className="flex items-center gap-4">
                                          <div className={`w-2 h-2 rounded-full ${flag.severity === 'red' ? 'bg-[#F0543C]' : 'bg-[#FACC15]'}`}></div>
                                          <div>
                                              <p className="font-bold text-sm text-white/90">{flag.type} <span className="text-white/40 mx-2">|</span> {flag.timestamp}</p>
                                              <p className="text-xs text-white/50">Action: {flag.suggestedFix === 'Nuke Segment' ? 'Segment Scrubbed' : 'Correction Applied'}</p>
                                          </div>
                                      </div>
                                      <button 
                                        onClick={() => toggleLedgerVisibility(flag.id)}
                                        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-black uppercase tracking-wider transition-all ${flag.publicInLedger ? 'bg-[#7BC65C] text-[#1A1A1A]' : 'bg-white/10 text-white/40'}`}
                                      >
                                          {flag.publicInLedger ? <ToggleRight size={18} /> : <ToggleLeft size={18} />}
                                          {flag.publicInLedger ? 'Public' : 'Hidden'}
                                      </button>
                                  </div>
                              ))
                          )}
                      </div>
                  </div>

                  {/* SECTION C: Export Presets */}
                  {showDownload && (
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 animate-in slide-in-from-bottom-8">
                          {[
                            { id: 'clean', icon: <Mic size={32} className="text-[#7BC65C]" />, label: 'Clean Audio' },
                            { id: 'overlay', icon: <Video size={32} className="text-[#F0543C]" />, label: 'Audio + Overlay' },
                            { id: 'meta', icon: <Eye size={32} className="text-[#00E8FF]" />, label: 'YouTube Meta' }
                          ].map((preset) => (
                              <button 
                                key={preset.id}
                                onClick={() => handleExport(preset.id)}
                                disabled={!!exportingType}
                                className={`
                                    relative overflow-hidden p-6 rounded-2xl flex flex-col items-center gap-3 transition-all duration-300 shadow-lg active:scale-95 border-2
                                    ${exportingType === preset.id ? 'bg-[#1A1A1A] text-white border-[#1A1A1A]' : 'bg-white text-[#1A1A1A] border-[#1A1A1A]/10 hover:border-[#1A1A1A] hover:-translate-y-1'}
                                `}
                              >
                                  {exportingType === preset.id ? (
                                      <div className="flex flex-col items-center gap-2 animate-in fade-in">
                                          <Loader2 size={32} className="animate-spin text-[#7BC65C]" />
                                          <span className="font-bold text-sm">Compiling...</span>
                                      </div>
                                  ) : (
                                      <>
                                        {preset.icon}
                                        <span className="font-bold">{preset.label}</span>
                                      </>
                                  )}
                              </button>
                          ))}
                      </div>
                  )}

                  <div className="flex justify-between items-center px-6 pt-8 border-t border-gray-100">
                    <div className="flex gap-4">
                        <Button size="sm" variant="neutral" onClick={reset} icon={<RefreshCw size={16}/>}>New Scan</Button>
                        <Button size="sm" variant="neutral" onClick={handleQueueNext} icon={<ListPlus size={16}/>}>Queue Next</Button>
                    </div>
                  </div>

                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="lg:col-span-4 flex flex-col h-full gap-4">
           
           {/* Header: Strike Shield */}
           <div className={`rounded-[2.5rem] p-6 text-white shadow-xl transition-all duration-500 relative overflow-hidden ${isSafe ? 'bg-[#7BC65C]' : 'bg-[#1A1A1A]'}`}>
               <div className="flex justify-between items-start relative z-10">
                   <div>
                       <h3 className="text-lg font-black uppercase tracking-widest opacity-80 mb-1">Strike Shield</h3>
                       <p className="text-3xl font-black">{isSafe ? '100% SAFE' : `${Math.round(riskLevel)}% RISK`}</p>
                   </div>
                   <Shield size={32} className={isSafe ? 'text-white' : 'text-[#F0543C]'} />
               </div>
               
               {/* Risk Meter */}
               <div className="mt-4 w-full h-3 bg-black/20 rounded-full overflow-hidden">
                   <div className="h-full bg-white transition-all duration-500" style={{ width: `${isSafe ? 100 : riskLevel}%` }}></div>
               </div>

               {/* Power Cut Button */}
               {!isSafe && (
                   <div className="mt-6 pt-6 border-t border-white/10">
                       <button 
                         onClick={() => setLockdownState('confirm')}
                         className="w-full bg-[#F0543C] hover:bg-red-600 text-white font-black uppercase tracking-wide py-3 rounded-xl flex items-center justify-center gap-2 transition-colors shadow-lg active:scale-95"
                       >
                           <Power size={18} /> Emergency Override
                       </button>
                   </div>
               )}
           </div>

           {/* Content Switcher: Overlay Engine or Risk Feed */}
           {editingOverlayId && activeOverlayFlag ? (
               <div className="flex-1 bg-white rounded-[2.5rem] p-6 shadow-2xl border-4 border-[#1A1A1A] animate-in slide-in-from-right-8 flex flex-col">
                   <div className="flex justify-between items-center mb-6">
                       <h3 className="text-2xl font-black text-[#1A1A1A] flex items-center gap-2">
                           <LayoutTemplate size={24} /> Overlay Library
                       </h3>
                       <button onClick={() => setEditingOverlayId(null)} className="text-gray-400 hover:text-[#1A1A1A]">Close</button>
                   </div>

                   <p className="font-bold text-gray-500 mb-6">Select a style for "{activeOverlayFlag.type}"</p>

                   <div className="space-y-4 mb-8">
                       <button 
                        onClick={() => handleOverlaySelect('minimal')}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${activeOverlayFlag.overlayStyle === 'minimal' ? 'border-[#1A1A1A] bg-[#1A1A1A] text-white' : 'border-gray-100 hover:border-gray-300'}`}
                       >
                           <span className="font-black text-sm uppercase tracking-wider block mb-1">Style A: Minimalist</span>
                           <span className="text-xs opacity-70">Clean pill-shaped disclosure.</span>
                       </button>
                       <button 
                        onClick={() => handleOverlaySelect('bold')}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${activeOverlayFlag.overlayStyle === 'bold' ? 'border-[#F0543C] bg-[#F0543C] text-white' : 'border-gray-100 hover:border-gray-300'}`}
                       >
                           <span className="font-black text-sm uppercase tracking-wider block mb-1">Style B: Bold</span>
                           <span className="text-xs opacity-70">High-contrast correction box.</span>
                       </button>
                       <button 
                        onClick={() => handleOverlaySelect('context')}
                        className={`w-full p-4 rounded-xl border-2 text-left transition-all ${activeOverlayFlag.overlayStyle === 'context' ? 'border-[#00E8FF] bg-[#00E8FF] text-[#1A1A1A]' : 'border-gray-100 hover:border-gray-300'}`}
                       >
                           <span className="font-black text-sm uppercase tracking-wider block mb-1">Style C: Context Card</span>
                           <span className="text-xs opacity-70">Detailed fact-check with QR.</span>
                       </button>
                   </div>

                   {/* Live Preview Mock */}
                   <div className="flex-1 bg-black rounded-2xl relative overflow-hidden group">
                       <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-black flex items-center justify-center text-white/20 font-black text-4xl">
                           PREVIEW
                       </div>
                       
                       {/* Overlays */}
                       {activeOverlayFlag.overlayStyle === 'minimal' && (
                           <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-md px-6 py-2 rounded-full text-white text-xs font-bold border border-white/20 flex items-center gap-2 shadow-xl animate-in slide-in-from-bottom-4">
                               <AlertTriangle size={12} className="text-[#FACC15]" />
                               <span>Disclaimer: {activeOverlayFlag.aiReason}</span>
                           </div>
                       )}

                       {activeOverlayFlag.overlayStyle === 'bold' && (
                           <div className="absolute top-6 left-6 right-6 bg-[#F0543C] p-4 rounded-xl text-white shadow-xl animate-in slide-in-from-top-4 border-2 border-white">
                               <div className="font-black uppercase tracking-widest text-xs mb-1 flex items-center gap-2">
                                   <Type size={12} /> Correction
                               </div>
                               <p className="font-bold text-sm leading-tight">{activeOverlayFlag.suggestedFix}</p>
                           </div>
                       )}

                       {activeOverlayFlag.overlayStyle === 'context' && (
                           <div className="absolute bottom-6 right-6 bg-white text-[#1A1A1A] p-4 rounded-xl shadow-xl animate-in slide-in-from-right-4 w-48 border-4 border-[#00E8FF]">
                               <div className="flex justify-between items-start mb-2">
                                   <span className="font-black text-xs uppercase text-[#00E8FF]">Context</span>
                                   <QrCode size={24} />
                               </div>
                               <p className="font-bold text-[10px] leading-tight mb-2 opacity-80">
                                   Verified Source: <br/> Global Health Database
                               </p>
                           </div>
                       )}
                   </div>
               </div>
           ) : (
               <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-[2.5rem] p-6 space-y-4 min-h-[400px] border border-white shadow-lg overflow-y-auto max-h-[800px]">
                 <div className="flex justify-between items-center mb-4 px-2">
                    <h3 className="text-xl font-black text-[#1A1A1A]">Risk Feed</h3>
                    <span className="bg-[#1A1A1A] text-white px-3 py-1 rounded-full text-xs font-bold">{flags.filter(f => f.status !== 'resolved').length} Active</span>
                 </div>
                 
                 {status === 'idle' && (
                   <div className="h-full flex flex-col items-center justify-center text-gray-400/30 font-bold text-xl italic space-y-4 mt-20">
                     <Settings size={40} />
                     <p>Engine Idle</p>
                   </div>
                 )}

                 {flags.map((flag) => (
                   <FlagCard 
                     key={flag.id} 
                     flag={flag} 
                     autoNukeEnabled={false}
                     onNuke={() => { setFlagToNuke(flag.id); setNukingState('confirm'); }}
                     onFix={() => handleAutoFix(flag.id)}
                   />
                 ))}
                 
                 {status === 'complete' && flags.every(f => f.status === 'resolved') && (
                    <div className="h-full flex flex-col items-center justify-center text-[#7BC65C] space-y-4 animate-in zoom-in mt-20">
                        <CheckCircle size={64} />
                        <h4 className="text-2xl font-black">All Clear!</h4>
                    </div>
                 )}
               </div>
           )}
        </div>
      </div>

      {/* Export Success Toast */}
      {exportSuccess && (
          <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-bottom-10 fade-in duration-500">
               <div className="bg-[#1A1A1A] text-white px-8 py-4 rounded-full shadow-2xl flex items-center gap-4 border-2 border-[#7BC65C]">
                   <div className="bg-[#7BC65C] rounded-full p-1 text-[#1A1A1A]"><Check size={16} strokeWidth={4} /></div>
                   <span className="font-black uppercase tracking-wide">Download Ready!</span>
               </div>
          </div>
      )}

      {/* NUKE MODAL */}
      {nukingState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F0543C]/90 backdrop-blur-lg px-6 animate-in fade-in duration-300">
             <div className="bg-white rounded-[3rem] p-12 max-w-lg w-full shadow-2xl relative text-[#1A1A1A]">
                
                {nukingState === 'confirm' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                        <div className="w-32 h-32 bg-[#F0543C] text-white rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl">
                            <Trash2 size={64} />
                        </div>
                        <h3 className="text-5xl font-black uppercase text-[#1A1A1A] leading-none">Initiate <br/>Removal?</h3>
                        <p className="text-gray-500 text-xl font-bold">Permanently scrubbing segment.</p>
                        <div className="flex gap-4 pt-4">
                            <Button variant="neutral" className="flex-1" onClick={() => setNukingState(null)}>Cancel</Button>
                            <Button variant="danger" className="flex-1" onClick={() => setNukingState('processing')}>CONFIRM</Button>
                        </div>
                    </div>
                )}

                {nukingState === 'processing' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                         <h3 className="text-4xl font-black uppercase">Scrubbing...</h3>
                         <div className="w-full h-12 bg-[#F5F1E6] rounded-full overflow-hidden border-4 border-[#1A1A1A]">
                            <div 
                                className="h-full bg-[#1A1A1A] transition-all duration-75 ease-linear"
                                style={{ width: `${nukeProgress}%` }}
                            ></div>
                         </div>
                    </div>
                )}

                {nukingState === 'done' && (
                     <div className="text-center space-y-6 animate-in zoom-in-95">
                        <div className="w-24 h-24 bg-[#7BC65C] text-white rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-4xl font-black">Done.</h3>
                        <Button variant="primary" className="w-full" onClick={() => setNukingState(null)}>Return</Button>
                    </div>
                )}

             </div>
          </div>
      )}

      {/* LOCKDOWN MODAL (Emergency Override) */}
      {lockdownState && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#1A1A1A]/95 backdrop-blur-lg px-6 animate-in fade-in duration-300">
             <div className="bg-[#F0543C] rounded-[3rem] p-12 max-w-lg w-full shadow-2xl relative text-white border-4 border-white">
                
                {lockdownState === 'confirm' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                        <div className="w-32 h-32 bg-white text-[#F0543C] rounded-full mx-auto flex items-center justify-center mb-6 shadow-xl animate-pulse">
                            <AlertTriangle size={64} />
                        </div>
                        <h3 className="text-5xl font-black uppercase leading-none">Emergency<br/>Override</h3>
                        <p className="text-white/80 text-xl font-bold">This will silence ALL high-risk segments immediately. Irreversible.</p>
                        <div className="flex gap-4 pt-4">
                            <Button variant="neutral" className="flex-1" onClick={() => setLockdownState(null)}>Cancel</Button>
                            <Button variant="primary" className="flex-1 bg-[#1A1A1A] text-white border-white" onClick={() => setLockdownState('processing')}>EXECUTE</Button>
                        </div>
                    </div>
                )}

                {lockdownState === 'processing' && (
                    <div className="text-center space-y-8 animate-in zoom-in-95">
                         <h3 className="text-4xl font-black uppercase">Overriding...</h3>
                         <div className="w-full h-12 bg-black/20 rounded-full overflow-hidden border-4 border-white">
                            <div 
                                className="h-full bg-white transition-all duration-75 ease-linear"
                                style={{ width: `${lockdownProgress}%` }}
                            ></div>
                         </div>
                         <p className="font-mono text-sm uppercase">Silencing audio tracks...</p>
                    </div>
                )}

                {lockdownState === 'done' && (
                     <div className="text-center space-y-6 animate-in zoom-in-95">
                        <div className="w-24 h-24 bg-white text-[#F0543C] rounded-full mx-auto flex items-center justify-center mb-4 shadow-xl">
                            <CheckCircle size={48} />
                        </div>
                        <h3 className="text-4xl font-black">Secure.</h3>
                        <p className="font-bold">All liabilities neutralized.</p>
                        <Button variant="neutral" className="w-full" onClick={() => setLockdownState(null)}>Return to Studio</Button>
                    </div>
                )}

             </div>
          </div>
      )}

    </div>
  );
};