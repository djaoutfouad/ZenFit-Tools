import React, { useState } from 'react';
import { X, Mail, Send, CheckCircle2, AlertCircle, Copy } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultSubject?: string;
}

const EMAILJS_SERVICE_ID = 'service_r0a31im';
const EMAILJS_TEMPLATE_ID = 'template_ejjweko';
const EMAILJS_PUBLIC_KEY = 'W2WpH7FlN5IyuO_lF';

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  defaultSubject = 'General Inquiry / Calculator Feedback',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState(defaultSubject);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'fallback_ready'>('idle');
  const [copiedEmail, setCopiedEmail] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name: name,
            name: name,
            from_email: email,
            reply_to: email,
            email: email,
            subject: subject || 'ZenFit Tools Feedback',
            message: message,
            to_email: 'zenfittools@gmail.com',
          },
        }),
      });

      if (response.ok || response.status === 200) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('fallback_ready');
      }
    } catch (err) {
      console.warn('Email transmission error, activating direct client fallback:', err);
      setStatus('fallback_ready');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText('zenfittools@gmail.com');
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  const mailtoLink = `mailto:zenfittools@gmail.com?subject=${encodeURIComponent(
    subject || 'ZenFit Tools Inquiry'
  )}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;

  return (
    <div
      id="contact-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="contact-modal-container"
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 bg-slate-50/70">
          <div className="flex items-center gap-3">
            <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
              <Mail className="w-5 h-5" />
            </span>
            <div>
              <h3 className="text-lg font-bold text-slate-900">Contact Official Support</h3>
              <p className="text-xs text-slate-500">ZenFit Tools Team · zenfittools@gmail.com</p>
            </div>
          </div>
          <button
            id="close-contact-modal-btn"
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
            aria-label="Close contact modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form or Confirmation */}
        <div className="p-6">
          {status === 'success' ? (
            <div className="text-center py-6 space-y-3">
              <div className="inline-flex p-3 bg-emerald-100 text-emerald-600 rounded-full">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-lg font-bold text-slate-900">Message Dispatched Successfully!</h4>
              <p className="text-sm text-slate-600 max-w-sm mx-auto">
                Thank you for contacting ZenFit Tools. Your inquiry has been routed to <strong>zenfittools@gmail.com</strong>. Our science and physiology team typically responds within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-semibold hover:bg-slate-800 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>
          ) : status === 'fallback_ready' ? (
            <div className="space-y-4 py-2">
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-xs text-emerald-900 space-y-1">
                  <p className="font-semibold">Message Formatted Successfully!</p>
                  <p>Click below to send via your local email client directly to our official inbox, or copy our address.</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-slate-500" />
                  <span className="text-sm font-mono font-medium text-slate-800">zenfittools@gmail.com</span>
                </div>
                <button
                  onClick={handleCopyEmail}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <Copy className="w-3.5 h-3.5" />
                  {copiedEmail ? 'Copied!' : 'Copy'}
                </button>
              </div>

              <a
                id="direct-send-mailto-btn"
                href={mailtoLink}
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-xl text-sm shadow-sm transition-colors"
              >
                <Send className="w-4 h-4" />
                Launch Email Client with Message
              </a>

              <button
                onClick={() => setStatus('idle')}
                className="w-full py-2 text-xs text-slate-500 hover:text-slate-800 font-medium text-center"
              >
                Edit Message Again
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Alexander Vance"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Your Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@domain.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subject / Calculator Topic
                </label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Message / Inquiry
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="How can we assist you with our calculators, formulas, or editorial guides?"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all resize-none"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit-contact-form-btn"
                  className="w-full flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-slate-950 font-bold rounded-xl text-sm shadow-sm transition-colors disabled:opacity-50"
                >
                  {isSubmitting ? (
                    'Processing...'
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send to zenfittools@gmail.com
                    </>
                  )}
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-500">
                Official inquiries can also be emailed directly to <strong className="text-slate-700">zenfittools@gmail.com</strong>
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
