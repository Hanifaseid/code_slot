import React, { useState } from 'react';
import {
  ShieldCheck,
  Terminal,
  Server,
  Zap,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Bell,
  Cpu,
  Lock,
  Download
} from 'lucide-react';
import { AdminAuditEntry } from '../../types/admin';

interface AdminSystemViewProps {
  auditLogs: AdminAuditEntry[];
  onTriggerTrafficSpike: () => void;
  onClearCache: () => void;
}

export const AdminSystemView: React.FC<AdminSystemViewProps> = ({
  auditLogs,
  onTriggerTrafficSpike,
  onClearCache
}) => {
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [isBroadcastActive, setIsBroadcastActive] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Header */}
      <div className="bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              Platform Health & Admin Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold">
              All Systems Operational
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Infrastructure telemetry, Gemini API connectivity, administrative actions, and broadcast controllers.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onTriggerTrafficSpike}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-neutral-950 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5 fill-neutral-950" />
            <span>Simulate Traffic Surge</span>
          </button>
        </div>
      </div>

      {/* System Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Gemini 2.5 Flash API</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-neutral-900">99.98% Uptime</div>
          <div className="text-xs text-neutral-400">Response latency: 18ms · Active API key configured</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Job Feed Crawlers</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-neutral-900">8 Feeds Live</div>
          <div className="text-xs text-neutral-400">Next sync in 4m 12s · Zero parsing bottlenecks</div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-3">
          <div className="flex items-center justify-between text-neutral-500">
            <span className="text-xs font-semibold uppercase">Security & Auth Layer</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-neutral-900">Protected</div>
          <div className="text-xs text-neutral-400">Credential gating active (admin@gmail.com)</div>
        </div>
      </div>

      {/* Broadcast Controller & Maintenance Box */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Broadcast Box */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-amber-600" />
            <h3 className="text-base font-bold text-neutral-900">Global Announcement Banner</h3>
          </div>
          <p className="text-xs text-neutral-500">
            Broadcast a prominent banner to all visiting developers across the CodeSlot website and job board.
          </p>

          <input
            type="text"
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="e.g. ⚡ 40+ new verified remote engineering roles just added from Stripe & OpenAI"
            className="w-full px-3.5 py-2.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-900 focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
          />

          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-neutral-700">
              <input
                type="checkbox"
                checked={isBroadcastActive}
                onChange={(e) => setIsBroadcastActive(e.target.checked)}
                className="w-4 h-4 rounded-md accent-neutral-900 cursor-pointer"
              />
              <span>Activate Announcement Live</span>
            </label>

            {isBroadcastActive && (
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md">
                ● Broadcasting Live
              </span>
            )}
          </div>
        </div>

        {/* Maintenance & Cache Controls */}
        <div className="p-6 rounded-3xl bg-white border border-neutral-200/80 shadow-xs space-y-4">
          <div className="flex items-center gap-2">
            <Server className="w-4 h-4 text-neutral-700" />
            <h3 className="text-base font-bold text-neutral-900">Client Runtime Maintenance</h3>
          </div>
          <p className="text-xs text-neutral-500">
            Clear stored telemetry cache, reset demo seed datasets, or test system failure modes.
          </p>

          <div className="space-y-3 pt-2">
            <button
              onClick={onClearCache}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Admin State & Re-seed Realistic Telemetry</span>
            </button>

            <button
              onClick={onTriggerTrafficSpike}
              className="w-full py-2.5 px-4 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulate Peak 10-Candidate Application Surge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Admin Audit Log Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-neutral-100 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-neutral-900">Administrative Security Audit Trail</h3>
            <p className="text-xs text-neutral-500">Tamper-evident log of all admin logins, user status updates, and exports</p>
          </div>
          <span className="text-xs text-neutral-400 font-mono">Immutable Log</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Admin Account</th>
                <th className="py-3 px-4">Action Type</th>
                <th className="py-3 px-4">Target Resource</th>
                <th className="py-3 px-4">Operation Details</th>
                <th className="py-3 px-4 text-right">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-neutral-50/80 transition-colors">
                  <td className="py-3.5 px-4 sm:px-6 font-bold text-neutral-900">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{log.adminEmail}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-md bg-neutral-900 text-white font-mono text-[10px] font-bold">
                      {log.action}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-neutral-800">{log.target}</td>
                  <td className="py-3.5 px-4 text-neutral-600 max-w-xs">{log.details}</td>
                  <td className="py-3.5 px-4 text-right text-neutral-400 text-[11px]">
                    {new Date(log.timestamp).toLocaleDateString()} {new Date(log.timestamp).toLocaleTimeString()}
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
