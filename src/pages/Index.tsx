import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-4">
      {/* Background glow effects */}
      <div className="absolute top-1/3 left-1/3 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="relative z-10 text-center">
        <div className="glass-card rounded-2xl p-8 mb-8">
          <h1 className="mb-4 text-4xl font-bold text-foreground">Flexoo</h1>
          <p className="text-xl text-muted-foreground">Your trusted payment solution</p>
        </div>
        <Link to="/activation">
          <Button size="lg" className="px-8 glow-effect hover:scale-105 transition-all duration-300">
            Go to Activation
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Index;
