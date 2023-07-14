import Cabecera from "../../components/Cabecera";
import DuiForm from "../../components/DuiForm";
import React, { useState, useContext, useEffect } from "react";
import { TokenContext } from "../../provides/TokenContext";
import {
  TextField,
  Card,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";

const TABLE_STATE = {
  OPEN: "ABI",
  WAIT: "PEN",
  CLOSE: "CER",
};

function DashboardAdmin() {
  const { token } = useContext(TokenContext);
  const fetchData = async () => {
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token.value}`,
      },
    };
    const response = await fetch(
      process.env.REACT_APP_API_URL + "/mesa/datosMesa",
      options
    );
    const data = await response.json();
    console.log(data);
  };

  useEffect(() => {fetchData();}, []);

  return (
    <div className="h-screen flex-col">
      <Cabecera title="" />
      <div className="flex flex-1 h-full">
        <div className="flex-1 p-4 bg-white">
          <DuiForm onSubmit={(dui) => console.log(dui)} />
          <Card variant="outlined" className="m-10">
            <div className="flex flex-col flex-wrap justify-evenly items-center p-6 w-full gap-5">
              <TextField
                label="Direccion"
                className="w-full"
                InputProps={{
                  readOnly: true,
                }}
              />
              <div className="flex gap-3 w-full">
                <TextField
                  label="Departamento"
                  className="flex-1"
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <TextField
                  label="Municipio"
                  className="flex-1"
                  InputProps={{
                    readOnly: true,
                  }}
                />
              </div>
              <div className="flex gap-3 w-full justify-around py-8">
                <p className="text-4xl">Votacion: 3/3</p>
                <p className="text-4xl">11:57 a.m.</p>
              </div>
              <div className="flex gap-3 w-full">
                <FormControl className="w-[70%]">
                  <InputLabel id="demo-simple-select-label">
                    Computadora
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    label="Age"
                  >
                    <MenuItem value={10}>Computadora 1</MenuItem>
                    <MenuItem value={11}>Computadora 2</MenuItem>
                    <MenuItem value={12}>Computadora 3</MenuItem>
                  </Select>
                </FormControl>
                <Button variant="contained">Habilitar Voto</Button>
              </div>
            </div>
          </Card>
        </div>
        <div className="flex-1 items-center flex justify-center gap-7">
          <Button variant="contained" color="success">
            Abrir mesa
          </Button>
          <Button variant="contained" color="error">
            Cerrar mesa
          </Button>
        </div>
      </div>
    </div>
  );
}

export default DashboardAdmin;
