import React from 'react';
import { 
  Activity, 
  FileText, 
  Sliders, 
  User, 
  LogOut, 
  FileDown 
} from 'lucide-react';

export default function DashboardLayout({ children, activeTab, setActiveTab, user, onSignOut }) {
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
      alert('Failed to export report. Backend connection required.');
    }
  };

  return (
    <div className="flex h-screen bg-black text-white font-sans antialiased overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-neutral-900/80 border-r border-neutral-800 p-4 flex flex-col justify-between shrink-0">
        <div className="space-y-6">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-purple-600 p-2 rounded-xl text-white shadow-lg shadow-purple-950/50">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-white text-sm leading-tight">PulseAI</h1>
              <p className="text-[11px] text-neutral-400">Clinical Diagnostic Engine</p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            <button
              onClick={() => setActiveTab('workspace')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'workspace'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Activity className="w-4 h-4" />
              Scan Workspace
            </button>

            <button
              onClick={() => setActiveTab('records')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'records'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <FileText className="w-4 h-4" />
              Patient Records
            </button>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-purple-600/20 text-purple-300 border border-purple-500/30'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-800/50'
              }`}
            >
              <Sliders className="w-4 h-4" />
              Inference Settings
            </button>
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-neutral-800">
          <button
            onClick={handleExportPDF}
            className="w-full bg-purple-600 hover:bg-purple-500 text-white py-2.5 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-2 transition cursor-pointer shadow-lg shadow-purple-950/50"
          >
            <FileDown className="w-4 h-4" />
            Export Diagnostic PDF
          </button>

          <div className="flex items-center justify-between px-2 pt-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 text-xs font-bold">
                <User className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-semibold text-white leading-tight">
                  {user?.name || 'Dr. Alex Vance'}
                </p>
                <p className="text-[10px] text-neutral-500">Radiologist</p>
              </div>
            </div>
            {onSignOut && (
              <button
                onClick={onSignOut}
                className="text-neutral-500 hover:text-red-400 transition"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-12 bg-neutral-900/50 border-b border-neutral-800 px-6 flex items-center justify-between shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
            {activeTab === 'workspace' && 'Interactive Diagnostic Viewport'}
            {activeTab === 'records' && 'Patient History & Case Records'}
            {activeTab === 'settings' && 'Neural Model & Inference Configuration'}
          </span>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></span>
            <span className="text-xs text-neutral-300 font-medium">Model Pipeline Active</span>
          </div>
        </header>

        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}