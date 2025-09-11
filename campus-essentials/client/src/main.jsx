import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Home from './pages/Home.jsx'
import Listing from './pages/Listing.jsx'
import NewListing from './pages/NewListing.jsx'
import Login from './pages/Login.jsx'
import Chat from './pages/Chat.jsx'
import Register from './pages/Register.jsx'
import App from './App.jsx'
import MyListings from './pages/MyListings.jsx'
import MyChats from './pages/MyChats.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route element={<App />}>
        <Route path="/" element={<Home />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/sell" element={<NewListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/my-listings" element={<MyListings />} />
        <Route path="/chats" element={<MyChats />} />
        <Route path="/chat/:conversationId" element={<Chat />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
