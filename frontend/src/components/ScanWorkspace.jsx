import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Upload, Send, Loader2, FileImage, Sparkles, AlertCircle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const appleSpring = { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 };
const smoothEase = { duration: 0.35, ease: [0.16, 1, 0.3, 1] };

// Realistic Procedural Radiograph & CT Scan Generators
const createRealisticScan = (type) => {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#050505';
  ctx.fillRect(0, 0, 512, 512);

  if (type === 'xray') {
    const softTissue = ctx.createRadialGradient(256, 256, 40, 256, 256, 230);
    softTissue.addColorStop(0, 'rgba(180, 180, 180, 0.25)');
    softTissue.addColorStop(0.6, 'rgba(120, 120, 120, 0.15)');
    softTissue.addColorStop(1, 'rgba(10, 10, 10, 0.05)');
    ctx.fillStyle = softTissue;
    ctx.beginPath();
    ctx.ellipse(256, 260, 190, 210, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#080808';
    ctx.beginPath();
    ctx.ellipse(175, 250, 60, 130, 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(337, 250, 58, 125, -0.05, 0, Math.PI * 2);
    ctx.fill();

    const heart = ctx.createRadialGradient(300, 310, 10, 300, 310, 90);
    heart.addColorStop(0, 'rgba(230, 230, 230, 0.75)');
    heart.addColorStop(0.7, 'rgba(170, 170, 170, 0.4)');
    heart.addColorStop(1, 'rgba(30, 30, 30, 0)');
    ctx.fillStyle = heart;
    ctx.beginPath();
    ctx.ellipse(290, 300, 80, 75, -0.2, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(200, 200, 200, 0.45)';
    for (let y = 80; y < 450; y += 18) {
      ctx.fillRect(248, y, 16, 12);
    }

    ctx.strokeStyle = 'rgba(210, 210, 210, 0.35)';
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    for (let i = 0; i < 9; i++) {
      const yOffset = 130 + i * 32;
      ctx.beginPath();
      ctx.bezierCurveTo(240, yOffset, 120, yOffset - 10, 120, yOffset + 35);
      ctx.stroke();
      ctx.beginPath();
      ctx.bezierCurveTo(272, yOffset, 392, yOffset - 10, 392, yOffset + 35);
      ctx.stroke();
    }

    ctx.lineWidth = 12;
    ctx.strokeStyle = 'rgba(230, 230, 230, 0.55)';
    ctx.beginPath();
    ctx.bezierCurveTo(250, 115, 160, 105, 100, 130);
    ctx.stroke();
    ctx.beginPath();
    ctx.bezierCurveTo(262, 115, 352, 105, 412, 130);
    ctx.stroke();

    const lesion = ctx.createRadialGradient(185, 230, 2, 185, 230, 32);
    lesion.addColorStop(0, 'rgba(240, 240, 240, 0.85)');
    lesion.addColorStop(0.5, 'rgba(190, 190, 190, 0.5)');
    lesion.addColorStop(1, 'rgba(20, 20, 20, 0)');
    ctx.fillStyle = lesion;
    ctx.beginPath();
    ctx.arc(185, 230, 32, 0, Math.PI * 2);
    ctx.fill();

  } else {
    const body = ctx.createRadialGradient(256, 256, 100, 256, 256, 220);
    body.addColorStop(0, 'rgba(140, 140, 140, 0.25)');
    body.addColorStop(0.85, 'rgba(180, 180, 180, 0.35)');
    body.addColorStop(0.92, 'rgba(240, 240, 240, 0.7)');
    body.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = body;
    ctx.beginPath();
    ctx.ellipse(256, 256, 200, 170, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#030303';
    ctx.beginPath();
    ctx.ellipse(180, 240, 65, 95, 0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(332, 240, 65, 95, -0.15, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(245, 245, 245, 0.85)';
    ctx.beginPath();
    ctx.arc(256, 380, 28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#050505';
    ctx.beginPath();
    ctx.arc(256, 380, 10, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = 'rgba(230, 230, 230, 0.75)';
    ctx.fillRect(240, 115, 32, 14);

    for (let angle = 0.2; angle < Math.PI - 0.2; angle += 0.45) {
      const rx = 256 + Math.cos(angle) * 185;
      const ry = 256 + Math.sin(angle) * 155;
      const lx = 256 - Math.cos(angle) * 185;
      ctx.fillStyle = 'rgba(235, 235, 235, 0.8)';
      ctx.beginPath();
      ctx.arc(rx, ry, 7, 0, Math.PI * 2);
      ctx.arc(lx, ry, 7, 0, Math.PI * 2);
      ctx.fill();
    }

    const nodule = ctx.createRadialGradient(360, 220, 1, 360, 220, 18);
    nodule.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
    nodule.addColorStop(0.6, 'rgba(200, 200, 200, 0.7)');
    nodule.addColorStop(1, 'rgba(5, 5, 5, 0)');
    ctx.fillStyle = nodule;
    ctx.beginPath();
    ctx.arc(360, 220, 18, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.fillStyle = 'rgba(200, 200, 200, 0.6)';
  ctx.font = '11px monospace';
  if (type === 'xray') {
    ctx.fillText('DICOM ID: CXR-88402', 20, 30);
    ctx.fillText('MODE: CHEST PA / 120kVp', 20, 46);
    ctx.fillText('STATION: PULSE-RAD-01', 20, 490);
    ctx.fillText('R', 470, 50);
  } else {
    ctx.fillText('DICOM ID: CT-99023', 20, 30);
    ctx.fillText('SLICE: 32/120 [SL 2.5mm]', 20, 46);
    ctx.fillText('W:1500 L:-600 (LUNG)', 20, 490);
    ctx.fillText('A', 252, 30);
  }

  return canvas.toDataURL('image/png');
};

const SAMPLE_SCANS = [
  {
    id: 'sample-a',
    name: 'Chest X-Ray (Sample A)',
    url: createRealisticScan('xray'),
    analysisData: {
      status: 'success',
      total_detections: 1,
      detections: [
        { class: 'Pulmonary Opacity', confidence: 0.91, box: [150, 195, 220, 265] },
      ],
    },
  },
  {
    id: 'sample-b',
    name: 'CT Thoracic Scan (Sample B)',
    url: createRealisticScan('ct'),
    analysisData: {
      status: 'success',
      total_detections: 1,
      detections: [
        { class: 'Solitary Nodule', confidence: 0.88, box: [338, 198, 382, 242] },
      ],
    },
  },
];

const SUGGESTED_QUERIES = [
  'What are the primary indicators for pulmonary consolidation?',
  'Recommend treatment protocol for small pleural effusion.',
  'What follow-up imaging is required for a 7mm solitary nodule?',
];

export default function ScanWorkspace() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(SAMPLE_SCANS[0].url);
  const [analysis, setAnalysis] = useState(SAMPLE_SCANS[0].analysisData);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        'PulseAI System Initialized. Radiographs and CT volumes ready for diagnostic processing. How can I assist with your clinical assessment?',
    },
  ]);
  const [inputQuery, setInputQuery] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const canvasRef = useRef(null);
  const imgRef = useRef(null);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      if (selectedFile && imagePreview.startsWith('blob:')) {
        URL.revokeObjectURL(imagePreview);
      }
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysis(null);
      setErrorMessage('');
    }
  };

  const handleSelectSample = (sample) => {
    if (selectedFile && imagePreview.startsWith('blob:')) {
      URL.revokeObjectURL(imagePreview);
    }
    setSelectedFile(null);
    setImagePreview(sample.url);
    setAnalysis(sample.analysisData);
    setErrorMessage('');
  };

  const drawDetections = useCallback(() => {
    if (!canvasRef.current || !imgRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = imgRef.current;

    const displayWidth = img.clientWidth;
    const displayHeight = img.clientHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    canvas.width = displayWidth;
    canvas.height = displayHeight;

    const naturalWidth = img.naturalWidth || 512;
    const naturalHeight = img.naturalHeight || 512;

    const scaleX = displayWidth / naturalWidth;
    const scaleY = displayHeight / naturalHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (analysis && Array.isArray(analysis.detections)) {
      analysis.detections.forEach((det) => {
        if (!det.box) return;
        const [xmin, ymin, xmax, ymax] = det.box;

        const x = xmin * scaleX;
        const y = ymin * scaleY;
        const width = (xmax - xmin) * scaleX;
        const height = (ymax - ymin) * scaleY;

        ctx.strokeStyle = '#c084fc';
        ctx.lineWidth = 2;
        ctx.strokeRect(x, y, width, height);

        ctx.fillStyle = '#9333ea';
        const label = `${det.class} (${(det.confidence * 100).toFixed(0)}%)`;
        ctx.font = '500 11px -apple-system, BlinkMacSystemFont, sans-serif';
        const textWidth = ctx.measureText(label).width;
        ctx.fillRect(x, y > 22 ? y - 22 : y, textWidth + 10, 20);

        ctx.fillStyle = '#ffffff';
        ctx.fillText(label, x + 5, y > 22 ? y - 8 : y + 14);
      });
    }
  }, [analysis]);

  useEffect(() => {
    const timer = setTimeout(() => {
      drawDetections();
    }, 50);
    window.addEventListener('resize', drawDetections);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', drawDetections);
    };
  }, [analysis, imagePreview, drawDetections]);

  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setLoading(true);
    setErrorMessage('');
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Failed to analyze image');
      }

      const data = await res.json();
      setAnalysis(data);
    } catch (err) {
      setErrorMessage(err.message || 'Could not connect to backend.');
    } finally {
      setLoading(false);
    }
  };

  const sendQueryText = async (text) => {
    if (!text.trim()) return;

    const newMessages = [...messages, { role: 'user', content: text }];
    setMessages(newMessages);

    try {
      const res = await fetch('http://127.0.0.1:8000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: newMessages }),
      });
      if (!res.ok) throw new Error('Network response was not ok');
      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Connection error to backend.' },
      ]);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendQueryText(inputQuery);
    setInputQuery('');
  };

  return (
    <div className="grid grid-cols-12 gap-5 h-full w-full overflow-hidden p-1">
      {/* LEFT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: -20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={smoothEase}
        className="col-span-3 bg-neutral-900/60 backdrop-blur-2xl rounded-3xl border border-neutral-800/80 p-5 flex flex-col justify-between shadow-2xl overflow-y-auto"
      >
        <div className="space-y-5">
          <div>
            <h2 className="text-sm font-semibold text-white tracking-tight flex items-center gap-2">
              <FileImage className="w-4 h-4 text-purple-400" /> Intake Medical Scan
            </h2>
            <p className="text-[11px] text-neutral-500 mt-1">Upload DICOM, CT, or X-Ray image format</p>
          </div>

          <motion.label
            whileHover={{ scale: 1.01, borderColor: 'rgba(168, 85, 247, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            transition={appleSpring}
            className="group relative border-2 border-dashed border-neutral-800 bg-black/40 hover:bg-purple-950/10 rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-colors duration-300"
          >
            <input type="file" onChange={handleImageUpload} className="hidden" accept="image/*" />
            <motion.div
              whileHover={{ rotate: 5, scale: 1.1 }}
              transition={appleSpring}
              className="p-2.5 bg-purple-600/10 text-purple-400 rounded-2xl mb-2"
            >
              <Upload className="w-5 h-5" />
            </motion.div>
            <p className="text-xs font-medium text-neutral-200 group-hover:text-purple-300 transition-colors">
              {selectedFile ? selectedFile.name : 'Choose scan file'}
            </p>
            <p className="text-[10px] text-neutral-500 mt-1">Click or drag & drop</p>
          </motion.label>

          <div className="space-y-2">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Quick Load Preset Scans
            </p>
            <div className="space-y-1.5">
              {SAMPLE_SCANS.map((sample) => (
                <motion.button
                  key={sample.id}
                  whileHover={{ x: 3, backgroundColor: 'rgba(88, 28, 135, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={appleSpring}
                  onClick={() => handleSelectSample(sample)}
                  className="w-full text-left p-2.5 bg-black/40 border border-neutral-800 hover:border-purple-500/30 rounded-xl text-xs text-neutral-300 transition-colors flex items-center justify-between"
                >
                  <span>{sample.name}</span>
                  <Zap className="w-3 h-3 text-purple-400" />
                </motion.button>
              ))}
            </div>
          </div>

          {selectedFile && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={appleSpring}
              onClick={handleAnalyze}
              disabled={loading}
              className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white py-3 rounded-xl font-medium text-xs transition flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-purple-950/50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Processing Neural Model...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Run YOLOv8 Analysis</span>
                </>
              )}
            </motion.button>
          )}

          {errorMessage && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-950/40 border border-red-800/80 text-red-300 rounded-xl text-xs flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </motion.div>
          )}
        </div>

        <div className="p-3 bg-black/40 border border-neutral-800/80 rounded-2xl flex items-center justify-between text-[11px] text-neutral-400 mt-4">
          <span>Neural Engine</span>
          <span className="flex items-center gap-1.5 text-purple-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" /> Active
          </span>
        </div>
      </motion.div>

      {/* CENTER PANEL */}
      <motion.div
        initial={{ opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
        animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
        transition={smoothEase}
        className="col-span-5 bg-neutral-900/60 backdrop-blur-2xl rounded-3xl border border-neutral-800/80 p-5 flex flex-col justify-between shadow-2xl relative overflow-hidden"
      >
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white tracking-tight">Diagnostic Visualizer</h2>
          {analysis && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={appleSpring}
              className="text-[10px] bg-purple-600/20 text-purple-300 border border-purple-500/30 px-2.5 py-0.5 rounded-full font-medium"
            >
              {analysis?.total_detections ?? 0} Pathologies Identified
            </motion.span>
          )}
        </div>

        <div className="flex-1 bg-black/60 rounded-2xl border border-neutral-800/80 p-3 flex justify-center items-center relative overflow-hidden min-h-[320px]">
          <AnimatePresence mode="wait">
            {imagePreview ? (
              <motion.div
                key={imagePreview}
                initial={{ opacity: 0, scale: 0.95, filter: 'blur(4px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                exit={{ opacity: 0, scale: 1.03, filter: 'blur(4px)' }}
                transition={smoothEase}
                className="relative max-h-full max-w-full flex justify-center items-center"
              >
                <img
                  ref={imgRef}
                  src={imagePreview}
                  alt="Scan viewport"
                  onLoad={drawDetections}
                  className="max-h-[360px] w-auto rounded-xl object-contain block mx-auto shadow-2xl border border-neutral-800/50"
                />
                <canvas
                  ref={canvasRef}
                  className="absolute top-0 left-0 w-full h-full pointer-events-none"
                />
              </motion.div>
            ) : (
              <div className="text-center space-y-2">
                <div className="p-4 bg-neutral-900/80 rounded-2xl border border-neutral-800 inline-block text-neutral-500">
                  <FileImage className="w-8 h-8" />
                </div>
                <p className="text-xs text-neutral-500 font-medium">No Scan Loaded into Viewport</p>
              </div>
            )}
          </AnimatePresence>
        </div>

        {analysis && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={appleSpring}
            className="mt-3 p-3 bg-black/40 border border-neutral-800/80 rounded-2xl max-h-36 overflow-y-auto space-y-2"
          >
            {Array.isArray(analysis?.detections) && analysis.detections.length > 0 ? (
              analysis.detections.map((det, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ ...appleSpring, delay: index * 0.05 }}
                  className="bg-neutral-900/80 p-2.5 rounded-xl border border-neutral-800 text-xs flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-white text-[11px]">{det.class}</p>
                    <p className="text-[10px] text-neutral-500">Box: [{det.box?.join(', ') ?? 'N/A'}]</p>
                  </div>
                  <span className="text-[11px] font-semibold text-purple-400">
                    {det.confidence ? (det.confidence * 100).toFixed(1) + '%' : 'N/A'}
                  </span>
                </motion.div>
              ))
            ) : (
              <p className="text-xs text-neutral-500 italic text-center">No abnormalities flagged by model.</p>
            )}
          </motion.div>
        )}
      </motion.div>

      {/* RIGHT PANEL */}
      <motion.div
        initial={{ opacity: 0, x: 20, filter: 'blur(8px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={smoothEase}
        className="col-span-4 bg-neutral-900/60 backdrop-blur-2xl rounded-3xl border border-neutral-800/80 p-5 flex flex-col justify-between shadow-2xl overflow-hidden"
      >
        <div className="flex-1 flex flex-col justify-between h-full space-y-3">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-white tracking-tight">Clinical Assistant</h2>
              <span className="text-[10px] text-neutral-500">RAG Context Engine</span>
            </div>

            <div className="space-y-3 overflow-y-auto max-h-[300px] pr-1">
              <AnimatePresence initial={false}>
                {messages.map((m, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={appleSpring}
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-purple-600 text-white ml-auto max-w-[85%] rounded-br-none shadow-md shadow-purple-950/40'
                        : 'bg-black/60 text-neutral-200 border border-neutral-800/80 mr-auto max-w-[85%] rounded-bl-none'
                    }`}
                  >
                    {m.content}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-1.5 pt-2 border-t border-neutral-800/80">
            <p className="text-[10px] font-semibold text-neutral-500 uppercase tracking-wider">
              Clinical Quick Guidance
            </p>
            <div className="space-y-1">
              {SUGGESTED_QUERIES.map((q, i) => (
                <motion.button
                  key={i}
                  whileHover={{ x: 3, backgroundColor: 'rgba(88, 28, 135, 0.2)' }}
                  whileTap={{ scale: 0.98 }}
                  transition={appleSpring}
                  onClick={() => sendQueryText(q)}
                  className="w-full text-left text-[11px] p-2 bg-black/40 text-neutral-400 hover:text-purple-300 border border-neutral-800/60 hover:border-purple-500/30 rounded-xl transition-colors truncate"
                >
                  • {q}
                </motion.button>
              ))}
            </div>
          </div>

          <form onSubmit={handleSendMessage} className="pt-2 flex gap-2">
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ask clinical queries..."
              className="flex-1 border border-neutral-800 rounded-xl px-3.5 py-2.5 text-xs text-white bg-black/50 focus:outline-none focus:border-purple-500 transition-colors placeholder-neutral-600"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.92 }}
              transition={appleSpring}
              type="submit"
              className="bg-purple-600 hover:bg-purple-500 text-white px-3.5 py-2.5 rounded-xl transition-colors cursor-pointer shadow-lg shadow-purple-950/50 flex items-center justify-center"
            >
              <Send className="w-3.5 h-3.5" />
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}