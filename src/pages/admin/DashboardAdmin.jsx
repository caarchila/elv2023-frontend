import Cabecera from '../../components/Cabecera';

import React, {useState, useContext, useEffect} from 'react';
import {TokenContext} from '../../provides/TokenContext';
import {Button, Dialog, DialogTitle,
  DialogContent, DialogActions, DialogContentText} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
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
  const [stasts, setStats] = useState({});

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

  /**
   * @param {*} mesId
   */
  function fetchStats(mesId) {
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mesId,
      }),
    };
    console.log(options);
    fetch(
        process.env.REACT_APP_API_URL + '/mesa/panelMesa',
        options)
        .then((res) => res.json())
        .then((data)=> {
          setStats(data);
        }).catch();
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

  useEffect(() => {
    fetchStats(tableState.mesId);
  }, [tableState]);

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
      <Cabecera title={' Centro de votación: ' +
      tableState.nombreCto || '' } />
      <div className='flex flex-1 h-full'>
        <div className='flex-1 p-4 bg-white'>
          <AllowVoteControlPanel tableStatus={tableState.estado}
            mesId={tableState.mesId}
            computers={tableState.computadorasList}
            refresh={ () => {
              fetchStats(tableState.mesId);
            }} />
        </div>
        <div className='flex-1 items-center flex-col justify-center gap-7'>
          <Button className='float-right m-5 p-5' onClick={() =>{
            fetchStats(tableState.mesId);
          }}>
            <RefreshIcon />
          </Button>
          <div className='w-full flex-1 grow p-10 mb-6'>
            <div className='flex flex-col p-10 gap-10'>
              <div className="text-blue-600 text-3xl">
                  Padrón: {stasts.padron || ''}
              </div>
              <div className="text-blue-600 text-3xl">
                   Asistentes:
                {` ${stasts.asistentes}   
                (${stasts.prcAsisentes?.toFixed(2)}%)`}
              </div>
              <div className="text-blue-600 text-3xl">
                  Pendientes:
                {` ${stasts.pendientes}
                 (${stasts.prcPendientes?.toFixed(2)}%)`}
              </div>
              <hr className='border-1 border-black'/>
              <div className="text-blue-600 text-3xl">
                  Votos válidos:
                {` ${stasts.votosValidos}  
                (${stasts.prcVotosValidos?.toFixed(2)}%)`}
              </div>
            </div>
          </div>
          <div className='flex justify-around'>
            <Button
              style={{width: 250, height: 100}}
              variant='contained' color='success'
              disabled={TABLE_STATE.WAIT != tableState.estado}
              onClick={ () => handleOpenTable()}>
            Abrir mesa
            </Button>
            <Button
              variant='contained'
              style={{width: 250, height: 100}}
              color='error'
              disabled={
                TABLE_STATE.CLOSE == tableState.estado ||
              TABLE_STATE.WAIT == tableState.estado}
              onClick={() => handleClickOpenConfirmation()}>
            Cerrar mesa
            </Button>
          </div>
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
