import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../App';

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { token } = useContext(TokenContext);
  console.log(token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
