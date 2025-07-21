import { useCallback, useEffect, useState } from 'react';
import {
  Activity,
  Search,
  Eye,
  Logs,
  Archive,
  RemoveFormattingIcon,
  Plus,
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl, userToken } from '../../constants';
import Pagination from '../../components/Pagination';

const AllFansPage = () => {
  const [activeTab, setActiveTab] = useState('playlogs');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');

  const [filter, setFilter] = useState('all');
  const [fans, setFans] = useState([]);

  const [search, setSearch] = useState('');
  const [orderFans, setOrderFans] = useState('');
  const [page, setPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to avoid issues
  const [loading, setLoading] = useState(false);

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
        `${baseUrl}api/fan/get-all-fans/?search=${encodeURIComponent(
          search,
        )}&order_by=${encodeURIComponent(orderFans)}&page=${page}`,
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
      setFans(data.data.fans);
      setTotalPages(data.data.pagination.total_pages);
      setItemCount(data.data.pagination.count);
      console.log('Total Pages:', data.data.pagination.total_pages);
      console.log('ppp:', data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search, page, userToken, orderFans]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const playLogs = [
    {
      id: 1,
      song: 'Midnight Vibes',
      station: 'Peace FM',
      date: '2024-01-15 14:30',
      duration: '3:45',
      confidence: 98,
      earnings: 0.6,
      status: 'Verified',
    },
    {
      id: 2,
      song: 'Ghana My Home',
      station: 'Hitz FM',
      date: '2024-01-15 12:15',
      duration: '4:12',
      confidence: 96,
      earnings: 0.6,
      status: 'Verified',
    },
    {
      id: 3,
      song: 'Love Letter',
      station: 'Joy FM',
      date: '2024-01-15 10:45',
      duration: '3:28',
      confidence: 94,
      earnings: 0.6,
      status: 'Flagged',
    },
    {
      id: 4,
      song: 'Midnight Vibes',
      station: 'Adom FM',
      date: '2024-01-15 09:20',
      duration: '3:45',
      confidence: 92,
      earnings: 0.6,
      status: 'Pending',
    },
    {
      id: 5,
      song: 'Ghana My Home',
      station: 'Okay FM',
      date: '2024-01-15 08:10',
      duration: '4:12',
      confidence: 89,
      earnings: 0.6,
      status: 'Dispute',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-3 rounded-xl">
                <Logs className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">All Fans</h1>
                <p className="text-gray-300 text-sm">
                  All fans in the database.
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
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Link to="/add-fan">
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Fan
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
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-8xl mx-auto px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex justify-between">
          {/* Period Selector */}

          <div className="mb-8">
            <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
              {['daily', 'weekly', 'monthly', 'all-time'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
            <div className="overflow-auto rounded-xl">
              <table className="min-w-full text-sm text-left text-gray-300 mb-4">
                <thead className="text-xs uppercase bg-white/5 text-gray-400">
                  <tr>
                    <th className="px-4 py-3">Fan ID</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">registered_on</th>
                    <th className="px-4 py-3">status</th>

                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white/5 divide-y divide-white/10">
                  {fans.map((fan) => (
                    <tr key={fan.fan_id}>
                      <td className="px-4 py-2">{fan.fan_id}</td>
                      <td className="px-4 py-2 text-white">
                        {fan.username}
                      </td>

                      <td className="px-4 py-2">{fan.registered_on}</td>

                      <td className="px-4 py-2">
                        {' '}
                        <button className="w-full text-xs bg-orange text-white py-2 rounded-full font-semibold hover:shadow-lg transition-shadow">
                          {fan.status}
                        </button>
                      </td>

                      <td>
                        {' '}
                        <div className="flex">
                          <Link
                            to="/fan-details"
                            state={{ fan_id: 'fan_id' }}
                          >
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
    </div>
  );
};

export default AllFansPage;
