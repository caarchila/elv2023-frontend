
import {COMPUTER_STATE, TABLE_STATE} from '../config/constants';
import {Card, TextField, FormControl,
  InputLabel, Alert, MenuItem, Select, Button} from '@mui/material';
import DuiForm from './DuiForm';
import React, {useState, useContext} from 'react';
import {TokenContext} from '../provides/TokenContext';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

/**
 * Show table to enable vote
 * @param {Object} tableStatus
 * @return {Object} panel if all ok
 * */
export default function AllowVoteControlPanel({tableStatus, mesId, computers}) {
  const {token} = useContext(TokenContext);
  const [votanteInfo, setVontanteInfo] = useState({});

  const handlerFindDui = async (dui) => {
    if (dui == '') { // TODO: Solución muy cutre
      setVontanteInfo({});
      return;
    }
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        'documento': dui,
      }),
    };
    const response = await fetch(
        process.env.REACT_APP_API_URL + '/mesa/buscarDocumento',
        options,
    );
    try {
      const data = await response.json();
      console.log(data);
      setVontanteInfo(data);
    } catch (e) {
      setVontanteInfo({habilitado: false,
        mensajeError: 'No se puede conectar con el servidor'});
    }
  };

  const panel = () => {
    return (
      <>
        <DuiForm onSubmit={handlerFindDui} />
        {
          votanteInfo.habilitado == false ?
            (<Alert severity='error'>
              {votanteInfo.mensajeError}
            </Alert>) :
            ''
        }
        <Card variant="outlined" className="m-10">
          <div className='flex p-8 items-center justify-center text-2xl gap-2'>
            <AccountCircleIcon/>
            {(votanteInfo.nombres || '') + ' ' +(votanteInfo.apellidos || '') }
          </div>
          <div className="flex flex-col flex-wrap justify-evenly
            items-center p-6 w-full gap-5">
            <TextField
              label="Direccion"
              className="w-full"
              InputProps={{
                readOnly: true,
              }}
              value={votanteInfo.direccion || ''}
            />
            <div className="flex gap-3 w-full">
              <TextField
                label="Departamento"
                className="flex-1"
                InputProps={{
                  readOnly: true,
                }}
                value={votanteInfo.municipio || ''}
              />
              <TextField
                label="Municipio"
                className="flex-1"
                InputProps={{
                  readOnly: true,
                }}
              />
            </div>
            <div className="flex gap-3 w-full justify-around py-8">
              <p className="text-4xl">Votacion: 3/3</p>
              <p className="text-4xl">11:57 a.m.</p>
            </div>
            <div className="flex gap-3 w-full">
              <FormControl className="w-[70%]">
                <InputLabel id="demo-simple-select-label">
                    Computadora
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Computadora"
                  defaultValue=""
                >
                  {
                    computers.filter((c) => {
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
              <Button variant="contained" disabled={!votanteInfo.habilitado}>
                Habilitar Voto
              </Button>
            </div>
          </div>
        </Card>
      </>
    );
  };
  switch (tableStatus) {
    case TABLE_STATE.WAIT:
      return (
        <Alert severity='info'>
           Recuerda abrir la mesa antes de iniciar el proceso de votación
        </Alert>
      );
    case TABLE_STATE.CLOSE:
      return (
        <Alert severity="warning">
          La mesa esta cerrada
        </Alert>
      );
    case TABLE_STATE.OPEN:
      return (panel());
    default:
      return (
        <Alert severity="error">
          Por favor contacte al administrador
        </Alert>);
  }
}
