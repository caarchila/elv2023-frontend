import logo from '../logo.jpeg';
import React, {useContext} from 'react';
import {useNavigate, Navigate} from 'react-router-dom';
import {TokenContext} from '../provides/TokenContext';
import {Button} from '@mui/material';
import {PAGES} from '../config/constants';

/**
 * Index page
 * @return {Object}
 */
function IndexPage() {
  const navigate = useNavigate();
  const {token} = useContext(TokenContext);

  if (token.value) {
    switch (token.type) {
      case 'admin':
        return <Navigate to={PAGES.admin.dashboard} />;
      case 'votante':
        return <Navigate to={PAGES.votante.votePage} />;
      default:
        return <Navigate to="/error" />;
    }
  }

  return (
    <div className="w-full h-full mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white w-[80%] md:w-[50%]">
        <div className="h-28 bg-[#0058B1] w-[100%]
        flex row items-center justify-between">
          <div className="font-bold text-4xl ml-4 text-white border-solid">
            Elecciones Internas 2023
          </div>
          <div>
            <img src={logo} className="w-28" alt="logo" />
          </div>
        </div>
        <div className="flex flex-row flex-wrap
        gap-2 justify-evenly items-center p-6 w-full">
          <Button
            variant="contained"
            onClick={() => {
              navigate(PAGES.admin.loginAdmin);
            }}
          >
            Módulo de Administración
          </Button>

          <Button
            variant="contained"
            onClick={() => {
              navigate(PAGES.votante.login);
            }}
          >
            Módulo de recepción de votos
          </Button>
        </div>
      </div>
    </div>
  );
}

export default IndexPage;
