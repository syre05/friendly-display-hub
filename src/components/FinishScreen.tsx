
import { Button } from "@/components/ui/button";
import { useTotemStore } from "@/store/totemStore";
import { Home } from "lucide-react";
import { useEffect } from "react";

const FinishScreen = () => {
  const { resetTotem, isListening, voiceCommand, startListening, stopListening } = useTotemStore();
  
  // Auto reinicio después de un tiempo
  useEffect(() => {
    const timer = setTimeout(() => {
      resetTotem();
    }, 15000); // 15 segundos
    
    return () => clearTimeout(timer);
  }, [resetTotem]);
  
  // Detectar comando de voz para reiniciar
  useEffect(() => {
    if (isListening) {
      const command = voiceCommand.toLowerCase();
      if (command.includes('iniciar') || command.includes('reiniciar') || command.includes('volver')) {
        handleRestart();
      }
    }
  }, [isListening, voiceCommand]);
  
  const handleRestart = () => {
    stopListening();
    resetTotem();
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-10 px-6 text-center">
      <h2 className="text-3xl font-bold mb-6 text-totem-primary">¡Gracias por su visita!</h2>
      
      <p className="text-xl mb-10">
        Su sesión ha finalizado
      </p>
      
      <Button 
        onClick={handleRestart}
        className="flex items-center gap-2 bg-totem-primary hover:bg-totem-primary/90 h-16 text-lg"
        size="lg"
      >
        <Home className="h-6 w-6" />
        <span>Volver al Inicio</span>
      </Button>
      
      <p className="text-muted-foreground text-sm mt-8">
        Esta pantalla se reiniciará automáticamente en unos momentos...
      </p>
    </div>
  );
};

export default FinishScreen;
