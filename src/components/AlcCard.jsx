import React from 'react';
import dummyProfile from '../dummy-profile.jpg';


/**
 * Dip card
 * @return {object} as
 */
export default function DipCard() {
  return (
    <div className="card flex flex-col border-solid
    border-gray-300 border m-1 w-[50%]">
      <div className="flex flex-row items-center justify-evenly p-8">
        <div className="p-1">
          <img src={dummyProfile} className="w-40 rounded-full"/>
        </div>
        <div className="flex flex-col justify-center">
          <div className="p-1 text-4xl font-bold">José Ricardo</div>
          <div className="p-1 text-4xl font-bold">López Artiga</div>
          <span className="text-2xl text-blue-700 font-bold">
            Candidato a Alcalde
          </span>
        </div>
      </div>
    </div>
  );
}
