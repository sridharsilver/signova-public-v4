import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Target, Eye, Heart, Award, Quote, ExternalLink, Expand, PlayCircle } from "lucide-react";
import lab from "@/assets/images/lab.jpg";
import vsnNaidu from "@/assets/images/vsn-naidu.jpg";
import { PageHero } from "@/components/common/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";

function About() {
  usePageMeta({
    title: "About Signova Group — Our Story & Mission",
    description: "Founded in 2004, Signova Group is a leading Indian agri-tech company in micronutrients, bio-stimulants and crop protection.",
  });
  const storyVideoRef = useRef<HTMLDivElement | null>(null);
  const storyVideoIframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isStoryVideoPlaying, setIsStoryVideoPlaying] = useState(false);

  const openStoryVideoFullscreen = () => {
    const target = storyVideoIframeRef.current ?? storyVideoRef.current;
    if (!target) return;

    const fullscreenTarget = target as HTMLIFrameElement & HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void> | void;
      mozRequestFullScreen?: () => Promise<void> | void;
      msRequestFullscreen?: () => Promise<void> | void;
    };

    if (fullscreenTarget.requestFullscreen) {
      fullscreenTarget.requestFullscreen();
      return;
    }
    if (fullscreenTarget.webkitRequestFullscreen) {
      fullscreenTarget.webkitRequestFullscreen();
      return;
    }
    if (fullscreenTarget.mozRequestFullScreen) {
      fullscreenTarget.mozRequestFullScreen();
      return;
    }
    if (fullscreenTarget.msRequestFullscreen) {
      fullscreenTarget.msRequestFullscreen();
    }
  };

  const values = [
    { i: Target, t: "Mission", d: "Put world-class crop science into the hands of every Indian farmer." },
    { i: Eye, t: "Vision", d: "Be Asia's most trusted micronutrient and bio-solution brand by 2030." },
    { i: Heart, t: "Values", d: "Farmer-first, science-led, sustainable, and uncompromisingly quality-focused." },
    { i: Award, t: "Quality", d: "ISO 9001:2015 certified manufacturing with daily QC across 200+ parameters." },
  ];

  const timeline = [
    { y: "2004", t: "Founded", d: "Signova established with a single product line in Hyderabad." },
    { y: "2010", t: "R&D Centre", d: "First in-house chelation research facility commissioned." },
    { y: "2016", t: "Pan-India", d: "Network expanded to 20+ states with 1,000+ dealers." },
    { y: "2021", t: "Nano Tech", d: "Launched India's first nano-zinc liquid micronutrient." },
    { y: "2025", t: "100k Farmers", d: "Crossed the 100,000 active farmer milestone." },
  ];

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Two decades of growing India's harvests"
        subtitle="From a single product to 300+ science-backed crop solutions trusted across India."
        image={lab}
      />

      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <div className="relative">
            <div className="absolute -inset-6 bg-lime-gradient opacity-20 blur-3xl rounded-3xl" />
            <div
              ref={storyVideoRef}
              className="relative overflow-hidden rounded-3xl shadow-card aspect-[4/5] sm:aspect-[5/4] bg-charcoal"
            >
              {isStoryVideoPlaying ? (
                <iframe
                  ref={storyVideoIframeRef}
                  src="https://www.youtube.com/embed/ftm_aUttYGo?autoplay=1&controls=1&fs=1&rel=0"
                  title="Signova Group Our Story"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setIsStoryVideoPlaying(true)}
                  className="absolute inset-0 block h-full w-full cursor-pointer"
                  aria-label="Play Signova Group Our Story video"
                >
                  <img
                    src="https://img.youtube.com/vi/ftm_aUttYGo/maxresdefault.jpg"
                    alt="Signova Group Our Story video thumbnail"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-charcoal/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/14 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-18px_rgba(0,0,0,0.55)] backdrop-blur-xl backdrop-saturate-150 transition-transform hover:scale-[1.03] hover:bg-white/18">
                      <PlayCircle className="size-5 text-lime" />
                      Play Video
                    </div>
                  </div>
                </button>
              )}
              <div className="absolute right-4 bottom-4 z-10 flex gap-2">
                <button
                  type="button"
                  onClick={openStoryVideoFullscreen}
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-black/75"
                >
                  <Expand className="size-3.5" />
                  Full Screen
                </button>
                <a
                  href="https://youtu.be/ftm_aUttYGo?si=xD9UYFqb4TamSZCj"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-2 text-[11px] font-semibold text-white backdrop-blur transition hover:bg-black/75"
                >
                  <ExternalLink className="size-3.5" />
                  Open
                </a>
              </div>
            </div>
          </div>
          <div>
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-4">Our Story</div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">Built on the soil, refined in the lab.</h2>
            <p className="text-muted-foreground text-lg leading-relaxed mb-4">
              Signova Group was founded in 2004 with a singular belief — that Indian farmers deserve world-class
              crop nutrition without compromise. What began with a single chelated micronutrient has grown into a
              portfolio of 300+ products serving farmers in 22 states.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Today our R&D, manufacturing and 250+ field experts work together to deliver measurable yield
              improvements — season after season.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-b from-background to-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">Leadership</div>
            <h2 className="text-4xl md:text-5xl font-bold">Chairman & Managing Director</h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid lg:grid-cols-5 gap-10 items-center bg-card rounded-[2.5rem] p-8 md:p-12 shadow-card"
          >
            <div className="lg:col-span-2 flex justify-center">
              <div className="relative">
                <div className="absolute -inset-4 bg-lime-gradient opacity-30 blur-2xl rounded-full" />
                <img
                  src={vsnNaidu}
                  alt="V. Srinivas Naidu"
                  loading="lazy"
                  className="relative size-56 md:size-72 rounded-full object-cover object-top shadow-card ring-4 ring-lime/30 bg-card"
                />
              </div>
            </div>
            <div className="lg:col-span-3">
              <Quote className="size-8 text-leaf mb-4 opacity-60" />
              <h3 className="text-3xl md:text-4xl font-bold mb-1">V. Srinivas Naidu</h3>
              <div className="text-leaf font-semibold mb-6">Chairman & Managing Director</div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under the visionary leadership of V. Srinivas Naidu, Signova Group has grown from a single
                product line into one of India's most trusted names in agricultural innovation — specializing in
                micronutrients and bio-products that enhance soil health and maximize farmer productivity.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                His commitment to science-led farming, ISO-compliant manufacturing, and farmer-first values has
                shaped Signova's mission to deliver sustainable solutions that strengthen Indian agriculture for
                generations to come.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => (
              <motion.div
                key={v.t}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-card rounded-3xl p-7 shadow-card hover:shadow-glow transition"
              >
                <div className="size-12 rounded-2xl bg-lime-gradient grid place-items-center mb-5">
                  <v.i className="size-5 text-charcoal" />
                </div>
                <h3 className="text-lg font-bold mb-2">{v.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-28">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <div className="text-xs uppercase tracking-[0.25em] text-leaf font-semibold mb-3">Milestones</div>
            <h2 className="text-4xl md:text-5xl font-bold">Our journey so far</h2>
          </div>
          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-leaf to-transparent" />
            <div className="space-y-12">
              {timeline.map((m, i) => (
                <motion.div
                  key={m.y}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className={`relative flex md:items-center gap-6 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
                >
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 size-4 rounded-full bg-lime-gradient ring-4 ring-background" />
                  <div className="md:w-1/2 md:px-12 pl-12 md:pl-0">
                    <div className="bg-card rounded-2xl p-6 shadow-card">
                      <div className="text-3xl font-display font-bold text-gradient">{m.y}</div>
                      <div className="font-bold mt-1">{m.t}</div>
                      <p className="text-sm text-muted-foreground mt-2">{m.d}</p>
                    </div>
                  </div>
                  <div className="hidden md:block md:w-1/2" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-hero text-white p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-pattern opacity-30" />
          <div className="relative">
            <h2 className="text-3xl md:text-5xl font-bold mb-5">Ready to grow with us?</h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">Join 100,000+ farmers and 3,000+ dealers already partnering with Signova.</p>
            <Link to="/contact" className="inline-flex px-8 py-4 rounded-2xl bg-lime-gradient text-charcoal font-semibold">Get in touch</Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
