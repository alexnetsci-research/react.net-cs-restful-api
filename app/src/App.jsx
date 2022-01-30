import React from 'react';
import { Routes, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Home from './pages/Home';
import Customers from './pages/Customers/Customers';
import AddCustomer from './pages/Customers/AddCustomer';
import EditCustomer from './pages/Customers/EditCustomer';

import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5157/api/';

const App = () => {
  return (
    <div className='App'>
      <NavigationBar />

      <div className='py-5'>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/customers' element={<Customers />} />
          <Route path='/add-customer' element={<AddCustomer />} />
          <Route path='/edit-customer/:id' element={<EditCustomer />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;