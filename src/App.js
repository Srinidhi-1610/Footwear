// App.js
import React from 'react';
import Header from './component/Header';
import Footer from './component/Footer';
import Index from './pages/Index';
import Women from './pages/Women';
import Men from './pages/Men';
import Kids from './pages/Kids';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Forget from './pages/Forget';
import Profile from './pages/Profile';
import Cartpage from './pages/Cartpage';
import HomePage from './pages/HomePage';
import CategorySection from './component/CategorySection';
import HeroSection from './component/Herosection';
import Navbar from './component/Navbar';
import OrderSummary from './pages/Order';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route path="/women" element={<Women />} />
          <Route path="/men" element={<Men />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cartpage/>} />
          <Route path="/Home" element={<HomePage/>} />
          <Route path="/Category" element={<CategorySection/>} />
          <Route path="/Hero" element={<HeroSection/>} />
          <Route path ="/Navbar" element={<Navbar/>} />
          <Route path ="/Order" element={<OrderSummary/>} />

        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
