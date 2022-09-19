import { Box } from '@mui/material'
import Posts from '../Posts'
import { useEffect, useState} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import {styled} from '@mui/material';
import React from 'react'

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0');
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

const Profilefeed = (props) => { 
    //console.log(props.id);


const UserBox = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "100px",
  alignItems: "center",
  justifyContent: "center",
  marginTop: "20px",
}));

var [users, setUsers] = useState([]);

useEffect(() => {
  window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
}, [props.id]);

useEffect(() => {
  fetch('https://winbookbackend.d3m0n1k.engineer/user/'+props.id+'/',{
    method: 'GET',
    headers: {
      "Accept": "application/json",
      "Authorization": "Token " + localStorage.getItem('authtoken')
    },
  }).then((response) => {
    if(response.status >= 200 && response.status < 300){
      response.json().then((data) => {
        //console.log(data.posts);
        setUsers(data.posts);
      })
    }
  })
}, [props.id]);



if (users.length===0) return <UserBox><CircularProgress /></UserBox>;

 return (
  <Box flex={3} p={2}>
    {
      users.map((post) => {
        return <Posts ob={post} />
      })
    }
</Box>
  );
}

export default Profilefeed;