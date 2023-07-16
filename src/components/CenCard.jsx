import React from 'react';
import dummyProfile from '../dummy-profile.jpg';


/**
 * CenCard
 * @return {*}
 */
export default function CenCard({candidato}) {
  return (
    <div className="card flex flex-col border-solid
     border-gray-300 border m-1 w-[18%]">
      <div className="flex flex-row">
        <div className="p-1">
          <img src={dummyProfile} className="w-10 rounded"/>
        </div>
        <div className="p-1 text-sm">{candidato.nombreCandidato}</div>
      </div>
      <div className="p-1">
        <span className="text-xs text-blue-700
        font-bold">{candidato.etiquetaCandidato}</span>
      </div>
    </div>
  );
}
