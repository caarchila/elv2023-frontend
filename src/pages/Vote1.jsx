import { Button } from '@mui/material';
import { deepOrange, grey, common } from '@mui/material/colors';
import CenCard from '../components/CenCard';
import logo from '../logo.jpeg';
import { useNavigate} from "react-router-dom";
import { TokenContext } from '../provides/TokenContext';
import React, { useContext, useEffect} from 'react';

export default function Vote1() {
    const navigate = useNavigate();

    const token = useContext(TokenContext);

    if (!token) {
       return navigate("/");
    }

    function handleYesClick() {
        navigate("/vote2");        
    }
    function handleNoClick() {
        navigate("/vote2");                
    }
    function handleAbsClick() {
        navigate("/vote2");                
    }

    return (
        <div className="w-full h-full flex flex-col items-center bg-white">
            <div className="h-14 bg-[#0058B1] flex row w-full items-center justify-between">
                <div className='font-bold text-2xl ml-4 text-white border-solid'>1. Elección de Consejo Ejecutivo Nacional (CEN)</div>
                <div><img src={logo} className='w-14' /></div>
            </div>
            <div className='my-2 mx-20 text-center text-sm'>Si apoya la planilla de Secretarios para el Consejo Ejecutivo Nacional, presione el botón “SI”.  Si no lo apoya presione el botón “No”
                o presione “Abstención” si no desea emitir ninguna posición sobre el candidato</div>
            <div className='flex flex-col w-full items-center'>
                <div className='flex flex-row w-full justify-center'>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                    <CenCard/>
                </div>
                <div className='flex flex-row w-full justify-center'>
                    <CenCard/>
                    <CenCard/>
                </div>
            </div>
            <div>
                <div className='flex flex-row m-4'>
                <div className='mx-2'><Button variant='contained' onClick={() => {handleYesClick();}} className='w-36 h-16' sx={{fontSize: '1.5rem', fontWeight: 'bold'}}>SI</Button></div>
                <div className='mx-2'><Button variant='contained' onClick={() => {handleNoClick();}} sx={{background: deepOrange[700], fontSize: '1.5rem', fontWeight: 'bold'}} className='w-36 h-16'>NO</Button></div>
                <div className='mx-2'><Button variant='contained' onClick={() => {handleAbsClick();}} sx={{background: grey[300], color: grey[900], fontSize: '1.0rem', fontWeight: 'bold'}} className='w-36 h-16'>ABSTENCIÓN</Button></div>
                </div>
            </div>
        </div>
    );
}
