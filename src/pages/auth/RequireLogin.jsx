import React, {useContext} from 'react';
import {TokenContext} from '../../provides/TokenContext';
import {Navigate} from 'react-router-dom';
import {PAGES} from '../../config/constants';


const RequireLogin = ({children}) => {
  const {token} = useContext(TokenContext);

  if (token.value != '') {
    return children;
  } else {
    return (
      <Navigate to={PAGES.index}/>
    );
  }
};

export default RequireLogin;
