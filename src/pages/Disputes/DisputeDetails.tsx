import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { baseUrl, userToken } from '../../constants';

export default function DisputeDetails() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [dispute, setDispute] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        // For simplicity, reuse the list endpoint and pick the one by id
        const res = await fetch(`${baseUrl}api/music-monitor/disputes/?page=1&search=`, { headers: { Authorization: `Token ${userToken}` } });
        const payload = await res.json();
        const rows = payload?.data?.disputes || [];
        const found = rows.find((d: any) => String(d.id) === String(id));
        setDispute(found || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="min-h-screen bg-slate-950 text-white p-6">Loading...</div>;
  if (!dispute) return <div className="min-h-screen bg-slate-950 text-white p-6">Dispute not found.</div>;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-4xl mx-auto bg-white/10 rounded-2xl p-6 border border-white/20">
        <h1 className="text-2xl font-bold mb-2">Dispute #{dispute.id}</h1>
        <div className="text-sm text-white/80 mb-4">Status: {dispute.status}</div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-white/60">Track</div>
            <div className="font-medium">{dispute.track_title}</div>
          </div>
          <div>
            <div className="text-white/60">Artist</div>
            <div className="font-medium">{dispute.artist_name}</div>
          </div>
          <div>
            <div className="text-white/60">Station</div>
            <div className="font-medium">{dispute.station_name}</div>
          </div>
          <div>
            <div className="text-white/60">Duration</div>
            <div className="font-medium">{dispute.duration || '-'}</div>
          </div>
          <div>
            <div className="text-white/60">Start</div>
            <div className="font-medium">{dispute.start_time || '-'}</div>
          </div>
          <div>
            <div className="text-white/60">Stop</div>
            <div className="font-medium">{dispute.stop_time || '-'}</div>
          </div>
          <div>
            <div className="text-white/60">Earnings</div>
            <div className="font-medium text-green-400">₵{dispute.royalty_amount}</div>
          </div>
        </div>
        <div className="mt-6">
          <div className="text-white/60">Comment</div>
          <div className="font-medium">{dispute.comment || '-'}</div>
        </div>
      </div>
    </div>
  );
}

