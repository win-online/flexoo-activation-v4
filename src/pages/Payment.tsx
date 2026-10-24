import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Copy, Check, Upload, Clock, AlertCircle } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [timeLeft, setTimeLeft] = useState(9 * 60);
  const [copied, setCopied] = useState<string | null>(null);
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const loadingTime = Math.floor(Math.random() * 3000) + 8000;
    const timer = setTimeout(() => {
      setIsLoading(false);
      setShowWarning(true);
    }, loadingTime);
    return () => clearTimeout(timer);
  }, []);

  const paymentDetails = {
    accountNumber: "0102111984",
    accountName: " PRIMER VENTURES ",
    bank: "BANKIT MFB",
    amount: "₦18,500",
  };

  useEffect(() => {
    if (timeLeft <= 0) {
      toast({ title: "Session Expired", description: "Your payment session has expired. Please try again.", variant: "destructive" });
      navigate("/activation-form");
      return;
    }
    const timer = setInterval(() => { setTimeLeft((prev) => prev - 1); }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, navigate, toast]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    toast({ title: "Copied!", description: `${field} copied to clipboard` });
    setTimeout(() => setCopied(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProofFile(e.target.files[0]);
      toast({ title: "File Selected", description: e.target.files[0].name });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!proofFile) {
      toast({ title: "Upload Required", description: "Please upload proof of payment", variant: "destructive" });
      return;
    }
    navigate("/pending");
  };

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center justify-center px-4">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-20 h-20 bg-card glass-card rounded-2xl flex flex-col items-center justify-center glow-effect mb-8">
            <span className="text-primary font-bold text-3xl">F</span>
            <span className="text-primary text-[8px] -mt-1">Flexoo</span>
          </div>
          
          <div className="relative mb-6">
            <div className="w-16 h-16 border-4 border-primary/20 rounded-full" />
            <div className="absolute top-0 left-0 w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          
          <h2 className="text-xl font-bold text-foreground mb-2">Processing Payment</h2>
          <p className="text-muted-foreground text-center">Please wait while we prepare your payment details...</p>
          
          <div className="flex gap-1 mt-4">
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center px-4 py-8">
        <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      
        <div className="relative z-10 w-full max-w-md flex flex-col items-center">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-card glass-card rounded-xl flex flex-col items-center justify-center glow-effect">
              <span className="text-primary font-bold text-lg">F</span>
              <span className="text-primary text-[6px] -mt-1">Flexoo</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">Flexoo</h1>
          </div>

          <div className="glass-card rounded-xl px-4 py-2 mb-6 flex items-center gap-2 glow-effect">
            <Clock className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-foreground font-mono text-lg font-bold">{formatTime(timeLeft)}</span>
            <span className="text-muted-foreground text-sm">remaining</span>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 w-full glow-effect">
            <h2 className="text-2xl font-bold text-foreground mb-2">Complete Payment</h2>
            <p className="text-muted-foreground mb-6">Transfer the exact amount to the account below</p>

            <div className="bg-primary/10 border border-primary/30 rounded-xl p-4 mb-6 text-center">
              <p className="text-muted-foreground text-sm mb-1">Amount to Pay</p>
              <p className="text-3xl font-bold text-primary">{paymentDetails.amount}</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="glass-input rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">Bank</p>
                  <p className="text-foreground font-medium">{paymentDetails.bank}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(paymentDetails.bank, "Bank")} className="h-8 w-8">
                  {copied === "Bank" ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </Button>
              </div>

              <div className="glass-input rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">Account Number</p>
                  <p className="text-foreground font-medium font-mono">{paymentDetails.accountNumber}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(paymentDetails.accountNumber, "Account Number")} className="h-8 w-8">
                  {copied === "Account Number" ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </Button>
              </div>

              <div className="glass-input rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-xs">Account Name</p>
                  <p className="text-foreground font-medium">{paymentDetails.accountName}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => handleCopy(paymentDetails.accountName, "Account Name")} className="h-8 w-8">
                  {copied === "Account Name" ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-foreground font-medium">Upload Payment Proof</Label>
                <div className="relative">
                  <input type="file" accept="image/*" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                  <div className="glass-input border border-dashed border-primary/50 rounded-xl p-6 text-center hover:border-primary transition-colors">
                    <Upload className="w-8 h-8 text-primary mx-auto mb-2" />
                    {proofFile ? (
                      <p className="text-foreground text-sm">{proofFile.name}</p>
                    ) : (
                      <>
                        <p className="text-foreground text-sm">Click to upload screenshot</p>
                        <p className="text-muted-foreground text-xs">PNG, JPG up to 5MB</p>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                I've Made Payment
              </Button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
};

export default Payment;
