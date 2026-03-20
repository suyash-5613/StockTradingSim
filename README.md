# Stock Trading Simulator 📈

A full-stack web application designed to simulate real-time stock trading. Users can create an account, manage a virtual portfolio, execute buy and sell orders using real-time mock data, and track their trading performance through an interactive dashboard.

## 🌟 About the Project

This simulator provides a risk-free environment for users to practice trading strategies. By offering a comprehensive dashboard and real-time portfolio tracking, the platform mirrors the experience of a standard broker without the financial risk.

**Core Features include:**
- **User Authentication**: Secure signup and login functionality using JWT.
- **Portfolio Management**: Keep track of cash balances, current stock holdings, and overall portfolio net worth.
- **Trading Simulator**: Instant execution of buy and sell orders using dynamic simulated market data.
- **Interactive Dashboard**: Clean and modern visualization of portfolio performance.

## 🛠️ Tech Stack & Structure

The project is structured as a monorepo containing both the frontend and backend applications.

### 💻 Frontend (`/frontend`)
The client-side is a Single Page Application (SPA) built for speed and responsiveness.
- **React** (Bootstrapped via Vite for fast HMR and optimized builds)
- **Tailwind CSS** (For utility-first, modern UI styling)
- **Context API** (Used for global state management like Authentication and User Data)
- **React Router** (For seamless client-side navigation)

### ⚙️ Backend (`/backend`)
The server-side handles business logic, database queries, and RESTful API endpoints.
- **Node.js & Express.js** (Robust and fast web framework)
- **MongoDB** (NoSQL database for flexible data storage)
- **Mongoose** (ODM for strict schema validation and relationship mapping)
- **Bcrypt & JWT** (For secure password hashing and authorization)

## 📁 Repository Structure
```text
StockTradingSim/
├── backend/            # Express backend API
│   ├── config/         # Database and environment configurations
│   ├── controllers/    # API endpoint logic
│   ├── middleware/     # Custom auth and error handlers
│   ├── models/         # Mongoose schemas (User, Portfolio, etc.)
│   └── routes/         # Express Router definitions
└── frontend/           # React frontend application
    ├── public/         # Static assets
    └── src/
        ├── components/ # Reusable React components (Navbar, Modals, etc.)
        ├── context/    # Global Context Providers
        └── pages/      # Route-level components (Login, Dashboard, Portfolio)
```