import React from 'react'
import Box from '@mui/material/Box'
import Navbar from '../Navbar'
import "./Profile.css";
import Sidebar from '../Sidebar';
import { Stack, ThemeProvider } from '@mui/material';
import Profilecontent from './Profilecontent'

export const Profilr = ({mode,setMode}) => {


  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setMode={setMode} mode={mode}/>
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar setMode={setMode} mode={mode}/>
        <Profilecontent/>
      </Stack>
    </Box>
  )
}
