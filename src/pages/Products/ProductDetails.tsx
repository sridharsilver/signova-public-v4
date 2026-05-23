import { motion } from "framer-motion";
import { Atom, Beaker, Package, X } from "lucide-react";
import type { Product } from "./index";

type ProductDetailsProps = {
  product: Product;
  onClose: () => void;
};

export default function ProductDetails({ product, onClose }: ProductDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-charcoal/70 backdrop-blur-sm grid place-items-center p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(event) => event.stopPropagation()}
        className="relative bg-card rounded-3xl shadow-glow max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 size-10 rounded-full bg-secondary hover:bg-muted grid place-items-center transition"
          aria-label="Close"
        >
          <X className="size-5" />
        </button>
        <div className="grid md:grid-cols-2 gap-0">
          <div className="bg-gradient-to-br from-secondary to-background grid place-items-center p-8 md:p-12 md:rounded-l-3xl">
            {product.image ? (
              <img src={product.image} alt={product.name} className="max-h-80 w-auto object-contain" />
            ) : (
              <div className="size-32 rounded-3xl bg-lime-gradient grid place-items-center">
                <Atom className="size-14 text-charcoal" />
              </div>
            )}
          </div>
          <div className="p-8 md:p-10">
            {product.tag && (
              <div className="inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold bg-lime-gradient text-charcoal mb-3">
                {product.tag}
              </div>
            )}
            <h2 className="font-display text-3xl font-bold mb-3">{product.name}</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">{product.uses ?? product.desc}</p>

            {product.dosage && (
              <div className="mb-5">
                <div className="flex items-center gap-2 text-sm font-semibold text-leaf mb-1.5">
                  <Beaker className="size-4" />
                  Dosage
                </div>
                <p className="text-sm text-foreground/80">{product.dosage}</p>
              </div>
            )}

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-leaf mb-2">
                  <Package className="size-4" />
                  Available sizes
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <span
                      key={size}
                      className="px-3 py-1.5 rounded-full text-xs font-semibold bg-secondary border border-border"
                    >
                      {size}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
