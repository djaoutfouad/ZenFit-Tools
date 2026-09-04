import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Head } from 'vite-react-ssg';
import {
  Mail,
  Send,
  Check,
  Copy,
  Clock,
  ShieldCheck,
  Home,
  ChevronRight,
  AlertCircle,
} from 'lucide-react';

const EMAILJS_SERVICE_ID = 'service_r0a31im';
const EMAILJS_TEMPLATE_ID = 'template_ejjweko';
const EMAILJS_PUBLIC_KEY = 'W2WpH7FIN5lyuO_IF';

export const ContactPage: React.FC = () => {
  const officialEmail = 'zenfittools@gmail.com';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('General Feedback & Inquiries');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'fallback'>('idle');
  const [copied, setCopied] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
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
            to_email: officialEmail,
          },
        }),
      });

      if (response.ok || response.status === 200) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('fallback');
      }
    } catch (err) {
      console.warn('Email transmission error, activating direct client fallback:', err);
      setStatus('fallback');
    }
  };

  const handleCopyEmail = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(officialEmail);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact ZenFit Tools',
    description: 'Get in touch with the ZenFit Tools physiology and engineering team.',
    url: 'https://zenfittools.com/contact',
    mainEntity: {
      '@type': 'Organization',
      name: 'ZenFit Tools',
      email: officialEmail,
      contactPoint: {
        '@type': 'ContactPoint',
        email: officialEmail,
        contactType: 'Customer Support & Scientific Feedback',
      },
    },
  };

  return (
    <>
      <Head>
        <title>Contact Support &amp; Scientific Research | ZenFit Tools</title>
        <meta
          name="description"
          content="Contact the ZenFit Tools sports science and physiology engineering team at zenfittools@gmail.com."
        />
        <link rel="canonical" href="https://zenfittools.com/contact" />
        <meta property="og:title" content="Contact Support | ZenFit Tools" />
        <meta property="og:description" content="Official contact portal for ZenFit Tools." />
        <meta property="og:url" content="https://zenfittools.com/contact" />
        <script type="application/ld+json">{JSON.stringify(contactSchema)}</script>
      </Head>

      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumbs */}
        <nav
          aria-label="Breadcrumbs"
          className="flex items-center gap-2 text-xs text-slate-500 mb-6 bg-white/60 px-4 py-2.5 rounded-2xl border border-slate-200"
        >
          <Link to="/" className="flex items-center gap-1 text-slate-600 hover:text-amber-600 font-semibold">
            <Home className="w-3.5 h-3.5" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-bold text-slate-900">Contact Us</span>
        </nav>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Info Card */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-slate-950 text-white rounded-3xl p-6 border border-slate-800 shadow-xl space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center">
                <Mail className="w-5 h-5" />
              </div>

              <div>
                <h2 className="text-xl font-bold text-white">Direct Communication</h2>
                <p className="text-xs text-slate-400 mt-1">Official ZenFit Tools Helpdesk</p>
              </div>

              <div className="pt-2 border-t border-slate-800 space-y-2">
                <p className="text-xs text-slate-300">Official Inquiries &amp; Reviewers:</p>
                <button
                  onClick={handleCopyEmail}
                  className="w-full py-2 px-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-amber-300 font-mono flex items-center justify-between hover:border-amber-500/60 transition-colors"
                >
                  <span className="truncate">{officialEmail}</span>
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-slate-400" />}
                </button>
              </div>

              <div className="space-y-3 pt-2 text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-400" />
                  <span>Response within 24-48 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400" />
                  <span>Zero data tracking guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="md:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Send Us a Message</h1>
            <p className="text-xs text-slate-500 mb-6">
              Have questions about formula accuracy, citation requests, or feature feedback? We respond promptly.
            </p>

            {status === 'success' ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-200 space-y-3 animate-in fade-in duration-200">
                <div className="w-12 h-12 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-emerald-900">Message Dispatched Successfully!</h3>
                <p className="text-xs text-emerald-700 max-w-sm mx-auto leading-relaxed">
                  Thank you for contacting ZenFit Tools. Your inquiry has been routed to <strong>{officialEmail}</strong>. Our science and physiology team typically responds within 24 business hours.
                </p>
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setName('');
                      setEmail('');
                      setMessage('');
                      setStatus('idle');
                    }}
                    className="px-5 py-2.5 bg-emerald-600 text-white rounded-xl text-xs font-bold hover:bg-emerald-500 transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              </div>
            ) : status === 'fallback' ? (
              <div className="p-6 bg-amber-50 rounded-2xl border border-amber-200 space-y-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-sm font-bold text-amber-900">Direct Email Client Fallback</h3>
                    <p className="text-xs text-amber-800 mt-1 leading-relaxed">
                      To ensure guaranteed delivery, you can launch your local email client directly or copy our official address:
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-amber-200">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-slate-500" />
                    <span className="text-xs font-mono font-medium text-slate-800">{officialEmail}</span>
                  </div>
                  <button
                    onClick={handleCopyEmail}
                    className="flex items-center gap-1.5 px-3 py-1 bg-slate-100 hover:bg-slate-200 rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <a
                  href={`mailto:${officialEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
                    `From: ${name} (${email})\n\n${message}`
                  )}`}
                  className="w-full py-3 bg-amber-500 text-slate-950 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-amber-400 transition-colors shadow-sm"
                >
                  <Mail className="w-4 h-4" />
                  <span>Open In Your Email Client ({officialEmail})</span>
                </a>

                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs text-slate-500 hover:text-slate-800 block text-center w-full font-medium"
                >
                  Return to form
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Dr. Alex Vance"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                      Your Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@example.com"
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Subject / Calculator Focus
                  </label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., TDEE Formula Query or Partnership"
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Your Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Describe your inquiry, peer-review suggestion, or calculation question..."
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'sending' ? 'Dispatching Message...' : 'Send Message'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
