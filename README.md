# Node.js Authentication & REST API Backend

A modular Node.js and Express REST API backend featuring MongoDB, Passport.js authentication (JWT and session), and Joi request validation.

---

## Overview

This repository provides a production-ready authentication and API starter for Node.js backends. It demonstrates scalable project architecture, secure password hashing, role-based authorization, request validation, and database modeling with Mongoose.

The repository is structured across branches to showcase the progression from a minimal starter to complete JWT authentication:
- **`main` / `passport-jwt`**: Complete stateless JWT authentication, role guards, and request body schema validation.
- **`passport-local`**: Session-based authentication using cookies, express-session, and connect-mongo.
- **`starter`**: Clean Express server boilerplate with foundational middleware.

---

## Features

- **Authentication Strategies**: Passport.js strategies for both stateless JSON Web Tokens (JWT) and stateful local sessions.
- **Role-Based Access Control**: Middleware guards restricting protected routes by user role.
- **Input Validation**: Request payload schema verification powered by Joi (`register.schema.js`, `login.schema.js`).
- **Security Middleware**: Pre-configured Helmet HTTP security headers, CORS origin management, and response compression.
- **Database Modeling**: Mongoose user schema with bcrypt password hashing and timestamp tracking.
- **Centralized Error Handling**: Unified error and request logging middleware.

---

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express 4
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: Passport.js, Passport JWT, Passport Local, JSONWebToken, bcryptjs
- **Validation**: Joi
- **Security & Performance**: Helmet, CORS, Compression

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/iamjunaidjutt/node-backend.git
cd node-backend
```

### 2. Install dependencies

```bash
pnpm install
# or
npm install
```

### 3. Configure environment variables

Copy the sample environment file and configure your MongoDB URI and secrets:

```bash
cp .env.example .env
```

Example `.env` configuration:

```env
PORT=8000
NODE_ENV=development
DB_URI=mongodb://localhost:27017/node-backend
JWT_SECRET=your_jwt_secret_key_here
SESSION_SECRET=your_session_secret_key_here
```

### 4. Run the development server

```bash
pnpm dev
# or
npm run dev
```

The API server will listen on `http://localhost:8000`.

---

## API Endpoints

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account with validated credentials | Public |
| `POST` | `/api/auth/login` | Authenticate user and issue signed JWT token | Public |
| `GET` | `/api/auth/profile` | Retrieve the authenticated user profile | Protected (JWT) |

---

## Project Structure

```
node-backend/
├── config/                # Passport strategy configurations
│   └── passport-jwt.config.js
├── controllers/           # Request handlers and business logic
│   └── auth.controllers.js
├── middlewares/           # Auth guards, logging, and error handlers
│   ├── auth.middleware.js
│   ├── error-handler.middleware.js
│   └── req-logger.middleware.js
├── models/                # Mongoose database schemas
│   └── user.model.js
├── routes/                # Express API route declarations
│   └── auth.routes.js
├── utils/                 # Token utilities and Joi validation schemas
│   ├── jwt.utils.js
│   └── schema/
├── app.js                 # Express application entry point
├── .env.example           # Environment template
└── package.json           # Dependencies and scripts
```

---

## License

This project is open-source and available under the [ISC License](LICENSE).
