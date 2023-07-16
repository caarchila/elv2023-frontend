import React from 'react';

/**
 * Dip card
 * @return {object} as
 */
export default function DipCard({candidato= {}}) {
  return (
    <div className="card flex flex-col border-solid
    border-gray-300 border m-1 w-[50%]">
      <div className="flex flex-row items-center justify-evenly p-8">
        <div className="p-1">
          <img src={candidato.foto || ''} className="w-40 rounded-full"/>
        </div>
        <div className="flex flex-col justify-center">
          <div className="p-1 text-4xl font-bold">
            { candidato.nombreCandidato || ' '}
          </div>
          <span className="text-2xl text-blue-700 font-bold">
            { candidato.etiquetaCandidato || ' '}
          </span>
        </div>
      </div>
    </div>
  );
}
