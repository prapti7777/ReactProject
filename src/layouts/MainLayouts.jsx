import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/component/UI/Navbar';
import Footer from '@/component/UI/Footer';

const MainLayouts = () => {
  const { pathname } = useLocation();

  // Pages where we hide both navbar and footer
  const hideOn = [
    '/login',
    '/register',
  ];
  const isChefDashboard = pathname.startsWith('/chef-dashboard');

  const showHeaderFooter = 
    !hideOn.includes(pathname) &&
    !isChefDashboard;

  return (
    <>
      {showHeaderFooter && <Navbar />}

      <main className={`min-h-[calc(100vh-4rem)] ${showHeaderFooter ? 'pt-20' : ''}`}>
        <Outlet />
      </main>

      {showHeaderFooter && <Footer />}
    </>
  );
};

export default MainLayouts;
