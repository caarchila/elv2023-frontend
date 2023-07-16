import {Button} from '@mui/material';
import {grey} from '@mui/material/colors';
import DipCard from '../../../components/DipCard';
import React, {useState, useEffect, useContext} from 'react';
import {TokenContext} from '../../../provides/TokenContext';
import {VOTE_ANSWER} from '../../../config/constants';

/**
 * Vote 2
 * @return {Object}
 */
export default function Diputados({munId, comId, documento, handleVote}) {
  const {token} = useContext(TokenContext);
  const [diputados, setDiputados] = useState({});
  const [marcas, setMarcas] = useState([]);
  const [more, setMore] = useState(true);

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
          process.env.REACT_APP_API_URL + '/terminal/datosDiputados',
          options,
      );
      const data = await response.json();
      setDiputados(data);
    };
    fetchData();
  }, []);

  const handleYesClick= () =>{
    if (marcas.length > 0) {
      handleVote({
        'diputados': {
          'dptId': diputados.dptId,
          'marcas': marcas,
        }});
    }
  };
  const handleAbsClick= () => {
    handleVote({
      'diputados': {
        'dptId': diputados.dptId,
        'marcas': [],
      }});
  };

  const handleMarcas = (value) =>{
    const listClone = marcas.slice(0);
    const filter = listClone.filter( (v) => v.canId != value.canId);
    if (value.voto == VOTE_ANSWER.SI) {
      filter.push(value);
    }
    if (filter.length <= diputados.marcasDepartamento) {
      setMarcas(filter);
      setMore(filter.length < diputados.marcasDepartamento);
    } else {
      setMore(false);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center bg-white">
      <div className='my-2 mx-20 text-center text-sm'>
      Marque de 1 a {diputados.marcasDepartamento + ' ' || 0 }
       casillas de acuerdo a sus preferencias por los candidatos
      </div>
      <div className='flex w-full
        items-center justify-center flex-wrap'>
        { diputados.candidatos?.map( (d) => {
          return (<DipCard diputado={d}
            key={d.canId}
            votable={more}
            onClickVote= {handleMarcas}/>);
        })}
      </div>
      <div>
        <div className='flex flex-row m-4'>
          <div className='mx-2'>
            <Button variant='contained' onClick={() => {
              handleYesClick();
            }}
            className='w-60 h-16'
            sx={{fontSize: '1.0rem', fontWeight: 'bold'}}>
           REGISTRAR VOTO
            </Button>
          </div>
          <div className='mx-2'>
            <Button variant='contained' onClick={() => {
              handleAbsClick();
            }}
            sx={{background:
          grey[300],
            color: grey[900],
            fontSize: '1.0rem',
            fontWeight: 'bold'}} className='w-60 h-16'>
          ABSTENCIÓN
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
