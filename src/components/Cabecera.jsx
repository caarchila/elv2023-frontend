import logo from "../logo.jpeg";

export default function Cabecera({title}) {
  return (
    <div className="h-28 bg-[#0058B1] w-[100%] flex row items-center justify-between">
    <div className="font-bold text-4xl ml-4 text-white border-solid">
      {title}
    </div>
    <div>
      <img src={logo} className="w-28" alt="logo" />
    </div>
  </div>
  );
}