import React from 'react'
import { useState } from 'react';
import { Main } from './Main';
import { useEffect } from 'react';
import  Unauthorized  from './Unauthorized';


export const Content = (props, {mode,setMode}) => {


  const[logindata,setLogindata] = useState([]);
    const calllogin = () => {
    var authtoken = localStorage.getItem("authtoken");
    if(authtoken && authtoken.length){
      setLogindata(authtoken);
    }
  }
    useEffect(() => {
      calllogin();
    },[])
    
  return (
    <>
    {
      logindata.length === 0 ?<Unauthorized/>:
      <>
      <Main setMode={setMode} mode={mode}/>
      </>
    }
    </>
  )
}
