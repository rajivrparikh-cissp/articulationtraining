'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Fingerprint, CheckCircle2, ArrowRight } from 'lucide-react';

export default function RegisterPasskeyPage() {
  const [registered, setRegistered] = useState(false);

  const handleRegister = () => {
    // Simulated WebAuthn registration
    setRegistered(true);
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl text-center">
        
        <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-4">
          <Fingerprint className="w-6 h-6" />
        </div>

        <h1 className="text-2xl font-bold text-white mb-2 font-display">
          Register Biometric Passkey
        </h1>
        <p className="text-xs text-slate-400 mb-6 leading-relaxed">
          ExecutiveVoice uses FIDO2 WebAuthn. Your voice recordings, evaluations, and scripts 
          are cryptographically bound to your hardware authenticator.
        </p>

        {!registered ? (
          <button
            onClick={handleRegister}
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Generate Passkey (FaceID / TouchID)</span>
          </button>
        ) : (
          <div className="space-y-4">
            <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Passkey Registered Successfully</span>
            </div>

            <Link
              href="/daily-routine"
              className="w-full inline-flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-amber-400 text-slate-950 font-bold text-sm hover:bg-amber-300 transition-colors"
            >
              <span>Continue to 9-Min Daily Routine</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}

      </div>
    </div>
  );
}
