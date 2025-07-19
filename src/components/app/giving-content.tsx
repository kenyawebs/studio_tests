
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Gift, Landmark, Globe, CreditCard, Bitcoin, PiggyBank, University, HeartHandshake, ShieldQuestion, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";


const givingHistory = [
    { id: 'tx1', date: "2024-08-01", amount: "$100.00", fund: "Tithe", method: "Credit Card" },
    { id: 'tx2', date: "2024-07-15", amount: "$50.00", fund: "Building Fund", method: "Credit Card" },
    { id: 'tx3', date: "2024-07-01", amount: "$100.00", fund: "Tithe", method: "Credit Card" },
]

export function GivingContent() {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [fund, setFund] = useState("tithe");
  const [frequency, setFrequency] = useState("one-time");
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [isGiving, setIsGiving] = useState(false);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  const handlePresetAmount = (preset: string) => {
      setAmount(preset);
  }

  const handleGive = () => {
    if (!amount || parseFloat(amount) <= 0) {
        toast({
            variant: "destructive",
            title: "Invalid Amount",
            description: "Please enter a valid amount to give.",
        });
        return;
    }

    setIsGiving(true);
    // Simulate API call
    setTimeout(() => {
        setIsGiving(false);
        toast({
            title: "Thank you for your generosity!",
            description: `Your ${frequency} donation of $${amount} to the ${fund.replace('-', ' ')} fund has been successfully processed.`,
        });
        setAmount("");
    }, 1500);
  }

  return (
    <div className="grid lg:grid-cols-3 gap-8 items-start">
      <div className="lg:col-span-2 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Secure Online Giving</CardTitle>
            <CardDescription>Your generosity fuels our mission. Thank you for your faithful giving.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="amount">Amount</Label>
                 <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                    {["25", "50", "100", "250"].map(preset => (
                        <Button 
                            key={preset}
                            variant={amount === preset ? "default" : "outline"} 
                            onClick={() => handlePresetAmount(preset)}
                            className="text-base"
                        >
                            ${preset}
                        </Button>
                    ))}
                 </div>
                <div className="flex gap-2">
                    <Select defaultValue="USD">
                        <SelectTrigger className="w-[100px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="USD">USD</SelectItem>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="GBP">GBP</SelectItem>
                            <SelectItem value="KES">KES</SelectItem>
                            <SelectItem value="NGN">NGN</SelectItem>
                            <SelectItem value="ZAR">ZAR</SelectItem>
                            <SelectItem value="CAD">CAD</SelectItem>
                            <SelectItem value="AUD">AUD</SelectItem>
                        </SelectContent>
                    </Select>
                    <div className="relative flex-grow">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                        <Input 
                            id="amount" 
                            type="text" 
                            pattern="[0-9]*" 
                            inputMode="decimal"
                            placeholder="Or enter custom amount" 
                            className="pl-6 font-semibold text-lg h-11" 
                            value={amount}
                            onChange={handleAmountChange}
                        />
                    </div>
                </div>
            </div>
            <div className="space-y-2">
                <Label>Fund</Label>
                <Select value={fund} onValueChange={setFund}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a fund" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="tithe">Tithe & Offerings</SelectItem>
                        <SelectItem value="thanksgiving">Thanksgiving</SelectItem>
                        <SelectItem value="pledge">Pledge</SelectItem>
                        <SelectItem value="building-fund">Building Fund</SelectItem>
                        <SelectItem value="missions">Missions</SelectItem>
                        <SelectItem value="outreach">Community Outreach</SelectItem>
                        <SelectItem value="disaster-relief">Disaster Relief</SelectItem>
                        <SelectItem value="app-maintenance">App & Website Maintenance</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="space-y-2">
                <Label>Frequency</Label>
                 <RadioGroup value={frequency} onValueChange={setFrequency} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Label htmlFor="one-time" className={cn("flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent", frequency === "one-time" && "bg-accent border-primary")}>
                        <RadioGroupItem value="one-time" id="one-time" />
                        <span>One Time</span>
                    </Label>
                    <Label htmlFor="weekly" className={cn("flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent", frequency === "weekly" && "bg-accent border-primary")}>
                        <RadioGroupItem value="weekly" id="weekly" />
                        <span>Weekly</span>
                    </Label>
                    <Label htmlFor="monthly" className={cn("flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent", frequency === "monthly" && "bg-accent border-primary")}>
                        <RadioGroupItem value="monthly" id="monthly" />
                        <span>Monthly</span>
                    </Label>
                     <Label htmlFor="yearly" className={cn("flex items-center justify-center space-x-2 border p-3 rounded-md cursor-pointer hover:bg-accent", frequency === "yearly" && "bg-accent border-primary")}>
                        <RadioGroupItem value="yearly" id="yearly" />
                        <span>Yearly</span>
                    </Label>
                </RadioGroup>
            </div>
             <div className="space-y-2">
                <Label>Payment Method</Label>
                 <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <Label htmlFor="credit-card" className={cn("flex items-center justify-center gap-2 border p-3 rounded-md cursor-pointer hover:bg-accent", paymentMethod === 'credit-card' && "bg-accent border-primary")}>
                        <RadioGroupItem value="credit-card" id="credit-card" />
                        <CreditCard className="mr-2 h-5 w-5"/> Credit Card
                    </Label>
                    <Label htmlFor="paypal" className={cn("flex items-center justify-center gap-2 border p-3 rounded-md cursor-pointer hover:bg-accent", paymentMethod === 'paypal' && "bg-accent border-primary")}>
                        <RadioGroupItem value="paypal" id="paypal" />
                         <svg className="mr-2" width="24" height="24" viewBox="0 0 24 24"><path fill="#0070ba" d="M4.42 2.37a1.04 1.04 0 0 0-.42.06c-.4.16-.69.54-.78.96L.3 15.22c-.04.2-.04.42.02.63c.15.55.63.95 1.19.95h3.93c.47 0 .86-.34 1-.79l1.4-4.83H4.42V2.37z"/><path fill="#009cde" d="M12.33 2.37H8.08l-2.02 7.84h6.27c3.1 0 4.6-2.06 4.04-5.1c-.4-2.1-2.3-2.74-4.04-2.74"/><path fill="#002f86" d="M11.15 10.21H5.23L4.4 13.1a.83.83 0 0 0 .82 1.05h3.63c.47 0 .86-.34 1-.79l1.3-4.15zM22.51 9.92c.28-.9-.08-1.78-.8-2.3c-.7-.52-1.63-.6-2.45-.28l-1.33.53l1.89 6.53c.12.38.48.65.89.65h1.5c.7 0 1.25-.56 1.18-1.25l-.39-2.3c.69-.17 1.25-.7 1.41-1.38"/></svg>
                        PayPal
                    </Label>
                    <Label htmlFor="mpesa" className={cn("flex items-center justify-center gap-2 border p-3 rounded-md cursor-pointer hover:bg-accent", paymentMethod === 'mpesa' && "bg-accent border-primary")}>
                        <RadioGroupItem value="mpesa" id="mpesa" />
                         <svg className="mr-2 h-4 w-4" viewBox="0 0 256 256" fill="none"><path fill="#41B649" d="M128 0C94.2 0 61.1 13.3 37.5 37.5C13.3 61.1 0 94.2 0 128c0 33.8 13.3 66.9 37.5 100.5c23.6 23.6 56.7 37.5 100.5 37.5c33.8 0 66.9-13.3 100.5-37.5C242.7 194.9 256 161.8 256 128c0-33.8-13.3-66.9-37.5-100.5C194.9 13.3 161.8 0 128 0Z"/><path fill="#fff" d="m180.7 151.7l-41.2-22.5c-1-2-1.6-4.2-1.8-6.5l-1.4-16.1c-.1-1-.9-1.7-1.9-1.7h-11.8c-1.1 0-1.9.9-1.9 1.9v8.6c0 1.1.9 1.9 1.9 1.9h4.3v13.6c0 6.6 2.4 12.9 6.8 17.6l23.1 25c1.4 1.5 3.9 1.5 5.3 0l11.2-10.9c1.4-1.5.1-3.9-1.4-3.9h-12.2zm-42.9-56.9c-2.2-2.1-2.9-5.1-1.8-7.9l7.7-20.1c1-2.6.1-5.6-2.3-6.9l-10-5.4c-2.4-1.3-5.4-.5-6.8 1.8l-15.6 25.5c-1.4 2.3-.5 5.3 1.8 6.8l20.4 12.5c2.9 1.8 6.6 1.1 8.6-1.3Z"/></svg>
                        M-Pesa
                    </Label>
                 </RadioGroup>
             </div>
          </CardContent>
          <CardFooter>
            <Button size="lg" className="w-full" onClick={handleGive} disabled={isGiving}>
              {isGiving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Gift className="mr-2 h-4 w-4" />}
              {isGiving ? "Processing..." : `Give $${amount || "0.00"}`}
            </Button>
          </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle><ShieldQuestion className="inline-block mr-2 text-primary"/>Where Your Gift Goes</CardTitle>
                <CardDescription>We believe in transparency and good stewardship. Your generosity supports these key areas:</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
                <div className="flex items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <HeartHandshake className="w-6 h-6 text-primary"/>
                    </div>
                    <div>
                        <h4 className="font-semibold">Community Outreach</h4>
                        <p className="text-sm text-muted-foreground">Funding local food drives, homeless support initiatives, and community events that bring people together.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <Globe className="w-6 h-6 text-primary"/>
                    </div>
                     <div>
                        <h4 className="font-semibold">Global Missions</h4>
                        <p className="text-sm text-muted-foreground">Supporting our partners abroad in education, clean water projects, and church planting efforts.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <University className="w-6 h-6 text-primary"/>
                    </div>
                    <div>
                        <h4 className="font-semibold">Building & Facilities</h4>
                        <p className="text-sm text-muted-foreground">Maintaining and improving our physical spaces to create a welcoming environment for all.</p>
                    </div>
                </div>
                 <div className="flex items-start gap-4">
                     <div className="p-3 bg-primary/10 rounded-lg shrink-0">
                        <PiggyBank className="w-6 h-6 text-primary"/>
                    </div>
                    <div>
                        <h4 className="font-semibold">App & Digital Ministry</h4>
                        <p className="text-sm text-muted-foreground">Keeping this platform running, secure, and developing new tools for our digital community.</p>
                    </div>
                </div>
            </CardContent>
        </Card>
      </div>

      <div className="space-y-6 lg:sticky top-8">
        <Card>
            <CardHeader>
                <CardTitle>Giving History</CardTitle>
                <CardDescription>A record of your past contributions.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Fund</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {givingHistory.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell className="font-medium">{item.date}</TableCell>
                                <TableCell>{item.amount}</TableCell>
                                <TableCell>{item.fund}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
            <CardFooter>
                <Button variant="outline" className="w-full">Download Annual Statement</Button>
            </CardFooter>
        </Card>
      </div>
    </div>
  );
}
