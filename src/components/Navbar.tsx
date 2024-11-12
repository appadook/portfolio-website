// components/Navbar.tsx
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";


const Navbar = () => {
  const { scrollY } = useScroll();
  const menuItems = ["About", "Projects", "Languages", "Technologies", "Contact"];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const handleScroll = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const navHeight = useTransform(
    scrollY,
    [0, 100],
    ["5rem", "4rem"]  // 128px -> 48px
  );

  const navPadding = useTransform(
    scrollY,
    [0, 100],
    ["2rem", "0.5rem"]  // 32px -> 8px
  );

  return (
    <motion.nav 
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      style={{
        height: navHeight,
        padding: navPadding,
      }}
      className="fixed top-0 w-full bg-gray-800/30 backdrop-blur-md z-50 border-b border-gray-700/50 transition-colors"
    >
      <div className="container flex h-full items-center mx-auto">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Link href="#" className="font-bold text-lg text-white hover:text-indigo-400 transition-colors">
            Website Portfolio
          </Link>
        </motion.div>
        <div className="ml-auto flex gap-1">
          {menuItems.map((item) => (
            <motion.button
              key={item}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleScroll(item)}
              className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 
                hover:bg-indigo-500/20 hover:text-indigo-200 rounded-md"
            >
              {item}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
