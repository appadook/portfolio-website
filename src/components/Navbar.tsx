// components/Navbar.tsx
import Link from "next/link";

const Navbar = () => {
  const menuItems = ["About", "Projects", "Languages", "Technologies", "Contact"];

  const handleScroll = (id: string) => {
    const section = document.getElementById(id.toLowerCase());
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-gray-800/30 backdrop-blur-md z-50 border-b border-gray-700/50">
      <div className="container flex h-16 items-center mx-auto">
        <Link href="#" className="font-bold text-lg text-white hover:text-indigo-400 transition-colors">
          Website Portfolio
        </Link>
        <div className="ml-auto flex gap-1">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item)}
              className="px-4 py-2 text-sm font-medium text-white transition-all duration-200 
                hover:bg-indigo-500/20 hover:text-indigo-200 rounded-md"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
