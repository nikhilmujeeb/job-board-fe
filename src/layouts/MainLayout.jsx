import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = ({ children }) => (
  <div className="layout">
    <Navbar />
    <main className="content">{children}</main>
    <Footer />
  </div>
);

export default MainLayout;
