import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ArrowRight, Sparkles, FlaskConical, Leaf, Atom, Droplets, Shield, Star, Quote, ChevronRight, PlayCircle, ChevronLeft } from "lucide-react";
import heroFarm from "@/assets/images/hero-farm.jpg";
import lab from "@/assets/images/lab.jpg";
import farmer from "@/assets/images/farmer.jpg";
import products from "@/assets/images/products.jpg";
import leaves from "@/assets/images/leaves.jpg";
import sliderPaddy from "@/assets/Slider/slider-paddy.jpg";
import sliderChilli from "@/assets/Slider/Slider-chilli.jpg";
import sliderCotton from "@/assets/Slider/Slider-cotton.jpg";
import sliderImage3 from "@/assets/Slider/Slider-image3.jpg";
import sliderImage21 from "@/assets/Slider/Slider-image21.jpg";
import { Counter } from "@/components/common/Counter";
import { crops } from "@/data/crops";
import { usePageMeta } from "@/hooks/use-page-meta";

const stats = [
  { n: 100000, s: "+", l: "Happy Farmers" },
  { n: 3000, s: "+", l: "Dealers" },
  { n: 300, s: "+", l: "Products" },
  { n: 250, s: "+", l: "Experts" },
];

const categories = [
  { icon: Atom, title: "Chelated Micronutrients", desc: "EDTA-chelated nutrients for maximum absorption.", grad: "from-leaf to-deep" },
  { icon: Shield, title: "Crop Protectors", desc: "Advanced protection against pests and diseases.", grad: "from-deep to-charcoal" },
  { icon: Sparkles, title: "Nano Technology", desc: "Next-gen nano formulations for precision farming.", grad: "from-lime to-leaf" },
  { icon: Droplets, title: "Bio Stimulants", desc: "Natural growth boosters for stronger crops.", grad: "from-leaf to-lime" },
  { icon: Leaf, title: "Organic Solutions", desc: "Certified organic inputs for sustainable yield.", grad: "from-deep to-leaf" },
  { icon: FlaskConical, title: "Specialty Fertilizers", desc: "Crop-specific blends developed by our R&D team.", grad: "from-charcoal to-deep" },
];

const stories = [
  { name: "Ramesh Patel", crop: "Cotton • Gujarat", quote: "Yield jumped 32% in one season after switching to Signova micronutrients.", img: farmer },
  { name: "Lakshmi Devi", crop: "Chilli • Andhra Pradesh", quote: "Healthier plants, deeper colour, and a buyer waiting at the gate.", img: farmer },
  { name: "Suresh Kumar", crop: "Paddy • Telangana", quote: "The team's field guidance is what truly sets Signova apart.", img: farmer },
];

const articles = [
  { tag: "Nutrition", title: "Why zinc deficiency silently caps your paddy yield", img: leaves },
  { tag: "Guide", title: "A 7-step micronutrient plan for chilli farmers", img: heroFarm },
  { tag: "Innovation", title: "Nano urea: smaller particle, bigger harvest", img: lab },
];

const slides = [
  {
    bgImage: sliderImage21,
    eyebrow: "Supporting Indian Farmers Since 2004",
    titlePre: "Empowering ",
    titleHighlight: "India's Harvests",
    titlePost: " with Science",
    desc: "Trusted by 100,000+ farmers across 22 states. Delivering advanced crop science directly to fields.",
    ctas: [
      { text: "Explore Products", path: "/products", isPrimary: true, icon: ArrowRight },
      { text: "Become a Distributor", path: "/distributor", isPrimary: false, icon: PlayCircle }
    ]
  },
  {
    bgImage: sliderPaddy,
    eyebrow: "Paddy Crop Nutrition",
    titlePre: "Maximize ",
    titleHighlight: "Paddy Yields",
    titlePost: " & Tillering",
    desc: "Correct zinc and magnesium deficiencies, restore deep leaf color, and boost grain filling.",
    ctas: [
      { text: "Paddy Solutions", path: "/crops", isPrimary: true, icon: ArrowRight },
      { text: "Product Catalog", path: "/products", isPrimary: false, icon: PlayCircle }
    ]
  },
  {
    bgImage: sliderChilli,
    eyebrow: "Chilli Crop Nutrition",
    titlePre: "Boost ",
    titleHighlight: "Chilli Flowering",
    titlePost: " & Pungency",
    desc: "Stage-wise nutrition schedules to secure high fruit setting, deep color, and strong disease resistance.",
    ctas: [
      { text: "Chilli Solutions", path: "/crops", isPrimary: true, icon: ArrowRight },
      { text: "Talk to an Expert", path: "/contact", isPrimary: false, icon: PlayCircle }
    ]
  },
  {
    bgImage: sliderCotton,
    eyebrow: "Cotton Crop Nutrition",
    titlePre: "Optimize ",
    titleHighlight: "Cotton Boll Weight",
    titlePost: " & Quality",
    desc: "Enhance square retention, maximize boll size, and produce premium-grade lint fibers.",
    ctas: [
      { text: "Cotton Solutions", path: "/crops", isPrimary: true, icon: ArrowRight },
      { text: "Dealer Network", path: "/distributor", isPrimary: false, icon: PlayCircle }
    ]
  },
  {
    bgImage: sliderImage3,
    eyebrow: "Specialty Horticulture",
    titlePre: "Premium Solutions for ",
    titleHighlight: "Horticulture",
    titlePost: " Crops",
    desc: "Water-soluble specialty NPKs and chelated micronutrients tailored for greenhouse and orchard crops.",
    ctas: [
      { text: "All Crop Solutions", path: "/crops", isPrimary: true, icon: ArrowRight },
      { text: "Inside our R&D", path: "/innovation", isPrimary: false, icon: PlayCircle }
    ]
  }
];

const textContainerVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15
    }
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.25
    }
  }
};

const textItemVariants = {
  initial: { opacity: 0, y: 25 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -15, transition: { duration: 0.25 } }
};

function HomePage() {
  usePageMeta({
    title: "Signova Group — Redefining Crop Nutrition with Science",
    description: "Trusted by 100,000+ farmers. Premium micronutrients, bio-stimulants & nano-tech crop solutions made in India.",
  });
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const nextSlide = useCallback(() => {
    setActiveSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const handleIndicatorClick = (index: number) => {
    setActiveSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(interval);
  }, [nextSlide, isPaused]);

  return (
    <>
      {/* HERO */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden bg-charcoal"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="absolute inset-0 z-0">
          <AnimatePresence mode="popLayout">
            <motion.img
              key={activeSlide}
              src={slides[activeSlide].bgImage}
              alt="Signova Hero Background"
              className="absolute inset-0 w-full h-full object-cover"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.0, ease: "easeInOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/80 to-charcoal/30 z-[1]" />
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-transparent to-transparent z-[1]" />
        </div>

        {/* Floating particles */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute size-2 rounded-full bg-lime/40 blur-sm z-[2]"
            style={{ left: `${(i * 83) % 100}%`, top: `${(i * 47) % 100}%` }}
            animate={{ y: [0, -30, 0], opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        <div className="relative w-full max-w-7xl mx-auto px-6 py-32 text-white z-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeSlide}
              variants={textContainerVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex flex-col justify-center min-h-[60vh] md:min-h-[70vh]"
            >
              <motion.div
                variants={textItemVariants}
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-dark text-xs uppercase tracking-[0.25em] text-lime mb-8 self-start"
              >
                <Sparkles className="size-3.5" /> {slides[activeSlide].eyebrow}
              </motion.div>

              <motion.h1
                variants={textItemVariants}
                className="text-5xl sm:text-6xl md:text-8xl font-bold leading-[0.95] max-w-5xl"
              >
                {slides[activeSlide].titlePre}
                <span className="text-gradient">{slides[activeSlide].titleHighlight}</span>
                {slides[activeSlide].titlePost}
              </motion.h1>

              <motion.p
                variants={textItemVariants}
                className="mt-8 text-lg md:text-xl text-white/75 max-w-2xl leading-relaxed"
              >
                {slides[activeSlide].desc}
              </motion.p>

              <motion.div
                variants={textItemVariants}
                className="mt-10 flex flex-wrap gap-4"
              >
                {slides[activeSlide].ctas.map((cta, cIdx) => {
                  const Icon = cta.icon;
                  return (
                    <Link
                      key={cIdx}
                      to={cta.path}
                      className={
                        cta.isPrimary
                          ? "group inline-flex items-center gap-2 px-7 py-4 rounded-2xl bg-lime-gradient text-charcoal font-semibold shadow-glow hover:scale-[1.02] transition"
                          : "group inline-flex items-center gap-2 px-7 py-4 rounded-2xl glass-dark text-white font-semibold hover:bg-white/10 transition"
                      }
                    >
                      {cta.text}
                      <Icon className="size-4 group-hover:translate-x-1 transition" />
                    </Link>
                  );
                })}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Combined Navigation Control */}
        <div className="absolute bottom-30 md:bottom-32 left-1/2 -translate-x-1/2 z-20 flex items-center gap-6 px-6 py-3 rounded-full border border-white/10 bg-black/40 backdrop-blur-md shadow-lg">
          <button
            onClick={prevSlide}
            className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label="Previous slide"
          >
            <ChevronLeft className="size-5" />
          </button>

          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => handleIndicatorClick(index)}
                className="group relative cursor-pointer focus:outline-none flex items-center justify-center"
                aria-label={`Go to slide ${index + 1}`}
              >
                {activeSlide === index ? (
                  <div className="w-8 h-2.5 rounded-full bg-lime overflow-hidden relative transition-all duration-300">
                    <motion.div
                      className="absolute left-0 top-0 bottom-0 bg-white rounded-full"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                      key={activeSlide}
                    />
                  </div>
                ) : (
                  <div className="size-2 rounded-full bg-white/35 group-hover:bg-white/60 transition-colors duration-200" />
                )}
              </button>
            ))}
          </div>

          <button
            onClick={nextSlide}
            className="text-white/60 hover:text-white transition-colors duration-200 cursor-pointer focus:outline-none"
            aria-label="Next slide"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-white/50 text-xs uppercase tracking-[0.3em] z-20">
          <span>Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>
      </section>

      {/* STATS */}
      <section className="relative -mt-12 z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="glass shadow-card rounded-3xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-gradient">
                  <Counter to={s.n} suffix={s.s} />
                </div>
                <div className="mt-2 text-xs md:text-sm uppercase tracking-wider text-muted-foreground">{s.l}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT PREVIEW */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-lime-gradient opacity-20 blur-3xl rounded-3xl" />
            <div className="relative grid grid-cols-2 gap-4">
              <img src={lab} alt="Signova research lab" loading="lazy" className="rounded-3xl object-cover h-72 w-full shadow-card" />
              <img src={leaves} alt="Healthy crop leaves" loading="lazy" className="rounded-3xl object-cover h-72 w-full mt-12 shadow-card" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-4">About Signova</div>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
              Two decades of growing <span className="text-gradient">India's harvests</span>
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-6">
              Established in 2004, Signova Group is a science-led agri-tech company developing micronutrients,
              bio-stimulants, and protection chemistries that help farmers grow more — sustainably.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our mission is simple: put world-class crop science in the hands of every Indian farmer,
              backed by ISO-certified manufacturing and a 250-strong field expert team.
            </p>
            <Link to="/about" className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all">
              Read our story <ArrowRight className="size-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* PRODUCT CATEGORIES */}
      <section className="py-28 bg-secondary/40 relative overflow-hidden">
        <div className="absolute top-0 right-0 size-96 rounded-full bg-lime/10 blur-3xl" />
        <div className="relative max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">What We Make</div>
            <h2 className="text-4xl md:text-6xl font-bold">Product <span className="text-gradient">Categories</span></h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="group relative bg-card rounded-3xl p-8 shadow-card hover:shadow-glow transition-all duration-500 hover:-translate-y-2 overflow-hidden"
              >
                <div className={`absolute -top-20 -right-20 size-48 rounded-full bg-gradient-to-br ${c.grad} opacity-10 group-hover:opacity-30 blur-2xl transition`} />
                <div className={`relative size-14 rounded-2xl bg-gradient-to-br ${c.grad} grid place-items-center mb-6 shadow-lg`}>
                  <c.icon className="size-6 text-white" />
                </div>
                <h3 className="relative text-xl font-bold mb-3">{c.title}</h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed mb-6">{c.desc}</p>
                <Link to="/products" className="relative inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                  Learn more <ChevronRight className="size-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CROPS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">Crop Solutions</div>
              <h2 className="text-4xl md:text-6xl font-bold max-w-2xl">Tailored science for <span className="text-gradient">every crop</span></h2>
            </div>
            <Link to="/crops" className="inline-flex items-center gap-2 text-primary font-semibold">
              View all crops <ArrowRight className="size-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {crops.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="group relative aspect-square rounded-3xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition duration-300">
                  <Link
                    to="/crops"
                    className="absolute inset-0 z-0"
                    aria-label={`View all crop solutions for ${c.name}`}
                  />
                  {/* Background Image */}
                  <img
                    src={c.image}
                    alt={c.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                  {/* Nutrient Management Link */}
                  <div className="absolute top-4 right-4 z-10">
                    <Link
                      to={`/crops/${c.slug}/nutrients`}
                      className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur border border-white/10 text-[10px] font-semibold tracking-wide text-white/90 shadow-sm hover:bg-lime hover:text-charcoal transition-all duration-300"
                    >
                      <Leaf className="size-3.5" />
                      Nutrient Management
                    </Link>
                  </div>

                  {/* Content Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 p-5 flex flex-col justify-end text-left z-10">
                    <span className="text-[10px] font-semibold text-white/65 tracking-wider mb-1 uppercase leading-snug">
                      {c.note}
                    </span>
                    <h3 className="text-lg font-bold text-white tracking-tight leading-tight">
                      {c.name}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* INNOVATION / R&D */}
      <section className="relative py-32 bg-charcoal text-white overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute inset-0">
          <img src={lab} alt="Lab" loading="lazy" className="w-full h-full object-cover opacity-15" />
          <div className="absolute inset-0 bg-gradient-to-r from-charcoal via-charcoal/90 to-charcoal/40" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-lime font-semibold mb-4">Innovation Lab</div>
            <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              Research that grows <span className="text-gradient">tomorrow's harvest</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
              Our 30+ scientist R&D centre develops chelation chemistries, nano formulations, and bio-stimulants
              with rigorous quality control and ISO 9001:2015 certification.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { k: "ISO Certified", v: "9001:2015" },
                { k: "Patents Filed", v: "12+" },
                { k: "Field Trials", v: "500+" },
                { k: "Quality Tests", v: "Daily" },
              ].map((x) => (
                <div key={x.k} className="glass-dark rounded-2xl p-5">
                  <div className="text-2xl font-bold text-gradient">{x.v}</div>
                  <div className="text-xs uppercase tracking-wider text-white/60 mt-1">{x.k}</div>
                </div>
              ))}
            </div>
            <Link to="/innovation" className="inline-flex items-center gap-2 mt-10 px-6 py-3 rounded-2xl bg-lime-gradient text-charcoal font-semibold">
              Inside our R&D <ArrowRight className="size-4" />
            </Link>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -inset-8 bg-lime-gradient opacity-30 blur-3xl rounded-full" />
            <img src={products} alt="Premium product range" loading="lazy" className="relative rounded-3xl shadow-glow" />
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">Farmer Stories</div>
            <h2 className="text-4xl md:text-6xl font-bold">Yields that speak <span className="text-gradient">for themselves</span></h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {stories.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition aspect-[3/4]"
              >
                <img src={s.img} alt={s.name} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between text-white">
                  <Quote className="size-8 text-lime opacity-80" />
                  <div>
                    <p className="text-base mb-5 leading-relaxed">"{s.quote}"</p>
                    <div className="font-bold">{s.name}</div>
                    <div className="text-sm text-lime">{s.crop}</div>
                    <div className="flex gap-0.5 mt-2">
                      {[...Array(5)].map((_, j) => <Star key={j} className="size-3.5 fill-lime text-lime" />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DISTRIBUTOR CTA */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto relative overflow-hidden rounded-[2.5rem] bg-hero p-10 md:p-16 text-white">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="absolute -top-40 -right-40 size-96 rounded-full bg-lime-gradient opacity-30 blur-3xl" />
          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-lime font-semibold mb-4">Partner Programme</div>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
                Grow your business with <span className="text-gradient">India's premium agri-brand</span>
              </h2>
              <p className="text-white/75 mb-8 max-w-md">
                Industry-leading margins, exclusive territories, marketing collateral and full agronomy support.
              </p>
              <div className="space-y-3">
                {["High margin structure", "Dedicated territory manager", "Co-branded marketing", "Tech & training support"].map((b) => (
                  <div key={b} className="flex items-center gap-3 text-sm">
                    <div className="size-6 rounded-full bg-lime-gradient grid place-items-center text-charcoal font-bold">✓</div>
                    {b}
                  </div>
                ))}
              </div>
            </div>
            <div className="glass-dark rounded-3xl p-8">
              <h3 className="text-xl font-bold mb-5">Quick enquiry</h3>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <input className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime" placeholder="Your name" />
                <input className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime" placeholder="Phone number" />
                <input className="w-full bg-white/10 rounded-xl px-4 py-3 text-sm border border-white/15 placeholder:text-white/50 focus:outline-none focus:border-lime" placeholder="District / State" />
                <button className="w-full px-5 py-3.5 rounded-xl bg-lime-gradient text-charcoal font-semibold hover:scale-[1.01] transition">
                  Apply Now
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* KNOWLEDGE */}
      <section className="py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">Knowledge Centre</div>
              <h2 className="text-4xl md:text-6xl font-bold">Insights from the <span className="text-gradient">field & lab</span></h2>
            </div>
            <Link to="/knowledge" className="inline-flex items-center gap-2 text-primary font-semibold">
              All articles <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {articles.map((a, i) => (
              <Link
                key={i}
                to="/knowledge"
                className="group block bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow transition hover:-translate-y-1"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={a.img} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                </div>
                <div className="p-6">
                  <div className="text-xs uppercase tracking-wider text-leaf font-semibold mb-3">{a.tag}</div>
                  <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition">{a.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default HomePage;
