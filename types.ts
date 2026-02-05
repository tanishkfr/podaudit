export type Platform = 'YouTube' | 'Spotify' | 'General';

export type Severity = 'blue' | 'yellow' | 'orange' | 'red';

export interface Flag {
  id: string;
  timestamp: string; // e.g., "04:20"
  seconds: number; // for positioning
  severity: Severity;
  type: string;
  transcript: string;
  aiReason: string;
  suggestedFix: string;
}

export interface WaveformBar {
  height: number;
  active: boolean;
}