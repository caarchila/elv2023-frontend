import {Button} from '@mui/material';
import {deepOrange, grey} from '@mui/material/colors';
import AlcCard from '../../../components/AlcCard';

import React, {useContext, useEffect, useState} from 'react';
import {TokenContext} from '../../../provides/TokenContext';
import {VOTE_ANSWER} from '../../../config/constants';

/**
 * Vote3
 * @return {Object} vote 3
 */
export default function Alcaldes({munId, comId, documento, handleVote}) {
  const {token} = useContext(TokenContext);
  const [alcaldes, setAlcaldes] = useState({});

  useEffect(()=>{
    const fetchData = async () => {
      const options = {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token.value}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          munId,
          comId,
          documento,
        }),
      };
      const response = await fetch(
          process.env.REACT_APP_API_URL + '/terminal/datosAlcalde',
          options,
      );
      const data = await response.json();
      setAlcaldes(data);
    };
    fetchData();
  }, []);

  const handleYesClick = () => {
    handleVote( {'alcalde': {
      'munId': 27,
      'canId': 31,
      'voto': VOTE_ANSWER.SI,
    }});
  };
  const handleNoClick = () =>{
    handleVote( {'alcalde': {
      'munId': 27,
      'canId': 31,
      'voto': VOTE_ANSWER.NO,
    }});
  };
  const handleAbsClick= () => {
    handleVote( {'alcalde': {
      'munId': 27,
      'canId': 31,
      'voto': VOTE_ANSWER.ABSTENERCE,
    }});
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className='my-2 mx-20 text-center text-sm'>
      Si apoya al candidato para la alcaldía de
        {' ' + alcaldes.nombreMunicipio || ' ' + ' '},
       presione el botón “SI”.  Si no lo apoya presione el botón “No”
        o presione “Abstención” si no desea emitir
        ninguna posición sobre el candidato
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className='m-4 text-4xl font-bold'>
          {alcaldes.nombreMunicipio || ' '}
        </div>
        { alcaldes ? <AlcCard candidato={alcaldes.candidato}/> : ''}
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-row justify-center m-4 border-t
        border-solid border-t-gray-300 pt-8 w-3/4'>
          <div className='mx-2'>
            <Button variant='contained'
              onClick={() => {
                handleYesClick();
              }}
              className='w-36 h-16'
              sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>
                 SI
            </Button>
          </div>
          <div className='mx-2'>
            <Button variant='contained' onClick={() => {
              handleNoClick();
            }}
            sx={{
              background: deepOrange[700],
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
              }}
              sx={{background: grey[300],
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
