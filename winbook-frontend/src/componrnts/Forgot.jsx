import { Typography, Box, TextField, InputAdornment, Button, Card} from '@mui/material'
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Navbar from './Navbar';
const Forgot = ({mode,setMode,auth,eml}) => {
  console.log(eml);
  console.log(auth);
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInput1, setPasswordInput1] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const handlePasswordChange =(evnt)=>{
        setPasswordInput(evnt.target.value);
    }
    const handlePasswordChange_ =(evnt)=>{
        setPasswordInput1(evnt.target.value);
    }
    const emailchange =(evnt)=>{
        setEmailInput(evnt.target.value);
    }
    const togglePassword =()=>{
        if(passwordType==="password")
        {
         setPasswordType("text")
         return;
        }
        setPasswordType("password")
      }

      const resetpass = () => {
        if(passwordInput!==passwordInput1)
        {
          alert("Passwords do not match");
          return;
        }
        fetch("https://winbookbackend.d3m0n1k.engineer/forgot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Token " + localStorage.getItem('authtoken')
          },
          body: JSON.stringify({
            password: passwordInput,
            token: auth,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            } else {
              alert("Password reset successful");
            }
          });
      }

      const resetp = (event)=> {
        if(auth===null || eml===null){
          eml = emailInput;
          auth = null;
        }
        
        //console.log(eml);
        

        fetch("https://winbookbackend.d3m0n1k.engineer/forgot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            email: eml,
          },
        }).then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error);
            }
            else{
              alert("Confirmation email sent");
            }
          });
      }

  return (
    <>
    <Navbar setMode={setMode} mode={mode}/>
{/* Desktop Display */}
    <Box
      sx={{
        display: {sm:"flex",xs:"none"},
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
        <Typography variant='h5' color="primary" sx={{marginTop:'5%'}}>Forgot Password</Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop:'10%',
            width: '70%',

        }}>
      {typeof auth!=='undefined'?<>
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
      <Button variant="contained" color="primary" sx={{marginBottom:7}} onClick={resetpass}>
        Change Password
      </Button>
      </>:<>
      <TextField id="email" name="email" onChange={emailchange} label="Enter your Email" variant="outlined" required fullWidth
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
        display: {sm:"none",xs:"block"},
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
        <Typography variant='h5' color="primary" sx={{marginTop:'5%'}}>Forgot Password</Typography>
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            marginTop:'10%',
            width: '80%',

        }}>
      {typeof auth!=='undefined'?<>
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
      <Button variant="contained" color="primary" sx={{marginBottom:7}} onClick={resetpass}>
        Change Password
      </Button>
      </>:<>
      <TextField id="email" name="email" onChange={emailchange} label="Enter your Email" variant="outlined" required fullWidth
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