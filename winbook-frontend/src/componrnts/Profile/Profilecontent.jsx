import { Box, Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import Share from '../share/Share'
import { Modal, styled, Typography, TextField, ButtonGroup } from '@mui/material';
import './Profile.css'
import profilePic from '../.././resources/proflepic.png'
import coverPic from '../.././resources/winbook1.png'
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import Badge from '@mui/material/Badge';
import UploadFileIcon from '@mui/icons-material/UploadFile';
//https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png
import { alert } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Profilefeed from './Profilefeed';

const Profilecontent = (props) => {
  var s = "";
  const Styledmodal = styled(Modal)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  });

  const UserBox = styled(Box)(({ theme }) => ({
    display: "flex",
    gap: "100px",
    alignItems: "center",
  }));

  const [anchorEl, setAnchorEl] = React.useState(null);
  const Open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const [bio, setbio] = useState("Loading Bio...");
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [image, setImage] = useState();
  const [preview, setPreview] = useState();
  var [profilephoto, setprofilephoto] = useState();
  var [coverphoto, setcoverphoto] = useState();
  const [name, setname] = useState("");
  const [id, setid] = useState();


  // if(localStorage.getItem('user') === name){
  //   coverphoto=usercoverphoto;
  //   profilephoto=userprofilephoto;
  // }

  useEffect(() => {
    setprofilephoto(profilePic);
    setcoverphoto(coverPic);
    fetch('https://winbookbackend.d3m0n1k.engineer/user/f/' + props.name + '/', {
      method: 'GET',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          //console.log(data.id);
          setbio(data.bio);
          setid(data.id);
          setprofilephoto(data.dp);
          setcoverphoto(data.cover);
          setname(data.username);
        })
      }
    })
  }, [props.name]);
  


  const addbio = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    s = data.get('bio');
    setOpen(false);


    fetch('https://winbookbackend.d3m0n1k.engineer/user/' + id + '/', {
      method: 'PATCH',
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
      body: JSON.stringify({ "bio": s })
    }).then(
      (response) => response.json()).then(
        (data) => {
          console.log(data);
          setbio(data.bio);

        })
  }

  useEffect(() => {
    if (image) {
      //console.log(image);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      }
      reader.readAsDataURL(image);
    }
    else {
      setPreview(null);
    }
  }, [image])

  const browse = (event) => {
    const fileUploaded = event.target.files[0];
    if (fileUploaded) {
      setImage(fileUploaded);
    }
    else {
      setImage(null);
    }
  }

  const deletepic = () => {
    fetch('https://winbookbackend.d3m0n1k.engineer/user/' + id + '/update_dp', {
      method: 'DELETE',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
    }).then((response) =>{
      if(response.status >= 200 && response.status < 300){
        response.json().then((data) => {
          alert({ message: 'Profile Picture Removed', type: 'success' });
          window.location.reload();
        })
      }  
    })
  }

  const updateProfile = (event) => {
    const bdy = new FormData()
    bdy.append('dp', image);

    event.preventDefault();
    fetch('https://winbookbackend.d3m0n1k.engineer/user/' + id + '/update_dp/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
      body: bdy
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          alert({ message: 'Profile Picture Updated', type: 'success' });
          window.location.reload();
          setOpen1(false);
          setPreview(null);
        })
      }
      else {
        alert({ message: 'Something went Wrong please try again after some time', type: 'error' });
      }
    })
  }

  const viewprofile = () => {
    
    window.open(profilephoto, 'width=800, height=600');
  }

  const viewcover = () => {
    window.open(coverphoto, 'width=800, height=600');
  }


  const updatecover = (event) => {
    event.preventDefault();
    const bdy = new FormData()
    bdy.append('cover', image);

    event.preventDefault();
    fetch('https://winbookbackend.d3m0n1k.engineer/user/' + id + '/update_cover/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
      body: bdy
    }).then((response) => {
      if (response.status >= 200 && response.status < 300) {
        response.json().then((data) => {
          alert({ message: 'Cover Picture Updated', type: 'success' });
          window.location.reload();
          setOpen2(false);
          setPreview(null);
        })
      }
      else {
        alert({ message: 'Something went Wrong please try again after some time', type: 'error' });
      }
    })
  }




  return (
    <Box flex={6} paddingTop={1}>
      <Box className="profile" >
        <Box className="profileRight">
          <Box className="profileRightTop">
            <Box className="profileCover">
              <img
                className="profileCoverImg"
                src={coverphoto}
                alt="cover img"
                onClick={viewcover}
              />
              <img
                className="profileUserImg"
                src={profilephoto}
                alt="profile pic"
              />
              {localStorage.getItem('user')===name?<AddIcon className="profileUserImgAdd"
                aria-controls={Open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={Open ? 'true' : undefined}
                onClick={handleClick} />:<></>}
              {localStorage.getItem('user')===name?<Button variant="outlined" color="primary" className="butn" onClick={()=>{setOpen2(true)}}>Update Cover</Button>:<></>}
            </Box>
            <Box className="profileInfo">
              <h4 className="profileInfoName">{localStorage.getItem('user')===props.name?localStorage.getItem('user'):props.name}</h4>
              <Box className="profileInfoDesc">{bio}{localStorage.getItem('user')===name?<EditIcon color='secondary' onClick={() => { setOpen(true) }} />:<></>}</Box>
            </Box>
          </Box>
        </Box>
      </Box>
      <UserBox>
      <Share />
      </UserBox>
      <Profilefeed id={id}/>
      <Styledmodal
        open={open}
        onClose={e => setOpen(false)}
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
            sx={{ width: "100%" }}
            variant="standard"
          />
          <br />
          <br />
          <br />
          <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
            <Button type='submit'>Update</Button>
          </ButtonGroup>
        </Box>
      </Styledmodal>


      <Styledmodal
        open={open1}
        onClose={e => setOpen1(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='form' bgcolor={"background.default"} color={"text.primary"} height={250} p={3} borderRadius={5} width={400} onSubmit={updateProfile}>
          <Typography variant='h6' color="gray" textAlign="center" marginBottom={5}>Update Profile Picture</Typography>
          {!preview ? <label htmlFor="formId1">
            <input name="file" accept='image/*' type="file" id="formId1" hidden onChange={browse} />
            <UploadFileIcon color="secondary" />
          </label> : <></>}
          {preview ? <Badge badgeContent={'x'} color="error" onClick={() => {
            setImage(null);
            setPreview(null);
          }}>
            <img src={preview} alt='new post' height={75} width={75} /> </Badge> : <></>}
          <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
            <Button type='submit' sx={{ marginTop: '50px' }}>Update</Button>
          </ButtonGroup>
        </Box>
      </Styledmodal>


      <Styledmodal
        open={open2}
        onClose={e => setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box component='form' bgcolor={"background.default"} color={"text.primary"} height={250} p={3} borderRadius={5} width={400} onSubmit={updatecover}>
          <Typography variant='h6' color="gray" textAlign="center" marginBottom={5}>Update Cover Picture</Typography>
          {!preview ? <label htmlFor="formId1">
            <input name="file" accept='image/*' type="file" id="formId1" hidden onChange={browse} />
            <UploadFileIcon color="secondary" />
          </label> : <></>}
          {preview ? <Badge badgeContent={'x'} color="error" onClick={() => {
            setImage(null);
            setPreview(null);
          }}>
            <img src={preview} alt='new post' height={75} width={75} /> </Badge> : <></>}
          <ButtonGroup variant="contained" aria-label="outlined primary button group" fullWidth>
            <Button type='submit' sx={{ marginTop: '50px' }}>Update</Button>
          </ButtonGroup>
        </Box>
      </Styledmodal>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{setOpen1(true)}}>Update Profile Picture</MenuItem>
        <MenuItem onClick={deletepic}>Remove Picture</MenuItem>
        <MenuItem onClick={viewprofile}>View Profile Picture</MenuItem>
      </Menu>


    </Box>
  )
}

export default Profilecontent