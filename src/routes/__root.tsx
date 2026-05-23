import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { AIChatbot } from "@/components/layout/AIChatbot";
import { ThemeProvider } from "@/hooks/use-theme";

import appCss from "../styles/globals.css?url";

const themeInitScript = `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':window.matchMedia('(prefers-color-scheme: dark)').matches;if(d)document.documentElement.classList.add('dark');}catch(e){}})();`;

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist.
        </p>
        <div className="mt-6">
          <Link to="/" className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90">
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Signova Group — Science-driven Crop Nutrition & Micronutrients" },
      { name: "description", content: "Signova Group of Companies delivers advanced micronutrients, bio-stimulants, and crop solutions trusted by 100,000+ Indian farmers." },
      { name: "author", content: "Signova Group" },
      { property: "og:title", content: "Signova Group — Science-driven Crop Nutrition & Micronutrients" },
      { property: "og:description", content: "Signova Group of Companies delivers advanced micronutrients, bio-stimulants, and crop solutions trusted by 100,000+ Indian farmers." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Signova Group — Science-driven Crop Nutrition & Micronutrients" },
      { name: "twitter:description", content: "Signova Group of Companies delivers advanced micronutrients, bio-stimulants, and crop solutions trusted by 100,000+ Indian farmers." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b4103225-943d-45a9-9115-bedcb19830fd/id-preview-a7d47b1b--43fd0f07-82c3-4b19-be9b-cb860c236c1b.lovable.app-1777745658489.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/b4103225-943d-45a9-9115-bedcb19830fd/id-preview-a7d47b1b--43fd0f07-82c3-4b19-be9b-cb860c236c1b.lovable.app-1777745658489.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap" },
      { rel: "stylesheet", href: appCss },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFab />
        <AIChatbot />
      </div>
    </ThemeProvider>
  );
}
