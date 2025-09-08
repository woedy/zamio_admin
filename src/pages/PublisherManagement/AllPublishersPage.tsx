import { useCallback, useEffect, useState } from 'react';
import { Logs, Search, Eye, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../constants';
import Pagination from '../../components/Pagination';

type PublisherRow = {
  publisher_id: string;
  company_name: string;
  country?: string | null;
  verified?: boolean;
  photo?: string | null;
  registered_on?: string | null;
};

const mediaUrl = (u?: string | null) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  if (u.startsWith('/')) return `${baseUrlMedia}${u}`;
  return `${baseUrlMedia}/${u}`;
};

export default function AllPublishersPage() {
  const [publishers, setPublishers] = useState<PublisherRow[]>([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchList = useCallback(async () => {
    setLoading(true);
    try {
      // accounts endpoint lists publishers (simple fields)
      const res = await fetch(`${baseUrl}api/accounts/list-publishers/?page=${page}&search=${encodeURIComponent(search)}`, {
        headers: { 'Content-Type': 'application/json', Authorization: `Token ${userToken}` },
      });
      if (!res.ok) throw new Error('Failed');
      const payload = await res.json();
      const rows: PublisherRow[] = payload?.data?.publishers || [];
      setPublishers(rows);
      const p = payload?.data?.pagination;
      setTotalPages(p?.total_pages || 1);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [page, search]);

  useEffect(() => {
    fetchList();
  }, [fetchList]);

  // Backend may provide absolute or relative photo URL in each row

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Logs className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">All Publishers</h1>
                <p className="text-gray-300 text-sm">All publishers on the platform.</p>
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
          <div className="overflow-auto rounded-xl">
            <table className="min-w-full text-sm text-left text-gray-300 mb-4">
              <thead className="text-xs uppercase bg-white/5 text-gray-400">
                <tr>
                  <th className="px-4 py-3">Publisher ID</th>
                  <th className="px-4 py-3">Company</th>
                  <th className="px-4 py-3">Country</th>
                  <th className="px-4 py-3">Verified</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white/5 divide-y divide-white/10">
                {publishers.map((p) => (
                  <tr key={p.publisher_id}>
                    <td className="px-4 py-2">{p.publisher_id}</td>
                    <td className="px-4 py-2 text-white">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden bg-white/10 border border-white/10">
                          {p.photo ? (
                            <img src={mediaUrl(p.photo)} alt="Pub" className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] text-white/60">PB</div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium">{p.company_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2">{p.country || '-'}</td>
                    <td className="px-4 py-2">
                      {p.verified ? (
                        <span className="inline-flex items-center gap-1 text-green-400 text-xs"><CheckCircle2 className="w-3 h-3" /> Yes</span>
                      ) : (
                        <span className="text-xs text-gray-400">No</span>
                      )}
                    </td>
                    <td>
                      <div className="flex">
                        <Link to={`/publisher-details?publisher_id=${p.publisher_id}`}>
                          <Eye className="w-4 h-4 mr-2" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
      </div>
    </div>
  );
}
