import { useCallback, useEffect, useState } from 'react';
import { Search, UserPlus, Music } from 'lucide-react'; // Added relevant icons
import { Link } from 'react-router-dom';
import { baseUrl, userToken } from '../../../constants';
import Pagination from '../../../components/Pagination';

export default function AllArtists() {
  const [artists, setArtists] = useState([]);

  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [itemCount, setItemCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1); // Default to 1 to avoid issues

  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `${baseUrl}api/artists/get-all-artists/?search=${encodeURIComponent(
          search,
        )}&page=${page}`,
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
      setArtists(data.data.artists);
      setTotalPages(data.data.pagination.total_pages);
      setItemCount(data.data.pagination.count);
      console.log('Total Pages:', data.data.pagination.total_pages);
      console.log('ppp:', data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  }, [baseUrl, search, page, userToken]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex justify-between items-center p-6">
        <h3 className="text-xl font-semibold">All Artists</h3>
        <Link to="/add-artist">
          <button className="flex items-center px-4 py-2 bg-indigo-900 rounded-full hover:bg-indigo-800 transition">
            <UserPlus className="w-4 h-4 mr-2" /> Add New Artist
          </button>
        </Link>
      </div>

      {/* Artists Table */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="bg-indigo-950 rounded-md shadow-md">
          <table className="w-full mb-5">
            <thead>
              <tr className="border-b border-indigo-800">
                <th className="text-left py-3 px-4 font-medium">Artist ID</th>
                <th className="text-left py-3 px-4 font-medium">Name</th>
                <th className="text-left py-3 px-4 font-medium">
                  Total Earnings
                </th>
                <th className="text-left py-3 px-4 font-medium">
                  Registration Date
                </th>
                <th className="text-left py-3 px-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {artists?.map((artist) => (
                <tr
                  key={artist?.artist_id || 'default-key'}
                  className="border-b border-indigo-800 hover:bg-indigo-900/20"
                >
                  <td className="py-3 px-4">{artist?.artist_id}</td>
                  <td className="py-3 px-4">{artist?.stage_name}</td>
                  <td className="py-3 px-4">Ghc {artist?.total_earnings}</td>
                  <td className="py-3 px-4">{artist?.registered_on}</td>
                  <td className="py-3 px-4">
                    {/* Add action buttons here, e.g., View Profile, Edit */}
                    <Link to="/artist-details">
                      <button className="text-gray-300 hover:text-white mr-2">
                        View
                      </button>
                    </Link>
                    <button className="text-gray-300 hover:text-white">
                      Edit
                    </button>
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
  );
}
