import { useState, useEffect } from "react";
import { MessageCircle } from "lucide-react";

export function WhatsAppFab() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Initial check in case page starts scrolled down
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href="https://wa.me/919876543210"
      target="_blank"
      rel="noreferrer"
      className={`fixed bottom-6 left-6 z-40 size-14 rounded-full bg-lime-gradient grid place-items-center shadow-glow transition-all duration-300 hover:scale-110 animate-float ${
        isVisible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-4 pointer-events-none"
      }`}
      aria-label="WhatsApp"
    >
      <MessageCircle className="size-6 text-charcoal" />
    </a>
  );
}
