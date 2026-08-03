import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useState, useEffect } from "react";
import { usePortfolioData } from "@/context/PortfolioDataContext";

const navItems = [
  { name: "Home", path: "/", sectionId: "hero" },
  { name: "About", path: "/about", sectionId: "about" },
  { name: "Skills", path: "/skills", sectionId: "skills" },
  { name: "Projects", path: "/projects", sectionId: "projects" },
  { name: "Certificates", path: "/certificates", sectionId: "certificates" },
  { name: "Profiles", path: "/profiles", sectionId: "profiles" },
  { name: "Social", path: "/social", sectionId: "social" },
  { name: "Contact", path: "/contact", sectionId: "contact" },
];

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const location = useLocation();
  const navigate = useNavigate();
  const { profile } = usePortfolioData();

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.sectionId);
    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observerOptions: IntersectionObserverInit = {
      root: document.querySelector(".snap-container") || null,
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  const handleNavClick = (item: (typeof navItems)[0], e: React.MouseEvent) => {
    const element = document.getElementById(item.sectionId);
    if (element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(item.sectionId);
      window.history.pushState({}, "", item.path);
    } else {
      navigate(item.path);
    }
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/50"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl font-bold gradient-text cursor-pointer uppercase"
            onClick={(e) => handleNavClick(navItems[0], e as any)}
          >
            {profile.name || "RAJAPANDI P"}
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-7">
            {navItems.map((item, index) => {
              const isActive = activeSection === item.sectionId;
              return (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <a
                    href={item.path}
                    onClick={(e) => handleNavClick(item, e)}
                    className={`text-sm font-medium transition-all duration-300 hover:text-primary ${
                      isActive ? "text-primary font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {item.name}
                  </a>
                </motion.div>
              );
            })}

            {/* Discreet Admin CMS Link */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              onClick={() => navigate("/admin")}
              title="Admin CMS Login"
              className="p-2 rounded-full text-slate-400 hover:text-primary hover:bg-primary/10 transition-colors"
            >
              <ShieldCheck className="w-4 h-4" />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => navigate("/admin")}
              className="p-1.5 text-slate-400 hover:text-primary"
              title="Admin Login"
            >
              <ShieldCheck className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-1"
          >
            {navItems.map((item) => {
              const isActive = activeSection === item.sectionId;
              return (
                <a
                  key={item.path}
                  href={item.path}
                  onClick={(e) => handleNavClick(item, e)}
                  className={`block py-2 text-sm font-medium transition-all duration-300 hover:text-primary ${
                    isActive ? "text-primary font-semibold" : "text-muted-foreground"
                  }`}
                >
                  {item.name}
                </a>
              );
            })}
            <a
              href="/admin/login"
              onClick={(e) => {
                e.preventDefault();
                navigate("/admin/login");
                setIsOpen(false);
              }}
              className="block py-2 text-sm font-semibold text-primary"
            >
              🔐 Admin Dashboard
            </a>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
