import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Leaf } from "lucide-react";
import { PageHero } from "@/components/common/PageShell";
import { crops } from "@/data/crops";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function CropsPage() {
  usePageMeta({
    title: "Crop Solutions — Signova Group",
    description: "Crop-specific nutrition programmes for chilli, paddy, cotton, mango, tomato, citrus, watermelon and cashew.",
  });

  return (
    <>
      <PageHero
        eyebrow="Crop Solutions"
        title="Tailored science for every crop"
        subtitle="Stage-wise nutrition programmes designed by agronomists and tested across Indian agro-climatic zones."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {crops.map((crop, index) => (
            <motion.div
              key={crop.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={`/crops/${crop.slug}/nutrients`}
                className="group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition duration-300"
              >
                <img
                  src={crop.image}
                  alt={crop.name}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 right-4 z-10 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/45 backdrop-blur border border-white/10 text-[10px] font-semibold tracking-wide text-white/90 shadow-sm group-hover:bg-lime group-hover:text-charcoal transition-all duration-300">
                  <Leaf className="size-3.5" />
                  Nutrient Management
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex flex-col justify-end text-left z-10">
                  <span className="text-[11px] font-semibold text-white/65 tracking-wider mb-1 uppercase leading-snug">
                    {crop.note}
                  </span>
                  <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                    {crop.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="py-20 bg-secondary/40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-5">Need a custom programme?</h2>
          <p className="text-muted-foreground text-lg mb-8">
            Our agronomists craft stage-wise nutrition plans for any crop in any region.
          </p>
          <Link
            to="/contact"
            className="inline-flex px-8 py-4 rounded-2xl bg-primary text-primary-foreground font-semibold"
          >
            Talk to an agronomist
          </Link>
        </div>
      </section>
    </>
  );
}
