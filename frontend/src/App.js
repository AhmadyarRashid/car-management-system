// NPM Dependencies
import React from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";

// App Dependencies
import Signup from "./pages/signup/signup";
import SignIn from "./pages/signin/signin";
import CarsPage from "./pages/cars/cars";
import CategoryPage from "./pages/category/category";

const theme = createTheme();

function App () {
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
