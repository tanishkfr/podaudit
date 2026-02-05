import React, { useState, useEffect } from 'react';
import { Platform, Flag, StudioState } from '../types';
import { Button } from '../components/Button';
import { Waveform } from '../components/Waveform';
import { FlagCard } from '../components/FlagCard';
import { Upload, Sparkles, CheckCircle, Download, RefreshCw, Trash2, Settings, Loader2, Lightbulb, ListPlus, FileText, Video, Mic, Eye, Check } from 'lucide-react';

interface StudioProps {
    studioState: StudioState;
    setStudioState: React.Dispatch<React.SetStateAction<StudioState>>;
}

export const Studio: React.FC<StudioProps> = ({ studioState, setStudioState }) => {
  const [nukingState, setNukingState] = useState<'confirm' | 'processing' | 'done' | null>(null);
  const [flagToNuke, setFlagToNuke] = useState<string | null>(null);
  const [nukeProgress, setNukeProgress] = useState(0);
  
  // Export State
  const [exportingType, setExportingType] = useState<string | null>(null);
  const [exportSuccess, setExportSuccess] = useState<string | null>(null);

  const { file, status, progress, flags, waveformBars, platform, showDownload, smartSummary } = studioState;

  const themeColors: Record<Platform, string> = {
    YouTube: '#FF0000',
    Spotify: '#1DB954',
    General: '#1A1A1A' 
  };

  const updateState = (updates: Partial<StudioState>) => {
      setStudioState(prev => ({ ...prev, ...updates }));
  };

  const generateRandomFlags = (mode: Platform) => {
    const types = [
        { severity: 'red', type: 'The Nuke Zone', reason: 'Hate speech detected.', transcript: "You know, some people say we should just [bleep] all of them." },
        { severity: 'orange', type: 'Advertiser Risk', reason: 'Excessive conflict.', transcript: "It's a total scam. Don't buy their garbage products ever." },
        { severity: 'yellow', type: 'Hot Take', reason: 'Subjective opinion.', transcript: "Honestly, that entire country is overrated and boring." },
        { severity: 'blue', type: 'Citation Needed', reason: 'Unverified stat.', transcript: "Studies show 99% of doctors agree with me on this." }
    ];

    const numFlags = mode === 'General' ? 6 : Math.floor(Math.random() * 4) + 2; 
    const newFlags: Flag[] = [];

    for (let i = 0; i < numFlags; i++) {
        const randomType = types[Math.floor(Math.random() * types.length)];
        let severity = randomType.severity;
        if (mode === 'General' && Math.random() > 0.5) severity = 'orange';

        const randomSec = Math.floor(Math.random() * 1600) + 100;
        const mins = Math.floor(randomSec / 60);
        const secs = randomSec % 60;
        
        newFlags.push({
            id: Math.random().toString(36).substr(2, 9),
            timestamp: `${mins}:${secs.toString().padStart(2, '0')}`,
            seconds: randomSec,
            severity: severity as any,
            type: randomType.type,
            transcript: randomType.transcript,
            aiReason: randomType.reason,
            suggestedFix: severity === 'red' ? 'Nuke Segment' : 'Review',
            status: 'active'
        });
    }
    return newFlags.sort((a, b) => a.seconds - b.seconds);
  };

  const generateSummary = (flags: Flag[]) => {
      const redCount = flags.filter(f => f.severity === 'red').length;
      if (redCount > 1) return "Whoa there! High voltage detected. ⚡ Multiple liability threats found. Recommend immediate review before export.";
      if (flags.length > 3) return "Spicy episode! 🌶️ Several unverified claims found. A few disclaimers will keep the advertisers happy.";
      return "Safe vibe overall, but that medical claim at 12:04 is spicy. 🌶️";
  };

  const startSimulation = (selectedFile?: File) => {
    let activeFile = selectedFile || file;
    if (!activeFile) {
        activeFile = new File(["foo"], "audio_file.mp3", { type: "audio/mpeg" });
    }
    
    updateState({
        file: activeFile,
        waveformBars: Array.from({ length: 80 }, () => Math.floor(Math.random() * 60) + 20),
        status: 'analyzing', // Start analyzing immediately
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

  const handleExport = (type: string) => {
      setExportingType(type);
      setTimeout(() => {
          setExportingType(null);
          setExportSuccess(type);
          setTimeout(() => setExportSuccess(null), 4000);
      }, 2000);
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
  };

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
                  />

                  {/* SECTION A: Smart Summary */}
                  <div className="bg-[#F5F1E6] rounded-2xl p-8 border-l-8 border-[#1A1A1A] animate-in slide-in-from-bottom-4 shadow-sm">
                      <div className="flex items-center gap-3 mb-4">
                          <div className="p-2 bg-[#F0543C] rounded-lg text-white">
                            <Lightbulb size={24} />
                          </div>
                          <span className="font-black uppercase tracking-widest text-sm text-[#1A1A1A]/60">AI Smart Summary</span>
                      </div>
                      <p className="text-2xl font-bold text-[#1A1A1A] leading-tight">
                          "{smartSummary}"
                      </p>
                  </div>
                  
                  {/* SECTION B: Transcript Deep-Dive */}
                  <div className="bg-white border-2 border-[#1A1A1A]/5 rounded-3xl p-8 animate-in slide-in-from-bottom-6 shadow-sm">
                       <div className="flex items-center justify-between mb-6">
                           <div className="flex items-center gap-2">
                                <FileText className="text-[#1A1A1A]" />
                                <h4 className="text-xl font-black text-[#1A1A1A]">Transcript Deep-Dive</h4>
                           </div>
                           <span className="text-xs font-bold uppercase tracking-widest bg-[#F5F1E6] px-3 py-1 rounded-full text-gray-500">Auto-Generated</span>
                       </div>
                       <div className="max-h-64 overflow-y-auto pr-4 space-y-6">
                           {flags.length === 0 ? (
                               <p className="text-gray-400 font-medium italic">No flagged content found. Clean transcript available for export.</p>
                           ) : (
                               flags.filter(f => f.status !== 'resolved').map((flag, i) => (
                                   <div key={i} className="group">
                                       <div className="flex items-center gap-3 mb-2">
                                           <span className="font-mono text-xs font-bold text-gray-400">{flag.timestamp}</span>
                                           <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                                               flag.severity === 'red' ? 'bg-red-100 text-red-600' :
                                               flag.severity === 'orange' ? 'bg-orange-100 text-orange-600' :
                                               flag.severity === 'yellow' ? 'bg-yellow-100 text-yellow-600' : 'bg-blue-100 text-blue-600'
                                           }`}>{flag.type}</span>
                                       </div>
                                       <p className="text-lg font-medium text-gray-800 border-l-4 border-gray-100 pl-4 py-1 group-hover:border-[#1A1A1A] transition-colors">
                                           "... {flag.transcript} ..."
                                       </p>
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

        {/* Right Panel: Flag Feed */}
        <div className="lg:col-span-4 flex flex-col h-full">
           <div className="bg-[#1A1A1A] text-white p-8 rounded-t-[2.5rem] flex items-center justify-between shadow-xl z-10 relative">
             <h3 className="text-2xl font-black tracking-tight">Risk Feed</h3>
             <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-bold">{flags.filter(f => f.status !== 'resolved').length} Issues</span>
           </div>
           
           <div className="flex-1 bg-white/60 backdrop-blur-sm rounded-b-[2.5rem] p-6 space-y-4 min-h-[400px] border border-white shadow-lg -mt-4 pt-10 overflow-y-auto max-h-[800px]">
             {status === 'idle' && (
               <div className="h-full flex flex-col items-center justify-center text-gray-400/30 font-bold text-xl italic space-y-4">
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
                <div className="h-full flex flex-col items-center justify-center text-[#7BC65C] space-y-4 animate-in zoom-in">
                    <CheckCircle size={64} />
                    <h4 className="text-2xl font-black">All Clear!</h4>
                </div>
             )}
           </div>
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

    </div>
  );
};