import { useState } from "react";
import picture from "../assets/istockphoto-2043823329-1024x1024.jpg";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { auth } from "../Firebase/Firebase.config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import GoogleBtn from "./GoogleBtn";
import { toast } from "react-toastify";

const initialState = {
  email: "",
  password: "",
};

const Login = ({ setIsAuth }) => {
  const [formData, setFormData] = useState(initialState);
  const { email, password } = formData;

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();

      if (!email || !password) {
          toast.error("Please, fill in all input fields");
          return;
      }

      try {
          const { user } = await signInWithEmailAndPassword(auth, email, password);
          localStorage.setItem("isAuth", true);
          toast.success("Log in successfully!");
          setIsAuth(true);
          navigate("/");
      } catch (error) {
          toast.error("Invalid credentials");
          console.error(error);
      }
  };

  const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
  };

  return (
      <div className="w-full min-h-screen flex flex-col md:flex-row items-start">
      
          {/* Image Section */}
          <div className="relative w-full md:w-1/2 h-64 md:h-full flex flex-col">
              <img src={picture} className="w-full h-full object-cover" alt="Login" />
          </div>

          {/* Form Section */}
          <motion.div
              className="w-full md:w-1/2 h-auto flex flex-col p-8 md:p-12 justify-between"
              variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 75 },
              }}
              initial="hidden"
              animate="visible"
              transition={{ duration: 0.5, delay: 0.25 }}
          >
              <div className="w-full flex flex-col">
                  <div className="w-full flex flex-col mb-2">
                      <h3 className="text-xl md:text-4xl font-semibold mb-2">Login</h3>
                      <p className="text-sm md:text-base mb-2">
                          Welcome back, Great to see you again!
                      </p>
                  </div>

                  {/* Login Form */}
                  <form onSubmit={handleSubmit}>
                      <div className="relative flex items-center mb-4">
                          <input
                              type="email"
                              name="email"
                              placeholder="Email"
                              className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                              value={email}
                              onChange={handleChange}
                          />
                      </div>

                      <div className="relative flex items-center mb-4">
                          <input
                              type="password"
                              name="password"
                              placeholder="Password"
                              className="w-full text-white py-2 md:py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                              value={password}
                              onChange={handleChange}
                          />
                      </div>

                      <div className="w-full flex flex-col my-4">
                          <button className="w-full text-white bg-gradient-to-r from-blue-600 to-blue-900 rounded-md py-3 md:py-4 text-center flex items-center justify-center">
                              Login
                          </button>
                      </div>
                  </form>
              </div>

              {/* Google Login Button */}
              <GoogleBtn setIsAuth={setIsAuth} />

              {/* Sign-up Link */}
              <div className="w-full flex items-center justify-center mt-4">
                  <p className="text-xs md:text-sm font-normal text-white">
                      Don't have an account?{" "}
                      <Link
                          to="/create"
                          className="font-semibold underline underline-offset-2 cursor-pointer"
                      >
                          Click here
                      </Link>
                  </p>
              </div>
          </motion.div>
      </div>
  );
};

export default Login;
