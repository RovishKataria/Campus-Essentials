import React, { useState } from 'react';
import { registerUser } from '../api';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', hostel: '', phone: '' });
  const [error, setError] = useState('');

  async function submit(e){
    e.preventDefault();
    try {
      const res = await registerUser(form);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      localStorage.setItem('authToken', JSON.stringify(res.data.token));
      window.location.href = '/';
    } catch (e) {
      setError('Registration failed');
    }
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={submit} className="bg-white p-6 rounded-xl shadow-md w-96 space-y-3">
        <h1 className="text-xl font-bold">Create account</h1>
        {error && <p className="text-red-500">{error}</p>}
        <input className="w-full p-2 border rounded" placeholder="Name" onChange={e=>setForm({...form,name:e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Email" type="email" onChange={e=>setForm({...form,email:e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Password" type="password" onChange={e=>setForm({...form,password:e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Hostel" onChange={e=>setForm({...form,hostel:e.target.value})}/>
        <input className="w-full p-2 border rounded" placeholder="Phone" onChange={e=>setForm({...form,phone:e.target.value})}/>
        <button className="bg-blue-600 text-white px-4 py-2 rounded w-full">Register</button>
      </form>
    </div>
  )
}


