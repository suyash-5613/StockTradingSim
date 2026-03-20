# Stock Trading Simulator 📈

A full-stack web application that allows users to simulate stock trading. Users can create an account, manage their portfolio, buy and sell stocks using real-time mock data, and track their performance via an interactive dashboard.

## 🌟 Features

- **User Authentication**: Secure signup and login functionality.
- **Portfolio Management**: Track your holding, cash balance, and overall portfolio value.
- **Trading Simulator**: Buy and sell stocks instantly with simulated market data.
- **Interactive Dashboard**: Visualize your portfolio performance and view market trends.
- **RESTful API**: Custom backend to process trades and manage user data securely.

## 🛠️ Tech Stack

### Frontend
- **React** (via Vite)
- **Tailwind CSS** (for styling)
- **Context API** (State Management)

### Backend
- **Node.js & Express.js**
- **MongoDB** (with Mongoose)
- **JWT** (JSON Web Tokens for Auth)

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine. You will also need a MongoDB database instance running.

### 1. Clone the repository
```bash
git clone https://github.com/suyash-5613/StockTradingSim.git
cd StockTradingSim
```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `backend` folder and add your environment variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```bash
   npm run dev
   ```

### 3. Frontend Setup
1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `frontend` folder if needed:
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the frontend development server:
   ```bash
   npm run dev
   ```

### 4. Running the App
Once both servers are running, the frontend will typically be accessible at `http://localhost:5173`. Open this URL in your browser to start trading!

## 🤝 Contributing
Contributions, issues, and feature requests are welcome!

## 📝 License
This project is open source and available under the [MIT License](LICENSE).