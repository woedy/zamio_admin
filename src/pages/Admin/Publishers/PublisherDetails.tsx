import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../../../lib/api';
import { baseUrlMedia } from '../../../constants';
import { Building2, MapPin, BadgeCheck } from 'lucide-react';

type PublisherData = {
  publisher_id?: string;
  companyName?: string;
  verified?: boolean;
  region?: string;
  city?: string;
  country?: string;
  locationName?: string;
  writerSplit?: number;
  publisherSplit?: number;
  bankAccount?: string;
  momoAccount?: string;
  taxId?: string;
  user?: { name?: string; email?: string; photo?: string | null };
  onboarding?: Record<string, any>;
};

const mediaUrl = (u?: string | null) => {
  if (!u) return '';
  if ((u as string).startsWith('http')) return u as string;
  if ((u as string).startsWith('/')) return `${baseUrlMedia}${u}`;
  return `${baseUrlMedia}/${u}`;
};

export default function PublisherDetails() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const publisher_id = params.get('publisher_id') || '';

  const [data, setData] = useState<PublisherData>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!publisher_id) return;
    const load = async () => {
      setLoading(true);
      try {
        const res = await api.get('api/publishers/publisher-profile/', { params: { publisher_id } });
        setData(res?.data?.data?.publisherData || {});
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [publisher_id]);

  return (
    <div className="flex-1 flex flex-col p-6">
      <div className="mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden bg-white/10 border border-white/20">
            {data?.user?.photo ? (
              <img src={mediaUrl(data.user.photo)} alt="Publisher" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white/60">PB</div>
            )}
          </div>
          <div>
            <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
              <Building2 className="w-6 h-6" /> {data?.companyName || 'Publisher'}
              {data?.verified && <BadgeCheck className="w-5 h-5 text-blue-400" />}
            </h2>
            <div className="text-gray-300 flex items-center gap-3 text-sm mt-1">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {[data.city, data.region, data.country].filter(Boolean).join(', ') || 'N/A'}
              </span>
              {data.locationName && <span>{data.locationName}</span>}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 text-gray-200">
          <div className="text-white font-semibold mb-2">Contact</div>
          <div className="text-sm text-gray-300">Admin: {data?.user?.name || '-'}</div>
          <div className="text-sm text-gray-300">Email: {data?.user?.email || '-'}</div>
        </div>
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 text-gray-200">
          <div className="text-white font-semibold mb-2">Splits</div>
          <div className="text-sm text-gray-300">Writer Split: {data?.writerSplit ?? 0}%</div>
          <div className="text-sm text-gray-300">Publisher Split: {data?.publisherSplit ?? 0}%</div>
        </div>
        <div className="bg-white/10 rounded-2xl border border-white/20 p-6 text-gray-200">
          <div className="text-white font-semibold mb-2">Financial</div>
          <div className="text-sm text-gray-300">Bank: {data?.bankAccount || '-'}</div>
          <div className="text-sm text-gray-300">MoMo: {data?.momoAccount || '-'}</div>
          <div className="text-sm text-gray-300">Tax ID: {data?.taxId || '-'}</div>
        </div>
      </div>

      <div className="bg-white/10 rounded-2xl border border-white/20 p-6 mt-8 text-gray-200">
        <div className="text-white font-semibold mb-2">Onboarding</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>Profile: {data?.onboarding?.profile_completed ? 'Done' : 'Pending'}</div>
          <div>Revenue Split: {data?.onboarding?.revenue_split_completed ? 'Done' : 'Pending'}</div>
          <div>Link Artist: {data?.onboarding?.link_artist_completed ? 'Done' : 'Pending'}</div>
          <div>Payment Info: {data?.onboarding?.payment_info_added ? 'Done' : 'Pending'}</div>
        </div>
      </div>
    </div>
  );
}

