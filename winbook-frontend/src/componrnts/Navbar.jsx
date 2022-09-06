import { Laptop } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Avatar, Menu, MenuItem, Checkbox } from '@mui/material'
import { AccountBox, Article, Group, Home, Person, Settings, Storefront } from '@mui/icons-material'
import { pink } from '@mui/material/colors';
import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { Divider, ListItemIcon } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';



const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({ mode, setMode }) => {
  const tkn = localStorage.getItem('authtoken')
  var background = ""; 
  const [Open, setOpen] = useState(false);
  const [open, setOpen1] = useState(false);
  const [text, setText] = useState("Dark Mode")
  if(mode==="light")
  {
    background = "white";
  }
  else
  {
    background = "#1a1a1a";
  }

  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('user');
    localStorage.removeItem('id');
    history("/");
  }
  const profile = () => {
    history('/profile');
  }

  const Search = styled("div")(({ theme }) => ({
    backgroundColor: background,
    padding: "0 10px",
    borderRadius: theme.shape.borderRadius,
    width: "40%"
  }));


  return (
    <AppBar position='sticky' sx={{width:'100%'}}>
      <StyledToolBar>
        <NavLink to={"/home"} style={{color:'white',textDecoration:'none'}}><Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>WinBook</Typography></NavLink>
        <Laptop sx={{ display: { xs: "block", sm: "none" } }} onClick={() => {
          tkn===null?history('/'):setOpen1(true);
        }} />
        <Search>
          <InputBase placeholder='Search...' />
        </Search>
        <Avatar sx={{ display: { xs: "none", sm: "block" }, bgcolor: "lightcoral", height: 36, width: 36 }} onClick={e => {
          tkn!==null?setOpen(true):setOpen(false);
          }} >
          <PersonIcon sx={{ height: 32, width: 34 }}></PersonIcon>
        </Avatar>
        <UserBox onClick={e => {
          tkn!==null?setOpen(true):setOpen(false);
        }}>
          {tkn===null?<Typography variant='span'>Forgot Password</Typography>:<Typography variant='span'>{localStorage.getItem('user')}</Typography>}
        </UserBox>
      </StyledToolBar>
      <Menu
        id="account-menu"
        open={Open}
        onClose={e => setOpen(false)}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
      >
        <MenuItem onClick={profile}>
          <Avatar /> Profile
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItemIcon>
            <PersonAdd fontSize="small" />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          Settings
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          Logout
        </MenuItem>
        <MenuItem>
          <Checkbox
            sx={{ '&.Mui-checked': { color: pink[600] }, }}
            onChange={e=>{
              setMode(mode === "light"? "dark":"light");
              localStorage.setItem("theme", mode === "light"? "dark":"light");
              setText(mode === "light" ? "Dark Mode" : "Light Mode");
            }
          }
          />
          {text}
        </MenuItem>
      </Menu>
      <Menu sx={{ display: { xs: "block", sm: "none" } }}
        open={open}
        onClose={() => setOpen1(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={()=> {history('/home')}}><Home /> Home</MenuItem>
        <MenuItem><Article /> Pages</MenuItem>
        <MenuItem><Group /> Groups</MenuItem>
        <MenuItem><Storefront /> Market</MenuItem>
        <MenuItem><Person /> Friends</MenuItem>
        <MenuItem><Settings /> Settings</MenuItem>
        <MenuItem onClick={()=>{history('/profile')}}><AccountBox /> Profile</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar