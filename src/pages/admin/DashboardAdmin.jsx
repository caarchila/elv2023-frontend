import Cabecera from '../../components/Cabecera';

import React, {useState, useContext, useEffect} from 'react';
import {TokenContext} from '../../provides/TokenContext';
import {Button, Dialog, DialogTitle,
  DialogContent, DialogActions, DialogContentText} from '@mui/material';

import AllowVoteControlPanel from '../../components/AllowVoteControlPaneL';
import {TABLE_STATE} from '../../config/constants';

/**
 * Dashboard admin
 * @return {Object} dashboard
 */
function DashboardAdmin() {
  const {token} = useContext(TokenContext);

  const [tableState, setTabletState] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpenConfirmation = () => {
    setOpen(true);
  };

  const handleClickCloseConfirmation = () => {
    setOpen(false);
  };

  const handleFetchClose = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mesId: tableState.mesId,
      }),
    };
    const response = await fetch(
        process.env.REACT_APP_API_URL + '/mesa/cerrarMesa',
        options,
    );
    const data = await response.json();
    setTabletState(data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/mesa/datosMesa',
          options,
      );
      const data = await response.json();
      setTabletState(data);
    };
    fetchData();
  }, []);

  const handleOpenTable = async () => {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mesId: tableState.mesId,
      }),
    };
    const response = await fetch(
        process.env.REACT_APP_API_URL + '/mesa/abrirMesa',
        options,
    );
    const data = await response.json();
    setTabletState(data);
  };

  return (
    <div className='h-screen flex-col'>
      <Cabecera title={'Centro de votación: ' + tableState.nombreCto || ''} />
      <div className='flex flex-1 h-full'>
        <div className='flex-1 p-4 bg-white'>
          <AllowVoteControlPanel tableStatus={tableState.estado}
            mesId={tableState.mesId}
            computers={tableState.computadorasList} />
        </div>
        <div className='flex-1 items-center flex justify-center gap-7'>
          <Button
            variant='contained' color='success'
            disabled={TABLE_STATE.WAIT != tableState.estado}
            onClick={ () => handleOpenTable()}>
            Abrir mesa
          </Button>
          <Button
            variant='contained'
            color='error'
            disabled={
              TABLE_STATE.CLOSE == tableState.estado ||
              TABLE_STATE.WAIT == tableState.estado}
            onClick={() => handleClickOpenConfirmation()}>
            Cerrar mesa
          </Button>
        </div>
      </div>
      <Dialog
        open={open}
        onClose={handleClickCloseConfirmation}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'¿Estas seguro que deseas cerrar la mesa?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Al cerrar la mesa no podrás abrirla de nuevo
            y no se podran realizar mas votos
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            color="error"
            variant='contained'
            onClick={() => {
              handleClickCloseConfirmation();
              handleFetchClose();
            }}>
          Cerrar Mesa
          </Button>
          <Button onClick={handleClickCloseConfirmation} autoFocus>
            Cancelar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DashboardAdmin;
