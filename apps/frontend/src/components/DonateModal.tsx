import { useState } from "react";
import { X, Heart, Laptop, BookOpen, HandHeart } from "lucide-react";

export function DonateModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [amount, setAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [name, setName] = useState("");
  const [step, setStep] = useState(1); // 1: Amount, 2: Details, 3: Success

  if (!isOpen) return null;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = amount || Number(customAmount);
    
    try {
      await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: finalAmount, donorName: name || "Anonymous" })
      });
      setStep(3);
    } catch (err) {
      console.error(err);
    }
  };

  const presetAmounts = [
    { value: 15000, label: "Provides textbooks for one student", icon: <BookOpen size={18} /> },
    { value: 90000, label: "Funds a digital literacy lab session", icon: <Laptop size={18} /> },
    { value: 300000, label: "Supports hardware build materials", icon: <HandHeart size={18} /> },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-soil/80 backdrop-blur-sm p-4">
      <div className="bg-paper border border-paper-dim rounded-sm w-full max-w-lg relative p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors">
          <X size={20} />
        </button>
        
        {step === 1 && (
          <div>
            <div className="flex items-center gap-3 mb-2 text-laterite">
              <Heart fill="currentColor" size={24} />
              <h2 className="font-display font-bold text-2xl text-ink">Give to the Mission</h2>
            </div>
            <p className="font-body text-ink-soft mb-8">
              100% of your contribution goes directly to materials books, shoes, computers, and construction supplies. We operate as a zero-overhead bridge. We accept MTN Mobile Money and Orange Money.
            </p>

            <div className="space-y-3 mb-6">
              {presetAmounts.map((preset) => (
                <button
                  key={preset.value}
                  onClick={() => { setAmount(preset.value); setCustomAmount(""); }}
                  className={`w-full flex items-center gap-4 p-4 rounded-sm border-[1.5px] transition-all text-left ${amount === preset.value ? 'border-laterite bg-laterite/5' : 'border-paper-dim hover:border-laterite/40 bg-paper'}`}
                >
                  <div className={`shrink-0 w-12 h-12 flex items-center justify-center rounded-full ${amount === preset.value ? 'bg-laterite text-paper' : 'bg-paper-dim text-ink-soft'}`}>
                    {preset.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-xl text-ink">{preset.value.toLocaleString()} FCFA</div>
                    <div className="font-ui text-sm text-ink-soft">{preset.label}</div>
                  </div>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="block font-ui text-sm font-semibold text-ink mb-2">Or enter a custom amount</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display font-bold text-ink-soft">FCFA</span>
                <input 
                  type="number" 
                  value={customAmount}
                  onChange={(e) => { setCustomAmount(e.target.value); setAmount(null); }}
                  placeholder="0"
                  className="w-full bg-paper border border-paper-dim pl-16 pr-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink"
                />
              </div>
            </div>

            <button 
              onClick={() => setStep(2)}
              disabled={!amount && !customAmount}
              className="w-full font-ui font-bold tracking-[0.04em] uppercase py-4 bg-laterite text-paper rounded-sm hover:bg-ochre transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue to Details
            </button>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={handleDonate}>
            <h2 className="font-display font-bold text-2xl text-ink mb-2">Your Details</h2>
            <p className="font-body text-ink-soft mb-6">
              You are donating <span className="font-bold text-ink">{(amount || Number(customAmount)).toLocaleString()} FCFA</span> to the foundation.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block font-ui text-sm font-semibold text-ink mb-1">Display Name (Optional)</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Anonymous"
                  className="w-full bg-paper border border-paper-dim px-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink"
                />
                <p className="text-xs text-ink-soft mt-1">This name will appear on the public donor dashboard.</p>
              </div>
            </div>

            <div className="flex gap-3">
              <button 
                type="button"
                onClick={() => setStep(1)}
                className="w-1/3 font-ui font-bold tracking-[0.04em] uppercase py-4 bg-paper-dim text-ink rounded-sm hover:bg-ink hover:text-paper transition-colors"
              >
                Back
              </button>
              <button 
                type="submit"
                className="w-2/3 flex items-center justify-center gap-2 font-ui font-bold tracking-[0.04em] uppercase py-4 bg-laterite text-paper rounded-sm hover:bg-ochre transition-colors"
              >
                <Heart size={18} fill="currentColor" />
                Complete Donation
              </button>
            </div>
          </form>
        )}

        {step === 3 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-cassava text-paper rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={32} fill="currentColor" />
            </div>
            <h2 className="font-display font-bold text-3xl text-ink mb-3">Thank You</h2>
            <p className="font-body text-ink-soft mb-8">
              Your contribution of <span className="font-bold text-ink">{(amount || Number(customAmount)).toLocaleString()} FCFA</span> has been received. 
              Because of your support, another child will have the chance to learn computing.
            </p>
            <button 
              onClick={onClose}
              className="font-ui font-bold tracking-[0.04em] uppercase px-8 py-3 bg-soil text-paper rounded-sm hover:bg-ink transition-colors"
            >
              Return to Site
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
