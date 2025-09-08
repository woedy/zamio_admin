import { useCallback, useEffect, useState } from 'react';
import { CreditCard, Search, Eye } from 'lucide-react';
import { baseUrl, userToken } from '../../constants';
import { Link } from 'react-router-dom';

export default function RoyaltiesList() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [rows, setRows] = useState<any[]>([]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${baseUrl}api/bank/admin/artists-royalties/?page=${page}&search=${encodeURIComponent(search)}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${userToken}` },
      });
      const payload = await res.json();
      if (!res.ok) throw new Error('Failed');
      setRows(payload?.data?.artists || []);
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
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Royalty & Payments Oversight</h1>
              <p className="text-gray-300 text-sm">All artists' royalties and balances</p>
            </div>
          </div>
          <div className="relative">
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input value={search} onChange={(e) => { setSearch(e.target.value); setPage(1); }} placeholder="Search artists..." className="bg-white/10 text-white pl-10 pr-4 py-2 rounded-lg border border-white/20" />
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="bg-white/10 rounded-2xl p-6 border border-white/20" aria-busy={loading}>
          <div className="overflow-auto rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-300">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Artist</th>
                  <th className="px-4 py-3">Stage Name</th>
                  <th className="px-4 py-3">Total Royalties</th>
                  <th className="px-4 py-3">Wallet Balance</th>
                  <th className="px-4 py-3">Plays</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {rows.length ? rows.map((r) => (
                  <tr key={r.artist_id}>
                    <td className="px-4 py-2 text-white">{r.name}</td>
                    <td className="px-4 py-2">{r.stage_name}</td>
                    <td className="px-4 py-2 text-green-400">₵{r.total_royalties?.toFixed ? r.total_royalties.toFixed(2) : r.total_royalties}</td>
                    <td className="px-4 py-2">₵{r.wallet_balance?.toFixed ? r.wallet_balance.toFixed(2) : r.wallet_balance}</td>
                    <td className="px-4 py-2">{r.plays}</td>
                    <td className="px-4 py-2">
                      <Link to={`/royalties/${r.artist_id}`} className="inline-flex items-center gap-1 text-cyan-300 hover:text-cyan-200"><Eye className="w-4 h-4" /> View</Link>
                    </td>
                  </tr>
                )) : (
                  <tr><td className="px-4 py-6 text-center" colSpan={6}>No artists found</td></tr>
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

