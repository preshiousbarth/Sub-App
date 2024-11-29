import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import picture from "../assets/DALL·E 2024-11-29 11.07.19 - A looping GIF showing a dark-themed, futuristic user interface for a sign-up page. The animation includes glowing neon blue and purple lights, floatin.webp";
import { auth } from "../Firebase/Firebase.config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import GoogleBtn from "./GoogleBtn";
import { useState } from "react";

const initialState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);

  const { username, email, password, confirmPassword } = formData;

  let navigate = useNavigate();

  const validateForm = () => {
    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please, fill in all input fields.");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(user, { displayName: username });
      toast.success("Signup successful");
      localStorage.setItem("isAuth", true);
      setIsAuth(true);
      setFormData(initialState);
      navigate("/");
    } catch (error) {
      console.error(error);
      switch (error.code) {
        case "auth/email-already-in-use":
          toast.error("This email is already registered. Please use a different email.");
          break;
        case "auth/invalid-email":
          toast.error("Invalid email format. Please enter a valid email address.");
          break;
        case "auth/weak-password":
          toast.error("Weak password. Password must be at least 6 characters long.");
          break;
        default:
          toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  return (
    <div className="signupPage min-h-screen flex flex-col md:flex-row items-center bg-dark-bg text-dark-text">
      {/* Left Side - Image */}
      <div className="w-full md:w-1/2 h-64 md:h-auto">
        <img
          src={picture}
          className="w-full h-full object-cover"
          alt="Signup"
        />
      </div>

      {/* Right Side - Form */}
      <motion.div
        className="w-full md:w-1/2 px-6 py-8 md:px-12 lg:px-20 flex flex-col justify-center"
        variants={{
          visible: { opacity: 1, y: 0 },
          hidden: { opacity: 0, y: 75 },
        }}
        initial="hidden"
        animate="visible"
        transition={{ duration: 0.5, delay: 0.25 }}
      >
        <h3 className="text-2xl lg:text-4xl font-semibold mb-4">Signup</h3>
        <p className="text-sm lg:text-base mb-6 text-dark-text">
          Welcome to our online family! Enter your credentials to get started.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="username"
            placeholder="Username"
            className="w-full p-3 border-b border-gray-400 focus:outline-none bg-dark-bg text-dark-text"
            value={username}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 border-b border-gray-400 focus:outline-none bg-dark-bg text-dark-text"
            value={email}
            onChange={handleChange}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 border-b border-gray-400 focus:outline-none bg-dark-bg text-dark-text"
            value={password}
            onChange={handleChange}
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            className="w-full p-3 border-b border-gray-400 focus:outline-none bg-dark-bg text-dark-text"
            value={confirmPassword}
            onChange={handleChange}
          />

          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-primary-light to-primary-dark text-white rounded-md"
          >
            Signup
          </button>
        </form>

        <GoogleBtn setIsAuth={setIsAuth} />

        <p className="text-center mt-6 text-sm text-dark-text">
          Have an account?{" "}
          <Link to="/login" className="text-primary-light underline">
            Click here
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
