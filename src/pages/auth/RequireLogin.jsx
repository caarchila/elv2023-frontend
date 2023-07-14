import { useContext } from 'react';
import { TokenContext } from "../../provides/TokenContext";
import Cabecera from '../../components/Cabecera';
import { Navigate } from 'react-router-dom';
import { PAGES } from '../../Pages';

const RequireLogin = ({ children }) => {
  const { token } = useContext(TokenContext);

  if (token.value != "") {
    return children;
  } else {
    return (
      <Navigate to={PAGES.index}/>
    )
  }
};

export default RequireLogin;