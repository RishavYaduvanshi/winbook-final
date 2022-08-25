import { Box, Typography } from '@mui/material'
import React from 'react'
import Avatarfriend from './Avatarfriend'
import Photos from './Photos'
import Conversations from './Conversations'

const Rightbar = () => {
  return (
    <Box 
    flex={2} 
    p={2}
    sx={{display:{xs:"none", sm:"block"}}}
    >
      <Box position="fixed" width={300}>
      <Typography variant="h6" fontWeight={300} mb={1}>Online Friends</Typography>
      <Avatarfriend/>
      <Typography variant="h6" fontWeight={300} mt={1} mb={2}>Latest Posts</Typography>
      <Photos/>
      <Typography variant="h6" fontWeight={300} mt={1} mb={1}>Latest Conversations</Typography>
      <Conversations/>
      </Box>
    </Box>
  )
}

export default Rightbar