import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Activation = () => {
  const navigate = useNavigate();

  const handleActivate = () => {
    navigate("/activation-form");
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-4 py-12">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-card glass-card rounded-xl flex flex-col items-center justify-center glow-effect">
            <span className="text-primary font-bold text-xl">F</span>
            <span className="text-primary text-[7px] -mt-1">Flexoo</span>
          </div>
          <h1 className="text-2xl font-bold text-foreground">Flexoo Activation</h1>
        </div>

        {/* Glass Banner */}
        <div className="w-full max-w-md mb-10">
          <div className="glass-card rounded-2xl p-6 relative overflow-hidden glow-effect">
            <div className="bg-primary rounded-lg px-4 py-4 text-center">
              <span className="text-primary-foreground font-black text-2xl md:text-3xl tracking-wide banner-text">
                FLEXOO
              </span>
            </div>
          </div>
        </div>

        {/* Welcome Text with Glass Effect */}
        <div className="glass-card rounded-2xl p-8 max-w-md text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-primary mb-4">
            Welcome to Flexoo Payment System
          </h2>
          
          <p className="text-muted-foreground text-lg">
            Activate your account and start using Flexoo today!
          </p>
        </div>

        {/* Activate Button */}
        <Button 
          onClick={handleActivate}
          size="lg" 
          className="px-12 py-6 text-lg font-semibold rounded-xl glow-effect hover:scale-105 transition-all duration-300"
        >
          Activate
        </Button>
      </div>
    </main>
  );
};

export default Activation;
