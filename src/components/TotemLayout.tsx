
import { ReactNode } from 'react';
import { useTotemStore, InteractionMode } from '@/store/totemStore';
import { Mic, Hand, ScanFace } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface TotemLayoutProps {
  children: ReactNode;
  showTabs?: boolean;
}

const TotemLayout = ({ children, showTabs = true }: TotemLayoutProps) => {
  const { interactionMode, setInteractionMode } = useTotemStore();
  
  const handleTabChange = (value: string) => {
    setInteractionMode(value as InteractionMode);
  };
  
  return (
    <div className="flex flex-col h-screen bg-totem-background">
      {/* Cabecera */}
      <header className="totem-gradient text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Tótem Interactivo</h1>
        </div>
      </header>
      
      {/* Contenido principal */}
      <main className="flex-1 overflow-auto container mx-auto py-6 px-4">
        <Card className="shadow-lg border-none p-6 max-w-4xl mx-auto">
          {showTabs ? (
            <Tabs 
              defaultValue={interactionMode} 
              onValueChange={handleTabChange}
              className="w-full"
            >
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="face" className="flex items-center gap-2">
                  <ScanFace className="h-5 w-5" />
                  <span>Facial</span>
                </TabsTrigger>
                <TabsTrigger value="voice" className="flex items-center gap-2">
                  <Mic className="h-5 w-5" />
                  <span>Voz</span>
                </TabsTrigger>
                <TabsTrigger value="touch" className="flex items-center gap-2">
                  <Hand className="h-5 w-5" />
                  <span>Táctil</span>
                </TabsTrigger>
              </TabsList>
              
              <div className="min-h-[400px]">
                {children}
              </div>
            </Tabs>
          ) : (
            <div className="min-h-[400px]">
              {children}
            </div>
          )}
        </Card>
      </main>
      
      {/* Pie de página */}
      <footer className="text-center p-4 text-muted-foreground bg-muted">
        <p>&copy; 2023 - Tótem de Reconocimiento e Interacción</p>
      </footer>
    </div>
  );
};

export default TotemLayout;
