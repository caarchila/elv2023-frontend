import React, {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, TextField} from '@mui/material';
import {TokenContext} from '../../provides/TokenContext';
import Cabecera from '../../components/Cabecera';
import {PAGES} from '../../config/constants';

/**
 * Login Page
 * @return {Object} Login form
 */
function LoginPageAdmin() {
  const navigate = useNavigate();
  const {updateToken} = useContext(TokenContext);

  const [authState, setAuthState] = useState({error: false, message: ''});

  const [formData, setFormData] = useState({
    table: '',
    user: '',
    password: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginClick = async () => {
    try {
      const options = {
        method: 'POST',
        body: JSON.stringify({
          'codigo': formData.table,
          'usuario': formData.user,
          'clave': formData.password,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/loginAdm',
          options );
      const data = await response.json();
      if (data.status === 401) {
        return setAuthState({error: true, message: data.error});
      }
      if (!data.token) throw Error('No token');
      updateToken({value: data.token, type: 'admin'});
      navigate(PAGES.admin.dashboard);
    } catch (error) {
      updateToken('');
      console.error('Error:', error);
    }
  };


  return (
    <div className="w-full h-full mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white w-[80%] md:w-[50%]">
        <Cabecera title="Elecciones Internas 2023 - Mesas"/>
        <div className="flex flex-col justify-evenly items-center p-6 w-full">
          <div className="m-3 w-3/4">
            <TextField
              label="Mesa #"
              className="w-full"
              name="table"
              value={formData.table}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3 w-3/4">
            <TextField
              label="Usuario"
              name="user"
              className="w-full"
              value={formData.user}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3 w-3/4">
            <TextField
              type="password"
              name="password"
              label="Contraseña"
              className="w-full"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3">
            <Button
              variant="contained"
              className="w-40 h-12"
              onClick={() => {
                handleLoginClick();
              }}
            >
              INGRESAR
            </Button>
          </div>
          <div className="m-3 w-3/4">
            {authState.error ? authState.message : ''}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPageAdmin;
