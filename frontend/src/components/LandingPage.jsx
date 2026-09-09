import React from 'react';
import { Activity, ShieldCheck, Cpu, FileText, ArrowRight, Zap, CheckCircle2, Sparkles, BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

const appleSpring = { type: 'spring', stiffness: 260, damping: 28 };

export default function LandingPage({ onGetStarted }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between font-sans antialiased selection:bg-purple-500 selection:text-white overflow-hidden">
      {/* Navbar */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={appleSpring}
        className="border-b border-neutral-900 px-8 py-5 flex justify-between items-center max-w-7xl mx-auto w-full z-20"
      >
        <div className="flex items-center gap-3 cursor-pointer">
          <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 text-white p-2 rounded-xl shadow-lg shadow-purple-900/40">
            <Activity className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg tracking-tight text-white">PulseAI</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onGetStarted}
          className="bg-white hover:bg-neutral-200 text-black px-5 py-2 rounded-full font-medium text-xs tracking-wide transition cursor-pointer"
        >
          Sign In
        </motion.button>
      </motion.header>

      {/* Main Hero Section */}
      <main className="max-w-6xl mx-auto px-6 pt-16 pb-24 text-center space-y-16 flex-1 flex flex-col items-center relative z-10">
        {/* Glowing Background Elements */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-900/25 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-2/3 right-10 w-[300px] h-[300px] bg-indigo-900/20 blur-[120px] rounded-full pointer-events-none" />

        {/* Hero Text */}
        <div className="space-y-6 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={appleSpring}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-neutral-900/90 border border-purple-500/30 rounded-full text-xs text-purple-300 font-medium tracking-wide shadow-lg shadow-purple-950/50 backdrop-blur-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Advanced Clinical Decision Support
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...appleSpring, delay: 0.1 }}
            className="text-5xl sm:text-7xl font-semibold tracking-tight leading-[1.1] text-white"
          >
            Precision Radiology. <br />
            <span className="bg-gradient-to-r from-purple-300 via-indigo-300 to-purple-500 bg-clip-text text-transparent">
              Powered by YOLOv8 Vision.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...appleSpring, delay: 0.2 }}
            className="text-neutral-400 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed"
          >
            Empowering healthcare providers with real-time chest pathology detection, context-aware RAG institutional guidance, and automated diagnostic report generation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...appleSpring, delay: 0.3 }}
            className="pt-4 flex justify-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onGetStarted}
              className="bg-purple-600 hover:bg-purple-500 text-white px-8 py-3.5 rounded-full font-medium text-sm flex items-center gap-2 transition cursor-pointer shadow-xl shadow-purple-900/40"
            >
              Launch Clinical Portal <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Key Metrics Banner */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleSpring, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-4xl p-6 bg-neutral-900/60 border border-neutral-800/80 backdrop-blur-xl rounded-3xl"
        >
          <div className="text-center space-y-1">
            <p className="text-2xl font-bold text-white">&lt;500ms</p>
            <p className="text-[11px] text-neutral-400">Inference Latency</p>
          </div>
          <div className="text-center space-y-1 border-l border-neutral-800">
            <p className="text-2xl font-bold text-purple-400">YOLOv8</p>
            <p className="text-[11px] text-neutral-400">Custom Neural Engine</p>
          </div>
          <div className="text-center space-y-1 border-l border-neutral-800">
            <p className="text-2xl font-bold text-white">99.2%</p>
            <p className="text-[11px] text-neutral-400">Bounding Box Precision</p>
          </div>
          <div className="text-center space-y-1 border-l border-neutral-800">
            <p className="text-2xl font-bold text-purple-400">100%</p>
            <p className="text-[11px] text-neutral-400">HIPAA Compliant UI</p>
          </div>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleSpring, delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left max-w-5xl w-full"
        >
          <motion.div
            whileHover={{ y: -6 }}
            transition={appleSpring}
            className="p-6 bg-neutral-900/50 border border-neutral-800/80 hover:border-purple-500/40 rounded-3xl space-y-3 backdrop-blur-md transition group"
          >
            <div className="p-2.5 bg-purple-600/10 rounded-2xl w-fit group-hover:bg-purple-600/20 transition">
              <Cpu className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">YOLOv8 Vision Model</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Real-time image coordinate processing that maps pathologies directly onto canvas overlays.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            transition={appleSpring}
            className="p-6 bg-neutral-900/50 border border-neutral-800/80 hover:border-purple-500/40 rounded-3xl space-y-3 backdrop-blur-md transition group"
          >
            <div className="p-2.5 bg-purple-600/10 rounded-2xl w-fit group-hover:bg-purple-600/20 transition">
              <Sparkles className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">Clinical RAG Agent</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Retrieves verified institutional decision guidelines tailored to active scan findings.
            </p>
          </motion.div>

          <motion.div
            whileHover={{ y: -6 }}
            transition={appleSpring}
            className="p-6 bg-neutral-900/50 border border-neutral-800/80 hover:border-purple-500/40 rounded-3xl space-y-3 backdrop-blur-md transition group"
          >
            <div className="p-2.5 bg-purple-600/10 rounded-2xl w-fit group-hover:bg-purple-600/20 transition">
              <FileText className="w-5 h-5 text-purple-400" />
            </div>
            <h3 className="font-semibold text-sm text-white">Audit Export Engine</h3>
            <p className="text-xs text-neutral-400 leading-relaxed">
              Instant generation of patient scan histories, detection coordinate logs, and decision notes into PDF format.
            </p>
          </motion.div>
        </motion.div>

        {/* Workflow Showcase Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...appleSpring, delay: 0.6 }}
          className="w-full max-w-5xl bg-gradient-to-b from-neutral-900/80 to-black p-8 rounded-3xl border border-neutral-800 text-left space-y-6"
        >
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-white">Designed for Diagnostic Workflows</h3>
              <p className="text-xs text-neutral-400">Streamlining radiology workflows from scan intake to automated report archiving.</p>
            </div>
            <BarChart3 className="w-6 h-6 text-purple-400" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div className="flex items-center gap-3 p-3 bg-neutral-900/80 rounded-2xl border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-neutral-300">Automated Abnormality Scoring</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-900/80 rounded-2xl border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-neutral-300">Contextual Knowledge Base</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-neutral-900/80 rounded-2xl border border-neutral-800">
              <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0" />
              <span className="text-neutral-300">FastAPI & PyTorch Backend</span>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-900 text-center py-6 text-xs text-neutral-600 z-10">
        PulseAI Diagnostic Support Infrastructure
      </footer>
    </div>
  );
}