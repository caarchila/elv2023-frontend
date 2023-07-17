import React, {useState} from 'react';
import {VOTE_ANSWER} from '../config/constants';

/**
 * DipCard
 * @return {*}
 */
export default function DipCard({diputado, onClickVote, votable}) {
  const [marcado, setMarcado] = useState(false);
  return (
    <div className={
      ('flex flex-col border-solid border-gray-300 border m-1 w-[20%]'+
      (marcado ? ' bg-blue-900 bg-opacity-40': ' bg-gray-100'))}
    onClick={
      () => {
        if (votable || marcado) {
          setMarcado(!marcado);
          return onClickVote({
            'canId': diputado.canId,
            'voto': (marcado ? VOTE_ANSWER.NO: VOTE_ANSWER.SI),
          });
        }
      }
    }>
      <div className="flex flex-row
      items-center">
        <div className="p-1">
          <img src={diputado.foto || ''} className="w-16 rounded"/></div>
        <div className="p-1 text-lg font-bold">{diputado.nombreCandidato}</div>
      </div>
      <div className="flex flex-row justify-between">
        <div className="p-1">
          <span className="text-xs
          text-blue-700 font-bold">Sup.: {diputado.etiquetaCandidato}</span>
        </div>
        <div className="p-1">
          <span className="text-xs
          text-blue-700 font-bold"># {diputado.numero}</span>
        </div>
      </div>

    </div>
  );
}
