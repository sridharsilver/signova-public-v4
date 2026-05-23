import { Link } from "react-router-dom";
import { Clock } from "lucide-react";
import { PageHero } from "@/components/common/PageShell";
import { usePageMeta } from "@/hooks/use-page-meta";
import { articles } from "./KnowledgeDetails";

export default function KnowledgePage() {
  usePageMeta({
    title: "Knowledge Centre — Signova Group",
    description: "Crop nutrition guides, deficiency identification, agronomy tips and the latest agri-research from Signova experts.",
  });

  return (
    <>
      <PageHero
        eyebrow="Knowledge Centre"
        title="Practical agronomy, lab-grade science"
        subtitle="Field guides, deficiency manuals and crop research curated by Signova experts."
      />

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/knowledge/${article.slug}`}
              className="group bg-card rounded-3xl overflow-hidden shadow-card hover:shadow-glow hover:-translate-y-1 transition"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={article.img}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wider mb-3">
                  <span className="text-leaf font-semibold">{article.tag}</span>
                  <span className="text-muted-foreground inline-flex items-center gap-1">
                    <Clock className="size-3" />
                    {article.time}
                  </span>
                </div>
                <h3 className="text-lg font-bold leading-snug group-hover:text-primary transition mb-2">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{article.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
