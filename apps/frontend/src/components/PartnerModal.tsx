import { useState } from "react";
import { X, Handshake, Send } from "lucide-react";

export function PartnerModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [organization, setOrganization] = useState("");
  const [message, setMessage] = useState("");
  const [step, setStep] = useState(1);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Partnership Inquiry");
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nOrganization: ${organization}\n\n${message}`
    );
    window.open(`mailto:labs@tianipekins.org?subject=${subject}&body=${body}`, "_blank");
    setStep(2);
  };

  const canSubmit = name.trim() && email.trim() && message.trim();

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-soil/80 backdrop-blur-sm p-4">
      <div className="bg-paper border border-paper-dim rounded-sm w-full max-w-lg relative p-8 shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-ink-soft hover:text-ink transition-colors">
          <X size={20} />
        </button>

        {step === 1 && (
          <form onSubmit={handleSubmit}>
            <div className="flex items-center gap-3 mb-2 text-laterite">
              <Handshake size={24} />
              <h2 className="font-display font-bold text-2xl text-ink">Partner With Us</h2>
            </div>
            <p className="font-body text-ink-soft mb-6">
              Tell us about yourself and how you'd like to collaborate. We'll get back to you shortly.
            </p>

            <div className="space-y-4 mb-8">
              <div>
                <label className="block font-ui text-sm font-semibold text-ink mb-1">Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-paper border border-paper-dim px-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink"
                />
              </div>
              <div>
                <label className="block font-ui text-sm font-semibold text-ink mb-1">Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@organization.com"
                  className="w-full bg-paper border border-paper-dim px-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink"
                />
              </div>
              <div>
                <label className="block font-ui text-sm font-semibold text-ink mb-1">Organization</label>
                <input
                  type="text"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Company, university, or independent"
                  className="w-full bg-paper border border-paper-dim px-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink"
                />
              </div>
              <div>
                <label className="block font-ui text-sm font-semibold text-ink mb-1">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="What kind of collaboration do you have in mind?"
                  rows={4}
                  className="w-full bg-paper border border-paper-dim px-4 py-3 rounded-sm focus:outline-none focus:border-signal font-ui text-ink resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={!canSubmit}
              className="w-full flex items-center justify-center gap-2 font-ui font-bold tracking-[0.04em] uppercase py-4 bg-laterite text-paper rounded-sm hover:bg-ochre transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send size={18} />
              Send Inquiry
            </button>
          </form>
        )}

        {step === 2 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-cassava text-paper rounded-full flex items-center justify-center mx-auto mb-6">
              <Handshake size={32} />
            </div>
            <h2 className="font-display font-bold text-3xl text-ink mb-3">Thank You</h2>
            <p className="font-body text-ink-soft mb-8">
              Your email client should open with the details pre-filled. Send it through and we'll get back to you soon.
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
