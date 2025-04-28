import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

// Layout
import MainLayouts from "@/layouts/MainLayouts";


// Pages
import HomePage from '@/pages/HomePage';
import Login from '@/pages/Login';
import ChefsList from '@/pages/ChefsList';
import ChefsProfile from '@/pages/ChefsProfile';
import Recipe from '@/pages/recipes';
import Contact from "@/pages/Contact"; 
import ChefDashboard from '@/pages/ChefDashboard';
import RecipeForm from '@/pages/Chef/RecipeForm';
import ChefProfileForm from '@/pages/ChefProfileForm';
import Register from '@/pages/Register';
import ChefLogout from '@/pages/ChefLogout';
import ForgotPassword from './pages/ForgotPassword';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="chefs" element={<ChefsList />} />
          <Route path="chefs/:id" element={<ChefsProfile />} />
          <Route path="recipes" element={<Recipe />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="chef-dashboard" element={<ChefDashboard />} />
          <Route path="add-recipe" element={<RecipeForm />} />
          <Route path="chef-dashboard/profile" element={<ChefProfileForm />} />
          <Route path="register" element={<Register/>} />
          <Route path="cheflogout" element={<ChefLogout/>} />
          <Route path="forgot-password" element={<ForgotPassword/>} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
