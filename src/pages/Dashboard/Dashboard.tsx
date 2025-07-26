import { useEffect, useState } from 'react';
import {
  Users,
  Radio,
  TrendingUp,
  DollarSign,
  Shield,
  AlertTriangle,
  Clock,
  BarChart3,
  PieChart,
  Globe,
  Database,
  Settings,
  Bell,
  Search,
  Download,
  Eye,
  UserCheck,
  Disc,
  CreditCard,
  Activity,
  Wallet,
  Award,
  UserPlus,
  BellRing,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart as RechartsPieChart,
  Cell,
  AreaChart,
  Area,
  Pie,
} from 'recharts';


import { baseUrl, userToken } from '../../constants';

const InternalAdminDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [loading, setLoading] = useState(false);

  const [platformStats, setPlatformStats] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);
  const [topEarners, setTopEarners] = useState([]);
  const [revenueData, setRevenueData] = useState([]);
  const [genreData, setGenreData] = useState([]);
  const [dailyActivityData, setDailyActivityData] = useState([]);

  // Sample data for the admin platform
  const platformStats2 = {
    totalStations: 127,
    totalArtists: 8943,
    totalSongs: 45234,
    totalPlays: 2847293,
    totalRoyalties: 1247893.45,
    pendingPayments: 89234.12,
    activeDistributors: 34,
    monthlyGrowth: 18.5,
  };



  

  const recentActivity22 = [
    {
      id: 1,
      type: 'payment',
      description: 'Royalty payment processed for Sarkodie',
      amount: 2847.5,
      time: '2 mins ago',
      status: 'completed',
    },
    {
      id: 2,
      type: 'registration',
      description: 'New artist registered: Amaarae',
      time: '15 mins ago',
      status: 'pending',
    },
    {
      id: 3,
      type: 'dispute',
      description: 'Copyright dispute filed for "Kpoo Keke"',
      time: '1 hour ago',
      status: 'urgent',
    },
    {
      id: 4,
      type: 'station',
      description: 'Peace FM updated playlist',
      time: '2 hours ago',
      status: 'completed',
    },
    {
      id: 5,
      type: 'distribution',
      description: 'New release distributed: "Enjoyment"',
      time: '3 hours ago',
      status: 'completed',
    },
  ];

  const topEarners222 = [
    { name: 'Sarkodie', totalEarnings: 45234.8, plays: 234567, growth: 12.5 },
    { name: 'Shatta Wale', totalEarnings: 38945.2, plays: 198432, growth: 8.3 },
    {
      name: 'Kuami Eugene',
      totalEarnings: 29876.4,
      plays: 167890,
      growth: 15.2,
    },
    { name: 'Stonebwoy', totalEarnings: 27543.1, plays: 156234, growth: 6.7 },
    {
      name: 'King Promise',
      totalEarnings: 23456.9,
      plays: 143567,
      growth: 9.8,
    },
  ];

  const stationPerformance = [
    {
      name: 'Peace FM',
      plays: 156789,
      revenue: 12456.78,
      status: 'active',
      compliance: 98,
    },
    {
      name: 'Joy FM',
      plays: 145623,
      revenue: 11234.56,
      status: 'active',
      compliance: 95,
    },
    {
      name: 'Asempa FM',
      plays: 134567,
      revenue: 10987.43,
      status: 'active',
      compliance: 97,
    },
    {
      name: 'Hitz FM',
      plays: 123456,
      revenue: 9876.54,
      status: 'active',
      compliance: 92,
    },
    {
      name: 'Okay FM',
      plays: 112345,
      revenue: 8765.43,
      status: 'warning',
      compliance: 85,
    },
  ];

  const distributionMetrics = [
    { platform: 'Spotify', tracks: 12456, revenue: 45234.56, growth: 15.2 },
    { platform: 'Apple Music', tracks: 11234, revenue: 38945.23, growth: 12.8 },
    {
      platform: 'YouTube Music',
      tracks: 9876,
      revenue: 29876.45,
      growth: 18.4,
    },
    { platform: 'Local Radio', tracks: 8765, revenue: 23456.78, growth: 8.9 },
    { platform: 'Boomplay', tracks: 7654, revenue: 18765.43, growth: 22.1 },
  ];

  // Chart data
  const revenueData222 = [
    { month: 'Jan', revenue: 45000, artists: 320, stations: 15 },
    { month: 'Feb', revenue: 52000, artists: 380, stations: 18 },
    { month: 'Mar', revenue: 61000, artists: 445, stations: 22 },
    { month: 'Apr', revenue: 58000, artists: 510, stations: 25 },
    { month: 'May', revenue: 72000, artists: 580, stations: 28 },
    { month: 'Jun', revenue: 85000, artists: 650, stations: 32 },
    { month: 'Jul', revenue: 95000, artists: 720, stations: 35 },
  ];

  const genreData22222 = [
    { name: 'Afrobeats', value: 35, color: '#8B5CF6' },
    { name: 'Hiplife', value: 28, color: '#EC4899' },
    { name: 'Gospel', value: 18, color: '#10B981' },
    { name: 'Highlife', value: 12, color: '#F59E0B' },
    { name: 'Drill', value: 7, color: '#EF4444' },
  ];

  const platformDistributionData = [
    { name: 'Spotify', plays: 450000, revenue: 45234 },
    { name: 'Apple Music', plays: 380000, revenue: 38945 },
    { name: 'YouTube Music', plays: 520000, revenue: 29876 },
    { name: 'Local Radio', plays: 280000, revenue: 23456 },
    { name: 'Boomplay', plays: 320000, revenue: 18765 },
  ];

  const dailyActivityData222 = [
    { day: 'Mon', registrations: 45, payments: 125, disputes: 3 },
    { day: 'Tue', registrations: 52, payments: 143, disputes: 5 },
    { day: 'Wed', registrations: 38, payments: 167, disputes: 2 },
    { day: 'Thu', registrations: 61, payments: 189, disputes: 4 },
    { day: 'Fri', registrations: 58, payments: 201, disputes: 1 },
    { day: 'Sat', registrations: 34, payments: 156, disputes: 6 },
    { day: 'Sun', registrations: 29, payments: 134, disputes: 3 },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-400';
      case 'pending':
        return 'text-yellow-400';
      case 'urgent':
        return 'text-red-400';
      case 'warning':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (type) => {
    switch (type) {
      case 'payment':
        return <CreditCard className="w-4 h-4" />;
      case 'registration':
        return <UserPlus className="w-4 h-4" />;
      case 'dispute':
        return <AlertTriangle className="w-4 h-4" />;
      case 'station':
        return <Radio className="w-4 h-4" />;
      case 'distribution':
        return <Disc className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  useEffect(() => {
    console.log(userToken);
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(baseUrl + `api/mr-admin/dashboard/`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Token ${userToken}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setPlatformStats(data.data.platformStats);
        setRecentActivity(data.data.recentActivity);
        setTopEarners(data.data.topEarners);
        setRevenueData(data.data.revenueData);
        setGenreData(data.data.genreData);
        setDailyActivityData(data.data.dailyActivityData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br ">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="bg-gradient-to-r from-purple-500 to-pink-600 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">ZamIO Admin</h1>
                <p className="text-gray-300 text-sm">
                  Platform Management Console
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search artists, stations, songs..."
                  className="bg-white/10 backdrop-blur-md text-white pl-10 pr-4 py-2 rounded-lg border border-white/20 focus:outline-none focus:ring-2 focus:ring-purple-400"
                />
              </div>
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors relative">
                <Bell className="w-5 h-5 text-gray-300" />
                <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="bg-white/10 backdrop-blur-md p-2 rounded-lg border border-white/20 hover:bg-white/20 transition-colors">
                <Settings className="w-5 h-5 text-gray-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <div className="flex space-x-2 bg-white/10 backdrop-blur-md p-1 rounded-lg border border-white/20 w-fit">
            {[
              'overview',
              'artists',
              'stations',
              'royalties',
              'distribution',
              'analytics',
            ].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Key Platform Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-cyan-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-blue-500/20 p-3 rounded-xl">
                <Radio className="w-6 h-6 text-blue-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {platformStats.totalStations}
                </div>
                <div className="text-sm text-gray-300">Active Stations</div>
              </div>
            </div>
            <div className="text-xs text-blue-400">↑ 8.2% from last month</div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-green-500/20 p-3 rounded-xl">
                <Users className="w-6 h-6 text-green-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  {platformStats.totalArtists}
                </div>
                <div className="text-sm text-gray-300">Registered Artists</div>
              </div>
            </div>
            <div className="text-xs text-green-400">
              ↑ {platformStats.monthlyGrowth}% growth
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500/20 to-pink-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-purple-500/20 p-3 rounded-xl">
                <DollarSign className="w-6 h-6 text-purple-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ₵{platformStats.totalRoyalties}
                </div>
                <div className="text-sm text-gray-300">Total Royalties</div>
              </div>
            </div>
            <div className="text-xs text-purple-400">This month</div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-600/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between mb-4">
              <div className="bg-orange-500/20 p-3 rounded-xl">
                <Clock className="w-6 h-6 text-orange-400" />
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">
                  ₵{platformStats.pendingPayments}
                </div>
                <div className="text-sm text-gray-300">Pending Payments</div>
              </div>
            </div>
            <div className="text-xs text-orange-400">Requires attention</div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Revenue Analytics Chart */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Revenue Analytics
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg text-sm">
                    Revenue
                  </button>
                  <button className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm">
                    Growth
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient
                        id="colorRevenue"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#10B981"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#10B981"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorArtists"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.3}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8B5CF6"
                          stopOpacity={0.1}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="month" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#10B981"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                    <Area
                      type="monotone"
                      dataKey="artists"
                      stroke="#8B5CF6"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorArtists)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Genre Distribution & Platform Performance */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Genre Distribution Pie Chart */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <PieChart className="w-5 h-5 mr-2 text-purple-400" />
                    Genre Distribution
                  </h2>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={genreData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {genreData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white',
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  {genreData.map((genre, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: genre.color }}
                      ></div>
                      <span className="text-sm text-gray-300">
                        {genre.name}
                      </span>
                      <span className="text-sm text-white font-medium">
                        {genre.value}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Platform Performance Bar Chart */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-white flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                    Platform Performance
                  </h2>
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={platformDistributionData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                      <XAxis dataKey="name" stroke="#9CA3AF" fontSize={12} />
                      <YAxis stroke="#9CA3AF" />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'rgba(0, 0, 0, 0.8)',
                          border: '1px solid rgba(255, 255, 255, 0.2)',
                          borderRadius: '8px',
                          color: 'white',
                        }}
                      />
                      <Bar
                        dataKey="plays"
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="revenue"
                        fill="#10B981"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Daily Activity Trends */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                  Daily Activity Trends
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                    This Week
                  </button>
                  <button className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm">
                    Last Week
                  </button>
                </div>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dailyActivityData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
                    <XAxis dataKey="day" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'rgba(0, 0, 0, 0.8)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        borderRadius: '8px',
                        color: 'white',
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="registrations"
                      stroke="#8B5CF6"
                      strokeWidth={3}
                      dot={{ fill: '#8B5CF6', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#8B5CF6' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="payments"
                      stroke="#10B981"
                      strokeWidth={3}
                      dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#10B981' }}
                    />
                    <Line
                      type="monotone"
                      dataKey="disputes"
                      stroke="#EF4444"
                      strokeWidth={3}
                      dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                      activeDot={{ r: 6, fill: '#EF4444' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex justify-center space-x-6 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                  <span className="text-sm text-gray-300">Registrations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-sm text-gray-300">Payments</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-sm text-gray-300">Disputes</span>
                </div>
              </div>
            </div>

            
            {/* Recent Platform Activity */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Activity className="w-5 h-5 mr-2 text-cyan-400" />
                  Platform Activity Feed
                </h2>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-lg text-sm">
                    Live
                  </button>
                  <button className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm">
                    All
                  </button>
                </div>
              </div>
              <div className="space-y-4">
                {recentActivity?.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-start space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div
                      className={`p-2 rounded-lg ${getStatusColor(
                        activity.status,
                      )
                        .replace('text-', 'bg-')
                        .replace('-400', '-500/20')}`}
                    >
                      {getStatusIcon(activity.type)}
                    </div>
                    <div className="flex-1">
                      <div className="text-white font-medium">
                        {activity.description}
                      </div>
                      <div className="text-sm text-gray-400">
                        {activity.time}
                      </div>
                    </div>
                    <div className="text-right">
                      {activity.amount && (
                        <div className="text-green-400 font-semibold">
                          ₵{activity.amount}
                        </div>
                      )}
                      <div
                        className={`text-xs ${getStatusColor(
                          activity.status,
                        )} capitalize`}
                      >
                        {activity.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Radios Overview */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-purple-400" />
                  Top Stations Overview
                </h2>
              </div>
              <div className="space-y-4">
                {distributionMetrics.map((platform, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white/5 rounded-xl border border-white/10"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold text-white">
                        {platform.platform}
                      </div>
                      <div className="text-sm text-green-400">
                        +{platform.growth}%
                      </div>
                    </div>
                    <div className="text-sm text-gray-300 mb-2">
                      {platform.tracks.toLocaleString()} tracks
                    </div>
                    <div className="text-purple-400 font-medium">
                      ₵{platform.revenue.toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-8">
            {/* Top Earning Artists */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-400" />
                  Top Earning Artists
                </h2>
                <button className="text-sm text-gray-300 hover:text-white flex items-center">
                  View All <Eye className="w-4 h-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {topEarners.map((artist, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold text-white">
                          {artist.name}
                        </div>
                        <div className="text-sm text-gray-300">
                          {artist.plays.toLocaleString()} plays
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-white font-semibold">
                        ₵{artist.totalEarnings.toLocaleString()}
                      </div>
                      <div className="text-xs text-green-400">
                        ↑ {artist.growth}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health Monitor */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white flex items-center">
                  <Database className="w-5 h-5 mr-2 text-green-400" />
                  System Health
                </h2>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">API Performance</span>
                  <span className="text-green-400 font-semibold">99.8%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">Database Load</span>
                  <span className="text-yellow-400 font-semibold">73%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="w-3/4 h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full" />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">
                    Payment Processing
                  </span>
                  <span className="text-green-400 font-semibold">Active</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="w-full h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" />
                </div>
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Platform Report
                </button>
                <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-shadow flex items-center justify-center">
                  <Wallet className="w-4 h-4 mr-2" />
                  Process Bulk Payments
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <UserCheck className="w-4 h-4 mr-2" />
                  Review Pending Artists
                </button>
                <button className="w-full bg-white/10 text-white py-3 rounded-xl font-semibold border border-white/20 hover:bg-white/20 transition-colors flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Handle Disputes
                </button>
              </div>
            </div>

            {/* Platform Alerts */}
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <BellRing className="w-5 h-5 mr-2 text-red-400" />
                System Alerts
              </h2>
              <div className="space-y-3">
                <div className="p-3 bg-red-500/20 rounded-lg border border-red-500/30">
                  <div className="text-red-400 font-medium text-sm">
                    High Priority
                  </div>
                  <div className="text-white text-sm">
                    3 copyright disputes pending review
                  </div>
                </div>
                <div className="p-3 bg-yellow-500/20 rounded-lg border border-yellow-500/30">
                  <div className="text-yellow-400 font-medium text-sm">
                    Medium Priority
                  </div>
                  <div className="text-white text-sm">
                    Payment batch scheduled in 2 hours
                  </div>
                </div>
                <div className="p-3 bg-blue-500/20 rounded-lg border border-blue-500/30">
                  <div className="text-blue-400 font-medium text-sm">Info</div>
                  <div className="text-white text-sm">
                    System maintenance tonight at 2 AM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InternalAdminDashboard;
