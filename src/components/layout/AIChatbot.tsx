import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquareText, X, Send, Sparkles, Bot, User, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
  isRich?: boolean;
};

const SUGGESTIONS = [
  { label: "🌱 What crop solutions do you offer?", value: "What crop solutions do you offer?" },
  { label: "📦 Can I see your product catalog?", value: "Can I see your product catalog?" },
  { label: "🤝 How do I become a distributor?", value: "How do I become a distributor?" },
  { label: "📞 How do I contact support?", value: "How do I contact support?" }
];

const CROP_SUGGESTIONS = [
  { label: "Tell me about Paddy 🌾", value: "Tell me about Paddy" },
  { label: "Tell me about Chilli 🌶️", value: "Tell me about Chilli" },
  { label: "Tell me about Cotton 🌿", value: "Tell me about Cotton" },
  { label: "Tell me about Tomato 🍅", value: "Tell me about Tomato" }
];

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! I am **Signo**, your AI Agronomist. 🌾\n\nI can help you with crop-specific nutrition plans (paddy, chilli, cotton, etc.), recommend Signova products, or guide you on becoming a distributor. What would you like to grow today?",
      timestamp: new Date(),
      isRich: true
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCropSubmenu, setShowCropSubmenu] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 400, height: 540 });

  useEffect(() => {
    const checkScreen = () => {
      setIsDesktop(window.innerWidth >= 640);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  const startResize = (e: React.MouseEvent, direction: "w" | "n" | "nw") => {
    e.preventDefault();
    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = dimensions.width;
    const startHeight = dimensions.height;

    const doDrag = (moveEvent: MouseEvent) => {
      let newWidth = startWidth;
      let newHeight = startHeight;

      if (direction === "w" || direction === "nw") {
        const dx = moveEvent.clientX - startX;
        newWidth = Math.max(320, Math.min(800, startWidth - dx));
      }
      if (direction === "n" || direction === "nw") {
        const dy = moveEvent.clientY - startY;
        newHeight = Math.max(400, Math.min(850, startHeight - dy));
      }

      setDimensions({ width: newWidth, height: newHeight });
    };

    const stopDrag = () => {
      window.removeEventListener("mousemove", doDrag);
      window.removeEventListener("mouseup", stopDrag);
    };

    window.addEventListener("mousemove", doDrag);
    window.addEventListener("mouseup", stopDrag);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const getAIResponse = (text: string): { reply: string; isRich: boolean } => {
    const q = text.toLowerCase().trim();

    if (q.includes("crop") || q.includes("solution") || q.includes("grow") || q.includes("plant")) {
      setShowCropSubmenu(true);
      return {
        reply: "Which crop programme are you interested in? I have tailored agronomy schedules for **Paddy**, **Chilli**, **Cotton**, and **Tomato**. Click one of the crop options below to learn more!",
        isRich: true
      };
    }

    if (q.includes("paddy") || q.includes("rice") || q.includes("grain")) {
      setShowCropSubmenu(false);
      return {
        reply: "For **Paddy (Rice)**, stage-wise nutrition is key to tillering and yield:\n\n1. **Basal Stage**: Use **OrganoGold** granules to boost soil biology and crop foundation.\n2. **Active Tillering**: Apply **Signova Zn-12** (EDTA-chelated Zinc) and **Nano Zinc** to increase tillers per hill and correct zinc deficiency.\n3. **Panicle & Grain Filling**: Spray potash-rich **Yield Max** (0-0-50) and **Nano Urea** to maximize grain weight and uniform harvest quality.\n\nBrowse products on our [Products Page](/products).",
        isRich: true
      };
    }

    if (q.includes("chilli") || q.includes("chili") || q.includes("pepper") || q.includes("mirchi")) {
      setShowCropSubmenu(false);
      return {
        reply: "For **Chilli**, fruit setting and vibrant color command higher market prices:\n\n1. **Flowering Stage**: Spray **Signova Boost** (seaweed extract) to increase flower retention, active branches, and uniform fruit set.\n2. **Fruit Maturity**: Apply **SMag** (Magnesium) and **Bloom Mix** (NPK 13-40-13) to improve color index, shape, and pungency.\n3. **Crop Shield**: Spray **Signova Shield** (broad-spectrum fungicide) to prevent early leaf blights and powdery mildew.\n\nBrowse products on our [Products Page](/products).",
        isRich: true
      };
    }

    if (q.includes("cotton")) {
      setShowCropSubmenu(false);
      return {
        reply: "For **Cotton**, boll weight and fiber quality determine profitability:\n\n1. **Vegetative Stage**: Apply **Signova Roots** (humic + fulvic acid blend) to build deep, resilient root architectures.\n2. **Square & Flower Initiation**: Spray chelated **Agrimax** micronutrient mixture to prevent boll/square dropping under stress.\n3. **Boll Security**: Apply **Signova Guard** to protect developing bolls and protect against sucking pests (whiteflies, thrips, aphids).\n\nBrowse products on our [Products Page](/products).",
        isRich: true
      };
    }

    if (q.includes("tomato") || q.includes("tomatoes")) {
      setShowCropSubmenu(false);
      return {
        reply: "For **Tomato**, skin firmness, sugar index, and shelf-life are primary:\n\n1. **Fruit Setting**: Apply **Signo-Bor** (Boron) and **Bloom Mix** to prevent hollow stems and fruit cracking.\n2. **Size & Weight**: Spray potash-rich **Yield Max** to increase fruit weight, brix, and shelf-life during transport.\n\nBrowse products on our [Products Page](/products).",
        isRich: true
      };
    }

    if (
      q.includes("product") ||
      q.includes("catalog") ||
      q.includes("catalogue") ||
      q.includes("buy") ||
      q.includes("order") ||
      q.includes("purchase")
    ) {
      return {
        reply: "Signova offers a comprehensive range of premium crop nutrition solutions:\n\n- **Chelated Micronutrients**: *Agrimax* mixture, *Signova Zn-12*, *Signova Fe-12*.\n- **Bio Stimulants**: *Signova Boost* (seaweed extract), *Signova Roots*.\n- **Nano Technology**: *Nano Urea Liquid*, *Nano Zinc*.\n- **Crop Protection**: *Signova Shield* (fungicide), *Signova Guard* (insecticide).\n- **Organic / Specialty**: *OrganoGold* certified organic granules, *Bloom Mix*.\n- **Water Soluble Fertilizers**: NPK complex formulations.\n\nBrowse the complete catalogue on our [Products Page](/products)!",
        isRich: true
      };
    }

    if (
      q.includes("distributor") ||
      q.includes("dealer") ||
      q.includes("partner") ||
      q.includes("dealership") ||
      q.includes("franchise")
    ) {
      return {
        reply: "Grow your agricultural business with Signova! We provide our **3,000+ dealers** across 22 states with high margins, exclusive territories, promotional marketing materials, and dedicated agronomist field training.\n\nReady to become a partner? Apply directly on our [Distributor Page](/distributor)!",
        isRich: true
      };
    }

    if (
      q.includes("contact") ||
      q.includes("support") ||
      q.includes("address") ||
      q.includes("phone") ||
      q.includes("location") ||
      q.includes("email") ||
      q.includes("office") ||
      q.includes("enquiry")
    ) {
      return {
        reply: "Connect with our agronomists and sales team:\n\n📞 **Phone**: +91 40 1234 5678\n📧 **Email**: support@signovagroup.com\n📍 **Corporate Office**: Hyderabad, Telangana, India\n\nOr submit an online enquiry form on our [Contact Page](/contact) and we'll get back to you within 24 hours.",
        isRich: true
      };
    }

    const greetings = ["hi", "hello", "hey", "greetings", "good morning", "good afternoon", "good evening"];
    if (greetings.some((g) => q === g || q.startsWith(g + " ") || q.endsWith(" " + g) || q.includes(" " + g + " "))) {
      return {
        reply: "Hi there! I am **Signo**, your AI agronomist. 🌾 How can I assist you with your crops or product queries today?",
        isRich: true
      };
    }

    // Default reply
    return {
      reply: "I want to make sure I give you the best agricultural advice. I can answer questions about crop solutions (**paddy**, **chilli**, **cotton**, **tomato**), our **products**, our **distributor program**, or how to **contact us**. Feel free to use one of the suggestions below!",
      isRich: true
    };
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text,
      timestamp: new Date()
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking and typing
    setTimeout(() => {
      const response = getAIResponse(text);
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "bot",
        text: response.reply,
        timestamp: new Date(),
        isRich: response.isRich
      };
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 1000);
  };

  // Helper to parse markdown links and bold text
  const renderMessageText = (text: string) => {
    const lines = text.split("\n");
    return lines.map((line, idx) => {
      // Regex for Markdown links: [Link Text](/path)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      // Regex for bold text: **Text** or *Text*
      const boldRegex = /\*\*([^*]+)\*\*/g;
      const italicRegex = /\*([^*]+)\*/g;

      let renderedLine = line;

      // Handle bold
      renderedLine = renderedLine.replace(boldRegex, "<strong>$1</strong>");
      // Handle italic
      renderedLine = renderedLine.replace(italicRegex, "<em>$1</em>");

      // Check if there are links
      const parts = [];
      let lastIndex = 0;
      let match;

      // Reset regex index
      linkRegex.lastIndex = 0;

      while ((match = linkRegex.exec(renderedLine)) !== null) {
        const textBefore = renderedLine.substring(lastIndex, match.index);
        const linkText = match[1];
        const linkPath = match[2];

        // Push text before link
        if (textBefore) {
          parts.push(<span key={`text-${lastIndex}`} dangerouslySetInnerHTML={{ __html: textBefore }} />);
        }

        // Push link component
        parts.push(
          <Link
            key={`link-${match.index}`}
            to={linkPath}
            onClick={() => setIsOpen(false)}
            className="text-lime hover:underline font-semibold inline-flex items-center gap-0.5"
          >
            {linkText} <ArrowRight className="size-3" />
          </Link>
        );

        lastIndex = linkRegex.lastIndex;
      }

      if (lastIndex < renderedLine.length) {
        parts.push(
          <span
            key={`text-end`}
            dangerouslySetInnerHTML={{ __html: renderedLine.substring(lastIndex) }}
          />
        );
      }

      return (
        <p key={idx} className={line.trim() === "" ? "h-2" : "min-h-[1rem]"}>
          {parts.length > 0 ? parts : <span dangerouslySetInnerHTML={{ __html: renderedLine }} />}
        </p>
      );
    });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-lime-gradient grid place-items-center shadow-glow hover:scale-110 active:scale-95 transition-all duration-300 animate-float cursor-pointer"
        aria-label="Toggle AI Agronomist Chat"
      >
        {isOpen ? (
          <X className="size-6 text-charcoal" />
        ) : (
          <div className="relative">
            <Bot className="size-6 text-charcoal" />
            <span className="absolute -top-1.5 -right-1.5 size-3 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
          </div>
        )}
      </button>

      {/* Chat Window Panel & Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="chat-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-40"
          />
        )}
        {isOpen && (
          <motion.div
            key="chat-panel"
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 280 }}
            style={isDesktop ? { width: `${dimensions.width}px`, height: `${dimensions.height}px` } : {}}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[400px] h-[540px] glass rounded-2xl shadow-glow overflow-hidden z-50 flex flex-col"
          >
            {/* Resize Handles for Desktop */}
            {isDesktop && (
              <>
                <div
                  onMouseDown={(e) => startResize(e, "n")}
                  className="absolute top-0 left-0 right-0 h-1.5 cursor-n-resize hover:bg-lime/20 transition-colors z-[60]"
                />
                <div
                  onMouseDown={(e) => startResize(e, "w")}
                  className="absolute top-0 bottom-0 left-0 w-1.5 cursor-w-resize hover:bg-lime/20 transition-colors z-[60]"
                />
                 <div
                  onMouseDown={(e) => startResize(e, "nw")}
                  className="absolute top-1 left-1 size-5 cursor-nw-resize z-[70] flex items-center justify-center hover:bg-black/5 rounded-tl-md transition-colors text-charcoal/30 hover:text-charcoal/50"
                  title="Drag to resize"
                >
                  <svg className="size-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="4" y1="12" x2="12" y2="4" />
                    <line x1="4" y1="20" x2="20" y2="4" />
                    <line x1="12" y1="20" x2="20" y2="12" />
                  </svg>
                </div>
              </>
            )}

            {/* Header */}
            <div className="bg-lime-gradient px-6 py-4 flex items-center justify-between text-charcoal shadow-sm">
              <div className="flex items-center gap-3">
                <div className="relative size-10 rounded-full bg-white/25 grid place-items-center">
                  <Bot className="size-5 text-charcoal font-bold" />
                  <span className="absolute bottom-0 right-0 size-2.5 rounded-full bg-emerald-500 border-2 border-white animate-pulse" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm tracking-tight leading-tight">Signo — AI Agronomist</h3>
                  <p className="text-[10px] uppercase tracking-wider font-semibold opacity-70">Crop Solutions Advisor</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="size-8 rounded-full hover:bg-black/10 grid place-items-center transition cursor-pointer"
                aria-label="Close chat"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-secondary/20">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[85%] ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`size-7 rounded-full grid place-items-center shrink-0 ${
                      msg.sender === "user" ? "bg-primary text-primary-foreground" : "bg-white border border-border text-charcoal"
                    }`}>
                      {msg.sender === "user" ? <User className="size-3.5" /> : <Bot className="size-3.5" />}
                    </div>
                    <div className={`rounded-2xl px-4 py-3 text-sm shadow-sm space-y-1.5 ${
                      msg.sender === "user"
                        ? "bg-primary/95 text-primary-foreground rounded-tr-none"
                        : "bg-card/60 backdrop-blur-sm text-foreground rounded-tl-none border border-border/40"
                    }`}>
                      {msg.isRich ? renderMessageText(msg.text) : <p>{msg.text}</p>}
                      <span className={`block text-[9px] mt-1 text-right opacity-65`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start gap-2.5 max-w-[85%]">
                    <div className="size-7 rounded-full bg-white border border-border grid place-items-center shrink-0">
                      <Bot className="size-3.5" />
                    </div>
                    <div className="bg-card/60 backdrop-blur-sm text-foreground border border-border/40 rounded-2xl rounded-tl-none px-4 py-3.5 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="size-2 rounded-full bg-muted-foreground/40 animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestion Chips */}
            <div className="px-5 py-3 border-t border-border/30 bg-card/45 backdrop-blur-md">
              <div className="text-[10px] uppercase font-bold tracking-[0.18em] text-muted-foreground mb-1.5">
                {showCropSubmenu ? (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <ArrowRight className="size-2.5 shrink-0" />
                    Select crop type:
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 whitespace-nowrap">
                    <ArrowRight className="size-2.5 shrink-0" />
                    Suggested Questions:
                  </span>
                )}
              </div>
              <div className="flex overflow-x-auto sm:flex-wrap gap-2 pb-1.5 sm:pb-0 no-scrollbar -mx-1 px-1 scroll-smooth">
                {(showCropSubmenu ? CROP_SUGGESTIONS : SUGGESTIONS).map((s) => (
                  <button
                    key={s.value}
                    onClick={() => handleSend(s.value)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary/60 border border-border/40 hover:border-leaf hover:bg-lime/10 transition cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {s.label}
                  </button>
                ))}
                {showCropSubmenu && (
                  <button
                    onClick={() => setShowCropSubmenu(false)}
                    className="px-3 py-1.5 rounded-full text-xs font-semibold bg-muted border border-border/40 hover:border-destructive hover:bg-destructive/10 transition cursor-pointer text-muted-foreground whitespace-nowrap shrink-0"
                  >
                    ⬅ Back
                  </button>
                )}
              </div>
            </div>

            {/* Input Form Footer */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend(inputValue);
              }}
              className="p-4 border-t border-border/30 bg-card/45 backdrop-blur-md flex gap-2 items-center"
            >
              <input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask Signo a question..."
                className="flex-1 bg-secondary/60 backdrop-blur-sm text-sm rounded-xl px-4 py-3 border border-border/40 focus:outline-none focus:border-leaf"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="size-11 rounded-xl bg-lime-gradient text-charcoal grid place-items-center shadow-md hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition cursor-pointer"
                aria-label="Send message"
              >
                <Send className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
