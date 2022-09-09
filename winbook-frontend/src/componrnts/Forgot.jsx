import { Typography, Box, Paper, TextField, InputAdornment, Button, Card} from '@mui/material'
import { useSearchParams } from 'react-router-dom';
import MailIcon from '@mui/icons-material/Mail';
import KeyIcon from '@mui/icons-material/Key';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import Navbar from './Navbar';
//https://winbookbackend.d3m0n1k.engineer/forgot/
const Forgot = ({mode,setMode}) => {
  var Email="";
    const [passwordType, setPasswordType] = useState("password");
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordInput1, setPasswordInput1] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [searchParams, setSearchParams] = useSearchParams();
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
      var auth = null;

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
        auth = searchParams.get("token");
        var email = searchParams.get("email");
        if(auth===null || email===null){
          email = emailInput;
          auth = null;
        }
        
        console.log(email);
        

        fetch("https://winbookbackend.d3m0n1k.engineer/forgot/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            email: email,
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
      <Box
      sx={{
        display: {sm:"flex, width:40%",xs:"flex, width:100%"},
        '& > :not(style)': {
          m: 1,
          height: 'auto',
          marginTop: '6%',
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
      <Button variant="contained" color="primary" sx={{marginBottom:7}} onClick={resetpass}>
        Submit
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