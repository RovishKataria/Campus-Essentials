# Build Log: Campus Essentials (IIT Kanpur)

This file tracks every major step taken to set up the project.

## 2025-08-19
- Scaffolded Vite React client: `client/` (template: React)
- Installed Tailwind CSS, PostCSS, Autoprefixer in `client/`
- Manually added Tailwind config files:
  - `client/tailwind.config.js`
  - `client/postcss.config.js`
- Converted `client/src/index.css` to Tailwind directives and updated `client/src/App.jsx` to a Tailwind-based layout.

- Scaffolded Express backend structure in `server/` with folders:
  - `src/{routes,controllers,models,middleware,config}` and `uploads/`
- Switched backend DB to MongoDB (Mongoose) per request:
  - Updated `server/package.json` to include `mongoose` and removed `pg`
  - Set `main` to `src/server.js`
- Implemented server bootstrap and DB connect:
  - `server/src/server.js`
  - `server/src/config/db.js`
- Implemented base Mongoose models:
  - `User`, `Product`, `Conversation`, `Message`
- Implemented auth routes/controller and middleware:
  - `server/src/routes/auth.js`
  - `server/src/controllers/authController.js`
  - `server/src/middleware/auth.js`
- Implemented product routes stub with filtering + upload endpoints:
  - `server/src/routes/products.js`

- Implemented product controller with MongoDB filtering and Cloudinary upload:
  - `server/src/controllers/productController.js`
- Implemented messaging routes and controller:
  - `server/src/routes/messages.js`
  - `server/src/controllers/messageController.js`
- Implemented payments route and controller (Stripe checkout session):
  - `server/src/routes/payments.js`
  - `server/src/controllers/paymentController.js`
- Implemented basic admin routes with admin guard:
  - `server/src/routes/admin.js`

- Added Docker Compose for isolated dev environment (`mongo`, `server`, `client`):
  - `docker-compose.yml`

- Installed dependencies:
  - Backend (server): express, dotenv, cors, bcrypt, jsonwebtoken, mongoose, multer, cloudinary, stripe, nodemon
  - Frontend (client): Vite React + TailwindCSS setup with PostCSS & Autoprefixer

## Runtime setup (local, no Docker)
- Docker unavailable on host, so switched to local services for isolation:
  - Verified Homebrew is installed
  - MongoDB Community already installed (8.0.10)
  - Started MongoDB via `brew services start mongodb-community`
- Started backend with env inline: `PORT=5000 MONGODB_URI=mongodb://localhost:27017/campus_essentials JWT_SECRET=devsecret CLIENT_URL=http://localhost:5173 npm run dev`
- Started frontend with env inline: `VITE_API_BASE_URL=http://localhost:5000 npm run dev -- --host`

## Fixes
- Resolved Vite/Tailwind PostCSS error by installing `@tailwindcss/postcss` and updating `client/postcss.config.js` to use the new plugin.

- Tailwind init via `npx` failed locally; added configs manually (works the same).

- TODO (next):
  - Implement `productController`, `messageController`, `paymentController`
  - Add Cloudinary config, messages/payments/admin routes
  - Add Docker Compose for isolated dev env (client, server, MongoDB)
  - Install backend deps and run dev servers


