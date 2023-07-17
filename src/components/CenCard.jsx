import React from 'react';


/**
 * CenCard
 * @return {*}
 */
export default function CenCard({candidato}) {
  return (
    <div className="card flex flex-col border-solid
     border-gray-300 border m-1 w-[30%] h-full">
      <div className="flex flex-row">
        <div className="p-1">
          <img src={candidato.foto || ''} className="w-16 rounded"/>
        </div>
        <div className="p-1 text-lg font-bold mt-2">
          {candidato.nombreCandidato}</div>
      </div>
      <div className="p-1">
        <span className="text-xs text-blue-700
        font-bold">{candidato.etiquetaCandidato}</span>
      </div>
    </div>
  );
}
