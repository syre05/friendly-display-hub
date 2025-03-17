
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Info, HelpCircle, User, Settings, Home } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const TouchNavigation = () => {
  const { toast } = useToast();
  
  const handleNavigation = (destination: string) => {
    toast({
      title: `Navegando a ${destination}`,
      description: "Esta funcionalidad estará disponible pronto.",
    });
  };
  
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-4 text-center">Navegación Táctil</h2>
      
      <div className="grid grid-cols-2 gap-4">
        <Card 
          className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleNavigation("Inicio")}
        >
          <Home className="h-10 w-10 mb-2 text-totem-primary" />
          <span className="font-medium">Inicio</span>
        </Card>
        
        <Card 
          className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleNavigation("Perfil")}
        >
          <User className="h-10 w-10 mb-2 text-totem-primary" />
          <span className="font-medium">Perfil</span>
        </Card>
        
        <Card 
          className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleNavigation("Información")}
        >
          <Info className="h-10 w-10 mb-2 text-totem-primary" />
          <span className="font-medium">Información</span>
        </Card>
        
        <Card 
          className="p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-muted/50 transition-colors"
          onClick={() => handleNavigation("Ayuda")}
        >
          <HelpCircle className="h-10 w-10 mb-2 text-totem-primary" />
          <span className="font-medium">Ayuda</span>
        </Card>
      </div>
      
      <div className="mt-6 flex justify-center">
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={() => handleNavigation("Configuración")}
        >
          <Settings className="h-4 w-4" />
          <span>Configuración</span>
        </Button>
      </div>
    </div>
  );
};

export default TouchNavigation;
