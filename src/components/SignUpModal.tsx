import React, { useState } from 'react';
import { X, Check, ArrowRight, ShieldCheck, Sparkles, Building2, Mail, Users } from 'lucide-react';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [company, setCompany] = useState('');
  const [teamSize, setTeamSize] = useState('1-10');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <div 
      id="signup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#121316]/40 backdrop-blur-sm transition-opacity duration-200 animate-in fade-in"
      onClick={onClose}
    >
      <div 
        id="signup-modal-content"
        className="w-full max-w-[460px] bg-[#FFFFFF] border border-[#ECEAE3] rounded-[20px] shadow-2xl p-6 sm:p-8 relative overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-signup-modal"
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-[#717684] hover:text-[#121316] hover:bg-[#F2F0E8] transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {submitted ? (
          <div className="text-center py-6">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] border border-[#A7F3D0] text-[#059669] flex items-center justify-center mx-auto mb-4">
              <Check className="w-6 h-6" />
            </div>
            <h3 className="text-[20px] font-semibold text-[#121316] tracking-tight mb-2">
              You're on the early access list
            </h3>
            <p className="text-[14px] text-[#5A6070] max-w-[340px] mx-auto mb-6 leading-relaxed">
              We've reserved your spot for <span className="font-mono font-medium text-[#121316]">{email}</span>. A private onboarding link will arrive shortly.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setEmail('');
                onClose();
              }}
              className="w-full h-[42px] bg-[#121316] text-[#FAF9F6] text-[13.5px] font-medium rounded-full hover:bg-black transition-colors"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="flex items-center gap-2 mb-2">
              <div className="w-3.5 h-3.5 border border-[#121316] rounded-[2px] rotate-45 flex items-center justify-center">
                <div className="w-1 h-1 bg-[#121316] rounded-[0.5px]" />
              </div>
              <span className="font-bold text-[14px] tracking-tight">SUITE ACCESS</span>
            </div>

            <h3 className="text-[22px] font-semibold text-[#121316] tracking-[-0.03em] mb-1.5">
              Start with Suite
            </h3>
            <p className="text-[13.5px] text-[#636979] mb-6">
              Connect products, stock, orders, and services in one seamless operational source of truth.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11.5px] font-medium text-[#373C48] mb-1.5">
                  Work Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-[40px] pl-10 pr-3.5 rounded-lg border border-[#E5E3DC] text-[13.5px] text-[#121316] placeholder:text-[#9CA3AF] bg-[#FAF9F7] focus:bg-[#FFFFFF] focus:outline-none focus:border-[#121316] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-medium text-[#373C48] mb-1.5">
                  Company Name
                </label>
                <div className="relative">
                  <Building2 className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Acme Operations Ltd."
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="w-full h-[40px] pl-10 pr-3.5 rounded-lg border border-[#E5E3DC] text-[13.5px] text-[#121316] placeholder:text-[#9CA3AF] bg-[#FAF9F7] focus:bg-[#FFFFFF] focus:outline-none focus:border-[#121316] transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11.5px] font-medium text-[#373C48] mb-1.5">
                  Inventory Volume / Team Size
                </label>
                <div className="relative">
                  <Users className="w-4 h-4 text-[#9CA3AF] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <select
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className="w-full h-[40px] pl-10 pr-3.5 rounded-lg border border-[#E5E3DC] text-[13.5px] text-[#121316] bg-[#FAF9F7] focus:bg-[#FFFFFF] focus:outline-none focus:border-[#121316] transition-colors cursor-pointer"
                  >
                    <option value="1-10">1 – 10 people (Growing Catalog)</option>
                    <option value="11-50">11 – 50 people (Multi-warehouse)</option>
                    <option value="50+">50+ people (Enterprise Operations)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full h-[44px] bg-[#121316] hover:bg-black text-[#FAF9F6] text-[14px] font-medium rounded-full flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md"
                >
                  <span>Request Instant Workspace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-[#868C9C] pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
                <span>Enterprise SOC2 Type II Certified • Zero lock-in</span>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
