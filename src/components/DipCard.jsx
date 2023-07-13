import dummyProfile from "../dummy-profile.jpg";

export default function DipCard() {
    return (
        <div className="card flex flex-col border-solid border-gray-300 border m-1 w-[18%]">
            <div className="flex flex-row items-center">
                <div className="p-1"><img src={dummyProfile} className="w-10 rounded"/></div>
                <div className="p-1 text-sm">José Ricardo López Artiga</div>
            </div>
            <div className="p-1">
                <span className="text-[0.6rem] text-blue-700 font-bold">Suplente: Mónica Victoria Amaya Ramírez</span>
            </div>
        </div>
    );
}