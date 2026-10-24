import { Button } from "@/components/ui/button";
import { Clock, MessageCircle } from "lucide-react";

const Pending = () => {
  const handleContactSupport = () => {
    window.open("https://t.me/redpayofficail", "_blank");
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-4">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="w-20 h-20 bg-card glass-card rounded-2xl flex flex-col items-center justify-center glow-effect mb-8">
          <span className="text-primary font-bold text-3xl">F</span>
          <span className="text-primary text-[8px] -mt-1">Flexoo</span>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 w-full glow-effect text-center">
          <div className="mx-auto w-20 h-20 bg-destructive/20 rounded-full flex items-center justify-center mb-6">
            <Clock className="w-10 h-10 text-destructive" />
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-2">Payment Not Received</h1>
          <p className="text-muted-foreground mb-6">We could not verify your payment. Please try again or contact support for assistance.</p>

          <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6">
            <p className="text-destructive font-semibold">Verification Failed</p>
            <p className="text-muted-foreground text-sm mt-1">Please try again or contact support</p>
          </div>

          <div className="space-y-3">
            <p className="text-muted-foreground text-sm">Need help? Contact our support team</p>
            <Button onClick={handleContactSupport} size="lg" className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2">
              <MessageCircle className="w-5 h-5" />
              Contact Telegram Support
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground text-xs mt-6 text-center">Try again</p>
      </div>
    </main>
  );
};

export default Pending;
