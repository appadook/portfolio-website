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
    <nav className="fixed top-0 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50 border-b">
      <div className="container flex h-16 items-center mx-auto">
        <Link href="#" className="font-bold text-lg text-primary">
          Website Portfolio
        </Link>
        <div className="ml-auto flex gap-1">
          {menuItems.map((item) => (
            <button
              key={item}
              onClick={() => handleScroll(item)}
              className="px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground rounded-md"
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
