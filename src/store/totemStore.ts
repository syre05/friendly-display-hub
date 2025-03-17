
import { create } from 'zustand';

export type InteractionMode = 'idle' | 'face' | 'voice' | 'touch';
export type RecognitionStatus = 'inactive' | 'detecting' | 'recognized' | 'error';
export type UserFlow = 'welcome' | 'identification' | 'confirmation' | 'menu' | 'interaction' | 'finish';

interface TotemState {
  interactionMode: InteractionMode;
  recognitionStatus: RecognitionStatus;
  userName: string | null;
  isListening: boolean;
  voiceCommand: string;
  currentStep: UserFlow;
  
  // Acciones
  setInteractionMode: (mode: InteractionMode) => void;
  setRecognitionStatus: (status: RecognitionStatus) => void;
  setUserName: (name: string | null) => void;
  startListening: () => void;
  stopListening: () => void;
  setVoiceCommand: (command: string) => void;
  setCurrentStep: (step: UserFlow) => void;
  resetTotem: () => void;
}

export const useTotemStore = create<TotemState>((set) => ({
  interactionMode: 'idle',
  recognitionStatus: 'inactive',
  userName: null,
  isListening: false,
  voiceCommand: '',
  currentStep: 'welcome',
  
  setInteractionMode: (mode) => set({ interactionMode: mode }),
  setRecognitionStatus: (status) => set({ recognitionStatus: status }),
  setUserName: (name) => set({ userName: name }),
  startListening: () => set({ isListening: true }),
  stopListening: () => set({ isListening: false, voiceCommand: '' }),
  setVoiceCommand: (command) => set({ voiceCommand: command }),
  setCurrentStep: (step) => set({ currentStep: step }),
  resetTotem: () => set({
    interactionMode: 'idle',
    recognitionStatus: 'inactive',
    userName: null,
    isListening: false,
    voiceCommand: '',
    currentStep: 'welcome',
  }),
}));
