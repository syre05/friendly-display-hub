
import { useEffect } from 'react';
import { useTotemStore } from '@/store/totemStore';
import TotemLayout from '@/components/TotemLayout';
import FaceRecognition from '@/components/FaceRecognition';
import VoiceControl from '@/components/VoiceControl';
import TouchNavigation from '@/components/TouchNavigation';

const Index = () => {
  const { interactionMode, setInteractionMode } = useTotemStore();
  
  // Establecer el modo inicial
  useEffect(() => {
    if (interactionMode === 'idle') {
      setInteractionMode('face');
    }
  }, [interactionMode, setInteractionMode]);
  
  return (
    <TotemLayout>
      {interactionMode === 'face' && <FaceRecognition />}
      {interactionMode === 'voice' && <VoiceControl />}
      {interactionMode === 'touch' && <TouchNavigation />}
    </TotemLayout>
  );
};

export default Index;
