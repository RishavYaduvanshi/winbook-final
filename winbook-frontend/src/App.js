import SignUp from "./componrnts/SignUp";
import Login from "./componrnts/Login";
import { Content } from "./componrnts/Content";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";


function App() {
  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/home" element={<Content />} />
  </Routes>
  );
}

export default App;
