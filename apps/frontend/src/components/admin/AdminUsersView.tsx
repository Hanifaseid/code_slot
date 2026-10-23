import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  Filter,
  Shield,
  Briefcase,
  Sparkles,
  ExternalLink,
  CheckCircle2,
  AlertOctagon,
  Clock,
  MoreVertical,
  X,
  Mail,
  Bookmark,
  Github,
  Linkedin,
  UserCheck,
  UserX,
  Eye
} from 'lucide-react';
import { ManagedUser, UserActivityEvent, JobApplicationRecord, UserStatus } from '../../types/admin';

interface AdminUsersViewProps {
  users: ManagedUser[];
  activities: UserActivityEvent[];
  applications: JobApplicationRecord[];
  onUpdateUserStatus: (userId: string, status: UserStatus) => void;
  onImpersonateUser?: (user: ManagedUser) => void;
  onExportCSV: () => void;
}

export const AdminUsersView: React.FC<AdminUsersViewProps> = ({
  users,
  activities,
  applications,
  onUpdateUserStatus,
  onImpersonateUser,
  onExportCSV
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [selectedUser, setSelectedUser] = useState<ManagedUser | null>(null);
  const [activeUserTab, setActiveUserTab] = useState<'profile' | 'activities' | 'applications'>('profile');

  // Filtered Users
  const filteredUsers = useMemo(() => {
    return users.filter((u) => {
      if (statusFilter !== 'all' && u.status !== statusFilter) return false;
      if (roleFilter !== 'all' && u.role !== roleFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = u.name.toLowerCase().includes(q);
        const matchesEmail = u.email.toLowerCase().includes(q);
        const matchesTitle = u.title.toLowerCase().includes(q);
        const matchesSkill = u.skills.some((s) => s.toLowerCase().includes(q));
        return matchesName || matchesEmail || matchesTitle || matchesSkill;
      }
      return true;
    });
  }, [users, statusFilter, roleFilter, searchQuery]);

  // Selected User's activities and applications
  const userActivities = useMemo(() => {
    if (!selectedUser) return [];
    return activities.filter((a) => a.userId === selectedUser.id || a.userEmail === selectedUser.email);
  }, [selectedUser, activities]);

  const userApplications = useMemo(() => {
    if (!selectedUser) return [];
    return applications.filter((app) => app.userId === selectedUser.id || app.userEmail === selectedUser.email);
  }, [selectedUser, applications]);

  const getStatusBadge = (status: UserStatus) => {
    switch (status) {
      case 'active':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200/50">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Active
          </span>
        );
      case 'verified':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200/50">
            <CheckCircle2 className="w-3 h-3 text-blue-600" />
            Verified Pro
          </span>
        );
      case 'suspended':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200/50">
            <AlertOctagon className="w-3 h-3 text-rose-600" />
            Suspended
          </span>
        );
      case 'idle':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-neutral-100 text-neutral-600">
            Idle
          </span>
        );
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-neutral-200/80 shadow-xs">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl sm:text-2xl font-extrabold text-neutral-900 tracking-tight">
              User & Candidate Directory
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-neutral-900 text-white text-xs font-bold">
              {users.length} Registered
            </span>
          </div>
          <p className="text-xs text-neutral-500 mt-1">
            Manage candidates, view individual application pipelines, ATS scores, and inspect user activity histories.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onExportCSV}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs transition-colors cursor-pointer"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Export User Directory CSV</span>
          </button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by developer name, email, title, or skills..."
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-900 placeholder:text-neutral-400 focus:outline-hidden focus:ring-1 focus:ring-neutral-900"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-700 font-medium hover:border-orange-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 accent-orange-500 transition-all cursor-pointer"
          >
            <option value="all">All Account Statuses</option>
            <option value="active">Active Only</option>
            <option value="verified">Verified Only</option>
            <option value="idle">Idle Only</option>
            <option value="suspended">Suspended Only</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="w-full px-3 py-2.5 rounded-2xl bg-white border border-neutral-200/80 text-xs text-neutral-700 font-medium hover:border-orange-400 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-100 accent-orange-500 transition-all cursor-pointer"
          >
            <option value="all">All Roles</option>
            <option value="candidate">Candidates</option>
            <option value="recruiter">Recruiters</option>
            <option value="admin">Administrators</option>
          </select>
        </div>
      </div>

      {/* Users Data Table */}
      <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-neutral-100 bg-neutral-50/70 text-neutral-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3 px-4 sm:px-6">Candidate / User</th>
                <th className="py-3 px-4">Specialization & Skills</th>
                <th className="py-3 px-4 text-center">Plan</th>
                <th className="py-3 px-4 text-center">Applied / Saved</th>
                <th className="py-3 px-4 text-center">ATS Score</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100">
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-neutral-400">
                    <Users className="w-8 h-8 mx-auto text-neutral-300 mb-2" />
                    <p className="font-semibold text-neutral-600">No users found matching your search</p>
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="hover:bg-neutral-50/80 transition-colors cursor-pointer group"
                    onClick={() => {
                      setSelectedUser(user);
                      setActiveUserTab('profile');
                    }}
                  >
                    {/* User Identity */}
                    <td className="py-3.5 px-4 sm:px-6">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-neutral-200"
                        />
                        <div className="min-w-0">
                          <div className="font-bold text-neutral-900 truncate max-w-[150px]">{user.name}</div>
                          <div className="text-[11px] text-neutral-400 truncate max-w-[150px]">{user.email}</div>
                          <div className="text-[10px] text-neutral-500 truncate max-w-[150px] font-medium">
                            {user.title}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Skills */}
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="text-xs font-semibold text-neutral-800 mb-1">{user.specialization}</div>
                      <div className="flex flex-wrap gap-1">
                        {user.skills.slice(0, 3).map((skill) => (
                          <span
                            key={skill}
                            className="px-1.5 py-0.5 rounded-md bg-neutral-100 text-neutral-600 text-[10px] font-medium"
                          >
                            {skill}
                          </span>
                        ))}
                        {user.skills.length > 3 && (
                          <span className="text-[10px] text-neutral-400">+{user.skills.length - 3}</span>
                        )}
                      </div>
                    </td>

                    {/* Plan */}
                    <td className="py-3.5 px-4 text-center">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-extrabold ${user.plan === 'Enterprise'
                            ? 'bg-purple-100 text-purple-800'
                            : user.plan === 'Pro Dev'
                              ? 'bg-amber-100 text-amber-900'
                              : 'bg-neutral-100 text-neutral-600'
                          }`}
                      >
                        {user.plan}
                      </span>
                    </td>

                    {/* Applied / Saved */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="font-bold text-neutral-900">{user.appliedCount} applied</div>
                      <div className="text-[10px] text-neutral-400">{user.savedCount} saved</div>
                    </td>

                    {/* ATS Score */}
                    <td className="py-3.5 px-4 text-center">
                      <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-bold bg-neutral-900 text-white">
                        <Sparkles className="w-3 h-3 text-amber-400" />
                        {user.resumeScore}%
                      </div>
                    </td>

                    {/* Status */}
                    <td className="py-3.5 px-4 text-center">
                      {getStatusBadge(user.status)}
                    </td>

                    {/* Actions */}
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedUser(user);
                          setActiveUserTab('profile');
                        }}
                        className="px-3 py-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-900 hover:text-white text-neutral-700 font-semibold text-xs transition-colors cursor-pointer"
                      >
                        View Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* User Details Modal / Drawer */}
      {selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-neutral-200 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-5 border-b border-neutral-100">
              <div className="flex items-center gap-4">
                <img
                  src={selectedUser.avatar}
                  alt={selectedUser.name}
                  className="w-14 h-14 rounded-2xl object-cover ring-2 ring-neutral-200"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl font-bold text-neutral-900">{selectedUser.name}</h2>
                    {getStatusBadge(selectedUser.status)}
                  </div>
                  <p className="text-xs text-neutral-600 font-medium">{selectedUser.title}</p>
                  <p className="text-[11px] text-neutral-400">{selectedUser.email} · {selectedUser.location}</p>
                </div>
              </div>

              <button
                onClick={() => setSelectedUser(null)}
                className="p-2 rounded-full hover:bg-neutral-100 text-neutral-400 hover:text-neutral-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-4 border-b border-neutral-100 mt-4 text-xs font-bold">
              <button
                onClick={() => setActiveUserTab('profile')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 ${activeUserTab === 'profile'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
              >
                Candidate Profile
              </button>
              <button
                onClick={() => setActiveUserTab('activities')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${activeUserTab === 'activities'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
              >
                <span>Activity History</span>
                <span className="px-1.5 py-0.2 rounded-full bg-neutral-100 text-[10px] text-neutral-600">
                  {userActivities.length}
                </span>
              </button>
              <button
                onClick={() => setActiveUserTab('applications')}
                className={`pb-2.5 transition-colors cursor-pointer border-b-2 flex items-center gap-1.5 ${activeUserTab === 'applications'
                    ? 'border-neutral-900 text-neutral-900'
                    : 'border-transparent text-neutral-400 hover:text-neutral-700'
                  }`}
              >
                <span>Applications</span>
                <span className="px-1.5 py-0.2 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                  {userApplications.length}
                </span>
              </button>
            </div>

            {/* Tab 1: Candidate Profile */}
            {activeUserTab === 'profile' && (
              <div className="py-5 space-y-5 text-xs">
                {/* Metrics Pill Grid */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="p-3 rounded-2xl bg-neutral-50 text-center">
                    <div className="text-neutral-400 text-[10px] uppercase font-bold">ATS Resume Score</div>
                    <div className="text-xl font-extrabold text-neutral-900 mt-1">{selectedUser.resumeScore}%</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-neutral-50 text-center">
                    <div className="text-neutral-400 text-[10px] uppercase font-bold">Applications</div>
                    <div className="text-xl font-extrabold text-neutral-900 mt-1">{selectedUser.appliedCount}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-neutral-50 text-center">
                    <div className="text-neutral-400 text-[10px] uppercase font-bold">Bookmarked Jobs</div>
                    <div className="text-xl font-extrabold text-neutral-900 mt-1">{selectedUser.savedCount}</div>
                  </div>
                </div>

                {/* Skills */}
                <div>
                  <div className="text-neutral-500 font-bold uppercase text-[10px] tracking-wider mb-2">
                    Verified Technical Skills
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedUser.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 text-neutral-800 font-semibold text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Status Switcher Actions */}
                <div className="p-4 rounded-2xl bg-neutral-50 border border-neutral-100 space-y-3">
                  <div className="text-neutral-700 font-bold">Admin Status Modification</div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => onUpdateUserStatus(selectedUser.id, 'active')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${selectedUser.status === 'active'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                    >
                      Set Active
                    </button>
                    <button
                      onClick={() => onUpdateUserStatus(selectedUser.id, 'verified')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${selectedUser.status === 'verified'
                          ? 'bg-blue-600 text-white'
                          : 'bg-white border border-neutral-200 text-neutral-700 hover:bg-neutral-100'
                        }`}
                    >
                      Verify Candidate (Pro)
                    </button>
                    <button
                      onClick={() => onUpdateUserStatus(selectedUser.id, 'suspended')}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs cursor-pointer ${selectedUser.status === 'suspended'
                          ? 'bg-rose-600 text-white'
                          : 'bg-white border border-neutral-200 text-rose-700 hover:bg-rose-50'
                        }`}
                    >
                      Suspend Account
                    </button>
                  </div>
                </div>

                {onImpersonateUser && (
                  <button
                    onClick={() => {
                      onImpersonateUser(selectedUser);
                      setSelectedUser(null);
                    }}
                    className="w-full py-2.5 rounded-xl bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Impersonate Developer / Preview Portal</span>
                  </button>
                )}
              </div>
            )}

            {/* Tab 2: Activity History */}
            {activeUserTab === 'activities' && (
              <div className="py-4 space-y-3 text-xs">
                {userActivities.length === 0 ? (
                  <p className="text-center text-neutral-400 py-6">No historical activity logged for this user</p>
                ) : (
                  userActivities.map((act) => (
                    <div key={act.id} className="p-3 rounded-2xl bg-neutral-50 flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neutral-900 mt-1.5 shrink-0" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-neutral-900">{act.action}</span>
                          <span className="text-[10px] text-neutral-400">
                            {new Date(act.timestamp).toLocaleDateString()} {new Date(act.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-neutral-600 mt-0.5">{act.details}</p>
                        <div className="text-[10px] text-neutral-400 mt-1">
                          Location: {act.location} · Device: {act.device}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Tab 3: Applications */}
            {activeUserTab === 'applications' && (
              <div className="py-4 space-y-3 text-xs">
                {userApplications.length === 0 ? (
                  <p className="text-center text-neutral-400 py-6">No verified applications submitted yet</p>
                ) : (
                  userApplications.map((app) => (
                    <div key={app.id} className="p-3.5 rounded-2xl bg-neutral-50 border border-neutral-100 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-neutral-900">{app.jobTitle}</div>
                        <div className="text-neutral-500 font-medium">{app.company} · Match: {app.matchScore}%</div>
                        <div className="text-[10px] text-neutral-400 mt-0.5">Applied: {new Date(app.appliedAt).toLocaleDateString()}</div>
                      </div>

                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase bg-white border border-neutral-200 text-neutral-800">
                        {app.stage}
                      </span>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
