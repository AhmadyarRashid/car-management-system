// NPM Dependencies
import React, {useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import axios from 'axios';

// App Dependencies
import Signup from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import CarsPage from "./pages/cars/cars";
import CategoryPage from "./pages/category/category";
import constant from "./utils/constant";

const theme = createTheme();

function App () {

  const token = localStorage.getItem('token');
  if (!!token){
    axios.defaults.headers.common['Authorization'] = `${constant.tokenHeader} ${token}`;
  }

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<CarsPage />} />
          <Route path="/category" element={<CategoryPage />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
