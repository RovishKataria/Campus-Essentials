import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getListingById, startConversation } from '../api';

export default function Listing() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getListingById(id);
        setListing(data);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  async function messageSeller() {
    if (!listing?.seller?._id) return;
    const { data } = await startConversation(listing.seller._id, id);
    navigate(`/chat/${data._id}`);
  }

  if (loading) return <div className="p-6">Loading...</div>;
  if (!listing) return <div className="p-6">Not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <img src={listing.images?.[0]} alt={listing.title} className="w-full h-80 object-cover rounded" />
        </div>
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">{listing.title}</h1>
          <p className="text-gray-600">{listing.description}</p>
          <p className="text-xl font-semibold">₹{listing.price}</p>
          <p className="text-sm">Condition: {listing.condition}</p>
          <div className="flex gap-3 pt-2">
            <button onClick={messageSeller} className="px-4 py-2 bg-blue-600 text-white rounded">Message Seller</button>
          </div>
        </div>
      </div>
    </div>
  );
}
