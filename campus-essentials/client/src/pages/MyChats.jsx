import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getConversations } from '../api';

export default function MyChats(){
  const [convs, setConvs] = useState([]);
  useEffect(()=>{ (async()=>{ const { data } = await getConversations(); setConvs(data); })(); },[]);
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">My Chats</h1>
      <div className="space-y-3">
        {convs.map(c => (
          <Link to={`/chat/${c._id}`} key={c._id} className="block bg-white p-4 shadow rounded">
            <div className="font-semibold">{c.listing?.title || 'Conversation'}</div>
            <div className="text-sm text-gray-600">{c.members?.map(m=>m.name).join(', ')}</div>
          </Link>
        ))}
      </div>
    </div>
  )
}


