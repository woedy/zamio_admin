import React, { useCallback, useEffect, useState } from 'react';
import {
  List,
  Grid3X3,
  Filter,
  Eye,
  Archive,
  Delete,
  DeleteIcon,
  LucideDelete,
  RemoveFormattingIcon,
  Plus,
  Search,
  Logs,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../constants';
import Pagination from '../../components/Pagination';

const ArtistTracksView = () => {
  const [view, setView] = useState('table');
  const [filter, setFilter] = useState('all');
  const [tracks, setTracks] = useState<any[]>([]);

  const [search, setSearch] = useState('');
  const [orderSongs, setOrderSongs] = useState('');
  const [page, setPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to avoid issues
  const [loading, setLoading] = useState(false);

  const filteredTracks = tracks.filter((track) => {
    if (filter === 'all') return true;
    const status = (track.status || '').toString().toLowerCase();
    return status === filter;
  });

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(
    location.state?.successMessage || '',
  );

  useEffect(() => {
    // Clear the message after 5 seconds (optional)
    const timer = setTimeout(() => setSuccessMessage(''), 5000);
    return () => clearTimeout(timer);
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}api/artists/get-all-tracks-admin/?search=${encodeURIComponent(
          search,
        )}&order_by=${encodeURIComponent(orderSongs)}&page=${page}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setTracks(data.data.tracks || []);
      setTotalPages(data.data.pagination.total_pages);
      setItemCount(data.data.pagination.count);
      console.log('Total Pages:', data.data.pagination.total_pages);
      console.log('ppp:', data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search, page, userToken, orderSongs]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Logs className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">🎶 All Tracks</h1>
                <p className="text-gray-300 text-sm">
                  All tracks on the database
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-white/10 backdrop-blur-md text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">🎶</h1>
          <div className="flex gap-4">
            <Link to="/add-track">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                <Plus className="w-4 h-4 mr-2" />
                Add Song
              </button>
            </Link>
            <select
              onChange={(e) => setFilter(e.target.value)}
              className="bg-slate-800 text-white border border-white/10 rounded px-3 py-1 text-sm"
            >
              <option value="all">All</option>
              <option value="approved">Approved</option>
              <option value="pending">Pending</option>
            </select>
            <button
              className={`p-2 rounded-md ${
                view === 'table' ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
              onClick={() => setView('table')}
            >
              <List size={18} />
            </button>
            <button
              className={`p-2 rounded-md ${
                view === 'grid' ? 'bg-indigo-600' : 'bg-slate-800'
              }`}
              onClick={() => setView('grid')}
            >
              <Grid3X3 size={18} />
            </button>
          </div>
        </div>

        {view === 'table' ? (
          <div className="overflow-x-auto rounded-lg border border-white/10">
            <table className="min-w-full text-sm text-white bg-white/5">
              <thead className="bg-slate-800 text-left">
                <tr>
                  <th className="p-3">Title</th>
                  <th className="p-3">Artist</th>
                  <th className="p-3">Duration</th>
                  <th className="p-3">Release Date</th>
                  <th className="p-3">Genre</th>
                  <th className="p-3">Airplays</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTracks.map((track) => (
                  <tr
                    key={track.track_id}
                    className="border-t border-white/10 hover:bg-white/10"
                  >
                    <td className="p-3 font-medium">{track.title}</td>
                    <td className="p-3">{track.artist_name || '-'}</td>
                    <td className="p-3">{track.duration || '-'}</td>
                    <td className="p-3">{track.release_date}</td>
                    <td className="p-3">{track.genre_name}</td>
                    <td className="p-3">{track.airplays ?? 0}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          track.active ? 'bg-green' : 'bg-yellow'
                        }`}
                      >
                        {track.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>

                    <td>
                      {' '}
                      <div className="flex">
                        <Link to="/track-details" state={{ track_id: track?.track_id }}>
                          <Eye className="w-4 h-4 mr-2" />
                        </Link>

                        <Archive className="w-4 h-4 mr-2" />
                        <RemoveFormattingIcon className="w-4 h-4 mr-2" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredTracks.map((track) => (
              <Link to="/track-details" state={{ track_id: track?.track_id }}>
                <div
                  key={track.track_id}
                  className="bg-white/5 p-4 rounded-lg border border-white/10"
                >
                  <img
                    src={`${baseUrlMedia}${track?.cover_art}`}
                    alt={track.title}
                    className="w-full h-40 object-cover rounded mb-3"
                  />
                  <h3 className="text-lg font-bold">{track.title}</h3>
                  <p className="text-sm text-gray-300">{track.genre_name}</p>
                  <p className="text-sm text-gray-400">
                    📆 {track.release_date}
                  </p>
                  <p className="text-sm mt-2 text-indigo-400">
                    {track.plays} plays
                  </p>
                  <span
                    className={`inline-block mt-2 px-2 py-1 rounded-full text-xs font-semibold ${
                      track.status === 'Approved' ? 'bg-green' : 'bg-yellow'
                    }`}
                  >
                    {track.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}

        <Pagination
          pagination={{
            page_number: page,
            total_pages: totalPages,
            next: page < totalPages ? page + 1 : null,
            previous: page > 1 ? page - 1 : null,
          }}
          setPage={setPage}
        />
      </div>
    </div>
  );
};

export default ArtistTracksView;

