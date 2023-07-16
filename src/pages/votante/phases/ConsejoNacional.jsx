import {Button} from '@mui/material';
import {deepOrange, grey} from '@mui/material/colors';
import CenCard from '../../../components/CenCard';
import {TokenContext} from '../../../provides/TokenContext';
import React, {useContext, useEffect, useState} from 'react';
import {VOTE_ANSWER} from '../../../config/constants';

/**
 * Vote 1
 * @return {Object} vote 1
 */
export default function ConsejoNacional({handleVote}) {
  const {token} = useContext(TokenContext);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(()=>{
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/terminal/datosCen',
          options,
      );
      const data = await response.json();
      if (data.candidatos) setCandidatos(data.candidatos);
    };
    fetchData();
  }, []);

  const handleYesClick= () =>{
    handleVote({
      'cen': {
        'voto': VOTE_ANSWER.SI,
      },
    });
  };

  const handleNoClick= () => {
    handleVote({
      'cen': {
        'voto': VOTE_ANSWER.NO,
      },
    });
  };

  const handleAbsClick= () => {
    handleVote({
      'cen': {
        'voto': VOTE_ANSWER.ABSTENERCE,
      },
    });
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className='my-2 mx-20 text-center text-sm'>
      Si apoya la planilla de Secretarios para el Consejo Ejecutivo Nacional,
      presione el botón “SI”.  Si no lo apoya presione el botón “No”
      o presione “Abstención” si no desea emitir ninguna posición
      sobre el candidato
      </div>
      <div className='flex w-full items-center flex-wrap justify-center'>
        {
          candidatos.map((c) => {
            return <CenCard key={c.canId}candidato={c}/>;
          })
        }
      </div>
      <div>
        <div className='flex flex-row m-4'>
          <div className='mx-2'>
            <Button variant='contained'
              onClick={() => {
                handleYesClick();
              }} className='w-36 h-16'
              sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>
           SI
            </Button>
          </div>
          <div className='mx-2'>
            <Button variant='contained' onClick={() => {
              handleNoClick();
            }} sx={{background: deepOrange[700],
              fontSize: '1.5rem',
              fontWeight: 'bold'}}
            className='w-36 h-16'>
                 NO
            </Button>
          </div>
          <div className='mx-2'>
            <Button variant='contained'
              onClick={() => {
                handleAbsClick();
              }} sx={{background: grey[300],
                color: grey[900],
                fontSize: '1.0rem',
                fontWeight: 'bold'}}
              className='w-36 h-16'>
           ABSTENCIÓN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
