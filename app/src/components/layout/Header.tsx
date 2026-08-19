import logo from "@/assets/ncnl.jpeg";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mood-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Download, Menu } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();
  const navigate = useNavigate();
  const isManualNavigation = useRef(false);

  const navLinks = [
    { href: "/", label: "Home", sectionId: "home" },
    { href: "/about", label: "About Me", sectionId: "about" },
    { href: "/projects", label: "Projects", sectionId: "projects" },
    { href: "/skills", label: "Skills", sectionId: "skills" },
    { href: "/contact", label: "Contact", sectionId: "contact" },
  ];

  // Track which section is in view
  useEffect(() => {
    if (location.pathname !== "/") {
      // On other pages, use the pathname
      setActiveSection(location.pathname.slice(1));
      return;
    }

    // Section order on the page (top to bottom)
    const sectionOrder = ["home", "about", "projects", "skills", "contact"];
    const headerHeight = 60;

    const updateActiveSection = () => {
      // Don't update if we just manually navigated
      if (isManualNavigation.current) {
        return;
      }

      const scrollPosition = window.scrollY + headerHeight + 50; // Add offset for header
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Check if we're at the very top (home section)
      if (scrollPosition < 200) {
        setActiveSection("home");
        return;
      }

      // Check if we're near the bottom (contact section)
      if (scrollPosition + windowHeight >= documentHeight - 100) {
        setActiveSection("contact");
        return;
      }

      // Find which section is currently in view based on scroll position
      let activeSectionId = "home";
      
      for (let i = sectionOrder.length - 1; i >= 0; i--) {
        const sectionId = sectionOrder[i];
        const section = document.getElementById(sectionId);
        
        if (section) {
          const sectionTop = section.offsetTop;
          
          // If scroll position is past the start of this section, this is the active one
          if (scrollPosition >= sectionTop - 100) {
            activeSectionId = sectionId;
            break;
          }
        }
      }

      setActiveSection(activeSectionId);
    };

    // Initial check
    updateActiveSection();

    // Listen to scroll events
    const handleScroll = () => {
      updateActiveSection();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    // Also use IntersectionObserver as a backup
    const observerOptions = {
      root: null,
      rootMargin: `-${headerHeight + 20}px 0px -60% 0px`,
      threshold: [0, 0.1, 0.3, 0.5],
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      if (isManualNavigation.current) {
        return;
      }

      // Find sections that are intersecting
      const intersectingSections: { id: string; ratio: number; top: number }[] = [];
      
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const section = document.getElementById(sectionId);
          if (section) {
            intersectingSections.push({
              id: sectionId,
              ratio: entry.intersectionRatio,
              top: section.offsetTop,
            });
          }
        }
      });

      if (intersectingSections.length > 0) {
        // Sort by position (top to bottom) and take the one closest to the top
        intersectingSections.sort((a, b) => a.top - b.top);
        const scrollPos = window.scrollY + headerHeight;
        
        // Find the section that the scroll position is currently in
        for (const section of intersectingSections) {
          const sectionEl = document.getElementById(section.id);
          if (sectionEl && scrollPos >= sectionEl.offsetTop - 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // Observe all sections
    sectionOrder.forEach((sectionId) => {
      const section = document.getElementById(sectionId);
      if (section) {
        observer.observe(section);
      }
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      sectionOrder.forEach((sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          observer.unobserve(section);
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string, sectionId?: string) => {
    e.preventDefault();
    
    // Set flag to prevent observer from overriding
    isManualNavigation.current = true;
    
    if (href === "/") {
      // Navigate to home and scroll to top
      setActiveSection("home"); // Immediately update active section
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          // Re-enable observer after scroll completes
          setTimeout(() => {
            isManualNavigation.current = false;
          }, 1000);
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
        setTimeout(() => {
          isManualNavigation.current = false;
        }, 1000);
      }
      setIsOpen(false);
    } else if (location.pathname === "/" && sectionId) {
      // On home page, scroll to section with offset for header
      setActiveSection(sectionId); // Immediately update active section
      const section = document.getElementById(sectionId);
      if (section) {
        const headerHeight = 60; // Reduced header height
        const sectionTop = section.offsetTop - headerHeight;
        window.scrollTo({ top: sectionTop, behavior: "smooth" });
        // Re-enable observer after scroll completes
        setTimeout(() => {
          isManualNavigation.current = false;
        }, 1000);
        setIsOpen(false);
      }
    } else {
      // Navigate from other pages to home page sections
      if (sectionId) {
        navigate("/");
        // Set active section after navigation completes
        setTimeout(() => {
          setActiveSection(sectionId);
          const section = document.getElementById(sectionId);
          if (section) {
            const headerHeight = 60; // Reduced header height
            const sectionTop = section.offsetTop - headerHeight;
            window.scrollTo({ top: sectionTop, behavior: "smooth" });
            // Re-enable observer after scroll completes
            setTimeout(() => {
              isManualNavigation.current = false;
            }, 1000);
          }
        }, 150);
      } else {
        // Navigate to other pages normally
        setActiveSection(href.slice(1)); // Set active section based on pathname
        navigate(href);
        setTimeout(() => {
          isManualNavigation.current = false;
        }, 500);
      }
      setIsOpen(false);
    }
  };

  const getLinkClasses = (href: string, sectionId?: string) => {
    const baseClasses =
      "text-foreground hover:text-primary transition-colors relative cursor-pointer";
    const activeClasses =
      "text-primary font-semibold after:content-[''] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-[2px] after:bg-primary";
    
    let isActive = false;
    if (location.pathname !== "/") {
      // On other pages, check if pathname matches
      isActive = location.pathname === href;
    } else {
      // On home page, check active section
      if (href === "/") {
        isActive = activeSection === "home" || activeSection === "";
      } else if (sectionId) {
        isActive = activeSection === sectionId;
      }
    }
    
    return `${baseClasses} ${isActive ? activeClasses : ""}`;
  };

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-2 md:p-3 bg-background/95 backdrop-blur-sm border-b border-border/40 shadow-sm">
      <div className="flex items-center space-x-2 md:space-x-4 flex-shrink-0">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick(e, "/", "home");
          }}
        >
          <Avatar className="h-8 w-8 md:h-10 md:w-10">
            <AvatarImage src={logo} alt="NCNL Logo" />
            <AvatarFallback>NCNL</AvatarFallback>
          </Avatar>
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon" className="h-8 w-8" aria-label="Open navigation menu">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="flex flex-col space-y-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={getLinkClasses(link.href, link.sectionId)}
                  onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
                >
                  {link.label}
                </Link>
              ))}
              {/* Plain anchor, not <Link>: /blog is served by a Vercel rewrite,
                  not a React route, so react-router would match the "*" route
                  and redirect to home. */}
              <a
                href="/blog"
                className="text-foreground hover:text-primary transition-colors relative"
                onClick={() => setIsOpen(false)}
              >
                Writing
              </a>
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center text-sm flex-1 justify-center" aria-label="Main navigation">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            to={link.href}
            className={getLinkClasses(link.href, link.sectionId)}
            onClick={(e) => handleNavClick(e, link.href, link.sectionId)}
            aria-label={`Navigate to ${link.label}`}
          >
            {link.label}
          </Link>
        ))}
        {/* Plain anchor, not <Link>: /blog is served by a Vercel rewrite, not a
            React route, so react-router would match the "*" route and redirect
            to home. */}
        <a
          href="/blog"
          className="text-foreground hover:text-primary transition-colors relative"
          aria-label="Read my writing"
        >
          Writing
        </a>
      </nav>

      <div className="flex items-center space-x-2 md:space-x-3 flex-shrink-0 min-w-[80px] md:min-w-[120px] justify-end">
        {!(location.pathname === "/" && (activeSection === "home" || activeSection === "")) ? (
          <Button
            className="bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600 text-xs md:text-sm h-8 md:h-9 px-2 md:px-4"
            asChild
          >
            <a href="/Tirdesh-Pettugani-Resume.pdf" download className="flex items-center gap-1.5" aria-label="Download resume">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Download CV</span>
              <span className="sm:hidden">CV</span>
            </a>
          </Button>
        ) : (
          <div className="w-[60px] sm:w-[100px] md:w-[120px]"></div>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
