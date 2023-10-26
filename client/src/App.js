import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./scenes/home/Home";
import ItemDetails from "./scenes/itemDetails/ItemDetails";
import Checkout from "./scenes/checkout/Checkout";
import Confirmation from "./scenes/checkout/Confirmation";
import Navbar from "./scenes/global/Navbar";
import CartMenu from "./scenes/global/CartMenu";
import Footer from "./scenes/global/Footer";
import { ThemeProvider } from "@emotion/react";
import { Box, createTheme } from "@mui/material";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(
    function () {
      window.scrollTo(0, 0);
    },
    [pathname]
  );
  return null;
};

const App = () => {
  const [mode, setMode] = useState("light");

  const darkTheme = createTheme({
    palette: {
      mode: mode,
    },
  });

  return (
    <div className="app">
      <ThemeProvider theme={darkTheme}>
        <Box bgcolor={"background.default"} color={"text.secondary"}>
          <BrowserRouter>
            <Navbar mode={mode} setMode={setMode} />
            <ScrollToTop />
            <Routes>
              <Route
                path="/"
                element={<Home mode={mode} setMode={setMode} />}
              />
              <Route path="item/:itemId" element={<ItemDetails />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/success" element={<Confirmation />} />
            </Routes>
            <CartMenu mode={mode} setMode={setMode} />
            <Footer />
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </div>
  );
};

export default App;
