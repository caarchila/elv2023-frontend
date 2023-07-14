import { createContext, useState, useEffect} from 'react';

const TokenContext = createContext();

function getInitialState() {
  const token = localStorage.getItem('token')
  return token ? JSON.parse(token) : {value: '', type: ''}
}

function TokenProvider({ children }) {
  const [token, setToken] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token))
  }, [token])

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{token, updateToken}}>
      {children}
    </TokenContext.Provider>
  );
}

export { TokenContext, TokenProvider };