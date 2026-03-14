import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Teams", path: "/teams" },
  { label: "Blog", path: "/blog" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: isScrolled
          ? "rgba(13, 17, 23, 0.95)"
          : "transparent",
        borderBottom: isScrolled
          ? "1px solid var(--color-border)"
          : "1px solid transparent",
        backdropFilter: isScrolled ? "blur(12px)" : "none",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="font-montserrat font-black tracking-[-0.03em] text-xl">
              Grivi<span style={{ color: "var(--color-accent)" }}>Labs.</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className="font-inter font-bold text-sm transition-colors duration-200 relative group"
                  style={{
                    color: isActive
                      ? "var(--color-accent)"
                      : "var(--color-text-secondary)",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color =
                        "var(--color-text-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive)
                      e.currentTarget.style.color =
                        "var(--color-text-secondary)";
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute -bottom-1 left-0 right-0 h-px"
                      style={{ backgroundColor: "var(--color-accent)" }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <button
                className="font-montserrat font-bold uppercase tracking-widest text-xs px-6 py-2.5 rounded transition-all duration-200"
                style={{
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-accent)";
                  e.currentTarget.style.color = "#0d1117";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "transparent";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
              >
                Login
              </button>
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "var(--color-text-primary)",
                transform: isMobileOpen
                  ? "translateY(4px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "var(--color-text-primary)",
                opacity: isMobileOpen ? 0 : 1,
              }}
            />
            <span
              className="block w-6 h-px transition-all duration-300"
              style={{
                backgroundColor: "var(--color-text-primary)",
                transform: isMobileOpen
                  ? "translateY(-4px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className="lg:hidden overflow-hidden transition-all duration-300"
        style={{
          maxHeight: isMobileOpen ? "400px" : "0",
          backgroundColor: "var(--color-bg-secondary)",
          borderTop: isMobileOpen
            ? "1px solid var(--color-border)"
            : "none",
        }}
      >
        <nav className="px-6 py-4 flex flex-col gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="font-inter font-bold text-sm py-3 border-b transition-colors duration-200"
                style={{
                  borderColor: "var(--color-border-muted)",
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-secondary)",
                }}
              >
                {link.label}
              </Link>
            );
          })}
          <Link to="/login" className="mt-4">
            <button
              className="w-full font-montserrat font-bold uppercase tracking-widest text-xs py-3 rounded transition-all duration-200"
              style={{
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
                backgroundColor: "var(--color-accent-muted)",
              }}
            >
              Login
            </button>
          </Link>
        </nav>
      </div>
    </header>
  );
}