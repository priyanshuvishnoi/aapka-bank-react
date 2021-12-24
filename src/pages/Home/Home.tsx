import React, { useContext } from 'react';
import { TokenContext } from '../../App';

function Home() {
  const { token, deleteCookie } = useContext(TokenContext);
  return <button onClick={e => deleteCookie!()}>{token}</button>;
}

export default Home;
