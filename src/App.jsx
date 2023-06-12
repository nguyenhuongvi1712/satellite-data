import "./App.css"
//MUI
import { Box, CssBaseline } from "@mui/material"
import { BrowserRouter, Route, Routes } from "react-router-dom"
// components
import Header from "./components/layout/Header"
import CartPage from "./pages/CartPage"

import MapPage from "./pages/MapPage"
function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MapPage />}></Route>
          <Route path="/cart" element={<CartPage />}></Route>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

export default App;
