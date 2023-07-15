import {Button} from '@mui/material';
import {deepOrange, grey} from '@mui/material/colors';
import AlcCard from '../components/AlcCard';
import logo from '../logo.jpeg';
import {useNavigate} from 'react-router-dom';
import React from 'react';

/**
 * Vote3
 * @return {Object} vote 3
 */
export default function Vote3() {
  const navigate = useNavigate();

  const handleYesClick = () => {
    navigate('/final');
  };
  const handleNoClick = () =>{
    navigate('/final');
  };
  const handleAbsClick= () => {
    navigate('/final');
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className="h-14 bg-[#0058B1] flex
      row w-full items-center justify-between">
        <div className='font-bold text-2xl ml-4
        text-white border-solid'>
        3. Elección de candidato a ALCALDE
         por el municipio de San Salvador Centro
        </div>
        <div><img src={logo} className='w-14' /></div>
      </div>
      <div className='my-2 mx-20 text-center text-sm'>
      Si apoya al candidato para la alcaldía de San Salvador Centro,
       presione el botón “SI”.  Si no lo apoya presione el botón “No”
        o presione “Abstención” si no desea emitir
        ninguna posición sobre el candidato
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className='m-4 text-4xl font-bold'>San Salvador Centro</div>
        <AlcCard/>
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
