
import { useTotemStore } from '@/store/totemStore';
import TotemLayout from '@/components/TotemLayout';
import FaceRecognition from '@/components/FaceRecognition';
import VoiceControl from '@/components/VoiceControl';
import TouchNavigation from '@/components/TouchNavigation';
import WelcomeScreen from '@/components/WelcomeScreen';
import IdentityConfirmation from '@/components/IdentityConfirmation';
import OptionsMenu from '@/components/OptionsMenu';
import FinishScreen from '@/components/FinishScreen';

const Index = () => {
  const { currentStep, interactionMode } = useTotemStore();
  
  // Renderizar el contenido según el paso actual del flujo
  const renderContent = () => {
    switch (currentStep) {
      case 'welcome':
        return <WelcomeScreen />;
      
      case 'identification':
        // Mostrar el componente de reconocimiento según el modo elegido
        if (interactionMode === 'face') return <FaceRecognition />;
        if (interactionMode === 'voice') return <VoiceControl />;
        if (interactionMode === 'touch') return <TouchNavigation />;
        return <FaceRecognition />;
      
      case 'confirmation':
        return <IdentityConfirmation />;
      
      case 'menu':
        return <OptionsMenu />;
      
      case 'interaction':
        // Aquí se podría mostrar el contenido específico según la opción seleccionada
        // Por ahora, volvemos al menú para simplificar
        return <OptionsMenu />;
      
      case 'finish':
        return <FinishScreen />;
      
      default:
        return <WelcomeScreen />;
    }
  };
  
  return (
    <TotemLayout showTabs={currentStep !== 'welcome' && currentStep !== 'finish'}>
      {renderContent()}
    </TotemLayout>
  );
};

export default Index;
