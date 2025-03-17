
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTotemStore } from "@/store/totemStore";
import { CalendarDays, X, HelpCircle, User, FileText, Info } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useEffect } from "react";

const OptionsMenu = () => {
  const { userName, setCurrentStep, isListening, voiceCommand, startListening, stopListening } = useTotemStore();
  const { toast } = useToast();

  // Opciones del menú
  const menuOptions = [
    { id: 'consulta', title: 'Consultar Cita', icon: CalendarDays },
    { id: 'cancelar', title: 'Cancelar Cita', icon: X },
    { id: 'documentos', title: 'Documentos', icon: FileText },
    { id: 'perfil', title: 'Mi Perfil', icon: User },
    { id: 'info', title: 'Información', icon: Info },
    { id: 'ayuda', title: 'Ayuda', icon: HelpCircle },
  ];

  // Detectar comandos de voz para opciones
  useEffect(() => {
    if (isListening && voiceCommand) {
      const command = voiceCommand.toLowerCase();
      
      for (const option of menuOptions) {
        if (command.includes(option.title.toLowerCase())) {
          handleOptionSelect(option.id);
          break;
        }
      }
      
      if (command.includes('finalizar') || command.includes('salir')) {
        handleFinish();
      }
    }
  }, [isListening, voiceCommand]);

  const handleOptionSelect = (optionId: string) => {
    stopListening();
    setCurrentStep('interaction');
    
    toast({
      title: `Opción seleccionada: ${menuOptions.find(opt => opt.id === optionId)?.title}`,
      description: "Accediendo a la información solicitada",
    });
  };

  const handleFinish = () => {
    stopListening();
    setCurrentStep('finish');
  };

  const handleVoiceControl = () => {
    if (!isListening) {
      startListening();
      toast({
        description: "Diga el nombre de la opción que desea seleccionar",
      });
    } else {
      stopListening();
    }
  };

  return (
    <div className="flex flex-col items-center w-full py-6 px-4">
      <h2 className="text-2xl font-bold mb-4 text-totem-primary">Menú Principal</h2>
      
      <p className="mb-6 text-lg">
        Hola <span className="font-semibold">{userName || "Usuario"}</span>, ¿qué desea hacer hoy?
      </p>
      
      <div className="grid grid-cols-2 gap-4 w-full mb-6">
        {menuOptions.map((option) => (
          <Card 
            key={option.id}
            className="p-4 flex flex-col items-center cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => handleOptionSelect(option.id)}
          >
            <option.icon className="h-10 w-10 mb-2 text-totem-primary" />
            <span className="text-center font-medium">{option.title}</span>
          </Card>
        ))}
      </div>
      
      <div className="w-full flex flex-col items-center gap-3 mt-2">
        <Button 
          onClick={handleVoiceControl}
          className={`${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-totem-secondary hover:bg-totem-secondary/90'}`}
        >
          {isListening ? "Escuchando..." : "Seleccionar por voz"}
        </Button>
        
        <Button 
          onClick={handleFinish}
          variant="outline"
        >
          Finalizar
        </Button>
      </div>
    </div>
  );
};

export default OptionsMenu;
