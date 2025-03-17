
import { useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useTotemStore } from "@/store/totemStore";
import { Mic, Hand, ScanFace } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const WelcomeScreen = () => {
  const { setCurrentStep, setInteractionMode, isListening, voiceCommand, startListening, stopListening } = useTotemStore();
  const { toast } = useToast();

  // Detectar comandos de voz
  useEffect(() => {
    if (isListening && voiceCommand.toLowerCase().includes('iniciar')) {
      handleStart('voice');
      stopListening();
    }
  }, [isListening, voiceCommand, stopListening]);
  
  const handleStart = (mode: 'face' | 'voice' | 'touch') => {
    setInteractionMode(mode);
    setCurrentStep('identification');
    
    toast({
      title: `Interacción por ${mode === 'face' ? 'reconocimiento facial' : mode === 'voice' ? 'voz' : 'táctil'}`,
      description: "Iniciando el proceso de identificación",
    });
  };
  
  const handleVoiceStart = () => {
    startListening();
    toast({
      description: "Diga 'Iniciar' para comenzar",
    });
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 px-6 text-center">
      <h1 className="text-3xl font-bold mb-6 text-totem-primary">Bienvenido al Tótem Interactivo</h1>
      
      <p className="text-xl mb-10">
        Elija cómo desea interactuar con el sistema
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-2xl mb-8">
        <Button 
          onClick={() => handleStart('face')}
          className="flex flex-col items-center py-8 h-auto bg-totem-primary hover:bg-totem-primary/90"
          size="lg"
        >
          <ScanFace className="h-12 w-12 mb-2" />
          <span className="text-lg font-medium">Facial</span>
        </Button>
        
        <Button 
          onClick={handleVoiceStart}
          className="flex flex-col items-center py-8 h-auto bg-totem-secondary hover:bg-totem-secondary/90"
          size="lg"
        >
          <Mic className="h-12 w-12 mb-2" />
          <span className="text-lg font-medium">Voz</span>
          <span className="text-xs mt-2">{isListening ? "Escuchando..." : "Toque para hablar"}</span>
        </Button>
        
        <Button 
          onClick={() => handleStart('touch')}
          className="flex flex-col items-center py-8 h-auto bg-totem-accent hover:bg-totem-accent/90"
          size="lg"
        >
          <Hand className="h-12 w-12 mb-2" />
          <span className="text-lg font-medium">Táctil</span>
        </Button>
      </div>
      
      <p className="text-muted-foreground text-sm mt-4">
        Toque un botón o diga "Iniciar" para comenzar
      </p>
    </div>
  );
};

export default WelcomeScreen;
