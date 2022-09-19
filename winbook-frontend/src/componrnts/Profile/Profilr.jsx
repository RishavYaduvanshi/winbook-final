import React from 'react'
import Box from '@mui/material/Box'
import Navbar from '../Navbar'
import "./Profile.css";
import Sidebar from '../Sidebar';
import { Stack } from '@mui/material';
import Profilecontent from './Profilecontent'
import { useParams } from 'react-router-dom';

export const Profilr = (props) => {
  var username;
  const {val} = useParams();
  if(typeof val === "undefined"){
    username = localStorage.getItem("user");
  }
  else{
    username = val;
  }
  //console.log("got props", username);
document.title = "Winbook | Profile";

  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setMode={props.setMode} mode={props.mode}/>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar position="sticky" setMode={props.setMode} mode={props.mode}/>
        <Profilecontent setMode={props.setMode} mode={props.mode} name={username}/>
      </Stack>
    </Box>
  )
}
