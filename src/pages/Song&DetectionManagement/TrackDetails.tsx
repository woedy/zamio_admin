import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { baseUrl, baseUrlMedia, userToken } from '../../constants';
import { Clock, BarChart3, Calendar, MapPin } from 'lucide-react';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from 'recharts';
import RadioMap from '../../RadioMap';

export default function TrackDetails() {
  const [loading, setLoading] = useState(false);
  const [track, setTrack] = useState({});

  const location = useLocation();
  const { track_id } = location.state || {};

  // Audio Player
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioUrl, setAudioUrl] = useState(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const setAudioData = () => {
      setDuration(audio.duration);
    };

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
    };

    audio.addEventListener('loadedmetadata', setAudioData);
    audio.addEventListener('timeupdate', updateTime);

    return () => {
      audio.removeEventListener('loadedmetadata', setAudioData);
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [audioUrl]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
      log_play_session();
    }
    setIsPlaying(!isPlaying);
  };

  const handleRangeChange = (e) => {
    const time = e.target.value;
    audioRef.current.currentTime = time;
    setCurrentTime(time);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const log_play_session = async () => {
    const formData = new FormData();
    formData.append('track_id', track_id);

    try {
      const url = baseUrl + 'api/music-monitor/stream/log-play/';

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });

      const data = await response.json();
      if (!response.ok) {
        // Display the first error message from the errors object
        if (data.errors) {
          const errorMessages = Object.values(data.errors).flat();
          console.log(errorMessages.join('\n'));
        } else {
          console.log(data.message || 'Failed to upload data');
        }
        return; // Prevent further code execution
      }

      // Registration successful
      console.log('Log added successfully');
    } catch (error) {
      console.error('Upload error:', error);
    }
  };

  const track2 = {
    title: 'Freedom Ride',
    artist: 'Amaarae',
    genre: 'Afrofusion',
    duration: '3:45',
    releaseDate: '2023-10-01',
    plays: 312,
    cover: '/covers/freedom.jpg',
    contributors: [
      { role: 'Producer', name: 'Juls' },
      { role: 'Featured', name: 'Kwesi Arthur' },
    ],
    topStations: [
      { name: 'YFM Accra', count: 102 },
      { name: 'JOY FM', count: 89 },
      { name: 'Empire FM', count: 46 },
    ],
    playLogs: [
      { time: '2025-07-11T08:45', station: 'JOY FM', region: 'Greater Accra' },
      { time: '2025-07-11T14:22', station: 'YFM', region: 'Greater Accra' },
      { time: '2025-07-10T19:33', station: 'Empire FM', region: 'Western' },
    ],
  };

  const playsOverTime222 = [
    { month: 'Jan', revenue: 45000, artists: 320, stations: 15 },
    { month: 'Feb', revenue: 52000, artists: 380, stations: 18 },
    { month: 'Mar', revenue: 61000, artists: 445, stations: 22 },
    { month: 'Apr', revenue: 58000, artists: 510, stations: 25 },
    { month: 'May', revenue: 72000, artists: 580, stations: 28 },
    { month: 'Jun', revenue: 85000, artists: 650, stations: 32 },
    { month: 'Jul', revenue: 95000, artists: 720, stations: 35 },
  ];

const radioStations222 = [
  { name: "Joy FM", latitude: 5.5600, longitude: -0.2100 },
  { name: "Peace FM", latitude: 5.5900, longitude: -0.2400 },
  { name: "YFM Accra", latitude: 5.5800, longitude: -0.2200 },
  { name: "Luv FM", latitude: 6.6885, longitude: -1.6244 },
  { name: "Skyy Power FM", latitude: 4.9437, longitude: -1.7587 },
  { name: "Cape FM", latitude: 5.1053, longitude: -1.2466 },
  { name: "Radio Central", latitude: 5.1066, longitude: -1.2474 },
  { name: "Radio Savannah", latitude: 9.4075, longitude: -0.8419 },
];


  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          baseUrl + `api/artists/get-track-details/?track_id=${track_id}`,
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
        setTrack(data.data);

        // OPTION 1: If the file is public
        const fullAudioUrl = `${baseUrlMedia}${data.data.audio_file_mp3}`;
        setAudioUrl(fullAudioUrl);

        // OR — OPTION 2: If the file is protected and needs a token
        /*
          const audioResponse = await fetch(fullAudioUrl, {
            headers: {
              Authorization: `Token ${userToken}`,
            },
          });
    
          const audioBlob = await audioResponse.blob();
          const blobUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(blobUrl);
          */
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto space-y-10">
        {/* Header */}

        <div className="flex">
          <div className="flex items-start gap-6">
            <img
              src={`${baseUrlMedia}${track?.cover_art}`}
              alt={track.title}
              className="w-40 h-40 object-cover rounded-lg shadow-lg"
            />
            <div>
              <h1 className="text-3xl font-bold">{track.title}</h1>
              <p className="text-sm text-white/70">{track.artist_name}</p>
              <div className="mt-3 flex gap-4 text-sm text-white/80">
                <div className="flex items-center gap-1">
                  <Clock size={16} /> {track.duration}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={16} /> {track.release_date}
                </div>
                <div className="flex items-center gap-1">
                  <BarChart3 size={16} /> {track.plays} plays
                </div>
              </div>
              <div className="mt-4">
                <span className="px-2 py-1 text-xs bg-indigo-600 rounded-full">
                  {track.genre_name}
                </span>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl mx-auto bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-xl shadow-lg p-6 flex flex-col items-center space-y-4">
            {audioUrl ? (
              <>
                <audio ref={audioRef} src={audioUrl} preload="metadata" />

                {/* Song Title (Optional) */}
                <h3 className="text-lg font-semibold text-center">
                  Now Playing
                </h3>

                {/* Play/Pause Button */}
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-full bg-blue-500 hover:bg-blue-600 shadow-lg flex items-center justify-center text-white text-xl transition"
                >
                  {isPlaying ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 9v6m4-6v6"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  )}
                </button>

                {/* Time and Slider */}
                <div className="w-full flex flex-col space-y-2">
                  <input
                    type="range"
                    min="0"
                    max={duration}
                    value={currentTime}
                    onChange={handleRangeChange}
                    className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  />
                  <div className="flex justify-between text-sm text-gray-300 font-mono">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-gray-400">Loading audio...</p>
            )}
          </div>
        </div>

        {/* Contributors */}
        <div className="bg-slate-800 rounded-lg p-4">
          <div className="flex justify-between">
            <h2 className="text-lg font-semibold mb-3">👥 Contributors</h2>

            
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-sm text-white px-4 py-2 rounded-lg font-semibold hover:shadow-lg transition-shadow flex items-center">
                
                
              </button>
            
          </div>

          <ul className="space-y-1 text-sm text-white/90">
            {track?.contributors?.map((c, i) => (
              <li key={i}>
                <strong>{c.role}:</strong> {c.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Airplay Map & Chart */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mini Region Map */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">
              📍 Airplay Map (by Region)
            </h2>
            <div className="text-sm text-white/70 h-40 flex items-center justify-center bg-slate-700 rounded">
              <RadioMap radioStations={track?.radioStations}/>
            </div>
          </div>

          {/* Plays Chart */}
          <div className="bg-slate-800 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">📈 Plays Over Time</h2>
            <div className="h-40 bg-slate-700 rounded flex items-center justify-center text-sm text-white/70">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={track.playsOverTime}>
                  <defs>
                    <linearGradient
                      id="colorRevenue"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
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
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
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
        </div>

        {/* Top Stations */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">🏆 Top Stations</h2>
          <ul className="space-y-2">
            {track?.topStations?.map((s, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span>{s.name}</span>
                <span className="text-white/60">{s.count} plays</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Play Logs */}
        <div className="bg-slate-800 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-3">📜 Play Logs</h2>
          <div className="divide-y divide-white/10 text-sm">
            {track?.playLogs?.map((log, i) => (
              <div key={i} className="py-2 flex justify-between">
                <div>
                  {new Date(log.time).toLocaleString()} –{' '}
                  <span className="font-medium">{log.station}</span>
                </div>
                <div className="text-white/60 flex items-center gap-1">
                  <MapPin size={14} /> {log.region}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

