import { useState } from 'react';
import api from '../../../lib/api';

const AdminCompleteProfile: React.FC = () => {
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await api.post('api/accounts/complete-admin-profile/', {
        address,
        city,
        postal_code: postalCode,
      });
      const next = res?.data?.data?.next_step;
      if (next === 'done') {
        window.location.replace('/dashboard');
      }
    } catch (err: any) {
      if (err?.response?.data?.errors) {
        const errors = Object.values(err.response.data.errors as Record<string, string[]>).flat();
        setError(errors.join('\n'));
      } else {
        setError('Failed to save profile.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4">
      <div className="w-full max-w-xl bg-white/10 border border-white/20 backdrop-blur-md rounded-2xl p-8">
        <h1 className="text-2xl font-bold text-white mb-6">Complete Admin Profile</h1>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white mb-1">Address (optional)</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Street address"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-white mb-1">City</label>
              <input
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="City"
              />
            </div>
            <div>
              <label className="block text-white mb-1">Postal Code</label>
              <input
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                className="w-full p-3 bg-white/20 border border-white/30 rounded text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="Postal Code"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold py-3 rounded"
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save and Continue'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminCompleteProfile;

