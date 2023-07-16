import React from 'react';


/**
 * CenCard
 * @return {*}
 */
export default function CenCard({candidato}) {
  return (
    <div className="card flex flex-col border-solid
     border-gray-300 border m-1 w-[25%] h-150">
      <div className="flex flex-row">
        <div className="p-1">
          <img src={candidato.foto || ''} className="w-10 rounded"/>
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
