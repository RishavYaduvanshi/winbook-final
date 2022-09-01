import { Box, Button } from '@mui/material'
import React from 'react'
import Share from '../share/Share'
import './Profile.css'
import CoverImg from '../.././resources/winbook1.png'
import AddIcon from '@mui/icons-material/Add';

const Profilecontent = () => {
  return (
    <Box flex={6} paddingTop={1}>
    <Box className="profile" >
        <Box className="profileRight">
          <Box className="profileRightTop">
            <Box className="profileCover">
              <img
                className="profileCoverImg"
                src={CoverImg}
                alt=""
              />
              <img
                className="profileUserImg"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
                alt=""
              />
              <AddIcon className="profileUserImgAdd" onClick={() => {console.log('clicked')}}/>
              <Button variant="text" color="primary" className="butn">Upload Cover</Button>
            </Box>
            <Box className="profileInfo">
              <h4 className="profileInfoName">{localStorage.getItem('user')}</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </Box>
          </Box>
        </Box>
      </Box>
      <Share/>
      </Box>
  )
}

export default Profilecontent