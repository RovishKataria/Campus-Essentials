import React from 'react';
import { Link } from 'react-router-dom';
import { logout } from '../api';

export default function Navbar(){
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const handleLogout = async () => { await logout(); localStorage.removeItem('user'); window.location.href='/'; };
  return (
    <div className="flex items-center justify-between px-6 py-3 shadow bg-white">
      <Link to="/" className="font-bold">Campus Essentials</Link>
      <div className="flex items-center gap-4">
        <Link to="/sell" className="px-3 py-1 bg-blue-600 text-white rounded">Sell</Link>
        {user ? (
          <>
            <Link to="/my-listings">My Listings</Link>
            <Link to="/chats">Chats</Link>
            <button onClick={handleLogout} className="text-red-600">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  );
}


