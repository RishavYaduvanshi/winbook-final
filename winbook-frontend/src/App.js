import SignUp from "./componrnts/SignUp";
import Login from "./componrnts/Login";
import { Content } from "./componrnts/Content";
import { Profilr } from "./componrnts/Profile/Profilr";
import Forgot from "./componrnts/Forgot";
import NotFound from "./componrnts/NotFound";
import {  useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material";
import {
  Routes,
  Route,
} from "react-router-dom";


function App() {
  const [mode, setMode] = useState(localStorage.getItem("theme"));
  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });



  var routes = (
    <ThemeProvider theme={darkTheme}>
      <Routes>
        <Route  path='/:val' element={<Profilr setMode={setMode} mode={mode} />} />
        <Route path="/profile" element={<Profilr setMode={setMode} mode={mode} />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<Login setMode={setMode} mode={mode} />} />
        <Route path="/forgot" element={<Forgot setMode={setMode} mode={mode} />} />
        <Route path="/signup" element={<SignUp setMode={setMode} mode={mode} />} />
        <Route path="/home" element={<Content setMode={setMode} mode={mode} />} />

      </Routes>
    </ThemeProvider>
  );
  //console.log(routes);
  return routes;
}

export default App;
