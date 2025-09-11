import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMyListings } from '../api';

export default function MyListings(){
  const [items, setItems] = useState([]);
  useEffect(()=>{ (async()=>{ const { data } = await getMyListings(); setItems(data); })(); },[]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Listings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map(l => (
          <Link to={`/listing/${l._id}`} key={l._id} className="bg-white p-4 shadow rounded">
            <img src={l.images?.[0]} className="w-full h-40 object-cover rounded" />
            <div className="mt-2 font-semibold">{l.title}</div>
            <div>₹{l.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}


