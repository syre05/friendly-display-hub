
import { useState, useEffect } from 'react';
import { useTotemStore } from '@/store/totemStore';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VoiceControl = () => {
  const { isListening, voiceCommand, startListening, stopListening, setVoiceCommand, setUserName, setCurrentStep } = useTotemStore();
  const [feedback, setFeedback] = useState('');
  
  // Simulación de reconocimiento de voz
  useEffect(() => {
    if (isListening) {
      const phrases = ['Hola', 'Menú principal', 'Usuario Demo', 'Accediendo'];
      let counter = 0;
      
      const interval = setInterval(() => {
        if (counter < phrases.length) {
          setVoiceCommand(phrases[counter]);
          counter++;
          
          // Cuando detectamos el nombre de usuario (simulación)
          if (counter === 3) {
            setUserName('Usuario Demo');
            
            // Programar cambio al siguiente paso
            setTimeout(() => {
              setCurrentStep('confirmation');
              stopListening();
            }, 1500);
          }
        } else {
          stopListening();
          clearInterval(interval);
          
          // Proporcionar feedback
          setFeedback('Comando reconocido: "' + phrases[phrases.length - 1] + '"');
          setTimeout(() => setFeedback(''), 3000);
        }
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isListening, stopListening, setVoiceCommand, setUserName, setCurrentStep]);
  
  const handleVoiceControl = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
      setFeedback('Escuchando... Diga su nombre');
    }
  };
  
  // Iniciar escucha automáticamente
  useEffect(() => {
    if (!isListening) {
      handleVoiceControl();
    }
  }, []);
  
  return (
    <div className="flex flex-col items-center space-y-4 w-full py-8">
      <h2 className="text-2xl font-bold mb-4 text-totem-primary">Control por Voz</h2>
      
      <p className="text-lg mb-4">
        Por favor diga su nombre para identificarse
      </p>
      
      <Button 
        onClick={handleVoiceControl}
        className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${
          isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-totem-secondary hover:bg-totem-primary'
        }`}
      >
        {isListening ? (
          <MicOff className="h-8 w-8" />
        ) : (
          <Mic className="h-8 w-8" />
        )}
      </Button>
      
      {isListening && (
        <div className="bg-muted rounded-full px-4 py-2 flex items-center space-x-2 animate-pulse">
          <Volume2 className="h-4 w-4" />
          <span>{voiceCommand || "Escuchando..."}</span>
        </div>
      )}
      
      {feedback && !isListening && (
        <div className="bg-green-100 text-green-800 rounded-full px-4 py-2 text-sm">
          {feedback}
        </div>
      )}
      
      <p className="text-sm text-muted-foreground">
        {isListening 
          ? "Hable ahora para identificarse..." 
          : "Pulse el botón para hablar"}
      </p>
    </div>
  );
};

export default VoiceControl;
