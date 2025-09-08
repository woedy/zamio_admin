import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrlMedia } from '../../../constants';
import api from '../../../lib/api';
import { MapPin, Phone, Radio, FileAudio, Eye, List, Info } from 'lucide-react';

type Station = {
  station_id?: string;
  name?: string;
  photo?: string | null;
  phone?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  about?: string | null;
  created_at?: string;
};

const mediaUrl = (u?: string | null) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  if (u.startsWith('/')) return `${baseUrlMedia}${u}`;
  return `${baseUrlMedia}/${u}`;
};

export default function StationDetails() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const station_id = params.get('station_id') || '';

  const [loading, setLoading] = useState(false);
  const [station, setStation] = useState<Station>({});
  const [activeTab, setActiveTab] = useState<'overview' | 'playlogs' | 'matches'>('overview');

  // Tab data & pagination
  const [playLogs, setPlayLogs] = useState<any[]>([]);
  const [matchLogs, setMatchLogs] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!station_id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get(`api/stations/get-station-details/`, { params: { station_id } });
        setStation(res?.data?.data || {});
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [station_id]);

  const fetchLogs = async (tab: 'playlog' | 'matchlog', pageNum = 1) => {
    try {
      const res = await api.get(`api/stations/playlogs/`, {
        params: { station_id, log_page_state: tab, page: pageNum },
      });
      const data = res?.data?.data || {};
      if (tab === 'playlog') {
        setPlayLogs(data.playLogs?.results || []);
        setTotalPages(data.playLogs?.pagination?.total_pages || 1);
      } else {
        setMatchLogs(data.matchLogs?.results || []);
        setTotalPages(data.matchLogs?.pagination?.total_pages || 1);
      }
      setPage(pageNum);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if (!station_id) return;
    if (activeTab === 'playlogs') fetchLogs('playlog', 1);
    if (activeTab === 'matches') fetchLogs('matchlog', 1);
  }, [activeTab, station_id]);

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 border border-white/20">
            {station?.photo ? (
              <img src={mediaUrl(station.photo)} alt="Station" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">FM</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
              <Radio className="w-6 h-6" /> {station?.name || 'Station'}
            </h2>
            <div className="text-gray-300 flex items-center gap-4 text-sm mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {[station.city, station.region, station.country].filter(Boolean).join(', ') || 'N/A'}
              </span>
              {station?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4" /> {station.phone}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
          {[
            { id: 'overview', label: 'Overview', icon: Info },
            { id: 'playlogs', label: 'Play Logs', icon: FileAudio },
            { id: 'matches', label: 'Match Logs', icon: Eye },
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${
                activeTab === (id as any)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-4 h-4" /> {label}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === 'overview' && (
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 text-gray-200">
          <div className="mb-2 text-white font-semibold">About</div>
          <div className="text-sm text-gray-300">{station?.about || 'No description provided.'}</div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div>
              <div className="text-white font-semibold mb-1">City</div>
              <div className="text-sm text-gray-300">{station?.city || '-'}</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Region</div>
              <div className="text-sm text-gray-300">{station?.region || '-'}</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Country</div>
              <div className="text-sm text-gray-300">{station?.country || '-'}</div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <div>
              <div className="text-white font-semibold mb-1">Phone</div>
              <div className="text-sm text-gray-300">{station?.phone || '-'}</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Station ID</div>
              <div className="text-sm text-gray-300">{station?.station_id || '-'}</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Created</div>
              <div className="text-sm text-gray-300">{station?.created_at || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {/* Play Logs */}
      {activeTab === 'playlogs' && (
        <div className="bg-white/10 rounded-2xl border border-white/20">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><FileAudio className="w-5 h-5 text-green-400" /> Play Logs</h3>
            <div className="text-sm text-gray-300">Page {page} / {totalPages}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 bg-white/5">
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">Artist</th>
                  <th className="py-3 px-4">Start</th>
                  <th className="py-3 px-4">Stop</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Earnings</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {playLogs.map((l, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{l.track_title}</td>
                    <td className="py-3 px-4">{l.artist_name}</td>
                    <td className="py-3 px-4">{l.start_time}</td>
                    <td className="py-3 px-4">{l.stop_time}</td>
                    <td className="py-3 px-4">{l.duration || '-'}</td>
                    <td className="py-3 px-4">{l.royalty_amount ?? 0}</td>
                    <td className="py-3 px-4">{l.status || ''}</td>
                  </tr>
                ))}
                {!playLogs.length && (
                  <tr><td className="py-4 px-4 text-gray-400" colSpan={7}>No play logs.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 p-4">
              <button disabled={page <= 1} onClick={() => fetchLogs('playlog', page - 1)} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">Prev</button>
              <button disabled={page >= totalPages} onClick={() => fetchLogs('playlog', page + 1)} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      )}

      {/* Match Logs */}
      {activeTab === 'matches' && (
        <div className="bg-white/10 rounded-2xl border border-white/20">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-cyan-400" /> Match Logs</h3>
            <div className="text-sm text-gray-300">Page {page} / {totalPages}</div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 bg-white/5">
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">Artist</th>
                  <th className="py-3 px-4">Matched At</th>
                  <th className="py-3 px-4">Avg Confidence</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {matchLogs.map((m, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{m.track_title}</td>
                    <td className="py-3 px-4">{m.artist_name}</td>
                    <td className="py-3 px-4">{m.matched_at}</td>
                    <td className="py-3 px-4">{m.avg_confidence_score ?? '-'}</td>
                  </tr>
                ))}
                {!matchLogs.length && (
                  <tr><td className="py-4 px-4 text-gray-400" colSpan={4}>No match logs.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 p-4">
              <button disabled={page <= 1} onClick={() => fetchLogs('matchlog', page - 1)} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">Prev</button>
              <button disabled={page >= totalPages} onClick={() => fetchLogs('matchlog', page + 1)} className="px-3 py-1 bg-white/10 text-white rounded disabled:opacity-50">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

