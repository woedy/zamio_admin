import { useCallback, useEffect, useState } from 'react';
import { Activity, Search, Eye } from 'lucide-react';
import { baseUrl, userToken } from '../../constants';
import { Link } from 'react-router-dom';

export default function DisputesList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}api/music-monitor/disputes/?page=${page}&search=${encodeURIComponent(search)}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${userToken}` },
      });
      const payload = await res.json();
      if (!res.ok) throw new Error('Failed to load disputes');
      setRows(payload?.data?.disputes || []);
      setTotalPages(payload?.data?.pagination?.total_pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => { fetchData(); }, [fetchData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Dispute Resolution Panel</h1>
              <p className="text-gray-300 text-sm">All platform disputes with filtering and review</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search..." className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20" />
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20" aria-busy={loading}>
          <div className="overflow-auto rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Track</th>
                  <th className="px-4 py-3">Artist</th>
                  <th className="px-4 py-3">Station</th>
                  <th className="px-4 py-3">Start</th>
                  <th className="px-4 py-3">Stop</th>
                  <th className="px-4 py-3">Duration</th>
                  <th className="px-4 py-3">Earnings</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {rows.length ? rows.map((d) => (
                  <tr key={d.id}>
                    <td className="px-4 py-2 text-white">{d.track_title}</td>
                    <td className="px-4 py-2">{d.artist_name}</td>
                    <td className="px-4 py-2">{d.station_name}</td>
                    <td className="px-4 py-2">{d.start_time || '-'}</td>
                    <td className="px-4 py-2">{d.stop_time || '-'}</td>
                    <td className="px-4 py-2">{d.duration || '-'}</td>
                    <td className="px-4 py-2 text-green-400">{d.royalty_amount?.toFixed ? `₵${d.royalty_amount.toFixed(2)}` : `₵${d.royalty_amount}`}</td>
                    <td className="px-4 py-2">{d.status}</td>
                    <td className="px-4 py-2">
                      <Link to={`/disputes/${d.id}`} className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"><Eye className="w-4 h-4" /> View</Link>
                    </td>
                  </tr>
                )) : (
                  <tr><td className="px-4 py-6 text-center" colSpan={9}>No disputes found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end mt-4 gap-2">
            <button disabled={page<=1} onClick={() => setPage(p=>Math.max(p-1,1))} className="bg-white/10 text-white px-3 py-2 rounded disabled:opacity-40">Prev</button>
            <span className="text-white px-2">Page {page} of {totalPages}</span>
            <button disabled={page>=totalPages} onClick={() => setPage(p=>p+1)} className="bg-white/10 text-white px-3 py-2 rounded disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}

