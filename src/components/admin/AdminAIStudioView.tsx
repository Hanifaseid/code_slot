import React from 'react';
import {
  Sparkles,
  Zap,
  TrendingUp,
  Cpu,
  Clock,
  CheckCircle2,
  Tag,
  ArrowUpRight,
  Database
} from 'lucide-react';
import { AIStudioSessionRecord } from '../../types/admin';

interface AdminAIStudioViewProps {
  sessions: AIStudioSessionRecord[];
}

export const AdminAIStudioView: React.FC<AdminAIStudioViewProps> = ({ sessions }) => {
  const topKeywords = [
    { tag: 'Kubernetes (K8s)', count: 412, growth: '+34%' },
    { tag: 'Distributed Consensus (Raft)', count: 320, growth: '+28%' },
    { tag: 'gRPC & Protocol Buffers', count: 295, growth: '+22%' },
    { tag: 'CRDTs & Local-first', count: 248, growth: '+45%' },
    { tag: 'Next.js 15 Server Components', count: 210, growth: '+19%' },
    { tag: 'LLM Fine-tuning & LoRA', count: 198, growth: '+52%' },
    { tag: 'Apache Iceberg & DuckDB', count: 165, growth: '+31%' },
    { tag: 'Rust async / Tokio', count: 142, growth: '+40%' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-amber-50 text-amber-600">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              AI Resume Studio Telemetry & Insights
            </h1>
            <p className="text-xs text-neutral-500 mt-0.5">
              Deep telemetry on candidate resume optimizations powered by Google Gemini 2.5 Flash.
            </p>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Average ATS Score Gain
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-emerald-600">+24.8%</span>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">
              Avg +26 pts
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-2">Before: 67% avg → After: 92% avg</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Model Inference Latency
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-neutral-900">1.42s</span>
            <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded-md">
              p95: 1.85s
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-2">Zero timeout rate across 890+ calls</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Avg Tokens per Generation
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-extrabold text-neutral-900">1,820</span>
            <span className="text-xs font-bold text-neutral-600 bg-neutral-100 px-1.5 py-0.5 rounded-md">
              Tokens
            </span>
          </div>
          <p className="text-xs text-neutral-400 mt-2">Structured JSON schema output format</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs">
          <div className="text-xs font-semibold text-neutral-500 uppercase tracking-wider mb-2">
            Active Generation Model
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-neutral-900">Gemini 2.5 Flash</span>
          </div>
          <p className="text-xs text-emerald-600 font-semibold mt-2">● Connected to Google GenAI SDK</p>
        </div>
      </div>

      {/* Top Keywords Cloud */}
      <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Top ATS Keywords Injected by AI</h3>
            <p className="text-xs text-neutral-500">Skills and technologies most frequently recommended for high-match roles</p>
          </div>
          <span className="text-xs font-bold text-neutral-500">Last 30 Days</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {topKeywords.map((kw) => (
            <div key={kw.tag} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-neutral-900 truncate">{kw.tag}</span>
                <span className="text-[10px] font-bold text-emerald-600">{kw.growth}</span>
              </div>
              <div className="text-[11px] text-neutral-500 font-medium">{kw.count} resumes tailored</div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Generations Log */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-neutral-100">
          <h3 className="text-base font-bold text-neutral-900">Recent AI Tailoring Sessions</h3>
          <p className="text-xs text-neutral-500">Log of candidate resumes customized for specific employer openings</p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Candidate</th>
                <th className="py-3 px-4">Target Role & Company</th>
                <th className="py-3 px-4 text-center">Score Delta</th>
                <th className="py-3 px-4">Keywords Added</th>
                <th className="py-3 px-4 text-center">Latency</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {sessions.map((sess) => (
                <tr key={sess.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-900">
                    <div>{sess.userName}</div>
                    <div className="text-[11px] text-neutral-400 font-normal">{sess.userEmail}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-neutral-800">{sess.targetJob}</div>
                    <div className="text-neutral-500 text-[11px] font-semibold">{sess.company}</div>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1.5 text-xs font-bold">
                      <span className="text-neutral-400 line-through">{sess.initialAtsScore}%</span>
                      <span>→</span>
                      <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/50">
                        {sess.tailoredAtsScore}% (+{sess.improvement}%)
                      </span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="flex flex-wrap gap-1">
                      {sess.keywordsAdded.map((kw) => (
                        <span key={kw} className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-700 text-[10px] font-medium">
                          {kw}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono text-neutral-500 text-[11px]">
                    {sess.latencyMs}ms
                  </td>
                  <td className="py-3.5 px-4 text-right text-neutral-400 text-[11px]">
                    {new Date(sess.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
