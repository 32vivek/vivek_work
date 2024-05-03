import React from 'react';
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import ContactForm from './pages/contactm';
import DataCountry from './pages/countrydata';
import WorkingHours from './pages/workinghourspage';
import User from './pages/userform';
import UserDetails from './pages/logindetails';
import Login from './components/LoginPage/login';
import PrivateRoutes from './components/Protected';
import TokenRefresh from './components/refreshToken';
export default function App() {
  return (
    <>
      <BrowserRouter>
        <TokenRefresh >
          <Routes>
            {/* <Route element={<PrivateRoutes />}> */}
            <Route path="/home" exact element={<Home />} />
            <Route path="/contact" exact element={<ContactForm />} />
            <Route path="/datacountry" exact element={<DataCountry />} />
            <Route path="/workinghours" exact element={<WorkingHours />} />
            <Route path="/userform" exact element={<User />} />
            <Route path="/logindetails" exact element={<UserDetails />} />
            {/* </Route> */}
            <Route path="/" exact element={<Login />} />
          </Routes>
        </TokenRefresh>
      </BrowserRouter>
    </>
  )
}
