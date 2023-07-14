import { Button, TextField } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, { useEffect, useState } from "react";

const regexDui = /^\d{8}-\d{1}$/;

export default function DuiForm({ onSubmit }) {
  const [dui, setDui] = useState("");
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    if (!dui) {
        setStatusError("")
    } else {
        if (!regexDui.test(dui)){
          setStatusError("Ingrese un DUI con formato 00000000-0")
        } else {
          setStatusError("")
        }
    }
  }, [dui]);
  
  return (
    <div className="flex justify-evenly items-center p-6 w-full gap-2">
      <TextField label="DUI" 
      className="flex-2 w-full" 
      name="dui" 
      value={dui}
      error= {statusError!== "" ? true: false}
      onChange={(e) => setDui(e.target.value)}
      helperText={statusError}/>
      <Button variant="contained" className="w-40 h-12" 
        onClick={ () => {
          if(statusError === "") {
            onSubmit(dui)
          }
        }}>
        <SearchIcon/>
      </Button>
    </div>
  );
}
