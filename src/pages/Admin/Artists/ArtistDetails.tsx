import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../../constants';
import { User, MapPin, Verified, Music, DollarSign, Activity, Eye, Clock } from 'lucide-react';

type ArtistData = {
  name?: string;
  stageName?: string;
  bio?: string;
  avatar?: string | null;
  verified?: boolean;
  followers?: number;
  totalPlays?: number;
  totalEarnings?: number;
  joinDate?: string;
  location?: string;
  genres?: string[];
  contact?: { email?: string; phone?: string; instagram?: string; twitter?: string };
};

export default function ArtistDetailsUI() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const artist_id = params.get('artist_id') || '';

  const [loading, setLoading] = useState(false);
  const [artistData, setArtistData] = useState<ArtistData>({});
  const [songs, setSongs] = useState<any[]>([]);
  const [royaltyHistory, setRoyaltyHistory] = useState<any[]>([]);
  const [playLogs, setPlayLogs] = useState<any[]>([]);
  const [publisherInfo, setPublisherInfo] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'songs' | 'plays' | 'royalties' | 'publisher'>('overview');

  const mediaUrl = (u?: string | null) => {
    if (!u) return '';
    if (u.startsWith('http')) return u;
    if (u.startsWith('/')) return `${baseUrlMedia}${u}`;
    return `${baseUrlMedia}/${u}`;
  };

  useEffect(() => {
    if (!artist_id) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          baseUrl + `api/artists/get-artist-profile/?artist_id=${encodeURIComponent(artist_id)}`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Token ${userToken}`,
            },
          },
        );
        if (!response.ok) throw new Error('Failed to load artist');
        const payload = await response.json();
        setArtistData(payload?.data?.artistData || {});
        setSongs(payload?.data?.songs || []);
        setRoyaltyHistory(payload?.data?.royaltyHistory || []);
        setPlayLogs(payload?.data?.playLogs || []);
        setPublisherInfo(payload?.data?.publisherInfo || null);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [artist_id]);

  return (
    <div className="flex-1 flex flex-col p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 border border-white/20">
            {artistData?.avatar ? (
              <img src={mediaUrl(artistData.avatar)} alt="Artist avatar" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">N/A</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold flex items-center gap-2 text-white">
              <User className="w-6 h-6" /> {artistData?.stageName || artistData?.name || 'Artist'}
              {artistData?.verified && <Verified className="w-5 h-5 text-blue-400" />}
            </h2>
            <div className="text-gray-300 flex items-center gap-4 text-sm mt-1">
              {artistData?.location && (
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {artistData.location}</span>
              )}
              {artistData?.genres?.length ? (
                <span className="flex items-center gap-1"><Music className="w-4 h-4" /> {artistData.genres.join(', ')}</span>
              ) : null}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mt-4">
          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <div className="text-gray-400 text-xs">Followers</div>
            <div className="text-white text-xl font-semibold">{artistData?.followers ?? 0}</div>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <div className="text-gray-400 text-xs">Total Plays</div>
            <div className="text-white text-xl font-semibold">{artistData?.totalPlays ?? 0}</div>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <div className="text-gray-400 text-xs">Total Earnings (GHS)</div>
            <div className="text-white text-xl font-semibold">{artistData?.totalEarnings ?? 0}</div>
          </div>
          <div className="bg-white/10 p-4 rounded-xl border border-white/20">
            <div className="text-gray-400 text-xs">Joined</div>
            <div className="text-white text-xl font-semibold">{artistData?.joinDate || '-'}</div>
          </div>
        </div>
      </div>
      {/* Tabs */}
      <div className="mb-6">
        <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'songs', label: 'Songs' },
            { id: 'plays', label: 'Recent Plays' },
            { id: 'royalties', label: 'Royalty History' },
            { id: 'publisher', label: 'Publisher' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === (t.id as any)
                  ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Panels */}
      {activeTab === 'overview' && (
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 text-gray-200">
          <div className="mb-2 text-white font-semibold">Bio</div>
          <div className="text-sm text-gray-300">{artistData?.bio || 'No bio provided.'}</div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            <div>
              <div className="text-white font-semibold mb-1">Contact</div>
              <div className="text-sm text-gray-300">Email: {artistData?.contact?.email || '-'}</div>
              <div className="text-sm text-gray-300">Phone: {artistData?.contact?.phone || '-'}</div>
            </div>
            <div>
              <div className="text-white font-semibold mb-1">Social</div>
              <div className="text-sm text-gray-300">Instagram: {artistData?.contact?.instagram || '-'}</div>
              <div className="text-sm text-gray-300">Twitter: {artistData?.contact?.twitter || '-'}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'songs' && (
        <div className="bg-white/10 rounded-2xl border border-white/20 mb-8">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Activity className="w-5 h-5 text-green-400" /> Songs</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 bg-white/5">
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4">Album</th>
                  <th className="py-3 px-4">Genre</th>
                  <th className="py-3 px-4">Plays</th>
                  <th className="py-3 px-4">Earnings (GHS)</th>
                  <th className="py-3 px-4">Release</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {songs.map((t, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{t.title}</td>
                    <td className="py-3 px-4">{t.album || '-'}</td>
                    <td className="py-3 px-4">{t.genre || '-'}</td>
                    <td className="py-3 px-4">{t.totalPlays ?? 0}</td>
                    <td className="py-3 px-4">{t.totalEarnings ?? 0}</td>
                    <td className="py-3 px-4">{t.releaseDate || '-'}</td>
                  </tr>
                ))}
                {!songs.length && (
                  <tr><td className="py-4 px-4 text-gray-400" colSpan={6}>No songs found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'plays' && (
        <div className="bg-white/10 rounded-2xl border border-white/20">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><Eye className="w-5 h-5 text-cyan-400" /> Recent Plays</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 bg-white/5">
                  <th className="py-3 px-4">Song</th>
                  <th className="py-3 px-4">Station</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Duration</th>
                  <th className="py-3 px-4">Earnings</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {playLogs.map((l) => (
                  <tr key={l.id} className="hover:bg-white/5">
                    <td className="py-3 px-4 text-white">{l.song}</td>
                    <td className="py-3 px-4">{l.station}</td>
                    <td className="py-3 px-4">{l.date}</td>
                    <td className="py-3 px-4">{l.duration || '-'}</td>
                    <td className="py-3 px-4">{l.earnings ?? 0}</td>
                  </tr>
                ))}
                {!playLogs.length && (
                  <tr><td className="py-4 px-4 text-gray-400" colSpan={5}>No recent plays.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'royalties' && (
        <div className="bg-white/10 rounded-2xl border border-white/20">
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2"><DollarSign className="w-5 h-5 text-yellow-400" /> Royalty History</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-300 bg-white/5">
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Amount (GHS)</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10">
                {royaltyHistory.map((r, idx) => (
                  <tr key={idx} className="hover:bg-white/5">
                    <td className="py-3 px-4">{r.date}</td>
                    <td className="py-3 px-4">{r.amount ?? 0}</td>
                    <td className="py-3 px-4">{r.source}</td>
                    <td className="py-3 px-4">{r.status}</td>
                  </tr>
                ))}
                {!royaltyHistory.length && (
                  <tr><td className="py-4 px-4 text-gray-400" colSpan={4}>No royalty history yet.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'publisher' && (
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6">
          <h3 className="text-lg font-semibold text-white mb-3">Publisher</h3>
          {publisherInfo ? (
            <div className="text-gray-200 text-sm grid grid-cols-1 md:grid-cols-3 gap-4">
              <div><span className="text-gray-400">Company:</span> {publisherInfo.companyName || '-'}</div>
              <div><span className="text-gray-400">Verified:</span> {publisherInfo.verified ? 'Yes' : 'No'}</div>
              <div><span className="text-gray-400">Self-Published:</span> {publisherInfo.selfPublished ? 'Yes' : 'No'}</div>
              <div><span className="text-gray-400">Writer Split:</span> {publisherInfo.writerSplit ?? 0}%</div>
              <div><span className="text-gray-400">Publisher Split:</span> {publisherInfo.publisherSplit ?? 0}%</div>
              <div><span className="text-gray-400">Location:</span> {publisherInfo.location || '-'}</div>
            </div>
          ) : (
            <div className="text-gray-400 text-sm">No publisher info.</div>
          )}
        </div>
      )}
    </div>
  );
}
