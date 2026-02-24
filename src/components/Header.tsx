"use client";
import { useState } from "react";
import { Menu, X, MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/collections", label: "Collections" },
    { href: "/factory-video", label: "Factory Video" },
    { href: "/custom-manufacturing", label: "Custom Manufacturing" },
    { href: "/about", label: "About Us" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-sm">
      {/* Combined Navbar for Mobile */}
      <div className="border-b border-border">
        <div className="container-main">
          {/* Mobile: stacked logo, WhatsApp, nav links */}
              <div className="flex md:hidden items-center justify-between h-20 relative">
            {/* Hamburger on left */}
            <button
              className="p-2 flex items-center justify-center md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            {/* Logo centered absolutely */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <Link href="/" className="flex flex-col items-center gap-2">
                <div className="flex items-center justify-center py-2 overflow-hidden h-[80px]">
                  <img src="/assets/icons/KAYS LOGO.svg" alt="Company Logo" className="max-h-full w-auto object-contain" />
                </div>
              </Link>
            </div>
            {/* WhatsApp icon on right */}
            <a
              href="https://wa.me/918239279999"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
              aria-label="Contact on WhatsApp"
            >
              <img src="/assets/icons/whatsapp-icon.svg" alt="WhatsApp" className="w-8 h-8" />
            </a>
            {/* Mobile Dropdown */}
            {isMenuOpen && (
              <div className="absolute top-full left-0 w-full bg-foreground border-b border-border shadow-md z-50 animate-fade-in">
                <ul className="flex flex-col items-center gap-2 py-4">
                  {navLinks.map((link) => (
                    <li key={link.href} className="w-full">
                      <Link
                        href={link.href}
                        className={`block text-base font-medium w-full text-center ${
                          isActive(link.href)
                            ? "text-primary"
                            : "text-muted-foreground hover:text-primary"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
          {/* Desktop: original layout */}
          <div className="hidden md:flex items-center justify-center h-20 relative">
            <Link href="/" className="flex flex-col items-center gap-2 mx-auto">
              <div className="w-24 h-24 flex items-center justify-center overflow-hidden aspect-square py-4">
                <img src="/assets/icons/KAYS LOGO.svg" alt="Company Logo" className="w-20 h-20 object-contain" />
              </div>
            </Link>
            {/* WhatsApp icon removed */}
          </div>
        </div>
      </div>

      {/* Lower Navbar - Navigation (Desktop only) */}
      <div className="border-b border-border bg-primary/30 hidden md:block">
        <div className="container-main">
          <nav className="flex items-center justify-between h-12">
            {/* Desktop Navigation */}
            <ul className="flex items-center gap-8 w-full justify-center">
              {navLinks.map((link, idx) => (
                <li key={link.href} className={idx !== 0 ? 'pl-8 border-l border-border' : ''}>
                  <Link
                    href={link.href}
                    className={`text-sm uppercase tracking-wider font-medium transition-colors duration-200 link-underline ${
                      isActive(link.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
