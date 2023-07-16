import React, {createContext, useState, useEffect} from 'react';

const TokenContext = createContext();

/**
 * Recover auth info for localStorage
 * @return {Object} Token and object
 */
function getInitialState() {
  const token = localStorage.getItem('token');
  return token ? JSON.parse(token) : {value: '', type: '', comId: ''};
}

/**
 * Provide auth context
 * @param {Object} children render
 * @return {Object} Children with context auth
 */
function TokenProvider({children}) {
  const [token, setToken] = useState(getInitialState);

  useEffect(() => {
    localStorage.setItem('token', JSON.stringify(token));
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  return (
    <TokenContext.Provider value={{token, updateToken}}>
      {children}
    </TokenContext.Provider>
  );
}

export {TokenContext, TokenProvider};
