import { Laptop } from '@mui/icons-material';
import PersonIcon from '@mui/icons-material/Person';
import { AppBar, styled, Toolbar, Typography, Box, InputBase, Avatar, Paper, TextField, InputAdornment, Button} from '@mui/material'
import { NavLink, useNavigate } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';

const Forgot = () => {
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInput1, setPasswordInput1] = useState("");
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    const handlePasswordChange_ =(evnt)=>{
        setPasswordInput1(evnt.target.value);
    }
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }
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

      const Search = styled("div")(({ theme }) => ({
        backgroundColor: "white",
        padding: "0 10px",
        borderRadius: theme.shape.borderRadius,
        width: "40%"
      }));
      var auth = null;

  return (
    <>
    <AppBar>
      <StyledToolBar>
        <NavLink to={"/"} style={{color:'white',textDecoration:'none'}}><Typography variant='h6' sx={{ display: { xs: "none", sm: "block" } }}>WinBook</Typography></NavLink>
        <Laptop sx={{ display: { xs: "block", sm: "none" } }} />
        <Search>
          <InputBase placeholder='Search...' />
        </Search>
        <Avatar sx={{ display: { xs: "none", sm: "block" }, bgcolor: "lightcoral", height: 36, width: 36 }} >
          <PersonIcon sx={{ height: 32, width: 34 }}></PersonIcon>
        </Avatar>
        <UserBox>
          <Typography variant='span'>Forgot Password</Typography>
        </UserBox>
      </StyledToolBar>
      </AppBar>
      <Box
      sx={{
        display: { xs: "block", sm: "flex" },
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: 500,
          height: 350,
          marginTop: 20,
        },
      }}
      alignContent='center'
        justifyContent='center'
      >
      <Paper elevation={12} sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }} >
        <Typography variant='h5' color="primary">Forgot Password</Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: 4,
            width: 400,

        }}>
      {auth!==null?<>
        <TextField type={passwordType} id="password" name="password" onChange={handlePasswordChange_} label="New Password" variant="outlined" required fullWidth
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="end">
               {passwordType==="password"?<VisibilityIcon onClick={togglePassword}/>:<VisibilityOffIcon onClick={togglePassword}/>}
                </InputAdornment>
        )
      }}
      sx={{marginBottom: 2}}
      />
      <TextField type={passwordType} id="cnfpassword" onChange={handlePasswordChange} name="cnfpassword" label="Confirm Password Password" variant="outlined" required fullWidth
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <KeyIcon />
          </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="end">
               {passwordType==="password"?<VisibilityIcon onClick={togglePassword}/>:<VisibilityOffIcon onClick={togglePassword}/>}
                </InputAdornment>
        )
      }}
      sx={{marginBottom: 5}}
      />
      <Button variant="contained" color="primary">
        Submit
      </Button>
      </>:<>
      <TextField id="email" name="email" label="Enter your Email" variant="outlined" required fullWidth
       InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <MailIcon />
          </InputAdornment>
        ),
      }}
      />
      <Typography sx={{
        marginBottom: 10,
        fontWeight:300,
      }}>Please provide your registered Email ID !</Typography>
      <Button variant="contained" color="primary">
        Submit
      </Button></>}
      </Box>
      </Paper>
      </Box>
      </>
      
  )
}

export default Forgot