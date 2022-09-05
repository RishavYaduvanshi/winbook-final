import SignUp from "./componrnts/SignUp";
import Login from "./componrnts/Login";
import { Content } from "./componrnts/Content";
import { Profilr } from "./componrnts/Profile/Profilr";
import Forgot from "./componrnts/Forgot";
import NotFound from "./componrnts/NotFound";
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  return (
    <Routes>
      <Route path="/profile" element={<Profilr />} />
      <Route path="*" element={<NotFound />} />
      <Route path="/" element={<Login />} />
      <Route path="/forgot" element={<Forgot />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Content />} />
    </Routes>
  );
}

export default App;
