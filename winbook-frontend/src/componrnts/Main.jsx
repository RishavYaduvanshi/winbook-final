import React from 'react'
import Add from "./Add";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import { useState } from 'react';
import { Box, createTheme, Stack, ThemeProvider } from "@mui/material";
import { useNavigate } from 'react-router-dom';


export const Main = () => {
    const [mode, setMode] = useState("light");
    const darkTheme = createTheme({
      palette: {
        mode: mode,
      },
    });
    
  return (
    <ThemeProvider theme={darkTheme}>
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setMode={setMode} mode={mode}/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <Sidebar setMode={setMode} mode={mode}/>
        <Feed />
        <Rightbar />
      </Stack>
      <Add/>
    </Box>
    </ThemeProvider>
  )
}
