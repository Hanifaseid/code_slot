import React from 'react';
import { X, Printer, CheckCircle2, FileText, Download } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onTriggerPrint: () => void;
}

export const PrintGuideModal: React.FC<Props> = ({ isOpen, onClose, onTriggerPrint }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 sm:p-7 shadow-2xl border border-neutral-200/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center">
              <Printer className="w-5 h-5 text-amber-800" />
            </div>
            <div>
              <h3 className="font-bold text-base text-neutral-950">Export to Crisp PDF</h3>
              <p className="text-xs text-neutral-500">Industry-standard vector print export</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3.5 my-5 text-xs text-neutral-700 bg-neutral-50/80 p-4 rounded-2xl border border-neutral-100">
          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900">1. Destination:</span> Select{' '}
              <strong className="text-neutral-900">"Save as PDF"</strong> in your browser's print dialog.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900">2. Background graphics:</span> Check the box for{' '}
              <strong className="text-neutral-900">"Background graphics"</strong> to preserve accent colors and skill badges.
            </div>
          </div>

          <div className="flex items-start gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-neutral-900">3. Margins:</span> Set Margins to{' '}
              <strong className="text-neutral-900">"None"</strong> or "Default" for exact millimeter alignment.
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-neutral-200 text-xs font-bold text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              setTimeout(() => {
                onTriggerPrint();
              }, 150);
            }}
            className="flex-1 py-2.5 rounded-xl bg-neutral-950 hover:bg-neutral-800 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Open Print Dialog</span>
          </button>
        </div>
      </div>
    </div>
  );
};
