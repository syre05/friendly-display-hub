
import { create } from 'zustand';

export type InteractionMode = 'idle' | 'face' | 'voice' | 'touch';
export type RecognitionStatus = 'inactive' | 'detecting' | 'recognized' | 'error';

interface TotemState {
  interactionMode: InteractionMode;
  recognitionStatus: RecognitionStatus;
  userName: string | null;
  isListening: boolean;
  voiceCommand: string;
  
  // Acciones
  setInteractionMode: (mode: InteractionMode) => void;
  setRecognitionStatus: (status: RecognitionStatus) => void;
  setUserName: (name: string | null) => void;
  startListening: () => void;
  stopListening: () => void;
  setVoiceCommand: (command: string) => void;
  resetTotem: () => void;
}

export const useTotemStore = create<TotemState>((set) => ({
  interactionMode: 'idle',
  recognitionStatus: 'inactive',
  userName: null,
  isListening: false,
  voiceCommand: '',
  
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  setRecognitionStatus: (status) => set({ recognitionStatus: status }),
  setUserName: (name) => set({ userName: name }),
  startListening: () => set({ isListening: true }),
  stopListening: () => set({ isListening: false, voiceCommand: '' }),
  setVoiceCommand: (command) => set({ voiceCommand: command }),
  resetTotem: () => set({
    interactionMode: 'idle',
    recognitionStatus: 'inactive',
    userName: null,
    isListening: false,
    voiceCommand: '',
  }),
}));
