
import { useEffect } from 'react';
import { useTotemStore } from '@/store/totemStore';
import { User, UserCheck2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FaceRecognition = () => {
  const { 
    recognitionStatus, 
    setRecognitionStatus, 
    setUserName, 
    setCurrentStep 
  } = useTotemStore();

  // Simulación del proceso de reconocimiento facial
  useEffect(() => {
    if (recognitionStatus === 'detecting') {
      const timer = setTimeout(() => {
        // Simulamos un reconocimiento exitoso después de 3 segundos
        setRecognitionStatus('recognized');
        setUserName('Usuario Demo');
        
        // Avanzamos al paso de confirmación
        const confirmTimer = setTimeout(() => {
          setCurrentStep('confirmation');
        }, 1500);
        
        return () => clearTimeout(confirmTimer);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, [recognitionStatus, setRecognitionStatus, setUserName, setCurrentStep]);

  const startDetection = () => {
    setRecognitionStatus('detecting');
  };

  // Si aún no se ha iniciado la detección, iniciarla automáticamente
  useEffect(() => {
    if (recognitionStatus === 'inactive') {
      startDetection();
    }
  }, [recognitionStatus]);

  return (
    <div className="flex flex-col items-center justify-center w-full py-8">
      <h2 className="text-2xl font-bold mb-6 text-totem-primary">Reconocimiento Facial</h2>
      
      <div 
        className="relative w-48 h-48 mb-6 rounded-full flex items-center justify-center bg-muted cursor-pointer"
        onClick={startDetection}
      >
        {recognitionStatus === 'inactive' && (
          <User className="h-20 w-20 text-muted-foreground" />
        )}
        
        {recognitionStatus === 'detecting' && (
          <>
            <div className="absolute inset-0 rounded-full animate-pulse-ring bg-totem-secondary opacity-50"></div>
            <User className="h-20 w-20 text-totem-secondary animate-breathe" />
          </>
        )}
        
        {recognitionStatus === 'recognized' && (
          <UserCheck2 className="h-20 w-20 text-green-500" />
        )}
        
        {recognitionStatus === 'error' && (
          <AlertCircle className="h-20 w-20 text-red-500" />
        )}
      </div>
      
      <div className="text-center">
        {recognitionStatus === 'inactive' && (
          <p className="text-lg font-medium">Toque para iniciar reconocimiento facial</p>
        )}
        
        {recognitionStatus === 'detecting' && (
          <p className="text-lg font-medium text-totem-secondary">
            Detectando rostro...
          </p>
        )}
        
        {recognitionStatus === 'recognized' && (
          <div>
            <p className="text-xl font-bold text-totem-primary">¡Bienvenido!</p>
            <p className="text-lg font-medium">{useTotemStore.getState().userName}</p>
          </div>
        )}
        
        {recognitionStatus === 'error' && (
          <div className="space-y-3">
            <p className="text-lg font-medium text-red-500">
              No se pudo reconocer. Intente nuevamente.
            </p>
            <Button onClick={startDetection}>
              Reintentar
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FaceRecognition;
