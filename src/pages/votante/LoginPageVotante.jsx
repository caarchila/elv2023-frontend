import React, {useState, useEffect, useContext} from 'react';
import {Button, TextField, FormControl,
  InputLabel, Select, MenuItem} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import Cabecera from '../../components/Cabecera';
import {TokenContext} from '../../provides/TokenContext';
import {COMPUTER_STATE, PAGES} from '../../config/constants';


/**
 * Login Page
 * @return {Object} Login form
 */
function LoginPageVontante() {
  const navigate = useNavigate();
  const {updateToken} = useContext(TokenContext);
  const [authState, setAuthState] = useState({error: false, message: ''});
  const [tempToken, setTempToken] = useState('');
  const [computers, setComputers] = useState([]);
  const [computer, setComputer] = useState('');

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

  const handleChangeComputer = (event) => {
    setComputer(event.target.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${tempToken}`,
        },
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/mesa/datosMesa',
          options,
      );
      const data = await response.json();
      setComputers(data.computadorasList);
    };
    fetchData();
  }, [tempToken]);

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
      setTempToken(data.token);
    } catch (error) {
      setAuthState({error: true, message: 'error desconocido'});
      console.error('Error:', error);
    }
  };

  const handlerConfiguraMesa = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${tempToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'codigo': formData.table,
        'usuario': formData.user,
        'clave': formData.password,
        'comId': computer,
      }),
    };
    const response = await fetch(
        process.env.REACT_APP_API_URL + '/login',
        options,
    );
    const data = await response.json();
    updateToken({value: data.token, type: 'votante'});
    navigate(PAGES.votante.votePage);
  };

  return (
    <div className="w-full h-full mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white w-[80%] md:w-[50%]">
        <Cabecera title="Elecciones Internas 2023 - Votante"/>
        {!tempToken ?
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
          </div> :
         ''}

        {tempToken ?
          <div className="flex flex-col justify-evenly items-center p-6 w-full">
            <div className="flex gap-3 w-full">
              <FormControl className="w-[70%]">
                <InputLabel id="demo-simple-select-label">
                      Computadora
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Computadora"
                  value={computer}
                  onChange={handleChangeComputer}
                >
                  {
                    computers?.filter((c) => {
                      return c.estado == COMPUTER_STATE.ACT;
                    } ).map( (c) => {
                      return (
                        <MenuItem
                          key={c.comId}
                          value={c.comId}>
                          {c.nombre}
                        </MenuItem>);
                    })
                  }
                </Select>
              </FormControl>
              <Button variant="contained"
                disabled={!tempToken || !computer}
                onClick={handlerConfiguraMesa}>
                  Configurar mesa
              </Button>
            </div>
            <div className="m-3 w-3/4">
              {authState.error ? authState.message : ''}
            </div>
          </div> :
          ''}
      </div>
    </div>
  );
}

export default LoginPageVontante;
