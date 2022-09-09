import React from 'react'
import Add from "./Add";
import Feed from "./Feed";
import Navbar from "./Navbar";
import Rightbar from "./Rightbar";
import Sidebar from "./Sidebar";
import { Box, Stack, ThemeProvider } from "@mui/material";


export const Main = ({mode,setMode}) => {
  var theme = localStorage.getItem("theme");
    
  return (
    <Box bgcolor={"background.default"} color={"text.primary"}>
      <Navbar setMode={setMode} mode={theme}/>
      <Stack direction="row" spacing={2} justifyContent="space-between">
      <Sidebar setMode={setMode} mode={theme}/>
        <Feed />
        <Rightbar />
      </Stack>
      <Add/>
    </Box>
  )
}
