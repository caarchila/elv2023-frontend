import {Button} from '@mui/material';
import logo from '../logo.jpeg';
import check from '../check.jpg';
import {useNavigate} from 'react-router-dom';
import React from 'react';

/**
 * Final
 * @return {Object}
 */
export default function Final() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/document');
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className="h-14 bg-[#0058B1] flex row w-full
       items-center justify-between">
        <div className='font-bold text-2xl ml-4
        text-white border-solid'>&nbsp;</div>
        <div><img src={logo} className='w-14' /></div>
      </div>
      <div className='flex flex-col w-full items-center'>
        <div className='m-4 text-6xl
        font-bold text-gray-600'>¡¡ Gracias por tu Voto !!</div>
        <div className='flex flex-row
        justify-items-end'><img src={check} className='w-40'/></div>
      </div>
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-row justify-center m-4
         border-t border-solid border-t-gray-300 pt-8 w-3/4'>
          <div className='mx-2'>
            <Button variant='contained' onClick={() => {
              handleClick();
            }} className='w-36 h-16'
            sx={{fontSize: '1.5rem',
              fontWeight: 'bold'}}>
          SALIR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
