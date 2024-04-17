import React, { useEffect } from 'react';
import Contactm from './componet/contactm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './componet/LoginPage/login';
import User from './pages/user';
import axios from 'axios';
import Autocmp from './componet/autocom';
import Analytics from './pages/analysis';
import Charts from './componet/Chart';
import DataCountry from './pages/datacountry';
import ContactDetails from './componet/contactform';
import SignUp from './componet/Signup/Signup';
import WorkingHours from './pages/workingHours';
import Reactdatatablepage from "./pages/reactdatatablepage"
import PrivateRoutes from './componet/Protected';
import setAuthToken from './componet/Auth';
function App() {

  useEffect(() => {
    // Check if token exists in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      // If token exists, set it as the default Authorization header
      setAuthToken(token);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>

          <Route element={<PrivateRoutes />}>
            <Route path='/home' element={<Charts />} />
            <Route path='/contact' element={<Contactm />} />
            {/* <Route path='/dummy1' element={<Dummy1 />} />
          <Route path='/dummy2' element={<Dummy2 />} /> */}
            {/* <Route path='/' element={<Login />} /> */}
            <Route path='/user' element={<User />} />
            <Route path='/auto' element={<Autocmp />} />
            <Route path='/analytics' element={<Analytics />} />
            <Route path='/datacountry' element={<DataCountry />} />
            <Route path='/contactdetails' element={<ContactDetails />} />
            <Route path='/workdetails' element={<WorkingHours />} />
            <Route path='/sign-up' element={<SignUp />} />
            {/* <Route path='/data' element={<Dataa />} /> */}
            <Route path='/table' element={<Reactdatatablepage />} />
          </Route>
          <Route path='/' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;


