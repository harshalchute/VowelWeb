import { useEffect } from 'react';
import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";

import { ProtectedRoute } from "./helpers/ProtectedRoute";

import HomePage from "./containers/Home";
import ProfilePage from "./containers/Profile";

import LoginPage from "./containers/Auth/Login";
import SignUpPage from "./containers/Auth/Register";
import VerifyMailPage from "./containers/Auth/VerifyMail";

import { test } from "./services";

const App = () => {

  const user = localStorage.getItem("user");

  useEffect(() => {
    // test();
  }, []);


  return (<Routes>
    <Route path="/" element={user ? <HomePage /> : <LoginPage />} />
    <Route path="/register" element={!user ? <SignUpPage /> : <Navigate to="/" />} />
    <Route path="/verify-email" element={!user ? <VerifyMailPage /> : <Navigate to="/" />} />
    {/* <Route
      path="/profile"
      element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } 
    /> */}
  </Routes>)
}

export default App;
