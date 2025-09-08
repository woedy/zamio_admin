import { useEffect, useState } from 'react';
import { CreditCard, Radio, Users, PlayIcon as Play, Activity, PieChart, TrendingUp, Award } from 'lucide-react';
import { baseUrl, userToken } from '../../constants';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';

export default function PlatformAnalytics() {
  const [loading, setLoading] = useState(false);
  const [period, setPeriod] = useState<'daily'|'weekly'|'monthly'|'all-time'>('monthly');

  const [platformStats, setPlatformStats] = useState<any>({});
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [genreData, setGenreData] = useState<any[]>([]);
  const [stationPerformance, setStationPerformance] = useState<any[]>([]);
  const [topEarners, setTopEarners] = useState<any[]>([]);
  const [dailyActivityData, setDailyActivityData] = useState<any[]>([]);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}api/mr-admin/dashboard/?period=${period}`, {
          headers: { 'Content-Type': 'application/json', Authorization: `Token ${userToken}` },
        });
        if (!res.ok) throw new Error('Failed to load analytics');
        const payload = await res.json();
        const data = payload?.data || {};
        setPlatformStats(data.platformStats || {});
        setRevenueData(data.revenueData || []);
        setGenreData(data.genreData || []);
        setStationPerformance(data.stationPerformance || []);
        setTopEarners(data.topEarners || []);
        setDailyActivityData(data.dailyActivityData || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [period]);

  const palette = (genreData || []).map((g: any) => g.color || '#8B5CF6');

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Platform Analytics</h1>
              <p className="text-gray-300 text-sm">Usage, earnings and quality across ZamIO</p>
            </div>
          </div>
          <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
            {(['daily','weekly','monthly','all-time'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${period===p ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg' : 'text-gray-300 hover:text-white hover:bg-white/10'}`}
              >
                {p.replace('-', ' ').replace(/\b\w/g, c=>c.toUpperCase())}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8" aria-busy={loading}>
        {/* KPIs */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl"><Radio className="w-6 h-6 text-blue-400"/></div>
              <div className="text-right">
                <div className="text-2xl font-bold">{platformStats.totalStations ?? 0}</div>
                <div className="text-sm text-gray-300">Active Stations</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl"><Users className="w-6 h-6 text-green-400"/></div>
              <div className="text-right">
                <div className="text-2xl font-bold">{platformStats.totalArtists ?? 0}</div>
                <div className="text-sm text-gray-300">Registered Artists</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl"><TrendingUp className="w-6 h-6 text-purple-400"/></div>
              <div className="text-right">
                <div className="text-2xl font-bold">₵{(platformStats.totalRoyalties ?? 0).toLocaleString()}</div>
                <div className="text-sm text-gray-300">Total Royalties</div>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/20 p-3 rounded-xl"><CreditCard className="w-6 h-6 text-orange-400"/></div>
              <div className="text-right">
                <div className="text-2xl font-bold">₵{(platformStats.pendingPayments ?? 0).toLocaleString()}</div>
                <div className="text-sm text-gray-300">Pending Payments</div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue chart */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center"><TrendingUp className="w-5 h-5 mr-2 text-green-400"/> Revenue Analytics</h2>
          </div>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                <XAxis dataKey={(revenueData[0]?.month ? 'month' : 'day') as any} stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white' }} />
                <Area type="monotone" dataKey="revenue" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Genre & Stations */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-bold mb-4 flex items-center"><PieChart className="w-5 h-5 mr-2 text-purple-400"/> Genre Distribution</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie data={genreData} dataKey="value" cx="50%" cy="50%" innerRadius={40} outerRadius={80} paddingAngle={2}>
                    {genreData.map((entry, i) => (
                      <Cell key={i} fill={entry.color || palette[i % palette.length]}/>
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white' }} />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-bold mb-4 flex items-center"><Radio className="w-5 h-5 mr-2 text-cyan-400"/> Top Stations</h2>
            <div className="space-y-3">
              {stationPerformance.map((s, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded p-3">
                  <div className="text-white font-medium">{s.name || s.station}</div>
                  <div className="text-sm text-white/70">₵{(s.revenue || s.royalties || 0).toLocaleString()} · {s.plays} plays</div>
                </div>
              ))}
              {!stationPerformance.length && <div className="text-sm text-white/60">No station data.</div>}
            </div>
          </div>
        </div>

        {/* Daily activity & Top earners */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-bold mb-4 flex items-center"><Activity className="w-5 h-5 mr-2 text-cyan-400"/> Platform Activity</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dailyActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', color: 'white' }} />
                  <Line type="monotone" dataKey="registrations" stroke="#8B5CF6" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="payments" stroke="#10B981" strokeWidth={3} dot={{ r: 3 }} />
                  <Line type="monotone" dataKey="disputes" stroke="#EF4444" strokeWidth={3} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <h2 className="text-lg font-bold mb-4 flex items-center"><Award className="w-5 h-5 mr-2 text-yellow-400"/> Top Earning Artists</h2>
            <div className="space-y-3">
              {topEarners.map((a, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white/5 rounded p-3">
                  <div className="font-medium">{a.name}</div>
                  <div className="text-white/80">₵{(a.totalEarnings || 0).toLocaleString()}</div>
                </div>
              ))}
              {!topEarners.length && <div className="text-sm text-white/60">No earners to show.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

