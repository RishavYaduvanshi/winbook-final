import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AlertContainer} from 'react-custom-alert';
import 'react-custom-alert/dist/index.css'; 
import {
  BrowserRouter as Router,
} from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));
if(localStorage.getItem('theme') === null){
  localStorage.setItem("theme","light");
}

root.render(
  <Router>
    <App />
    <AlertContainer floatingTime={3000} />
  </Router>

);
