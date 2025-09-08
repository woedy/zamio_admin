import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, userToken } from '../../constants';

export default function ArtistRoyaltyDetails() {
  const { artist_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const res = await fetch(`${baseUrl}api/bank/artist/payments/?artist_id=${artist_id}`, { headers: { Authorization: `Token ${userToken}` } });
        const payload = await res.json();
        if (!res.ok) throw new Error('Failed');
        setWallet(payload?.data?.wallet || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [artist_id]);

  if (loading) return <div className="min-h-screen bg-slate-950 text-white p-6">Loading...</div>;
  if (!wallet) return <div className="min-h-screen bg-slate-950 text-white p-6">No data.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-5xl mx-auto bg-white/10 rounded-2xl p-6 border border-white/20">
        <h1 className="text-2xl font-bold mb-4">Artist Royalty Summary</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 rounded p-4">
            <div className="text-white/60 text-sm">Wallet Balance</div>
            <div className="text-2xl font-semibold">₵{wallet.total?.toFixed ? wallet.total.toFixed(2) : wallet.total}</div>
          </div>
          <div className="bg-white/5 rounded p-4">
            <div className="text-white/60 text-sm">Radio</div>
            <div className="text-xl">₵{wallet.sources?.radio}</div>
          </div>
          <div className="bg-white/5 rounded p-4">
            <div className="text-white/60 text-sm">Distro</div>
            <div className="text-xl">₵{wallet.sources?.distro}</div>
          </div>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-2">Recent Payments</h2>
        <div className="overflow-auto rounded">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-gray-300 bg-white/5">
                <th className="py-2 px-3">Date</th>
                <th className="py-2 px-3">Amount</th>
                <th className="py-2 px-3">Method</th>
                <th className="py-2 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {(wallet.history || []).map((h: any, idx: number) => (
                <tr key={idx}>
                  <td className="py-2 px-3">{h.date}</td>
                  <td className="py-2 px-3">₵{h.amount}</td>
                  <td className="py-2 px-3">{h.method}</td>
                  <td className="py-2 px-3">{h.status}</td>
                </tr>
              ))}
              {(!wallet.history || wallet.history.length === 0) && (
                <tr><td className="py-3 px-3 text-white/60" colSpan={4}>No payment history.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        <h2 className="text-lg font-semibold mt-8 mb-2">Royalty Breakdown (Recent Months)</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {(wallet.royaltyBreakdown || []).map((b: any, idx: number) => (
            <div key={idx} className="bg-white/5 rounded p-2 text-center">
              <div className="text-white/60 text-xs">{b.month}</div>
              <div className="text-white font-medium">₵{b.revenue}</div>
              <div className="text-white/60 text-xs">{b.plays} plays</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

