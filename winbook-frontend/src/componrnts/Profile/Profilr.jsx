import React from 'react'
import Box from '@mui/material/Box'
import Navbar from '../Navbar'
import "./Profile.css";
import Share from '../share/Share'
import Sidebar from '../Sidebar';
import { Stack } from '@mui/material';
import Profilecontent from './Profilecontent'
import Feed from '../Feed';

export const Profilr = () => {
  return (
    <Box>
      <Navbar />
      <Stack direction="row" spacing={1} justifyContent="space-between">
        <Sidebar/>
        <Profilecontent/>
      </Stack>
    </Box>

  )
}
