import React, { createContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useCookie } from 'react-use';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import TransactionHistory from './pages/TransactionHistory/TransactionHistory';
import TransferMoney from './pages/TransferMoney/TransferMoney';

export interface ResponseError extends Error {
  status: string;
  message: string;
  error: {
    statusCode: number;
    status: string;
    isOperational: boolean;
  };
  stack: string;
  errName: string;
}

export type TokenContextType = {
  token?: string | null;
  updateCookie?: (
    newValue: string,
    options?: Cookies.CookieAttributes | undefined
  ) => void;
  deleteCookie?: () => void;
  // setToken?: React.Dispatch<React.SetStateAction<string | null>>;
};

export const TokenContext = createContext<TokenContextType>({});

function App() {
  const [token, updateCookie, deleteCookie] = useCookie('token');
  // const [token, setToken] = useState(tokenCookie);

  // useEffect(() => {
  //   setToken(tokenCookie);
  // }, [tokenCookie]);

  return (
    <TokenContext.Provider value={{ token, updateCookie, deleteCookie }}>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/transfer"
            element={
              <ProtectedRoute>
                <TransferMoney />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <TransactionHistory />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </TokenContext.Provider>
  );
}

export default App;
