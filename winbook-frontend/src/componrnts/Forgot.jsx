import { Typography, Box, TextField, InputAdornment, Button, Card } from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Navbar from './Navbar';
import { useSearchParams } from 'react-router-dom';
import { alert } from 'react-custom-alert';
import 'react-custom-alert/dist/index.css';

const Forgot = ({ mode, setMode }) => {
  document.title = "Winbook | Forgot Password";
  var auth,eml;
  const [passwordType, setPasswordType] = useState("password");
  const [passwordInput, setPasswordInput] = useState("");
  const [passwordInput1, setPasswordInput1] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();


  if (auth !== 'undefined' || eml !== 'undefined') {
    eml = emailInput;
    auth = null;
  }else{
    eml = searchParams.get('email');
    auth = searchParams.get('token');
  }
  const handlePasswordChange = (evnt) => {
    setPasswordInput(evnt.target.value);
  }
  const handlePasswordChange_ = (evnt) => {
    setPasswordInput1(evnt.target.value);
  }
  const emailchange = (evnt) => {
    setEmailInput(evnt.target.value);
  }
  const togglePassword = () => {
    if (passwordType === "password") {
      setPasswordType("text")
      return;
    }
    setPasswordType("password")
  }
  const resetpass = () => {
    if (passwordInput !== passwordInput1) {
      alert({ message: 'Passwords do not match', type: 'warning' });
      return;
    }
    fetch("https://winbookbackend.d3m0n1k.engineer/forgot/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Token " + localStorage.getItem('authtoken')
      },
      body: JSON.stringify({
        email: searchParams.get('email'),
        password: passwordInput,
        token: searchParams.get('token'),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert({ message: data.error, type: 'error' });
        } else {
          alert({ message: 'Password reset successful', type: 'success' });
          window.location.href = "/";
        }
      });
  }
  const resetp = (event) => {
    var fd = {};
    fd.email = eml;
    console.log(JSON.stringify(fd));
    fetch("https://winbookbackend.d3m0n1k.engineer/forgot/", {
      method: "POST",
      // headers: {
      //   "Content-Type": "application/json",
      // },
      body:JSON.stringify(fd),
    }).then((res) => res.json())
      .then((data) => {
        if (data.error) {
          alert({ message: data.error, type: 'error' });

        }
        else {
          alert({ message: 'Confirmation email sent', type: 'success' });

        }
      });
  }

  return (
    <>
      <Navbar setMode={setMode} mode={mode} />
      {/* Desktop Display */}
      <Box
        sx={{
          display: { sm: "flex", xs: "none" },
          '& > :not(style)': {
            m: 1,
            height: '60vh',
            width: '50%',
            marginTop: '6%',
            borderRadius: '10px',
          },
        }}
        justifyContent="center"
        justifyItems="center"
      >
        <Card elevation={12} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }} >
          <Typography variant='h5' color="primary" sx={{ marginTop: '5%' }}>Forgot Password</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10%',
            width: '70%',

          }}>
            {typeof searchParams.get("token") !== 'undefined' && searchParams.get("token") !== null ? <>
              <TextField type={passwordType} id="password" name="password" onChange={handlePasswordChange_} label="New Password" variant="outlined" required fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {passwordType === "password" ? <VisibilityIcon onClick={togglePassword} /> : <VisibilityOffIcon onClick={togglePassword} />}
                    </InputAdornment>
                  )
                }}
                sx={{ marginBottom: 2 }}
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
                      {passwordType === "password" ? <VisibilityIcon onClick={togglePassword} /> : <VisibilityOffIcon onClick={togglePassword} />}
                    </InputAdornment>
                  )
                }}
                sx={{ marginBottom: 5 }}
              />
              <Button variant="contained" color="primary" sx={{ marginBottom: 7 }} onClick={resetpass}>
                Change Password
              </Button>
            </> : <>
              <TextField id="email" type="email" name="email" onChange={emailchange} label="Enter your Email" variant="outlined" required fullWidth
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
                fontWeight: 300,
              }}>Please provide your registered Email ID !</Typography>
              <Button variant="contained" color="primary" sx={{
                marginBottom: 7,
              }} onClick={resetp}>
                Submit
              </Button></>}
          </Box>
        </Card>
      </Box>

      {/* Mobile Display */}
      <Box
        sx={{
          display: { sm: "none", xs: "block" },
          '& > :not(style)': {
            m: 1,
            height: 'auto',
            marginTop: '20%',
            borderRadius: '10px',
          },
        }}
        justifyContent="center"
      >
        <Card elevation={12} sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }} >
          <Typography variant='h5' color="primary" sx={{ marginTop: '5%' }}>Forgot Password</Typography>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop: '10%',
            width: '80%',

          }}>
            {typeof searchParams.get("token") !== 'undefined' && searchParams.get("token") !== null ? <>
              <TextField type={passwordType} id="password" name="password" onChange={handlePasswordChange_} label="New Password" variant="outlined" required fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <KeyIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      {passwordType === "password" ? <VisibilityIcon onClick={togglePassword} /> : <VisibilityOffIcon onClick={togglePassword} />}
                    </InputAdornment>
                  )
                }}
                sx={{ marginBottom: 2 }}
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
                      {passwordType === "password" ? <VisibilityIcon onClick={togglePassword} /> : <VisibilityOffIcon onClick={togglePassword} />}
                    </InputAdornment>
                  )
                }}
                sx={{ marginBottom: 5 }}
              />
              <Button variant="contained" color="primary" sx={{ marginBottom: 7 }} onClick={resetpass}>
                Change Password
              </Button>
            </> : <>
              <TextField id="email" name="email" type="email" onChange={emailchange} label="Enter your Email" variant="outlined" required fullWidth
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
                fontWeight: 300,
              }}>Please provide your registered Email ID !</Typography>
              <Button variant="contained" color="primary" sx={{
                marginBottom: 7,
              }} onClick={resetp}>
                Submit
              </Button></>}
          </Box>
        </Card>
      </Box>
    </>

  )
}

export default Forgot