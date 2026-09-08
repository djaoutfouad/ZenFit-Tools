import React, { useState } from 'react';
import {
  X,
  FileText,
  Table,
  Copy,
  Check,
  Download,
  Share2,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { ExportPayload, downloadTextFile, downloadCsvFile } from '../utils/exportEngine';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  exportData: ExportPayload;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  isOpen,
  onClose,
  exportData,
}) => {
  const [activeTab, setActiveTab] = useState<'text' | 'csv'>('text');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedCsv, setCopiedCsv] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleCopy = (type: 'text' | 'csv') => {
    const textToCopy = type === 'text' ? exportData.summaryText : exportData.csvText;
    navigator.clipboard.writeText(textToCopy);
    if (type === 'text') {
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2200);
    } else {
      setCopiedCsv(true);
      setTimeout(() => setCopiedCsv(false), 2200);
    }
  };

  const handleDownload = (format: 'txt' | 'csv') => {
    if (format === 'txt') {
      downloadTextFile(exportData.summaryText, `${exportData.filenameBase}.txt`);
      setDownloadSuccess('Saved as .TXT file');
    } else {
      downloadCsvFile(exportData.csvText, `${exportData.filenameBase}.csv`);
      setDownloadSuccess('Saved as .CSV spreadsheet');
    }
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  return (
    <div
      id="export-results-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/70 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-full max-w-2xl border border-slate-200 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center border border-amber-500/20">
              <Share2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 tracking-tight">
                Export Fitness Log &amp; Biometrics
              </h3>
              <p className="text-xs text-slate-500">
                {exportData.title} · {exportData.entriesCount} biometric data points
              </p>
            </div>
          </div>
          <button
            id="close-export-modal-btn"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Format Selectors & Action Bar */}
        <div className="px-6 pt-4 pb-3 border-b border-slate-100 bg-white flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
            <button
              id="tab-export-text"
              onClick={() => setActiveTab('text')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'text'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-3.5 h-3.5 text-amber-600" />
              <span>Formatted Summary (.txt)</span>
            </button>
            <button
              id="tab-export-csv"
              onClick={() => setActiveTab('csv')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'csv'
                  ? 'bg-white text-slate-950 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>CSV Spreadsheet (.csv)</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="copy-export-content-btn"
              onClick={() => handleCopy(activeTab)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-xs font-bold text-slate-700 transition-all shadow-xs"
            >
              {(activeTab === 'text' ? copiedText : copiedCsv) ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-slate-500" />
                  <span>Copy {activeTab === 'text' ? 'Summary' : 'CSV'}</span>
                </>
              )}
            </button>
            <button
              id="download-export-file-btn"
              onClick={() => handleDownload(activeTab === 'text' ? 'txt' : 'csv')}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-amber-400" />
              <span>Download {activeTab === 'text' ? '.TXT' : '.CSV'}</span>
            </button>
          </div>
        </div>

        {/* Status notification toast */}
        {downloadSuccess && (
          <div className="bg-emerald-50 border-b border-emerald-200 px-6 py-2 text-xs font-semibold text-emerald-800 flex items-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{downloadSuccess} - Ready for your logs!</span>
          </div>
        )}

        {/* Content Preview Box */}
        <div className="p-6 overflow-y-auto flex-1 bg-slate-950 font-mono text-xs text-slate-200 select-all leading-relaxed whitespace-pre font-normal">
          {activeTab === 'text' ? exportData.summaryText : exportData.csvText}
        </div>

        {/* Footer info badges */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Apple Notes, Notion &amp; Obsidian compatible</span>
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5">
              <Table className="w-3.5 h-3.5 text-emerald-600" />
              <span>Excel &amp; Google Sheets ready (UTF-8 BOM)</span>
            </span>
          </div>
          <span className="font-semibold text-slate-700">100% Private Client-Side Export</span>
        </div>
      </div>
    </div>
  );
};
