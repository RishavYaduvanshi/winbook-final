import { Box, Button } from '@mui/material'
import React,{useState, useEffect} from 'react'
import Share from '../share/Share'
import {Modal, styled, Typography, TextField, ButtonGroup} from '@mui/material';
import './Profile.css'
import CoverImg from '../.././resources/winbook1.png'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';

const Profilecontent = () => {
  var s = "";

  const Styledmodal = styled(Modal)({
    display:"flex",
    alignItems:"center",
    justifyContent:"center"
  });

  const [bio,setbio] = useState("Loading Bio...");
  const [open, setOpen] = useState(false);


  const addbio = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    s = data.get('bio');
    console.log(s);
    setOpen(false);
    

    fetch('https://winbookbackend.d3m0n1k.engineer/user/'+localStorage.getItem('id')+'/',{
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ "bio": s })
    }).then(
      (response) =>  response.json()).then(
        (data) => {
          console.log(data);
          setbio(data.bio);
          
        })
  }


  useEffect(() => {
    fetch('https://winbookbackend.d3m0n1k.engineer/user/f/'+localStorage.getItem('user')+'/',{
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) => {
      if(response.status >= 200 && response.status < 300){
        response.json().then((data) => {
          localStorage.setItem('id',data.id);
          console.log(data);
          setbio(data.bio);
        })
      }
    })
  }, []);




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
              <Box className="profileInfoDesc">{bio}<EditIcon color='secondary' onClick={()=> {setOpen(true)}}/></Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <Share/>
      <Styledmodal
  open={open}
  onClose={e=>setOpen(false)}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
<Box component='form' bgcolor={"background.default"} color={"text.primary"} height={250} p={3} borderRadius={5} width={400} onSubmit={addbio}>
<Typography variant='h6' color="gray" textAlign="center" marginBottom={5}>Update Bio</Typography>
<TextField
          id="standard-multiline-static"
          multiline
          rows={4}
          name="bio"
          defaultValue={bio}
          placeholder="Let people know about you !"
          sx={{width:"100%"}}
          variant="standard"
        />
        <br/>
        <br/>
        <br/>
        <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
          <Button type='submit'>Update</Button>
        </ButtonGroup>
</Box>
</Styledmodal>
      </Box>
  )
}

export default Profilecontent