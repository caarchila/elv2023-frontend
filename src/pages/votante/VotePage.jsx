
import React, {useContext, useEffect, useState} from 'react';
// import {useNavigate} from 'react-router-dom';
import Cabecera from '../../components/Cabecera';
import {TokenContext} from '../../provides/TokenContext';
import DocumentInputPage from './phases/DocumentInputPage';
import {Alert} from '@mui/material';
import ConsejoNacional from './phases/ConsejoNacional';
import Diputados from './phases/Diputados';
import Alcaldes from './phases/Alcaldes';
import Final from './phases/Final';

const PHASE = {
  VALIDATE_DUI: 'VALIDATE',
  ALCALDE: 'ALCALDE',
  CENTRO: 'CENTRO',
  DIPUTADO: 'DIPUTADO',
  FINAL: 'FINAL',
};


/**
 * Login Page
 * @return {Object} Login form
 */
function VotePage() {
//  const navigate = useNavigate();
  const {token} = useContext(TokenContext);
  const [phase, setPhase] = useState(PHASE.VALIDATE_DUI);
  const [requiredPhases, setRequiredPhases] = useState([]);
  const [dui, setDui] = useState('');
  const [error, setError] = useState('');
  const [vote, setVote] = useState();
  const [vontante, setVontanteInfo] = useState();
  const [title, setTitle]= useState('');

  useEffect(()=>{
    switch (phase) {
      case PHASE.ALCALDE:
        setTitle('Elección de candidato a alcalde');
        break;
      case PHASE.CENTRO:
        setTitle('Elección de Consejo Ejecutivo Nacional VAMOS');
        break;
      case PHASE.DIPUTADO:
        setTitle('Elección de candidatos a diputados');
        break;
      default:
        setTitle('');
    }
  }, [phase]);

  const handleDuiValidate = async () => {
    try {
      setError('');
      setRequiredPhases([]);
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( {
          'documento': dui,
          'codigo': token.comId,
        }),
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/terminal/validarDocumento',
          options,
      );
      const data = await response.json();
      setVontanteInfo(data);
      if (!data.valido) {
        return setError(data.mensajeError);
      }
      const avialbe = [];

      if (data.habilitaCen) {
        avialbe.push(PHASE.CENTRO);
      }

      if (data.habilitaDip) {
        avialbe.push(PHASE.DIPUTADO);
      }

      if (data.habilitaAlc) {
        avialbe.push(PHASE.ALCALDE);
      }
      avialbe.push(PHASE.FINAL);
      setVote({
        'comId': token.comId,
        'padId': data.padronElectoral.padId,
      });
      nextPhase(avialbe);
    } catch (e) {
      if (!data.valido) {
        setError(data.mensajeError);
      } else {
        setError('Error desconocido');
      }
    }
  };

  const nextPhase = (list) => {
    if (!list || list.length == 0) {
      setPhase(PHASE.VALIDATE_DUI);
      return;
    }
    const listClone = list.slice(0);
    const newPhase = listClone.shift();
    setPhase(newPhase);
    setRequiredPhases(listClone);
  };

  const handleVote = (value) =>{
    setVote({...vote, ...value});
    if (requiredPhases.length == 0) {
      console.log('Enviado voto y restableciendo estados');
    } else {
      nextPhase(requiredPhases);
    }
  };

  const enviarVoto = async () => {
    console.log(vote);
    const options = {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token.value}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vote),
    };
    const response = await fetch(
        process.env.REACT_APP_API_URL + '/terminal/registrarVoto',
        options,
    );
    console.log(response);

    setPhase(PHASE.VALIDATE_DUI);
    setVote({});
    setVontanteInfo({});
    setDui('');
  };

  const renderPhase = (value) => {
    switch (value) {
      case PHASE.VALIDATE_DUI: {
        return <DocumentInputPage numDui={dui} setNumDui={setDui}
          onClickValidate={() => handleDuiValidate()} error={error}/>;}
      case PHASE.ALCALDE:
        return <Alcaldes
          munId={vontante.padronElectoral?.municipio?.munId || ''}
          comId={token.comId}
          documento={dui}
          handleVote={handleVote}/>;
      case PHASE.CENTRO:
        return <ConsejoNacional handleVote={handleVote}/>;
      case PHASE.DIPUTADO:
        return <Diputados
          munId={vontante.padronElectoral?.municipio?.munId || ''}
          comId={token.comId}
          documento={dui}
          handleVote={handleVote}
        />;
      case PHASE.FINAL:
        return <Final handleClickSalir={enviarVoto}/>;
      default:
        return <Alert className='error' a={requiredPhases}>
          Contante con el administrador, fase desconocida
        </Alert>;
    }
  };

  return (
    <>
      <Cabecera title={'Mesa: # ' + token.comId + ' - ' + title}/>
      {
        renderPhase(phase)
      }
    </>
  );
}

export default VotePage;
