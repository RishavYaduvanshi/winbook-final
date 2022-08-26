import { Laptop } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Avatar, Menu, MenuItem, Checkbox } from '@mui/material'
import { AccountBox, Article, Group, Home, Person, Settings, Storefront } from '@mui/icons-material'
import { pink } from '@mui/material/colors';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { Divider, ListItemIcon } from '@mui/material';
import { PersonAdd } from '@mui/icons-material';
import { Logout } from '@mui/icons-material';


const StyledToolBar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const Search = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%"
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "10px",
  alignItems: "center",
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

const Navbar = ({ mode, setMode }) => {
  const [Open, setOpen] = useState(false);
  const [open, setOpen1] = useState(false);
  const [text, setText] = useState("Dark Mode")

  const history = useNavigate();
  const logout = () => {
    localStorage.removeItem('authtoken');
    localStorage.removeItem('user');
    history("/");
  }


  return (
    <AppBar position='sticky'>
      <StyledToolBar>
        <Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>WinBook</Typography>
        <Laptop sx={{ display: { xs: "block", sm: "none" } }} onClick={() => setOpen1(true)} />
        <Search>
          <InputBase placeholder='Search...' />
        </Search>
        <Avatar sx={{ display: { xs: "none", sm: "block" }, bgcolor: "lightcoral", height: 36, width: 36 }} onClick={e => setOpen(true)} >
          <PersonIcon sx={{ height: 32, width: 34 }}></PersonIcon>
        </Avatar>
        <UserBox onClick={e => setOpen(true)}>
          <Typography variant='span'>{localStorage.getItem('user')}</Typography>
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
        <MenuItem>
          <Avatar /> Profile
        </MenuItem>
        <MenuItem>
          <Avatar /> My account
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
            onChange={e => setMode(mode === "light" ? "dark" : "light")}
            onClick={() => setText(mode === "light" ? "Dark Mode" : "Light Mode")}
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
        <MenuItem><Home /> Home</MenuItem>
        <MenuItem><Article /> Pages</MenuItem>
        <MenuItem><Group /> Groups</MenuItem>
        <MenuItem><Storefront /> Market</MenuItem>
        <MenuItem><Person /> Friends</MenuItem>
        <MenuItem><Settings /> Settings</MenuItem>
        <MenuItem><AccountBox /> Profile</MenuItem>
      </Menu>
    </AppBar>
  )
}

export default Navbar