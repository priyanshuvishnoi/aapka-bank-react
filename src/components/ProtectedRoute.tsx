import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { TokenContext } from '../App';
import CustomAppBar from './CustomAppBar';

const ProtectedRoute: React.FC<any> = ({ children }) => {
  const { token } = useContext(TokenContext);
  console.log(token);

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <CustomAppBar /> <div style={{ marginTop: '80px' }}>{children}</div>
    </>
  );
};

export default ProtectedRoute;
