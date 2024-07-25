import logo from "@/assets/ncnl.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mood-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Me" },
    { href: "/projects", label: "Projects" },
    { href: "/skills", label: "Skills" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  const getLinkClasses = (href: string) => {
    const baseClasses =
      "text-foreground hover:text-primary transition-colors relative";
    const activeClasses =
      "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary";
    return `${baseClasses} ${location.pathname === href ? activeClasses : ""}`;
  };

  return (
    <header className="flex justify-between items-center p-4 bg-background">
      <div className="flex items-center space-x-4 md:space-x-8">
        <Link to="/" className="flex items-center space-x-2">
          <Avatar className="h-12 w-12">
            <AvatarImage src={logo} alt="NCNL Logo" />
            <AvatarFallback>NCNL</AvatarFallback>
          </Avatar>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-[1.2rem] w-[1.2rem]" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={getLinkClasses(link.href)}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden md:flex space-x-6 items-center">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={getLinkClasses(link.href)}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center space-x-4">
        {location.pathname !== "/" && (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
            asChild
          >
            <a href="/Tirdesh-Resume.pdf" download>
              Download CV
            </a>
          </Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
