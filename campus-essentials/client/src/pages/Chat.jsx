import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import { io } from 'socket.io-client';
import { getConversationMeta, getMessages, sendMessage } from "../api";

export default function Chat() {
  const { conversationId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [meta, setMeta] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    (async () => {
      const [metaRes, msgsRes] = await Promise.all([
        getConversationMeta(conversationId),
        getMessages(conversationId)
      ]);
      setMeta(metaRes.data);
      setMessages(msgsRes.data);
    })();

    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    const s = io('http://localhost:5000', { withCredentials: true });
    if (currentUser?.id || currentUser?._id) {
      s.emit('join', currentUser.id || currentUser._id);
    }
    setSocket(s);
    return () => s.close();
  }, [conversationId]);

  useEffect(() => {
    if (!socket) return;
    const handler = (payload) => {
      if (payload.conversationId === conversationId) {
        setMessages((prev) => [...prev, payload.msg]);
      }
    };
    socket.on('new-message', handler);
    return () => socket.off('new-message', handler);
  }, [socket, conversationId]);

  const handleSend = async () => {
    if (!input.trim() || !meta) return;
    const currentUser = JSON.parse(localStorage.getItem('user') || 'null');
    const myId = currentUser?.id || currentUser?._id;
    const to = meta.members.find(m => m._id !== myId)?._id;
    if (!to) return;
    const res = await sendMessage(conversationId, to, input);
    setMessages((prev) => [...prev, res.data]);
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-50">
      <div className="flex-1 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="p-2 my-1 bg-white rounded shadow">
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex mt-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded p-2"
          placeholder="Type a message..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-500 text-white px-4 rounded">
          Send
        </button>
      </div>
    </div>
  );
}
