import { Button } from '@mui/material';
import { deepOrange, grey, common } from '@mui/material/colors';
import DipCard from '../components/DipCard';
import logo from '../logo.jpeg';
import { useNavigate } from "react-router-dom";

export default function Vote2() {
    const navigate = useNavigate();

    function handleYesClick() {
        navigate("/vote3");        
    }
    function handleAbsClick() {
        navigate("/vote3");                
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-white">
            <div className="h-14 bg-[#0058B1] flex row w-full items-center justify-between">
                <div className='font-bold text-2xl ml-4 text-white border-solid'>2. Elección de candidatos a DIPUTADOS por el departamento de San Salvador</div>
                <div><img src={logo} className='w-14' /></div>
            </div>
            <div className='my-2 mx-20 text-center text-sm'>Marque de 1 a 16 casillas de acuerdo a sus preferencias por los candidatos</div>
            <div className='flex flex-col w-full items-center'>
                <div className='flex flex-row w-full justify-center'>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                    <DipCard/>
                </div>
            </div>
            <div>
                <div className='flex flex-row m-4'>
                <div className='mx-2'><Button variant='contained' onClick={() => {handleYesClick();}} className='w-60 h-16' sx={{fontSize: '1.0rem', fontWeight: 'bold'}}>REGISTRAR VOTO</Button></div>
                <div className='mx-2'><Button variant='contained' onClick={() => {handleAbsClick();}} sx={{background: grey[300], color: grey[900], fontSize: '1.0rem', fontWeight: 'bold'}} className='w-60 h-16'>ABSTENCIÓN</Button></div>
                </div>
            </div>
        </div>
    );
}
