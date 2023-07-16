import React, {useState} from 'react';
import dummyProfile from '../dummy-profile.jpg';
import {VOTE_ANSWER} from '../config/constants';

/**
 * DipCard
 * @return {*}
 */
export default function DipCard({diputado, onClickVote, votable}) {
  const [marcado, setMarcado] = useState(false);
  return (
    <div className={
      ('flex flex-col border-solid border-gray-300 border m-1 w-[18%]'+
      (marcado ? ' bg-green-300': 'bg-stone-300'))}
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
          <img src={dummyProfile} className="w-10 rounded"/></div>
        <div className="p-1 text-sm">{diputado.nombreCandidato}</div>
      </div>
      <div className="p-1">
        <span className="text-[0.6rem]
        text-blue-700 font-bold">{diputado.etiquetaCandidato}</span>
      </div>
    </div>
  );
}
