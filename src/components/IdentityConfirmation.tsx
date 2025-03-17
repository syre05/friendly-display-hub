
import { Button } from "@/components/ui/button";
import { useTotemStore } from "@/store/totemStore";
import { Check, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const IdentityConfirmation = () => {
  const { userName, setCurrentStep, isListening, voiceCommand, startListening, stopListening } = useTotemStore();
  const { toast } = useToast();

  // Detectar comandos de voz para confirmación
  useEffect(() => {
    if (isListening) {
      const command = voiceCommand.toLowerCase();
      if (command.includes('sí') || command.includes('si') || command === 'yes') {
        handleConfirm();
      } else if (command.includes('no') || command === 'no') {
        handleReject();
      }
    }
  }, [isListening, voiceCommand]);

  const handleConfirm = () => {
    stopListening();
    setCurrentStep('menu');
    toast({
      title: "Identidad confirmada",
      description: "Bienvenido al sistema",
    });
  };

  const handleReject = () => {
    stopListening();
    setCurrentStep('identification');
    toast({
      title: "Identidad rechazada",
      description: "Intentemos de nuevo",
    });
  };

  const handleVoiceControl = () => {
    if (!isListening) {
      startListening();
      toast({
        description: "Diga 'Sí' para confirmar o 'No' para rechazar",
      });
    } else {
      stopListening();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8 px-6 text-center">
      <h2 className="text-2xl font-bold mb-6 text-totem-primary">Confirmar Identidad</h2>
      
      <div className="mb-8 p-6 bg-muted rounded-lg">
        <p className="text-xl mb-4">
          Hola, <span className="font-bold">{userName || "Usuario"}</span>
        </p>
        <p className="text-lg">
          ¿Es correcta esta identificación?
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
        <Button 
          onClick={handleConfirm}
          className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 h-16 text-lg"
          size="lg"
        >
          <Check className="h-6 w-6" />
          <span>Sí, soy yo</span>
        </Button>
        
        <Button 
          onClick={handleReject}
          className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 h-16 text-lg"
          variant="destructive"
          size="lg"
        >
          <X className="h-6 w-6" />
          <span>No soy yo</span>
        </Button>
      </div>
      
      <Button 
        onClick={handleVoiceControl}
        className={`mt-6 ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-totem-secondary hover:bg-totem-secondary/90'}`}
      >
        {isListening ? "Escuchando..." : "Confirmar por voz"}
      </Button>
    </div>
  );
};

export default IdentityConfirmation;
