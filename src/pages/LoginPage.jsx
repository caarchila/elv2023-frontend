import logo from '../logo.jpeg';
import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {Button, TextField, Select, MenuItem} from '@mui/material';

/**
 * LoginPage
 * @return {Object} asd
 */
function LoginPage() {
  const navigate = useNavigate();


  const [formData, setFormData] = useState({
    table: '',
    user: '',
    password: '',
    pc: '',
  });

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.log(name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLoginClick = () => {
    navigate('/document');
  };

  return (
    <div className="w-full h-full mt-8 flex flex-col items-center">
      <div className="flex flex-col items-center bg-white w-[80%] md:w-[50%]">
        <div className="h-28 bg-[#0058B1] w-[100%] flex
          row items-center justify-between">
          <div className="font-bold text-4xl ml-4 text-white border-solid">
            Elecciones Internas 2023
          </div>
          <div>
            <img src={logo} className="w-28" alt="logo" />
          </div>
        </div>
        <div className="flex flex-col justify-evenly items-center p-6 w-full">
          <div className="m-3 w-3/4">
            <TextField
              label="Mesa #"
              className="w-full"
              name="mesa"
              value={formData.table}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3 w-3/4">
            <TextField
              label="Usuario"
              className="w-full"
              value={formData.user}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3 w-3/4">
            <TextField
              type="password"
              label="Contraseña"
              className="w-full"
              value={formData.password}
              onChange={(e) => {
                handleChange(e);
              }}
            />
          </div>
          <div className="m-3 w-3/4">
            <Select label="Computadora" className="w-full">
              <MenuItem value="{1}">PC-01</MenuItem>
              <MenuItem value="{2}">PC-02</MenuItem>
              <MenuItem value="{3}">PC-03</MenuItem>
            </Select>
          </div>
          <div className="m-3">
            <Button
              variant="contained"
              className="w-40 h-12"
              onClick={() => {
                handleLoginClick();
              }}
            >
              INGRESAR
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
