import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, useNavigate } from 'react-router-dom';


export const Login = () => {

  const theme = createTheme();
  const history = useNavigate();


  // const addData = (e) => {
  //   e.preventDefault();

  //   const getuserArr = localStorage.getItem("user");
  //   console.log(getuserArr);

  //   const { email, password } = inpval;
  //   if (email === "") {
  //     alert('email field is requred');
  //   } else if (!email.includes("@")) {
  //     alert('plz enter valid email addres');
  //   } else if (password === "") {
  //     alert('password field is requred');
  //   } else if (password.length < 5) {
  //     alert('password length greater five');
  //   } else {

  //     if (getuserArr && getuserArr.length) {
  //       const userdata = JSON.parse(getuserArr);
  //       console.log(userdata);
  //       const userlogin = userdata.filter((el, k) => {
  //         return el.email === email && el.password === password
  //       });

  //       if (userlogin.length === 0) {
  //         alert("invalid details")
  //       } else {
  //         console.log("user login succesfulyy");

  //         localStorage.setItem("user_login", JSON.stringify(userlogin))

  //         history("/home")
  //       }
  //     }
  //   }


  
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cred  = JSON.stringify({
      username: data.get('email'),
      password: data.get('password'),
    });
    console.log(cred);
    fetch('http://gagandeep.engineer:8080/login/', {
      method: 'POST',
      headers: {
        "Accept": "application/json",
        // "Content-Type": "application/json"
      },
      body: cred
    }).then((result) => {
      result.json().then((resp) => {
        localStorage.setItem("authtoken",resp.token);
        localStorage.setItem("user",data.get('email'));
        if(resp.token){
        history('/home');
        }
        else{
          alert("invalid credentials")
        }
      })
    })  
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(https://i.ibb.co/QXfbd1X/1.jpg)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize:'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <p className='mt-3'>Don't have an account? <span><NavLink to="/signup">Sign Up</NavLink></span></p>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
export default Login































// import * as React from 'react';
// import Avatar from '@mui/material/Avatar';
// import Button from '@mui/material/Button';
// import CssBaseline from '@mui/material/CssBaseline';
// import TextField from '@mui/material/TextField';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
// import Paper from '@mui/material/Paper';
// import Box from '@mui/material/Box';
// import Grid from '@mui/material/Grid';
// import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
// import Typography from '@mui/material/Typography';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import { useState } from 'react';
// import { Component } from 'react'
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FormControl } from '@mui/material';


// export const Login = () => {

//   const theme = createTheme();
//   const history = useNavigate();

//   const [inpval, setInpval] = useState({
//     email: "",
//     password: ""
//   })

//   const [data, setData] = useState([]);
//   //console.log(inpval);

//   const getdata = (e) => {
//     // console.log(e.target.value);


//     const { value, name } = e.target;
//     // console.log(value,name);
//     console.log(inpval);


//     setInpval(() => {
//       return {
//         ...inpval,
//         [name]: value
//       }
//     })

//   }

//   // const addData = (e) => {
//   //   e.preventDefault();

//   //   const getuserArr = localStorage.getItem("user");
//   //   console.log(getuserArr);

//   //   const { email, password } = inpval;
//   //   if (email === "") {
//   //     alert('email field is requred');
//   //   } else if (!email.includes("@")) {
//   //     alert('plz enter valid email addres');
//   //   } else if (password === "") {
//   //     alert('password field is requred');
//   //   } else if (password.length < 5) {
//   //     alert('password length greater five');
//   //   } else {

//   //     if (getuserArr && getuserArr.length) {
//   //       const userdata = JSON.parse(getuserArr);
//   //       console.log(userdata);
//   //       const userlogin = userdata.filter((el, k) => {
//   //         return el.email === email && el.password === password
//   //       });

//   //       if (userlogin.length === 0) {
//   //         alert("invalid details")
//   //       } else {
//   //         console.log("user login succesfulyy");

//   //         localStorage.setItem("user_login", JSON.stringify(userlogin))

//   //         history("/home")
//   //       }
//   //     }
//   //   }

//  const login = (e) => {
//   alert(e);
 
//   // e.preventDefault();
//   alert("done");
//     // fetch('http://172.17.220.76:8000/post/user/', {
//     //   method: 'POST',
//     //   headers: {
//     //     "Accept": "application/json",
//     //     "Content-Type": "application/json"
//     //   },
//     //   body: JSON.stringify(this.state)
//     // }).then((result) => {
//     //   alert(result);
//     //   result.json().then((resp) => {
//     //     localStorage.setItem('auth', JSON.stringify({}).then(() => {
//     //       history('/home')}
//     //     ))
//     //   })
//     // })  
//   }


//   return (
//     <ThemeProvider theme={theme}>
//       <Grid container component="main" sx={{ height: '100vh' }}>
//         <CssBaseline />
//         <Grid
//           item
//           xs={false}
//           sm={4}
//           md={7}
//           sx={{
//             backgroundImage: 'url(https://source.unsplash.com/random)',
//             backgroundRepeat: 'no-repeat',
//             backgroundColor: (t) =>
//               t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
//             backgroundSize: 'cover',
//             backgroundPosition: 'center',
//           }}
//         />
//         <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
//           <Box
//             sx={{
//               my: 8,
//               mx: 4,
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//             }}
//           >
//             <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
//               <LockOutlinedIcon />
//             </Avatar>
//             <Typography component="h1" variant="h5">
//               Sign in
//             </Typography>
//             <FormControl>
//             <Box component="form" sx={{ mt: 1 }}>
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 id="email"
//                 label="Email Address"
//                 name="email"
//                 autoComplete="email"
//                 autoFocus
//                 onChange={getdata}
//                 //onChange={(e) => { this.setState({ email: e.target.value }) }}
//               />
//               <TextField
//                 margin="normal"
//                 required
//                 fullWidth
//                 name="password"
//                 label="Password"
//                 type="password"
//                 id="password"
//                 autoComplete="current-password"
//                 onChange={getdata}
//                 //onChange={(e) => { this.setState({ password: e.target.value }) }}
//               />
//               <FormControlLabel
//                 control={<Checkbox value="remember" color="primary" />}
//                 label="Remember me"
//               />
//               <Button
//                 type="submit"
//                 fullWidth
//                 variant="contained"
//                 sx={{ mt: 3, mb: 2 }}
//                 //onClick={addData}
//                 // onClick={() => login(this.state)}
//               >
//                 Sign In
//               </Button>
              
//               <Grid container>
//                 <Grid item xs>
//                   <Link href="#" variant="body2">
//                     Forgot password?
//                   </Link>
//                 </Grid>
//                 <Grid item>
//                   <p className='mt-3'>Don't have an account? <span><NavLink to="/signup">Sign Up</NavLink></span></p>
//                 </Grid>
//               </Grid>
//             </Box>
//             </FormControl>
//           </Box>
//         </Grid>
//       </Grid>
//     </ThemeProvider>
//   )
// }
// export default Login



