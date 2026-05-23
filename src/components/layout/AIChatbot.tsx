import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Bot, MessageSquareText, Send, User, X } from "lucide-react";
import { Link } from "react-router-dom";

type Message = {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
};

type Suggestion = {
  label: string;
  value: string;
};

const SUGGESTIONS: Suggestion[] = [
  { label: "What crop solutions do you offer?", value: "What crop solutions do you offer?" },
  { label: "Can I see your product catalog?", value: "Can I see your product catalog?" },
  { label: "How do I become a distributor?", value: "How do I become a distributor?" },
  { label: "How do I contact support?", value: "How do I contact support?" },
];

const CROP_SUGGESTIONS: Suggestion[] = [
  { label: "Tell me about Paddy", value: "Tell me about Paddy" },
  { label: "Tell me about Chilli", value: "Tell me about Chilli" },
  { label: "Tell me about Cotton", value: "Tell me about Cotton" },
  { label: "Tell me about Tomato", value: "Tell me about Tomato" },
];

const WELCOME_MESSAGE: Message = {
  id: "welcome",
  sender: "bot",
  text: "Hello! I am Signo, your AI Agronomist. I can help with crop nutrition plans, Signova products, distributor guidance, and support questions.",
  timestamp: new Date(),
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showCropSubmenu, setShowCropSubmenu] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping, isOpen]);

  const activeSuggestions = useMemo(
    () => (showCropSubmenu ? CROP_SUGGESTIONS : SUGGESTIONS),
    [showCropSubmenu],
  );

  const handlePrompt = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: `${Date.now()}-user`,
      sender: "user",
      text,
      timestamp: new Date(),
    };

    setMessages((current) => [...current, userMessage]);
    setInputValue("");
    setIsTyping(true);

    window.setTimeout(() => {
      const reply = getAIResponse(text);
      const botMessage: Message = {
        id: `${Date.now()}-bot`,
        sender: "bot",
        text: reply.text,
        timestamp: new Date(),
      };

      setShowCropSubmenu(reply.showCropSubmenu);
      setMessages((current) => [...current, botMessage]);
      setIsTyping(false);
    }, 550);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="fixed bottom-6 right-6 z-50 size-14 rounded-full bg-lime-gradient grid place-items-center shadow-glow hover:scale-105 active:scale-95 transition-transform"
        aria-label="Toggle AI Agronomist Chat"
      >
        {isOpen ? (
          <X className="size-6 text-charcoal" />
        ) : (
          <div className="relative">
            <Bot className="size-6 text-charcoal" />
            <span className="absolute -top-1 -right-1 size-3 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.button
              key="chatbot-backdrop"
              type="button"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/45 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-label="Close AI Agronomist Chat"
            />

            <motion.section
              key="chatbot-panel"
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed bottom-24 right-4 z-50 flex h-[min(540px,75vh)] w-[calc(100vw-2rem)] max-w-[400px] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-glow sm:right-6"
            >
              <header className="flex items-center justify-between bg-lime-gradient px-5 py-4 text-charcoal">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-full bg-white/25">
                    <MessageSquareText className="size-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-sm font-bold leading-tight">Signo AI Agronomist</h3>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.16em] opacity-75">
                      Crop Solutions Advisor
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="grid size-8 place-items-center rounded-full hover:bg-black/10 transition-colors"
                  aria-label="Close chat"
                >
                  <X className="size-4" />
                </button>
              </header>

              <div className="flex-1 space-y-4 overflow-y-auto bg-secondary/20 p-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="flex max-w-[88%] items-start gap-2.5">
                      {message.sender === "bot" && (
                        <div className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-white text-charcoal">
                          <Bot className="size-3.5" />
                        </div>
                      )}

                      <div
                        className={`rounded-2xl px-4 py-3 text-sm shadow-sm ${
                          message.sender === "user"
                            ? "rounded-tr-none bg-primary text-primary-foreground"
                            : "rounded-tl-none border border-border/40 bg-card/80 text-foreground"
                        }`}
                      >
                        <MessageContent text={message.text} onNavigate={() => setIsOpen(false)} />
                        <span className="mt-1 block text-right text-[9px] opacity-60">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>

                      {message.sender === "user" && (
                        <div className="grid size-7 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                          <User className="size-3.5" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2.5">
                      <div className="grid size-7 shrink-0 place-items-center rounded-full border border-border bg-white text-charcoal">
                        <Bot className="size-3.5" />
                      </div>
                      <div className="rounded-2xl rounded-tl-none border border-border/40 bg-card/80 px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className="size-2 rounded-full bg-muted-foreground/35 animate-pulse" />
                          <span className="size-2 rounded-full bg-muted-foreground/35 animate-pulse [animation-delay:120ms]" />
                          <span className="size-2 rounded-full bg-muted-foreground/35 animate-pulse [animation-delay:240ms]" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <div ref={endRef} />
              </div>

              <div className="border-t border-border/40 bg-card/70 px-4 py-3 backdrop-blur-sm">
                <div className="mb-2 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {showCropSubmenu ? (
                    <span className="inline-flex items-center gap-1">
                      <ArrowRight className="size-2.5" />
                      Select crop type:
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1">
                      <ArrowRight className="size-2.5" />
                      Suggested questions:
                    </span>
                  )}
                </div>

                <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                  {activeSuggestions.map((suggestion) => (
                    <button
                      key={suggestion.value}
                      type="button"
                      onClick={() => handlePrompt(suggestion.value)}
                      className="shrink-0 rounded-full border border-border/40 bg-secondary/60 px-3 py-1.5 text-xs font-semibold hover:border-leaf hover:bg-lime/10 transition-colors"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                  {showCropSubmenu && (
                    <button
                      type="button"
                      onClick={() => setShowCropSubmenu(false)}
                      className="shrink-0 rounded-full border border-border/40 bg-muted px-3 py-1.5 text-xs font-semibold text-muted-foreground hover:border-destructive hover:bg-destructive/10 transition-colors"
                    >
                      Back
                    </button>
                  )}
                </div>
              </div>

              <form
                className="flex items-center gap-2 border-t border-border/40 bg-card px-4 py-4"
                onSubmit={(event) => {
                  event.preventDefault();
                  handlePrompt(inputValue);
                }}
              >
                <input
                  value={inputValue}
                  onChange={(event) => setInputValue(event.target.value)}
                  placeholder="Ask Signo a question..."
                  className="flex-1 rounded-xl border border-border/40 bg-secondary/60 px-4 py-3 text-sm focus:border-leaf focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="grid size-11 place-items-center rounded-xl bg-lime-gradient text-charcoal shadow-md transition-transform hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </motion.section>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function MessageContent({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate: () => void;
}) {
  const paragraphs = text.split("\n").filter(Boolean);

  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, index) => (
        <p key={`${paragraph}-${index}`} className="leading-relaxed">
          <InlineFormattedText text={paragraph} onNavigate={onNavigate} />
        </p>
      ))}
    </div>
  );
}

function InlineFormattedText({
  text,
  onNavigate,
}: {
  text: string;
  onNavigate: () => void;
}) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const output: React.ReactNode[] = [];
  let currentIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    const [fullMatch, label, path] = match;
    const before = text.slice(currentIndex, match.index);

    if (before) output.push(...renderStyledText(before, `text-${currentIndex}`));

    output.push(
      <Link
        key={`link-${path}-${match.index}`}
        to={path}
        onClick={onNavigate}
        className="inline-flex items-center gap-0.5 font-semibold text-lime hover:underline"
      >
        {label}
        <ArrowRight className="size-3" />
      </Link>,
    );

    currentIndex = match.index + fullMatch.length;
  }

  const after = text.slice(currentIndex);
  if (after) output.push(...renderStyledText(after, `text-${currentIndex}`));

  return <>{output}</>;
}

function renderStyledText(text: string, keyPrefix: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

  return parts.map((part, index) => {
    const isBold = part.startsWith("**") && part.endsWith("**");
    const content = isBold ? part.slice(2, -2) : part;

    return isBold ? (
      <strong key={`${keyPrefix}-${index}`}>{content}</strong>
    ) : (
      <span key={`${keyPrefix}-${index}`}>{content}</span>
    );
  });
}

function getAIResponse(input: string) {
  const query = input.toLowerCase().trim();

  if (query.includes("crop") || query.includes("solution") || query.includes("grow") || query.includes("plant")) {
    return {
      showCropSubmenu: true,
      text: "Which crop programme are you interested in? I can help with **Paddy**, **Chilli**, **Cotton**, and **Tomato**.",
    };
  }

  if (query.includes("paddy") || query.includes("rice")) {
    return {
      showCropSubmenu: false,
      text: "For **Paddy**, focus on basal soil health, zinc correction at tillering, and grain-filling support with potash and nitrogen efficiency products. Browse the full range on our [Products Page](/products).",
    };
  }

  if (query.includes("chilli") || query.includes("chili") || query.includes("pepper")) {
    return {
      showCropSubmenu: false,
      text: "For **Chilli**, prioritize flower retention, magnesium support, and protective fungicide coverage during fruit development. Browse the full range on our [Products Page](/products).",
    };
  }

  if (query.includes("cotton")) {
    return {
      showCropSubmenu: false,
      text: "For **Cotton**, support root establishment early, protect square retention with balanced micronutrients, and manage sucking pests during boll formation. Browse the full range on our [Products Page](/products).",
    };
  }

  if (query.includes("tomato")) {
    return {
      showCropSubmenu: false,
      text: "For **Tomato**, boron and bloom support are critical at fruit set, followed by potash-rich nutrition for size, brix, and shelf life. Browse the full range on our [Products Page](/products).",
    };
  }

  if (
    query.includes("product") ||
    query.includes("catalog") ||
    query.includes("catalogue") ||
    query.includes("buy") ||
    query.includes("order")
  ) {
    return {
      showCropSubmenu: false,
      text: "Signova offers **Chelated Micronutrients**, **Bio Stimulants**, **Nano Technology**, **Crop Protection**, and **Organic / Specialty** solutions. Explore them on our [Products Page](/products).",
    };
  }

  if (
    query.includes("distributor") ||
    query.includes("dealer") ||
    query.includes("partner") ||
    query.includes("franchise")
  ) {
    return {
      showCropSubmenu: false,
      text: "We support channel partners with margins, territory support, and field training. Apply on our [Distributor Page](/distributor).",
    };
  }

  if (
    query.includes("contact") ||
    query.includes("support") ||
    query.includes("phone") ||
    query.includes("email") ||
    query.includes("office")
  ) {
    return {
      showCropSubmenu: false,
      text: "Reach our team through the enquiry options on our [Contact Page](/contact).",
    };
  }

  return {
    showCropSubmenu: false,
    text: "I can help with **crop solutions**, **products**, **distributor support**, and **contact information**. Try one of the suggestions below.",
  };
}
