import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '@/component/UI/Navbar';
import Container from '@/component/UI/Container';
import Footer from '@/component/UI/Footer';  // ← Import the new Footer

const MainLayouts = () => {
  return (
    <>
      <Navbar />

      <main className="pt-24 pb-10 min-h-screen bg-gray-50">
        <Container>
          <Outlet />
        </Container>
      </main>

      <Footer />  {/* ← Render Footer here */}
    </>
  );
};

export default MainLayouts;
