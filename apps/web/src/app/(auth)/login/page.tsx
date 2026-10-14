'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Fingerprint, Lock, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [usePasskey, setUsePasskey] = useState(true);

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard
    window.location.href = '/daily-routine';
  };

  return (
    <div className="flex-1 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-slate-900/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
        
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 text-amber-400 flex items-center justify-center mx-auto mb-3">
            <Fingerprint className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-bold text-white font-display">
            Executive Identity Sign-In
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Zero-Knowledge Biometric Authentication (WebAuthn / Passkeys)
          </p>
        </div>

        <form onSubmit={handleAuth} className="space-y-4">
          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1.5">
              Executive Email:
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="candidate@executivevoice.ai"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-200 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center space-x-2 py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-sm shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
          >
            <Fingerprint className="w-4 h-4" />
            <span>Authenticate with TouchID / FaceID</span>
          </button>
        </form>

        <div className="mt-6 pt-6 border-t border-slate-800 text-center text-xs text-slate-500">
          <span>First time here? </span>
          <Link href="/register-passkey" className="text-amber-400 hover:underline font-semibold">
            Register FIDO2 Passkey
          </Link>
        </div>

      </div>
    </div>
  );
}
