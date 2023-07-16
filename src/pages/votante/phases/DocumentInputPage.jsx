
import {Button, TextField, Alert} from '@mui/material';
import React from 'react';

/**
 * qwe
 * @return {Object}
 */
function DocumentInputPage({onClickValidate, numDui, setNumDui, error}) {
  const handleNumberClick = (val) => {
    if (val === -1) {
      setNumDui('');
    } else {
      if (numDui.length == 8) {
        setNumDui(numDui + '-' + val);
      } else {
        setNumDui(numDui + val);
      }
    }
  };

  return (
    <div className="w-full h-full mt-8 flex flex-col items-center">
      <div className='flex flex-col items-center bg-white w-[80%] md:w-[50%]'>
        <div className='flex flex-col justify-evenly items-center p-6 w-full'>
          <div className='m-3 w-1/2'>
            <TextField label="Ingrese su número de DUI"
              className='w-full' value={numDui}
              disabled></TextField></div>
          <div className="flex flex-col p-2">
            <div className="flex flex-row">
              <div className='m-2'>
                <Button variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(1);
                  }}>1</Button></div>
              <div className='m-2'>
                <Button variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(2);
                  }}>2</Button></div>
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(3);
                  }}>3</Button></div>
            </div>
            <div className="flex flex-row">
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(4);
                  }}>4</Button></div>
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(5);
                  }}>5</Button></div>
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(6);
                  }}>6</Button></div>
            </div>
            <div className="flex flex-row">
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(7);
                  }}>7</Button></div>
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(8);
                  }}>8</Button></div>
              <div className='m-2'>
                <Button
                  variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(9);
                  }}>9</Button></div>
            </div>
            <div className="flex flex-row">
              <div className='m-2 w-16'></div>
              <div className='m-2'>
                <Button variant='contained'
                  className='w-12 h-14' onClick={() => {
                    handleNumberClick(0);
                  }}>0</Button></div>
              <div className='m-2'>
                <Button variant='contained'
                  className='w-12 h-14'
                  onClick={() => {
                    handleNumberClick(-1);
                  }}>CLEAR</Button></div>
            </div>
          </div>
          <div className='m-3'>
            <Button variant='contained'
              color='success'
              className='w-40 h-12' onClick={() => {
                onClickValidate();
              }}>VALIDAR</Button>
          </div>

          { error? <Alert severity='error'>
            {error}
          </Alert>: ''}
        </div>
      </div>
    </div>
  );
}

export default DocumentInputPage;
