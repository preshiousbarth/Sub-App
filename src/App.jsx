import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import { useState } from "react";
import CreateAcount from "../src/Pages/Create";
import Services from "../src/innerPage/Services";
import SubPlans from "../src/innerPage/SubPlans";
import Login from "../src/Pages/Login";
import Blog from "./Pages/Blog";
import { signOut } from "firebase/auth";

import { auth } from "./Firebase/Firebase.config";
import { ToastContainer } from "react-toastify";
import "react-toastify/ReactToastify.css";

import Pricing from "./Pages/Pricing";

const App = () => {
  const [isAuth, setIsAuth] = useState(localStorage.getItem("isAuth"));

  const GoogleSignout = () => {
    signOut(auth).then(() => {
      localStorage.clear();
      setIsAuth(false);
      window.location.pathname = "/login";
    });
  };

  // Sample data (You might want to replace it with actual data from a state or API)
  const purchasesData = [
    { username: "John Doe", age: 25, location: "USA", plan: "Premium" },
    { username: "Jane Smith", age: 30, location: "UK", plan: "Enterprise" },
  ];

  return (
    <>
      <ToastContainer position="top-right" theme="colored" />

      <Navbar GoogleSignout={GoogleSignout} isAuth={isAuth} />
      <Routes>
        <Route path="/" element={<Home isAuth={isAuth} />} />
        <Route path="/features" element={<Services isAuth={isAuth} />} />
        <Route path="/pricing" element={<SubPlans isAuth={isAuth} />} />
        <Route path="/login" element={<Login setIsAuth={setIsAuth} />} />
        <Route path="/create" element={<CreateAcount setIsAuth={setIsAuth} />} />
        <Route path="/product" element={<Pricing isAuth={isAuth} />} />
        {/* Pass purchasesData to Blog as a prop */}
        <Route path="/blog" element={<Blog purchases={purchasesData} />} />
      </Routes>
    </>
  );
};

export default App;
