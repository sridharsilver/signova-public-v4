import type { ReactNode } from "react";
import { Link, useParams } from "react-router-dom";
import {
  CheckCircle2,
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Leaf,
  FlaskConical,
  Sprout,
  Sparkles,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/common/PageShell";
import { deficiencyTemplate, getCropBySlug, type Deficiency } from "@/data/crops";
import { usePageMeta } from "@/hooks/use-page-meta";

type Accent = {
  symbol: string;
  ring: string;
  chip: string;
  glow: string;
};

const ACCENTS: Accent[] = [
  {
    symbol: "Mg",
    ring: "ring-emerald-400/40",
    chip: "bg-emerald-500/15 text-emerald-700 dark:bg-emerald-400/18 dark:text-emerald-200",
    glow: "from-emerald-500/25 via-emerald-400/10 to-transparent",
  },
  {
    symbol: "S",
    ring: "ring-amber-400/40",
    chip: "bg-amber-500/15 text-amber-700 dark:bg-amber-400/18 dark:text-amber-200",
    glow: "from-amber-500/25 via-amber-400/10 to-transparent",
  },
  {
    symbol: "Zn",
    ring: "ring-sky-400/40",
    chip: "bg-sky-500/15 text-sky-700 dark:bg-sky-400/18 dark:text-sky-200",
    glow: "from-sky-500/25 via-sky-400/10 to-transparent",
  },
  {
    symbol: "B",
    ring: "ring-rose-400/40",
    chip: "bg-rose-500/15 text-rose-700 dark:bg-rose-400/18 dark:text-rose-200",
    glow: "from-rose-500/25 via-rose-400/10 to-transparent",
  },
];

export default function NutrientManagementPage() {
  const { slug = "" } = useParams();
  const crop = getCropBySlug(slug);
  const deficiencies = deficiencyTemplate;

  usePageMeta({
    title: crop ? `${crop.name} Nutrient Management — Signova Group` : "Crop not found — Signova Group",
    description: crop
      ? `Stage-wise nutrient deficiency guide for ${crop.name}: symptoms, affects and recommended Signova solutions.`
      : "We don't have nutrient information for this crop yet.",
  });

  if (!crop) {
    return (
      <div className="max-w-2xl mx-auto p-12 text-center">
        <h2 className="text-3xl font-bold mb-3">Crop not found</h2>
        <p className="text-muted-foreground mb-6">
          We don't have nutrient information for this crop yet.
        </p>
        <Link
          to="/crops"
          className="inline-flex px-5 py-2 rounded-lg bg-primary text-primary-foreground"
        >
          Back to Crops
        </Link>
      </div>
    );
  }

  return (
    <>
      <PageHero
        eyebrow="Nutrient Management"
        title={`${crop.name} Nutrient Management`}
        subtitle="Identify nutrient deficiencies in the field and apply the right Signova solution at the right stage."
      />

      <section className="border-b border-border bg-background/95 supports-[backdrop-filter]:bg-background/80 backdrop-blur-md sticky top-20 z-30 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex flex-wrap items-center gap-3">
          <Link
            to="/crops"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mr-2"
          >
            <ArrowLeft className="size-4" /> All crops
          </Link>
          <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground hidden md:inline">
            Jump to ·
          </span>
          {deficiencies.map((deficiency, index) => (
            <a
              key={deficiency.name}
              href={`#${slugify(deficiency.name)}`}
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${ACCENTS[index].ring} ${ACCENTS[index].chip} hover:scale-[1.03] transition-transform`}
            >
              <span className="font-mono opacity-80">{ACCENTS[index].symbol}</span>
              {deficiency.name.replace(" Deficiency", "")}
            </a>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="pointer-events-none absolute -top-32 -left-32 size-[500px] rounded-full bg-lime/10 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 size-[420px] rounded-full bg-leaf/10 blur-3xl" />

        <div className="max-w-6xl mx-auto px-6 relative">
          <div className="max-w-3xl mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/15 text-xs uppercase tracking-[0.18em] text-primary dark:bg-accent/10 dark:text-lime mb-4">
              <Sparkles className="size-3.5" /> Field Reference
            </div>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Common deficiencies in <span className="text-gradient">{crop.name.toLowerCase()}</span>{" "}
              &amp; how to fix them
            </h2>
            <p className="mt-4 text-muted-foreground text-lg leading-relaxed">
              Spot symptoms early, understand the impact on yield and quality, and apply the matched
              Signova product through foliar spray, soil or drip — all in one place.
            </p>
          </div>

          <div className="space-y-16">
            {deficiencies.map((deficiency, index) => (
              <DeficiencyCard
                key={deficiency.name}
                deficiency={deficiency}
                index={index}
                accent={ACCENTS[index]}
              />
            ))}
          </div>

          <div className="mt-24 relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary via-primary to-leaf p-10 md:p-14 text-primary-foreground">
            <div className="absolute -top-20 -right-20 size-72 rounded-full bg-lime/30 blur-3xl" />
            <div className="relative grid md:grid-cols-[1.6fr_1fr] gap-8 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur text-xs uppercase tracking-[0.18em] mb-4">
                  <ShieldCheck className="size-3.5" /> Trusted by 100,000+ farmers
                </div>
                <h3 className="text-3xl md:text-4xl font-bold leading-tight">
                  Not sure which deficiency you're seeing?
                </h3>
                <p className="mt-3 text-primary-foreground/80 max-w-xl">
                  Send a photo of your field to our agronomist — get a personalised spray schedule for your{" "}
                  {crop.name.toLowerCase()} crop within 24 hours.
                </p>
              </div>
              <div className="flex md:justify-end">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-6 py-3 font-semibold shadow-glow hover:translate-x-0.5 transition-transform"
                >
                  Talk to an agronomist <ArrowRight className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DeficiencyCard({
  deficiency,
  index,
  accent,
}: {
  deficiency: Deficiency;
  index: number;
  accent: Accent;
}) {
  const reverse = index % 2 === 1;

  return (
    <article
      id={slugify(deficiency.name)}
      className="group relative scroll-mt-40 animate-fade-up"
      style={{ animationDelay: `${index * 80}ms` }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 left-0 md:-left-6 text-[8rem] md:text-[10rem] font-bold leading-none text-foreground/[0.04] select-none"
      >
        0{index + 1}
      </div>

      <div
        className={`relative grid md:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-0 overflow-hidden rounded-3xl border border-border bg-card shadow-card transition-shadow hover:shadow-glow ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}
      >
        <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[460px] overflow-hidden bg-muted">
          <div className={`absolute inset-0 bg-gradient-to-br ${accent.glow} mix-blend-screen`} />
          <img
            src={deficiency.img}
            alt={deficiency.name}
            loading="lazy"
            width={900}
            height={900}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="absolute top-5 left-5 flex items-center gap-3">
            <div
              className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ring-1 ${accent.ring} ${accent.chip} hover:scale-[1.03] transition-transform`}
            >
              {accent.symbol}
            </div>
            <div className="px-3 py-1.5 rounded-full bg-background/60 backdrop-blur border border-border text-xs font-semibold">
              Deficiency 0{index + 1} / {String(4).padStart(2, "0")}
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h3 className="text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {deficiency.name}
          </h3>
          <div className="mt-2 h-1 w-14 rounded-full bg-lime-gradient" />

          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            <InfoTile
              icon={<AlertTriangle className="size-4" />}
              label="Symptoms"
              tone="warning"
              value={deficiency.symptoms}
            />
            <InfoTile
              icon={<Leaf className="size-4" />}
              label="Affects"
              tone="warning"
              value={deficiency.affect}
            />
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-4">
              <div className="size-8 rounded-lg bg-lime-gradient flex items-center justify-center text-charcoal">
                <CheckCircle2 className="size-4" />
              </div>
              <h4 className="text-xl font-bold">Signova Solution</h4>
            </div>

            <div className="space-y-3">
              <SolutionRow
                icon={<FlaskConical className="size-4" />}
                label="Foliar / Product"
                value={deficiency.product}
              />
              <SolutionRow
                icon={<Sprout className="size-4" />}
                label="Soil &amp; Drip"
                value={deficiency.soilDrip}
              />
              <SolutionRow
                icon={<Sparkles className="size-4" />}
                label="Benefit"
                value={deficiency.benefit}
                highlight
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

function InfoTile({
  icon,
  label,
  value,
  tone,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  tone: "warning" | "default";
}) {
  const toneClass =
    tone === "warning"
      ? "bg-amber-500/10 text-amber-600 dark:text-amber-300 ring-amber-500/20"
      : "bg-muted text-foreground ring-border";

  return (
    <div className="rounded-2xl border border-border bg-background/40 p-5">
      <div className={`inline-flex items-center gap-2 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ${toneClass}`}>
        {icon} {label}
      </div>
      <p className="mt-3 text-sm text-foreground/85 leading-relaxed">{value}</p>
    </div>
  );
}

function SolutionRow({
  icon,
  label,
  value,
  highlight = false,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="flex gap-3">
      <div
        className={`shrink-0 mt-0.5 size-8 rounded-lg flex items-center justify-center ${highlight ? "bg-lime-gradient text-charcoal" : "bg-background border border-border text-foreground/80"}`}
      >
        {icon}
      </div>
      <div>
        <div
          className="text-xs font-semibold uppercase tracking-wider text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: label }}
        />
        <p className="text-foreground/90 leading-relaxed">{value}</p>
      </div>
    </div>
  );
}

function slugify(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}
