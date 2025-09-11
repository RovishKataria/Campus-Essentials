import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api", // backend API base
  withCredentials: true, // if using cookies/sessions
});

API.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('authToken') || 'null');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth endpoints
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// Listing endpoints
export const getListings = (params) => API.get("/listings", params);
export const getListingById = (id) => API.get(`/listings/${id}`);
export const createListing = (data) => API.post("/listings", data);
export const getMyListings = () => API.get('/listings/mine');

// Messaging endpoints
export const startConversation = (otherUserId, listingId) => API.post('/messages/start', { otherUserId, listingId });
export const getConversations = () => API.get('/messages');
export const getConversationMeta = (conversationId) => API.get(`/messages/${conversationId}/meta`);
export const getMessages = (conversationId) => API.get(`/messages/${conversationId}`);
export const sendMessage = (conversationId, to, text) => API.post(`/messages/${conversationId}`, { to, text });

// Misc
export const logout = () => API.post('/auth/logout');

export default API;
