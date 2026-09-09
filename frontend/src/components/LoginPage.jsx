import React, { useState } from 'react';
import { Activity, Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const appleSpring = { type: 'spring', stiffness: 280, damping: 28 };

export default function LoginPage({ onLogin, onNavigateLanding }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      onLogin({ email, name: email.split('@')[0] });
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center py-12 px-6 font-sans antialiased relative overflow-hidden">
      {/* Ambient Radial Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[350px] bg-purple-900/20 blur-[140px] rounded-full pointer-events-none" />

      {/* Header / Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={appleSpring}
        className="sm:mx-auto sm:w-full sm:max-w-md text-center relative z-10"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={appleSpring}
          className="flex justify-center items-center gap-2 mb-6 cursor-pointer inline-flex"
          onClick={onNavigateLanding}
        >
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 text-white p-2.5 rounded-2xl shadow-xl shadow-purple-900/40">
            <Activity className="w-6 h-6" />
          </div>
          <span className="text-2xl font-semibold tracking-tight text-white">PulseAI</span>
        </motion.div>
        <h2 className="text-xl font-semibold text-white tracking-tight">Clinical Portal Access</h2>
        <p className="mt-1.5 text-xs text-neutral-400">Authenticate with authorized healthcare credentials</p>
      </motion.div>

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ ...appleSpring, delay: 0.1 }}
        className="mt-8 sm:mx-auto sm:w-full sm:max-w-md relative z-10"
      >
        <div className="bg-neutral-900/80 backdrop-blur-2xl py-8 px-8 border border-neutral-800/80 rounded-3xl shadow-2xl space-y-6">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Hospital Email</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-purple-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-black/60 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 text-xs transition"
                  placeholder="dr.vance@hospital.org"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1.5">Access Key</label>
              <div className="relative rounded-xl shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-purple-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-black/60 border border-neutral-800 rounded-xl text-white placeholder-neutral-600 focus:outline-none focus:border-purple-500 text-xs transition"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={appleSpring}
              type="submit"
              className="w-full flex justify-center items-center gap-2 py-3 px-4 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition cursor-pointer shadow-lg shadow-purple-900/40"
            >
              Sign In <ArrowRight className="w-3.5 h-3.5" />
            </motion.button>
          </form>

          <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between text-[11px] text-neutral-500">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Encrypted Session
            </span>
            <span>PulseAI v2.4</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}