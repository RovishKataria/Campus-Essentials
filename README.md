# Campus Essentials

A hyperlocal digital marketplace to buy/sell used books, electronics, etc., inside a campus community.

## Highlights:

Product listings, categories, image uploads (S3/cloudinary).

Messaging between buyers/sellers (real-time or async).

SQL for products, users, conversations.

Payment Integration (Stripe test mode).


## 🔧 Step 1: Project Setup Overview
✅ Tech Stack

Frontend: React, HTML, CSS, JavaScript (axios for API calls)

Backend: Node.js + Express

Database: PostgreSQL or MySQL (via Sequelize or Knex.js)

File Storage: Cloudinary or AWS S3 (Cloudinary is simpler for beginners)

Payments: Stripe

### 🧠 Key Features Breakdown
| Feature                | Tech Components                      |
| ---------------------- | ------------------------------------ |
| User Auth              | JWT / bcrypt                         |
| Product Listing        | Images, Category, Description, Price |
| Messaging System       | SQL tables + optional socket.io      |
| Image Upload           | Cloudinary SDK (React + Node)        |
| Search/Filter/Category | SQL queries + React UI filters       |
| Payment                | Stripe API in test mode              |


### 🗂️ Folder Structure (Basic)
campus-essentials/
```
├── client/ (React App)
│   ├── public/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── services/
│       └── App.js
├── server/ (Node + Express)
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   └── server.js
├── .env
├── package.json
└── README.md
```
## 🛠️ Step 2: Milestones for Development
### ✅ Phase 1: Boilerplate & Setup

Set up backend Express server + DB connection.

Set up frontend React app.

Create auth (signup/login with hashed passwords + JWT).

Basic UI layout (header, footer, pages).

### ✅ Phase 2: Product Listings

Add product table (title, description, price, image URL, category, seller_id).

Create routes for:
- POST /products → add new
- GET /products → list
- GET /products/:id → view one
- PUT/DELETE → edit/remove listing (seller-only)

Use Cloudinary to upload images (React input + server route).

### ✅ Phase 3: Messaging System

Create user-to-user messaging:
- Tables: conversations, messages
- GET all conversations for a user
- POST message in a conversation
- (Optional) Use socket.io for real-time

React UI: inbox, new message view

### ✅ Phase 4: Search & Filters

Search by title/description

Filter by category, price, etc.

Sort (newest, lowest price, etc.)

### ✅ Phase 5 (Optional): Payment Integration

Integrate Stripe checkout in test mode

Link Stripe to a “Buy Now” option

Simulate transaction (no real money)

### ✅ Phase 6: Deployment

Frontend: Vercel / Netlify

Backend: Render / Railway

DB: Railway PostgreSQL / ElephantSQL

Cloudinary (for public image hosting)


## 📊 ER Diagram (Entity-Relationship)
[User]
- id (PK)
- name
- email (unique)
- password_hash
- phone
- is_verified
- created_at

[Product]
- id (PK)
- title
- description
- price
- category
- image_url
- seller_id (FK → User.id)
- created_at

[Conversation]
- id (PK)
- buyer_id (FK → User.id)
- seller_id (FK → User.id)
- product_id (FK → Product.id)
- created_at

[Message]
- id (PK)
- conversation_id (FK → Conversation.id)
- sender_id (FK → User.id)
- content
- sent_at

[Payment] *(Optional, for Stripe)*
- id (PK)
- product_id (FK → Product.id)
- buyer_id (FK → User.id)
- stripe_payment_id
- amount
- status (e.g., succeeded, failed)
- paid_at

## 🧱 SQL Schema (PostgreSQL or MySQL compatible)
```
-- User Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    phone VARCHAR(15),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product Table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    category VARCHAR(50),
    image_url TEXT,
    seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Conversation Table
CREATE TABLE conversations (
    id SERIAL PRIMARY KEY,
    buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    seller_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    product_id INTEGER REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Message Table
CREATE TABLE messages (
    id SERIAL PRIMARY KEY,
    conversation_id INTEGER REFERENCES conversations(id) ON DELETE CASCADE,
    sender_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Optional: Payment Table (Stripe)
CREATE TABLE payments (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    buyer_id INTEGER REFERENCES users(id),
    stripe_payment_id TEXT,
    amount DECIMAL(10, 2),
    status VARCHAR(50),
    paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```
### 🔗 Relationships Recap

A User can post many Products

A Product has one Seller

A User can have multiple Conversations (as buyer/seller)

A Conversation is tied to a specific Product

A Message belongs to one Conversation and one Sender (User)

Optionally, a Payment links to a Product and a Buyer


## ✅ Step-by-Step React Setup
🔧 1. Create React App

Run this in your terminal:

```
npx create-react-app campus-essentials-client
cd campus-essentials-client
```

📦 2. Install Required Packages

We'll use axios, react-router-dom, dotenv for config, and possibly Cloudinary for image upload.
```
npm install axios react-router-dom dotenv
```
🗂️ 3. Recommended Folder Structure
```
src/
├── components/        # Reusable UI components (ProductCard, Navbar, etc.)
├── pages/             # Main pages (Home, Login, ProductDetails, etc.)
├── services/          # API calls (auth, product, messaging)
├── context/           # React context for auth/user state
├── assets/            # Static files like logos, icons
├── App.js
├── index.js
└── config.js          # (Optional) for base API URLs
```
✨ 4. Setup Routing with react-router-dom
```
src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import ProductDetails from './pages/ProductDetails';
import SellPage from './pages/SellPage';
import MessagesPage from './pages/MessagesPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/sell" element={<SellPage />} />
        <Route path="/messages" element={<MessagesPage />} />
      </Routes>
    </Router>
  );
};

export default App;
```
🧩 5. Sample Component Structure
```
components/Navbar.js
import { Link } from 'react-router-dom';

const Navbar = () => (
  <nav>
    <Link to="/">Home</Link>
    <Link to="/sell">Sell</Link>
    <Link to="/messages">Messages</Link>
    <Link to="/login">Login</Link>
  </nav>
);

export default Navbar;

pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products') // backend URL
      .then(res => setProducts(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h2>Campus Essentials</h2>
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default HomePage;

components/ProductCard.js
import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => (
  <div className="product-card">
    <img src={product.image_url} alt={product.title} />
    <h3>{product.title}</h3>
    <p>₹{product.price}</p>
    <Link to={`/products/${product.id}`}>View</Link>
  </div>
);

export default ProductCard;
```
🎨 6. (Optional) Add Tailwind CSS for Styling
```
npm install -D tailwindcss
npx tailwindcss init
```

Then follow Tailwind docs to configure tailwind.config.js and index.css.

📁 7. .env Example (for Frontend API base URL)

Create a .env file in the root of your frontend project:
```
REACT_APP_API_BASE_URL=http://localhost:5000
```

Use it like:
```
axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/products`)
```

✅ Frontend is now ready to display listings, connect to backend routes, and scale with forms, uploads, and messaging.


## ✅ Step-by-Step Backend Setup
📁 1. Create Folder and Initialize Project
```
mkdir campus-essentials-server
cd campus-essentials-server
npm init -y
```
📦 2. Install Required Packages
```
npm install express cors dotenv pg bcrypt jsonwebtoken multer cloudinary
npm install --save-dev nodemon
```

pg: PostgreSQL client

bcrypt: password hashing

jsonwebtoken: auth

multer: file uploads (to Cloudinary)

cloudinary: for image storage

🗂️ 3. Recommended Folder Structure
```
campus-essentials-server/
├── controllers/       # Logic for routes
├── models/            # DB interaction layer
├── routes/            # Express routers
├── middleware/        # Auth, error handling
├── uploads/           # Temp storage (for multer, if needed)
├── config/            # DB and cloudinary config
├── .env
├── server.js
└── package.json
```

🧱 4. server.js (entry point)
```
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const messageRoutes = require('./routes/messages');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/messages', messageRoutes); // placeholder for now

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

🔐 5. Basic Auth Flow (routes/auth.js)
✅ routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

router.post('/register', register);
router.post('/login', login);

module.exports = router;

✅ controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db');

exports.register = async (req, res) => {
  const { name, email, password, phone } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await db.query(
    'INSERT INTO users (name, email, password_hash, phone) VALUES ($1, $2, $3, $4) RETURNING *',
    [name, email, hashedPassword, phone]
  );
  res.status(201).json(result.rows[0]);
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const result = await db.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user || !(await bcrypt.compare(password, user.password_hash))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};

📦 6. Database Config (config/db.js)
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }, // optional for production
});

module.exports = pool;

📦 7. Cloudinary Config (config/cloudinary.js)
const cloudinary = require('cloudinary').v2;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
module.exports = cloudinary;

📦 8. Product Routes (routes/products.js)
const express = require('express');
const router = express.Router();
const { getAllProducts, addProduct } = require('../controllers/productController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.get('/', getAllProducts);
router.post('/', upload.single('image'), addProduct); // multipart form

module.exports = router;

📦 controllers/productController.js
const db = require('../config/db');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

exports.getAllProducts = async (req, res) => {
  const result = await db.query('SELECT * FROM products ORDER BY created_at DESC');
  res.json(result.rows);
};

exports.addProduct = async (req, res) => {
  const { title, description, price, category, seller_id } = req.body;
  const imagePath = req.file.path;

  const uploadResult = await cloudinary.uploader.upload(imagePath);
  fs.unlinkSync(imagePath); // remove temp file

  const result = await db.query(
    `INSERT INTO products (title, description, price, category, image_url, seller_id) 
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, price, category, uploadResult.secure_url, seller_id]
  );

  res.status(201).json(result.rows[0]);
};

📄 9. .env Example
PORT=5000
DATABASE_URL=postgres://<user>:<pass>@localhost:5432/campus_essentials
JWT_SECRET=supersecret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_key
CLOUDINARY_API_SECRET=your_secret


✅ You now have:

User auth (register/login)

Product listing (GET, POST with image upload)

Config for PostgreSQL + Cloudinary

🔜 Next Steps

Would you like me to:

Scaffold the Messaging System (conversations + messages)?

Help you connect frontend to backend (login, product listing, upload)?

Build the Sell Product Form in React?

Let me know what you'd like to tackle next!

You said:
Help you connect frontend to backend (login, product listing, upload)
ChatGPT said:

Great — let’s connect the frontend to the backend for the 3 key workflows:

✅ 1. Login & Register
📦 Setup Auth API (frontend)
🔧 services/authService.js
import axios from 'axios';

const API = process.env.REACT_APP_API_BASE_URL;

export const login = async (email, password) => {
  const res = await axios.post(`${API}/api/auth/login`, { email, password });
  return res.data;
};

export const register = async (userData) => {
  const res = await axios.post(`${API}/api/auth/register`, userData);
  return res.data;
};

🧠 Handle User State (Optional: Context API)
📦 context/AuthContext.js
import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null);

  const loginUser = (data) => {
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    setUser(data.user);
  };

  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);


Wrap your App.js:

import { AuthProvider } from './context/AuthContext';

<React.StrictMode>
  <AuthProvider>
    <App />
  </AuthProvider>
</React.StrictMode>

👤 LoginPage.js Example
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/authService';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      loginUser(data);
      navigate('/');
    } catch (err) {
      alert('Login failed');
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginPage;

✅ 2. Fetch Product Listings (Home Page)
🔧 services/productService.js
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE_URL;

export const fetchProducts = async () => {
  const res = await axios.get(`${API}/api/products`);
  return res.data;
};

📄 HomePage.js
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts()
      .then(setProducts)
      .catch(() => alert("Couldn't load products"));
  }, []);

  return (
    <div>
      <h2>All Listings</h2>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
};

export default HomePage;

✅ 3. Upload Product (Sell Page)
🖼 SellPage.js (Multipart + Cloudinary)
import React, { useState } from 'react';
import axios from 'axios';

const SellPage = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('price', form.price);
    formData.append('category', form.category);
    formData.append('image', form.image);
    formData.append('seller_id', user.id); // required by backend

    try {
      await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/products`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // optional
        },
      });
      alert('Product listed!');
    } catch (err) {
      alert('Failed to upload');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="title" placeholder="Title" onChange={handleChange} />
      <input name="price" placeholder="Price" type="number" onChange={handleChange} />
      <input name="category" placeholder="Category" onChange={handleChange} />
      <textarea name="description" placeholder="Description" onChange={handleChange} />
      <input name="image" type="file" accept="image/*" onChange={handleChange} />
      <button type="submit">List Item</button>
    </form>
  );
};

export default SellPage;

✅ Final Touches
.env in React
REACT_APP_API_BASE_URL=http://localhost:5000

Backend: Allow file size & JSON handling

Add in server.js:

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));


✅ You can now:

Login/register users

Fetch product listings from the DB

Upload new products with images to Cloudinary

🔜 Next Options:

Implement messaging system (buyer ↔ seller)

Add search, filters, category sorting

Add Stripe test-mode payment flow

Add admin panel/dashboard

Which one would you like to build next?

You said:
Implement messaging system (buyer ↔ seller).
ChatGPT said:

Excellent — adding a messaging system between buyers and sellers will significantly boost the depth of your project. This feature demonstrates database relationships, async communication, and real-world application logic.

🧠 What We'll Build: Messaging System
Core Features:

Conversations between two users.

Messages inside each conversation.

Backend API to:

Start or fetch a conversation.

Send & fetch messages.

Frontend UI to:

View inbox (conversation list).

Chat inside a conversation.

🗃️ SQL Schema Recap (from ERD)
-- Conversation table
CREATE TABLE conversations (
  id SERIAL PRIMARY KEY,
  buyer_id INTEGER REFERENCES users(id),
  seller_id INTEGER REFERENCES users(id),
  product_id INTEGER REFERENCES products(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Messages table
CREATE TABLE messages (
  id SERIAL PRIMARY KEY,
  conversation_id INTEGER REFERENCES conversations(id),
  sender_id INTEGER REFERENCES users(id),
  message TEXT NOT NULL,
  sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

⚙️ Backend Implementation
✅ routes/messages.js
const express = require('express');
const router = express.Router();
const {
  getUserConversations,
  getMessagesInConversation,
  sendMessage,
  createOrGetConversation
} = require('../controllers/messageController');

router.get('/conversations/:userId', getUserConversations);
router.post('/conversation', createOrGetConversation);
router.get('/:conversationId', getMessagesInConversation);
router.post('/', sendMessage);

module.exports = router;

✅ controllers/messageController.js
const db = require('../config/db');

exports.createOrGetConversation = async (req, res) => {
  const { buyer_id, seller_id, product_id } = req.body;

  const existing = await db.query(
    `SELECT * FROM conversations 
     WHERE buyer_id = $1 AND seller_id = $2 AND product_id = $3`,
    [buyer_id, seller_id, product_id]
  );

  if (existing.rows.length > 0) {
    return res.json(existing.rows[0]);
  }

  const result = await db.query(
    `INSERT INTO conversations (buyer_id, seller_id, product_id)
     VALUES ($1, $2, $3) RETURNING *`,
    [buyer_id, seller_id, product_id]
  );

  res.status(201).json(result.rows[0]);
};

exports.getUserConversations = async (req, res) => {
  const userId = req.params.userId;
  const result = await db.query(
    `SELECT c.*, p.title AS product_title, u.name AS other_user
     FROM conversations c
     JOIN products p ON c.product_id = p.id
     JOIN users u ON (u.id = CASE WHEN c.buyer_id = $1 THEN c.seller_id ELSE c.buyer_id END)
     WHERE c.buyer_id = $1 OR c.seller_id = $1
     ORDER BY c.created_at DESC`,
    [userId]
  );
  res.json(result.rows);
};

exports.getMessagesInConversation = async (req, res) => {
  const { conversationId } = req.params;
  const result = await db.query(
    `SELECT * FROM messages 
     WHERE conversation_id = $1 ORDER BY sent_at ASC`,
    [conversationId]
  );
  res.json(result.rows);
};

exports.sendMessage = async (req, res) => {
  const { conversation_id, sender_id, message } = req.body;

  const result = await db.query(
    `INSERT INTO messages (conversation_id, sender_id, message)
     VALUES ($1, $2, $3) RETURNING *`,
    [conversation_id, sender_id, message]
  );
  res.status(201).json(result.rows[0]);
};

🌐 Frontend Integration
✅ services/messageService.js
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE_URL;

export const getConversations = async (userId) => {
  const res = await axios.get(`${API}/api/messages/conversations/${userId}`);
  return res.data;
};

export const getMessages = async (conversationId) => {
  const res = await axios.get(`${API}/api/messages/${conversationId}`);
  return res.data;
};

export const startConversation = async (buyer_id, seller_id, product_id) => {
  const res = await axios.post(`${API}/api/messages/conversation`, {
    buyer_id,
    seller_id,
    product_id,
  });
  return res.data;
};

export const sendMessage = async (conversation_id, sender_id, message) => {
  const res = await axios.post(`${API}/api/messages`, {
    conversation_id,
    sender_id,
    message,
  });
  return res.data;
};

💬 InboxPage.js (List of Conversations)
import React, { useEffect, useState } from 'react';
import { getConversations } from '../services/messageService';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const InboxPage = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getConversations(user.id).then(setConversations);
  }, [user]);

  return (
    <div>
      <h2>Your Messages</h2>
      {conversations.map((c) => (
        <div key={c.id} onClick={() => navigate(`/chat/${c.id}`)}>
          <b>{c.other_user}</b> - {c.product_title}
        </div>
      ))}
    </div>
  );
};

export default InboxPage;

💬 ChatPage.js (Conversation View)
import React, { useEffect, useState } from 'react';
import { getMessages, sendMessage } from '../services/messageService';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { conversationId } = useParams();
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    getMessages(conversationId).then(setMessages);
  }, [conversationId]);

  const handleSend = async (e) => {
    e.preventDefault();
    const msg = await sendMessage(conversationId, user.id, input);
    setMessages((prev) => [...prev, msg]);
    setInput('');
  };

  return (
    <div>
      <h2>Conversation</h2>
      <div>
        {messages.map((m) => (
          <div key={m.id} style={{ textAlign: m.sender_id === user.id ? 'right' : 'left' }}>
            {m.message}
          </div>
        ))}
      </div>
      <form onSubmit={handleSend}>
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Message..." />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatPage;

🔚 Summary

You now have:

Full backend logic for messaging

Ability to view/start conversations

Real-time-like chat experience (basic version)

Clean React UI to tie it together

🔜 Next Feature Options:

Real-time chat using Socket.IO (turn async into live chat)

Add notifications UI

Add Stripe test-mode payments

Add product search & filtering

Let me know which one you'd like to build next!

Perfect — adding search and filtering for products improves UX and highlights your frontend logic, SQL query optimization, and API design skills.

🎯 Goal

Build a UI + backend to:

🔍 Search products by title/description.

🎯 Filter by category and/or price range.

🛠 Backend Update (Node.js + SQL)
✅ 1. Update Route

routes/productRoutes.js:

router.get('/', getFilteredProducts);

✅ 2. Controller Logic

controllers/productController.js:

exports.getFilteredProducts = async (req, res) => {
  const { search, category, minPrice, maxPrice } = req.query;

  let query = `SELECT * FROM products WHERE 1=1`;
  const params = [];

  if (search) {
    params.push(`%${search.toLowerCase()}%`);
    query += ` AND (LOWER(title) LIKE $${params.length} OR LOWER(description) LIKE $${params.length})`;
  }

  if (category) {
    params.push(category);
    query += ` AND category = $${params.length}`;
  }

  if (minPrice) {
    params.push(minPrice);
    query += ` AND price >= $${params.length}`;
  }

  if (maxPrice) {
    params.push(maxPrice);
    query += ` AND price <= $${params.length}`;
  }

  query += ` ORDER BY created_at DESC`;

  try {
    const result = await db.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Error fetching products');
  }
};

💻 Frontend: React Filters UI
✅ 1. services/productService.js

Update fetchProducts to accept query params:

export const fetchProducts = async (filters = {}) => {
  const params = new URLSearchParams(filters).toString();
  const res = await axios.get(`${API}/api/products?${params}`);
  return res.data;
};

✅ 2. HomePage.js with Search & Filters
import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/productService';
import ProductCard from '../components/ProductCard';

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({
    search: '',
    category: '',
    minPrice: '',
    maxPrice: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearch = async () => {
    const data = await fetchProducts(filters);
    setProducts(data);
  };

  useEffect(() => {
    handleSearch();
  }, []); // Load all on page load

  return (
    <div>
      <h2>Browse Listings</h2>

      {/* 🔍 Search & Filter Inputs */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input name="search" placeholder="Search" onChange={handleChange} />
        <select name="category" onChange={handleChange}>
          <option value="">All Categories</option>
          <option value="Books">Books</option>
          <option value="Electronics">Electronics</option>
          <option value="Stationery">Stationery</option>
        </select>
        <input name="minPrice" type="number" placeholder="Min ₹" onChange={handleChange} />
        <input name="maxPrice" type="number" placeholder="Max ₹" onChange={handleChange} />
        <button onClick={handleSearch}>Apply</button>
      </div>

      {/* 🛍 Product List */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))
      )}
    </div>
  );
};

export default HomePage;

✅ Optional: Add Category Tags to Products

In your SellPage, offer a <select> dropdown for consistent categories.

<select name="category" onChange={handleChange}>
  <option value="">Choose Category</option>
  <option value="Books">Books</option>
  <option value="Electronics">Electronics</option>
  <option value="Stationery">Stationery</option>
</select>

🧪 Test Cases

Search for a keyword like "math" → finds "Maths Book"

Filter by category → "Books" → only books shown

Filter price between ₹100–₹500 → limits accordingly

Combine filters for power search

✅ Result

You now have:

Smart, dynamic search and filter UI

Optimized SQL query for multiple filters

Clean UX for buyers to find relevant items

🔜 Next Feature Options:

Add Stripe payment flow (test mode).

Add Admin dashboard (view/delete products, users).

Add Product detail page + seller contact shortcut.

Add Favorites/Wishlist feature.

Would you like to move to Stripe test-mode checkout, or something else?

Great choice. Adding Stripe payment flow (test mode) showcases:

Integration with third-party APIs

Secure checkout flow

Real-world full-stack experience

🧾 Feature: Buy Now with Stripe (Test Mode)
Flow:

Buyer clicks "Buy Now" on a product.

Backend creates Stripe checkout session.

Buyer is redirected to Stripe checkout page.

After payment → redirect back to a "Success" or "Cancel" page.

🧰 Prerequisites
🔐 Stripe Setup:

Go to https://dashboard.stripe.com/register

Get test API keys from https://dashboard.stripe.com/apikeys

⚙️ Backend Integration
📦 Install Stripe
npm install stripe

✅ routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../controllers/paymentController');

router.post('/create-checkout-session', createCheckoutSession);

module.exports = router;

✅ controllers/paymentController.js
const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

exports.createCheckoutSession = async (req, res) => {
  const { product } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'inr',
          product_data: {
            name: product.title,
            description: product.description,
          },
          unit_amount: product.price * 100, // INR in paisa
        },
        quantity: 1,
      }],
      success_url: `${process.env.CLIENT_URL}/success`,
      cancel_url: `${process.env.CLIENT_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe session error:', error);
    res.status(500).json({ error: 'Payment failed' });
  }
};


✅ Make sure you add .env:

STRIPE_SECRET_KEY=sk_test_...
CLIENT_URL=http://localhost:3000

✅ Add Route to server.js
const paymentRoutes = require('./routes/paymentRoutes');
app.use('/api/payments', paymentRoutes);

💻 Frontend Integration
📦 Install Axios

(If not already done)

npm install axios

✅ services/paymentService.js
import axios from 'axios';
const API = process.env.REACT_APP_API_BASE_URL;

export const createCheckoutSession = async (product) => {
  const res = await axios.post(`${API}/api/payments/create-checkout-session`, { product });
  return res.data;
};

✅ Add Buy Button in ProductCard.js
import { createCheckoutSession } from '../services/paymentService';

const handleBuyNow = async () => {
  try {
    const { url } = await createCheckoutSession(product);
    window.location.href = url; // redirect to Stripe checkout
  } catch (err) {
    alert('Payment initiation failed');
  }
};

<button onClick={handleBuyNow}>Buy Now</button>

✅ Add Success & Cancel Pages

Create SuccessPage.js and CancelPage.js:

// SuccessPage.js
const SuccessPage = () => <h2>✅ Payment Successful! Check your email for confirmation.</h2>;

// CancelPage.js
const CancelPage = () => <h2>❌ Payment Canceled. You can try again later.</h2>;


Update App.js routes:

<Route path="/success" element={<SuccessPage />} />
<Route path="/cancel" element={<CancelPage />} />

✅ Stripe Test Mode

Use Stripe's test card:

Card: 4242 4242 4242 4242
Expiry: Any future date
CVC: 123
ZIP: Any 6-digit number

🧪 Test Cases

Click "Buy Now" → Stripe checkout opens.

Complete test payment → redirected to /success.

Cancel checkout → redirected to /cancel.

✅ What You’ve Achieved:

Stripe checkout session creation via backend.

Secure redirection & test payment flow.

Frontend and backend coordination.

🔜 Optional Enhancements:

Store order history in database.

Allow "Mark as Sold" after successful payment.

Add email receipt using SendGrid/mailgun.

Add My Orders or Purchase History for buyer.

Would you like to:

Add order history tracking?

Implement a "Mark item as sold" toggle after purchase?

Move on to a new feature like Admin dashboard or wishlist?

Let me know!

You said:
Allow "Mark as Sold" after successful payment.j
ChatGPT said:

Great — implementing a "Mark as Sold" feature after payment is a smart enhancement. It helps demonstrate:

Backend update logic (CRUD – Update)

Status tracking (e.g., available vs sold)

Admin/product owner controls

UI updates based on product state

🎯 Feature: Mark Product as Sold (Post-Purchase or Manually)
🧩 Database Update

In your products table, add a new column:

ALTER TABLE products ADD COLUMN is_sold BOOLEAN DEFAULT false;


This allows marking items as sold without deleting them.

🛠 Backend Implementation
✅ 1. Update Product Route

In routes/productRoutes.js:

router.patch('/:id/mark-sold', markProductAsSold);

✅ 2. Controller Logic

In controllers/productController.js:

exports.markProductAsSold = async (req, res) => {
  const productId = req.params.id;

  try {
    await db.query(`UPDATE products SET is_sold = true WHERE id = $1`, [productId]);
    res.json({ message: 'Product marked as sold.' });
  } catch (error) {
    console.error('Error marking product as sold:', error);
    res.status(500).json({ error: 'Could not mark product as sold' });
  }
};

💻 Frontend: React Integration
✅ 1. services/productService.js
export const markProductAsSold = async (id) => {
  const res = await axios.patch(`${API}/api/products/${id}/mark-sold`);
  return res.data;
};

✅ 2. Add Button to Seller’s Product Card

You can restrict this option to logged-in sellers only.

Example in MyListings.js:
import { markProductAsSold } from '../services/productService';

const handleMarkSold = async (id) => {
  try {
    await markProductAsSold(id);
    alert('Marked as sold!');
    // optionally reload listings
  } catch (err) {
    alert('Error marking as sold');
  }
};

{!product.is_sold && (
  <button onClick={() => handleMarkSold(product.id)}>Mark as Sold</button>
)}
{product.is_sold && <span style={{ color: 'green' }}>Sold ✅</span>}

✅ 3. Prevent Display in Listings (Optional)

In your product fetching logic (getFilteredProducts), exclude sold products:

... WHERE is_sold = false


Or allow toggling “Show Sold Items” in UI.

🧪 Test Cases

Add product → should appear in listings

Click “Mark as Sold” → updates DB

Product no longer appears in browse section

“Sold ✅” label shown for sellers

🧾 Summary

✅ Adds real-world touch
✅ Showcases status updates + UI feedback
✅ Easy to scale into inventory management

Would you like to add:

A "Sold items" section for sellers to review past sales?

A "My Purchases" page for buyers?

Or move on to building the Admin dashboard?

Let me know your priority!

You said:
move on to building the Admin dashboard.
ChatGPT said:

Perfect. An Admin Dashboard adds structure, control, and professionalism to your app — and it’s a great resume booster. Let’s build it step-by-step.

🎯 Goal: Admin Dashboard
📋 Features:
Feature	Purpose
View all users	User management
View all product listings	Moderation, analytics
Delete inappropriate listings	Content control
Mark items as sold manually	Edge-case handling
View transactions (optional)	Payment tracking (via Stripe metadata)
🧱 Step-by-Step Plan
1. 🧑‍💼 Add Admin Role to Users Table
Update SQL schema:
ALTER TABLE users ADD COLUMN role VARCHAR DEFAULT 'user';


Possible values: 'user', 'admin'

When creating an admin user:

UPDATE users SET role = 'admin' WHERE email = 'admin@example.com';

2. 🔐 Add Admin Auth Middleware (Backend)
middleware/auth.js
exports.isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access only' });
  }
  next();
};


Make sure you're attaching req.user from JWT/session.

3. 🚏 Admin Routes (Backend)
routes/adminRoutes.js
const express = require('express');
const router = express.Router();
const { isAdmin } = require('../middleware/auth');
const {
  getAllUsers,
  getAllProducts,
  deleteProduct,
  markAsSoldByAdmin
} = require('../controllers/adminController');

router.get('/users', isAdmin, getAllUsers);
router.get('/products', isAdmin, getAllProducts);
router.delete('/products/:id', isAdmin, deleteProduct);
router.patch('/products/:id/mark-sold', isAdmin, markAsSoldByAdmin);

module.exports = router;

controllers/adminController.js
const db = require('../db');

exports.getAllUsers = async (req, res) => {
  const { rows } = await db.query('SELECT id, name, email, role FROM users');
  res.json(rows);
};

exports.getAllProducts = async (req, res) => {
  const { rows } = await db.query('SELECT * FROM products');
  res.json(rows);
};

exports.deleteProduct = async (req, res) => {
  await db.query('DELETE FROM products WHERE id = $1', [req.params.id]);
  res.json({ message: 'Product deleted' });
};

exports.markAsSoldByAdmin = async (req, res) => {
  await db.query('UPDATE products SET is_sold = true WHERE id = $1', [req.params.id]);
  res.json({ message: 'Product marked as sold by admin' });
};

4. 🧪 Backend Test (Optional with Postman or Swagger)

GET /api/admin/users → all users

GET /api/admin/products → all products

DELETE /api/admin/products/:id

PATCH /api/admin/products/:id/mark-sold

🧑‍🎨 Frontend: React Admin Panel
1. Setup Admin Route

In App.js:

<Route path="/admin" element={<AdminDashboard />} />

2. Create AdminDashboard.js
import { useEffect, useState } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);

  const fetchAdminData = async () => {
    const token = localStorage.getItem('token');
    const headers = { Authorization: `Bearer ${token}` };
    const [userRes, productRes] = await Promise.all([
      axios.get('/api/admin/users', { headers }),
      axios.get('/api/admin/products', { headers })
    ]);
    setUsers(userRes.data);
    setProducts(productRes.data);
  };

  const deleteProduct = async (id) => {
    await axios.delete(`/api/admin/products/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchAdminData(); // refresh
  };

  const markSold = async (id) => {
    await axios.patch(`/api/admin/products/${id}/mark-sold`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    fetchAdminData(); // refresh
  };

  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>

      <h3>Users</h3>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} ({user.email}) – Role: {user.role}</li>
        ))}
      </ul>

      <h3>Products</h3>
      <ul>
        {products.map(p => (
          <li key={p.id}>
            {p.title} – {p.is_sold ? 'Sold' : 'Available'}
            <button onClick={() => deleteProduct(p.id)}>Delete</button>
            {!p.is_sold && <button onClick={() => markSold(p.id)}>Mark as Sold</button>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

🔒 Security Tips

Protect /admin route from normal users

Never expose sensitive admin routes without JWT validation

✅ Summary
Completed	Description
✅ Role system	user / admin via role column
✅ Admin routes	List, delete, mark as sold
✅ React dashboard	View + actions UI
✅ Secure	JWT-based admin check