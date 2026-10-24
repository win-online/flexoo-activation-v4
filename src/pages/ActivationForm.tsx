import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

const activationSchema = z.object({
  accountNumber: z.string().min(1, "Account number is required").max(20, "Account number too long"),
  accountName: z.string().min(1, "Account name is required").max(100, "Account name too long"),
  bank: z.string().min(1, "Please select a bank"),
  email: z.string().email("Invalid email address").max(255, "Email too long"),
  bpcCode: z.string().min(1, "BPC code is required").max(20, "BPC code too long"),
});

const banks = [
  "Access Bank", "First Bank", "GTBank", "UBA", "Zenith Bank",
  "Fidelity Bank", "Union Bank", "Stanbic IBTC", "Sterling Bank",
  "Wema Bank", "Ecobank", "FCMB", "Keystone Bank", "Polaris Bank",
  "Unity Bank", "OPay", "Kuda Bank", "PalmPay", "Moniepoint",
  "Carbon", "FairMoney", "Rubies Bank", "VFD Microfinance Bank",
  "LAPO Microfinance Bank", "Eyowo", "Sparkle", "Pocket by Piggyvest",
  "Mintyn Digital Bank", "GoMoney",
];

const ActivationForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    bank: "",
    email: "",
    bpcCode: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const activationSchema = z.object({
      accountNumber: z.string().min(1, "Account number is required").max(20, "Account number too long"),
      accountName: z.string().min(1, "Account name is required").max(100, "Account name too long"),
      bank: z.string().min(1, "Please select a bank"),
      email: z.string().email("Invalid email address").max(255, "Email too long"),
      bpcCode: z.string().min(1, "FPC code is required").max(20, "FPC code too long"),
    });

    const result = activationSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as string] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      navigate("/payment");
    }, 2000);
  };

  return (
    <main className="min-h-screen bg-background relative overflow-hidden flex flex-col items-center px-4 py-8">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-accent/15 rounded-full blur-3xl" />
      
      <div className="relative z-10 w-full max-w-md flex flex-col items-center">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-card glass-card rounded-xl flex flex-col items-center justify-center glow-effect">
            <span className="text-primary font-bold text-lg">F</span>
            <span className="text-primary text-[6px] -mt-1">Flexoo</span>
          </div>
          <h1 className="text-xl font-bold text-foreground">Flexoo Activation</h1>
        </div>

        <div className="glass-card rounded-2xl p-6 md:p-8 w-full glow-effect">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            Activate Your Flexoo Account
          </h2>
          <p className="text-muted-foreground mb-6">
            Please provide your details to activate your account
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="accountNumber" className="text-foreground font-medium">Account Number</Label>
              <Input id="accountNumber" placeholder="Enter your account number" value={formData.accountNumber} onChange={(e) => handleInputChange("accountNumber", e.target.value)} className="glass-input border-border rounded-xl h-12" />
              {errors.accountNumber && <p className="text-destructive text-sm">{errors.accountNumber}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="accountName" className="text-foreground font-medium">Account Name</Label>
              <Input id="accountName" placeholder="Enter your account name" value={formData.accountName} onChange={(e) => handleInputChange("accountName", e.target.value)} className="glass-input border-border rounded-xl h-12" />
              {errors.accountName && <p className="text-destructive text-sm">{errors.accountName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bank" className="text-foreground font-medium">Select Bank</Label>
              <Select value={formData.bank} onValueChange={(value) => handleInputChange("bank", value)}>
                <SelectTrigger className="glass-input border-border rounded-xl h-12">
                  <SelectValue placeholder="Select a bank" />
                </SelectTrigger>
                <SelectContent>
                  {banks.map((bank) => (
                    <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.bank && <p className="text-destructive text-sm">{errors.bank}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground font-medium">Email Address</Label>
              <Input id="email" type="email" placeholder="Enter your email address" value={formData.email} onChange={(e) => handleInputChange("email", e.target.value)} className="glass-input border-border rounded-xl h-12" />
              {errors.email && <p className="text-destructive text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="bpcCode" className="text-foreground font-medium">FPC Code</Label>
              <Input id="bpcCode" placeholder="Enter your FPC code" value={formData.bpcCode} onChange={(e) => handleInputChange("bpcCode", e.target.value)} className="glass-input border-border rounded-xl h-12" />
              {errors.bpcCode && <p className="text-destructive text-sm">{errors.bpcCode}</p>}
            </div>

            <Button type="submit" size="lg" disabled={isLoading} className="w-full h-12 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Processing...
                </div>
              ) : "Proceed to Payment"}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default ActivationForm;
