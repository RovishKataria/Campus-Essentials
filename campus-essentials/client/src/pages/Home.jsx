import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import { getListings } from "../api";

export default function Home() {
  const [listings, setListings] = useState([]);
  const [q, setQ] = useState('');
  const [category, setCategory] = useState('');

  async function load() {
    const res = await getListings({ params: { q: q || undefined, category: category || undefined }});
    setListings(res.data);
  }

  useEffect(() => { load(); }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Campus Essentials</h1>
      <div className="flex gap-3 mb-4">
        <input className="border p-2 rounded flex-1" placeholder="Search..." value={q} onChange={e=>setQ(e.target.value)} />
        <select className="border p-2 rounded" value={category} onChange={e=>setCategory(e.target.value)}>
          <option value="">All</option>
          <option>Books</option>
          <option>Electronics</option>
          <option>Hostel</option>
          <option>Other</option>
        </select>
        <button onClick={load} className="px-4 py-2 bg-black text-white rounded">Filter</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((item) => (
          <Link to={`/listing/${item._id}`} key={item._id} className="bg-white p-4 shadow rounded-lg hover:shadow-md transition">
            <img src={item.images?.[0]} alt={item.title} className="w-full h-40 object-cover rounded" />
            <h2 className="text-lg font-semibold mt-2">{item.title}</h2>
            <p className="text-gray-600 truncate">{item.description}</p>
            <p className="text-blue-600 font-bold mt-2">₹{item.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
