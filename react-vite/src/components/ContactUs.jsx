import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Mail, Loader2, CheckCircle2 } from 'lucide-react';

const ease = [0.16, 1, 0.3, 1];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const textRevealVariants = {
  hidden: { y: '100%', opacity: 0 },
  visible: {
    y: '0%',
    opacity: 1,
    transition: { duration: 1.1, ease },
  },
};

const fadeUpVariants = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9, ease },
  },
};

const WhatsAppSVG = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    xmlns="http://www.w3.org/2000/svg" 
    className={className}
    fill="currentColor"
  >
    <path d="M12.004 0C5.372 0 0 5.372 0 12.004c0 2.116.549 4.102 1.51 5.83L.056 24l6.386-1.674c1.7.928 3.639 1.45 5.56 1.45 6.631 0 12.003-5.371 12.003-12.003C24.005 5.372 18.634 0 12.004 0zm0 21.96c-1.895 0-3.619-.504-5.111-1.385l-.367-.215-3.8.995 1.012-3.69-.239-.379a9.923 9.923 0 0 1-1.488-5.281c.001-5.467 4.446-9.912 9.913-9.912 5.467 0 9.912 4.445 9.912 9.912 0 5.468-4.445 9.913-9.912 9.913zm5.495-7.46c-.3-.15-1.776-.877-2.051-.977-.275-.1-.476-.15-.675.15-.2.299-.774.976-.95 1.176-.174.199-.349.224-.649.074-.3-.15-1.267-.467-2.414-1.489-.893-.796-1.496-1.78-1.671-2.079-.175-.299-.019-.461.13-.61.136-.134.3-.35.45-.525.149-.175.2-.299.3-.499.1-.2.05-.374-.025-.524-.075-.15-.675-1.625-.925-2.224-.243-.586-.489-.505-.675-.514-.175-.009-.374-.01-.574-.01-.2 0-.525.075-.8.375-.274.299-1.049 1.023-1.049 2.496 0 1.472 1.074 2.894 1.223 3.094.15.2 2.115 3.228 5.127 4.527.716.31 1.274.495 1.71.633.718.228 1.371.196 1.887.119.575-.086 1.776-.724 2.026-1.423.25-.699.25-1.297.174-1.423-.074-.125-.274-.199-.574-.349z"/>
  </svg>
);

const CleanInput = ({ name, value, onChange, placeholder, type = 'text', as: Component = 'input', rows, required = false }) => {
  return (
    <motion.div variants={fadeUpVariants} className="w-full">
      <Component
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        type={type}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-4 sm:px-5 md:px-6 py-3.5 sm:py-4 md:py-5 text-white placeholder-white/30 text-xs sm:text-sm font-light outline-none transition-all duration-500 ease-out hover:border-white/40 hover:bg-white/[0.04] hover:shadow-[0_0_25px_rgba(255,255,255,0.03)] focus:border-white focus:bg-white/[0.07] focus:shadow-[0_0_30px_rgba(255,255,255,0.06)] active:scale-[0.995] resize-none"
      />
    </motion.div>
  );
};

const ContactCard = ({ icon: Icon, title, detail, href }) => {
  const Component = href ? 'a' : 'div';

  return (
    <Component
      href={href}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      className="group block w-full"
    >
      <motion.div
        variants={fadeUpVariants}
        className="flex items-center justify-between p-3.5 sm:p-5 md:p-6 rounded-xl border border-white/[0.06] bg-[#070707] hover:border-white/20 hover:bg-[#0c0c0c] transition-all duration-300 cursor-pointer"
      >
        <div className="flex items-center gap-3 sm:gap-4 overflow-hidden">
          <div className="p-2 sm:p-2.5 md:p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] text-white/70 group-hover:text-white group-hover:border-white/20 transition-all duration-300 shrink-0">
            <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="truncate">
            <span className="text-white/40 text-[9px] sm:text-[10px] font-semibold tracking-widest uppercase block mb-0.5">{title}</span>
            <p className="text-white text-xs sm:text-sm font-normal tracking-wide truncate">{detail}</p>
          </div>
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white/30 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0 ml-2" />
      </motion.div>
    </Component>
  );
};

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    subject: '',
    message: ''
  });

  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'success' | 'error'

  const capitalizeWords = (str) => {
    if (!str) return '';
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'name' ? capitalizeWords(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "", 
          from_name: formData.name,
          subject: formData.subject ? `Inquiry: ${formData.subject}` : `New Inquiry from ${formData.name}`,
          name: formData.name,
          company: formData.company || 'Not provided',
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', company: '', email: '', subject: '', message: '' });
        setTimeout(() => setStatus('idle'), 6000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <section id="contactus" className="relative min-h-screen bg-[#000000] text-white flex items-center py-12 sm:py-16 md:py-20 lg:py-28 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden selection:bg-white selection:text-black">
      <div className="absolute top-0 left-1/4 w-[250px] sm:w-[400px] lg:w-[500px] h-[250px] sm:h-[400px] lg:h-[500px] bg-white/[0.015] rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[200px] sm:w-[300px] lg:w-[400px] h-[200px] sm:h-[300px] lg:h-[400px] bg-white/[0.015] rounded-full blur-[80px] sm:blur-[120px] lg:blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 md:gap-14 lg:gap-16 xl:gap-20 items-stretch"
        >
          {/* LEFT COLUMN */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6 sm:space-y-8 md:space-y-10 lg:space-y-12">
            <div>
              <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extralight tracking-tight text-white leading-[1.12] sm:leading-[1.15] mb-3 sm:mb-4 md:mb-6">
                <span className="block overflow-hidden pb-1 sm:pb-2">
                  <motion.span variants={textRevealVariants} className="block">Let’s Build</motion.span>
                </span>
                <span className="block overflow-hidden pb-1.5 sm:pb-2 md:pb-3">
                  <motion.span variants={textRevealVariants} className="block font-normal">Something</motion.span>
                </span>
                <span className="block overflow-hidden pb-2 sm:pb-3 md:pb-4">
                  <motion.span variants={textRevealVariants} className="block text-white/40 italic">Exceptional.</motion.span>
                </span>
              </h2>

              <motion.p variants={fadeUpVariants} className="text-white/50 text-xs sm:text-sm md:text-base font-light max-w-md leading-relaxed">
                Have a project in mind or looking to elevate your beverage concept? Reach out directly and let’s shape your vision.
              </motion.p>
            </div>

            <motion.div variants={containerVariants} className="flex flex-col sm:grid sm:grid-cols-2 lg:flex lg:flex-col gap-3 pt-6 border-t border-white/10">
              <ContactCard 
                icon={Mail} 
                title="Direct Email" 
                detail="info@thebeverageconcepts.com" 
                href="mailto:info@thebeverageconcepts.com" 
              />
              <ContactCard 
                icon={WhatsAppSVG} 
                title="WhatsApp Direct" 
                detail="+65 81448355" 
                href="https://wa.me/6581448355" 
              />
            </motion.div>
          </div>

          {/* RIGHT COLUMN */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-7 w-full flex">
            <div className="relative border border-white/10 rounded-2xl p-5 sm:p-8 md:p-10 lg:p-12 xl:p-14 bg-white/[0.01] backdrop-blur-md w-full flex flex-col justify-between">
              <form className="flex flex-col gap-6 sm:gap-8 h-full" onSubmit={handleSubmit}>
                <div className="flex flex-col gap-4 sm:gap-5 md:gap-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <CleanInput 
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Full Name *" 
                      required 
                    />
                    <CleanInput 
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Company / Brand" 
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <CleanInput 
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address *" 
                      required 
                    />
                    <CleanInput 
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Subject / Scope" 
                    />
                  </div>
                  <CleanInput 
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="How can we elevate your vision?" 
                    as="textarea" 
                    rows={4} 
                    required 
                  />
                </div>

                {/* CENTERED ELONGATED PILL BUTTON */}
                <motion.div variants={fadeUpVariants} className="flex flex-col items-center justify-center w-full pt-2">
                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="group relative overflow-hidden bg-black text-white 
                      w-[260px] h-[48px] sm:w-[320px] sm:h-[54px] md:w-[380px] md:h-[60px]
                      flex items-center justify-center transition-all duration-500 ease-out 
                      hover:bg-white hover:text-black border border-white/20 hover:border-white 
                      rounded-full active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

                    <span className="relative z-10 text-xs sm:text-sm font-sans tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium transition-colors duration-500 flex items-center gap-2">
                      {status === 'loading' && <Loader2 className="w-4 h-4 animate-spin text-current" />}
                      {status === 'loading' ? 'TRANSMITTING...' : status === 'success' ? 'MESSAGE SENT' : 'SEND YOUR MESSAGE'}
                    </span>
                  </button>

                  {status === 'success' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 6 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-white/70 text-xs font-light tracking-wide mt-3 flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" /> Thank you. Your message has been received.
                    </motion.p>
                  )}
                  {status === 'error' && (
                    <motion.p 
                      initial={{ opacity: 0, y: 6 }} 
                      animate={{ opacity: 1, y: 0 }} 
                      className="text-white/60 text-xs font-light tracking-wide mt-3"
                    >
                      Unable to transmit. Please write directly to info@thebeverageconcepts.com
                    </motion.p>
                  )}
                </motion.div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}