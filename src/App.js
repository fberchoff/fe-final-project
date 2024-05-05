import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { AppNavbar } from './components/navbar';
import { Footer } from './components/footer';
import { Home } from './components/home';
import { Projects } from './components/projects';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginForm from './components/login-form';

export default function App() {
  return (
    <>
    <BrowserRouter>
      <AppNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />}  />
        <Route path="/login" element={<LoginForm />}  /> 
      </Routes>
      <Footer />
    </BrowserRouter>
    </>
  );
}
