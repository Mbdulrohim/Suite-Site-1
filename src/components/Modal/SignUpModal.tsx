import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';

export interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [teamSize, setTeamSize] = useState('1-10');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate short network request
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 600);
  };

  return (
    <div 
      id="signup-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#121316]/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        id="signup-modal-container"
        className="relative w-full max-w-[440px] bg-[#FAF9F6] border border-[#EAE8E0] rounded-[24px] p-6 sm:p-8 shadow-2xl transition-all animate-in zoom-in-95 duration-200"
      >
        {/* Close Button */}
        <button
          id="modal-close-button"
          onClick={onClose}
          className="absolute right-5 top-5 p-1.5 rounded-full text-[#6B7280] hover:text-[#121316] hover:bg-[#EFECE6] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-6">
              <h3 className="text-[22px] font-bold text-[#121316] tracking-tight mb-2">
                Join the Suite Early Access
              </h3>
              <p className="text-[14px] text-[#646A7A] leading-relaxed">
                Connect stock, sales, services and operations in one workspace.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[12px] font-medium text-[#121316] mb-1.5">
                  Work Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-[42px] px-3.5 rounded-xl border border-[#D5D3CB] bg-[#FFFFFF] text-[14px] text-[#121316] placeholder:text-[#9AA0AF] focus:outline-none focus:ring-2 focus:ring-[#121316]/20 focus:border-[#121316] transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#121316] mb-1.5">
                  Company Name
                </label>
                <input
                  type="text"
                  placeholder="Acme Goods Ltd"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full h-[42px] px-3.5 rounded-xl border border-[#D5D3CB] bg-[#FFFFFF] text-[14px] text-[#121316] placeholder:text-[#9AA0AF] focus:outline-none focus:ring-2 focus:ring-[#121316]/20 focus:border-[#121316] transition-all"
                />
              </div>

              <div>
                <label className="block text-[12px] font-medium text-[#121316] mb-1.5">
                  Team Size
                </label>
                <select
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  className="w-full h-[42px] px-3.5 rounded-xl border border-[#D5D3CB] bg-[#FFFFFF] text-[14px] text-[#121316] focus:outline-none focus:ring-2 focus:ring-[#121316]/20 focus:border-[#121316] transition-all cursor-pointer"
                >
                  <option value="1-10">1-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="200+">200+ employees</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-[44px] mt-2 inline-flex items-center justify-center gap-2 bg-[#121316] hover:bg-[#000000] text-[#FAF9F6] text-[14.5px] font-medium rounded-xl transition-all shadow-md active:scale-[0.99] cursor-pointer disabled:opacity-75"
              >
                {isLoading ? (
                  <span>Securing your spot...</span>
                ) : (
                  <>
                    <span>Request Early Access</span>
                    <ArrowRight className="w-4 h-4 text-[#FAF9F6]/80" />
                  </>
                )}
              </button>

              <div className="text-center">
                <span className="text-[11px] text-[#8C92A4]">
                  No credit card required. Private beta rollout.
                </span>
              </div>
            </form>
          </div>
        ) : (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-[#ECFDF5] text-[#059669] flex items-center justify-center mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="text-[20px] font-bold text-[#121316] tracking-tight mb-2">
              You're on the list!
            </h3>
            <p className="text-[14px] text-[#646A7A] max-w-[300px] leading-relaxed mb-6">
              We've reserved early access for <strong className="text-[#121316]">{email}</strong>. Look out for our invite code.
            </p>
            <button
              onClick={onClose}
              className="bg-[#EAE8E1] hover:bg-[#DFDDD6] text-[#121316] text-[13.5px] font-medium px-6 h-[38px] rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
