import { useState } from "react";
import logo  from "../assets/logo.svg";
import menu from "../assets/menu.svg";
import close from "../assets/close.svg";
import { AnimatePresence, motion, useAnimation } from "framer-motion";
import { sideVariants, itemVariants } from '../utils/motion'
import { Link } from "react-router-dom";
function Navbar({ GoogleSignout, isAuth }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const controls = useAnimation();

  const handleHover = () => {
    controls.start({ x: [0, -5, 5, -5, 0], transition: { duration: 0.7 } });
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <img src={logo} alt="Logo for page" className="h-8 w-auto" />
            </div>

            <div className="hidden md:flex items-center space-x-12">
              <Link to={'/'} className="text-gray-700 hover:text-gray-900">Home</Link>
              <button className="text-gray-700 hover:text-gray-900">Features</button>
              <Link to={'/pricing'} className="text-gray-700 hover:text-gray-900">Pricing</Link>
              <Link to={'/blog'} className="text-gray-700 hover:text-gray-900">Blog</Link>
            </div>

            <div className="hidden md:flex items-center">
              {!isAuth ? (
                <Link to={'/login'}>
                  <motion.button
                    onHoverStart={handleHover}
                    onHoverEnd={() => controls.start({ x: 0 })}
                    animate={controls}
                    className="inline-flex items-center px-6 py-2.5 bg-[#1849C6] hover:bg-blue-700 text-white font-medium rounded-xl transition-colors"
                  >
                    Login
                  </motion.button>
                </Link>
              ) : (
                <button 
                  onClick={GoogleSignout}
                  className="inline-flex items-center px-6 py-2.5 bg-[#ff6943] hover:bg-[#ff5a2e] text-white font-medium rounded-xl transition-colors"
                >
                  Sign out
                </button>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={handleMobileMenuToggle}
                className="inline-flex items-center justify-center p-2"
              >
                {isMobileMenuOpen ? (
                  <img src={close} alt="Close" className="h-6 w-6" />
                ) : (
                  <img src={menu} alt="Menu" className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 }
            }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <motion.div
              initial="closed"
              animate="open"
              exit="closed"
              variants={sideVariants}
              className="fixed right-0 top-16 w-64 bg-[#5454D4] rounded-l-2xl shadow-lg p-6"
            >
              <div className="flex flex-col space-y-4">
                <motion.li variants={itemVariants} className="text-white text-left"><Link to={'/'}>Home</Link></motion.li>
                <motion.li variants={itemVariants} className="text-white text-left">Features</motion.li>
                <motion.li variants={itemVariants} className="text-white text-left"><Link to={'pricing'}>Pricing</Link></motion.li>
                <motion.li variants={itemVariants} className="text-white text-left"><Link to={'blog'}>Blog</Link></motion.li>
                <Link to={'/login'}>
                  <motion.button
                    variants={itemVariants}
                    className="w-full py-2 bg-[#FF7143] text-white rounded-xl text-sm mt-4"
                  >
                    LOGIN
                  </motion.button>
                </Link>
                
              </div>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;