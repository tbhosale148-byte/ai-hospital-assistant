import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import ScanWorkspace from './components/ScanWorkspace';
import {
  Activity,
  Users,
  Download,
  LogOut,
  FolderOpen,
  FileText,
  BrainCircuit,
  Sliders
} from 'lucide-react';

export default function App() {
  const [view, setView] = useState('landing');
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('workspace');
  
  // Dynamic backend states
  const [records, setRecords] = useState([]);
  const [library, setLibrary] = useState([]);
  const [audits, setAudits] = useState([]);
  const [confThreshold, setConfThreshold] = useState(25);
  const [iouThreshold, setIouThreshold] = useState(45);

  useEffect(() => {
    if (view === 'app') {
      if (activeTab === 'records') {
        fetch('http://127.0.0.1:8000/api/records')
          .then((res) => res.json())
          .then((data) => setRecords(data.records || []))
          .catch((err) => console.error('Error fetching records:', err));
      } else if (activeTab === 'studies') {
        fetch('http://127.0.0.1:8000/api/library')
          .then((res) => res.json())
          .then((data) => setLibrary(data.library || []))
          .catch((err) => console.error('Error fetching library:', err));
      } else if (activeTab === 'reports') {
        fetch('http://127.0.0.1:8000/api/audits')
          .then((res) => res.json())
          .then((data) => setAudits(data.audits || []))
          .catch((err) => console.error('Error fetching audits:', err));
      }
    }
  }, [view, activeTab]);

  const handleLogin = (userData) => {
    setUser(userData);
    setView('app');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const handleExportPDF = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/export-report', {
        method: 'POST',
      });
      if (!response.ok) throw new Error('Failed to generate PDF');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'PulseAI_Diagnostic_Report.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export diagnostic report.');
    }
  };

  if (view === 'landing') {
    return <LandingPage onGetStarted={() => setView('login')} />;
  }

  if (view === 'login') {
    return <LoginPage onLogin={handleLogin} onNavigateLanding={() => setView('landing')} />;
  }

  return (
    <div className="flex h-screen bg-black text-white font-sans antialiased overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-neutral-950 text-white flex flex-col justify-between p-4 border-r border-neutral-900/80 z-20 shrink-0">
        <div className="space-y-6">
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2 cursor-pointer" onClick={() => setView('landing')}>
            <div className="bg-gradient-to-tr from-purple-600 to-indigo-500 text-white p-2 rounded-xl shadow-md shadow-purple-900/30">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-semibold text-white text-sm tracking-tight">PulseAI</h1>
              <p className="text-[10px] text-neutral-500">Clinical Suite v2.4</p>
            </div>
          </div>

          {/* Navigation Category 1: Diagnostics */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Diagnostics
            </p>

            <button
              onClick={() => setActiveTab('workspace')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'workspace'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Activity className="w-4 h-4 text-purple-400" /> Scan Workspace
              </span>
              <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            </button>

            <button
              onClick={() => setActiveTab('models')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'models'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <BrainCircuit className="w-4 h-4 text-purple-400" /> Neural Models
              </span>
              <span className="text-[10px] bg-neutral-800 text-purple-300 px-1.5 py-0.5 rounded">
                YOLOv8
              </span>
            </button>
          </div>

          {/* Navigation Category 2: Management */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Data & Records
            </p>

            <button
              onClick={() => setActiveTab('records')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'records'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Users className="w-4 h-4 text-purple-400" /> Patient Records
              </span>
            </button>

            <button
              onClick={() => setActiveTab('studies')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'studies'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FolderOpen className="w-4 h-4 text-purple-400" /> Imaging Library
              </span>
            </button>

            <button
              onClick={() => setActiveTab('reports')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'reports'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <FileText className="w-4 h-4 text-purple-400" /> Saved Audits
              </span>
            </button>
          </div>

          {/* Navigation Category 3: Configuration */}
          <div className="space-y-1">
            <p className="px-2 text-[10px] font-semibold text-neutral-500 uppercase tracking-wider mb-1">
              Configuration
            </p>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-purple-950/40 text-purple-300 border border-purple-500/30'
                  : 'hover:bg-neutral-900 text-neutral-400'
              }`}
            >
              <span className="flex items-center gap-2.5">
                <Sliders className="w-4 h-4 text-purple-400" /> Inference Settings
              </span>
            </button>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="space-y-2 pt-4 border-t border-neutral-900">
          <button
            onClick={handleExportPDF}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-purple-900/30"
          >
            <Download className="w-3.5 h-3.5" /> Export Diagnostic PDF
          </button>

          <button
            onClick={handleLogout}
            className="w-full bg-neutral-900 text-neutral-400 py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 hover:text-white transition cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" /> Sign Out ({user?.name || 'Doctor'})
          </button>
        </div>
      </aside>

      {/* Main View Area */}
      <main className="flex-1 p-6 overflow-hidden relative bg-neutral-950">
        <div className="relative z-10 h-full w-full overflow-y-auto">
          {activeTab === 'workspace' && <ScanWorkspace />}

          {activeTab === 'models' && (
            <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-semibold text-white">Active Neural Model Pipelines</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-black/50 border border-purple-500/30 rounded-2xl">
                  <p className="text-xs font-semibold text-purple-300">YOLOv8 Neural Detection Engine</p>
                  <p className="text-[11px] text-neutral-500 mt-1">Status: Active ({confThreshold / 100} Conf Cutoff)</p>
                </div>
                <div className="p-4 bg-black/50 border border-neutral-800 rounded-2xl">
                  <p className="text-xs font-semibold text-neutral-300">FastAPI Clinical RAG Assistant</p>
                  <p className="text-[11px] text-neutral-500 mt-1">Status: Online (Port 8000)</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'records' && (
            <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-semibold text-white">Patient Diagnostic History</h2>
              <div className="divide-y divide-neutral-800">
                {records.length > 0 ? (
                  records.map((rec) => (
                    <div key={rec.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-white">Record #{rec.id} - {rec.filename}</p>
                        <p className="text-neutral-500">Findings: {Array.isArray(rec.primary_findings) ? rec.primary_findings.join(', ') : rec.primary_findings}</p>
                      </div>
                      <span className="bg-purple-950/40 text-purple-300 border border-purple-500/30 text-[10px] px-2.5 py-1 rounded-full">
                        {rec.total_detections} Flagged
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 py-4 italic">No patient records loaded from backend.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'studies' && (
            <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-semibold text-white">Imaging Library (PACS)</h2>
              <div className="divide-y divide-neutral-800">
                {library.length > 0 ? (
                  library.map((item) => (
                    <div key={item.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-white">{item.id} • {item.patient}</p>
                        <p className="text-neutral-500">{item.type} — {item.findings}</p>
                      </div>
                      <span className="text-neutral-400 text-[11px]">{item.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 py-4 italic">No study records retrieved.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl space-y-4">
              <h2 className="text-sm font-semibold text-white">Neural Inference Audit Logs</h2>
              <div className="divide-y divide-neutral-800">
                {audits.length > 0 ? (
                  audits.map((audit) => (
                    <div key={audit.id} className="py-3 flex justify-between items-center text-xs">
                      <div>
                        <p className="font-semibold text-white">Audit {audit.id} ({audit.scanId})</p>
                        <p className="text-neutral-500">Model: {audit.model} • Conf: {audit.confidence}</p>
                      </div>
                      <span className="text-neutral-400 text-[11px]">{audit.date}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-neutral-500 py-4 italic">No audit entries found.</p>
                )}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-neutral-900/70 border border-neutral-800 p-6 rounded-3xl space-y-5 max-w-lg">
              <h2 className="text-sm font-semibold text-white">Model Confidence & Non-Max Suppression Controls</h2>
              <div className="space-y-4 text-xs">
                <div>
                  <div className="flex justify-between text-neutral-400 mb-1">
                    <span>Confidence Cutoff Threshold</span>
                    <span className="font-mono text-purple-300">{confThreshold / 100}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="95"
                    value={confThreshold}
                    onChange={(e) => setConfThreshold(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
                <div>
                  <div className="flex justify-between text-neutral-400 mb-1">
                    <span>NMS IoU Overlap Threshold</span>
                    <span className="font-mono text-purple-300">{iouThreshold / 100}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="90"
                    value={iouThreshold}
                    onChange={(e) => setIouThreshold(Number(e.target.value))}
                    className="w-full accent-purple-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}