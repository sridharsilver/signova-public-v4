import { lazy } from "react";
import type { RouteObject } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import AdminLayout from "@/app/layouts/AdminLayout";

const HomePage = lazy(() => import("@/pages/Home"));
const AboutPage = lazy(() => import("@/pages/About"));
const ProductsPage = lazy(() => import("@/pages/Products"));
const KnowledgePage = lazy(() => import("@/pages/Knowledge"));
const KnowledgeDetailsPage = lazy(() => import("@/pages/Knowledge/KnowledgeDetails"));
const CareersPage = lazy(() => import("@/pages/Careers"));
const ContactPage = lazy(() => import("@/pages/Contact"));
const DistributorPage = lazy(() => import("@/pages/Distributor"));
const InnovationPage = lazy(() => import("@/pages/Innovation"));
const CropsPage = lazy(() => import("@/pages/Crops"));
const NutrientManagementPage = lazy(() => import("@/pages/Crops/NutrientManagement"));

function NotFoundPage() {
  return (
    <div className="grid min-h-[60vh] place-items-center px-6 text-center">
      <div>
        <h1 className="text-6xl font-bold">404</h1>
        <p className="mt-3 text-muted-foreground">The page you requested could not be found.</p>
      </div>
    </div>
  );
}

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      { path: "products", element: <ProductsPage /> },
      { path: "knowledge", element: <KnowledgePage /> },
      { path: "knowledge/:slug", element: <KnowledgeDetailsPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "contact", element: <ContactPage /> },
      { path: "distributor", element: <DistributorPage /> },
      { path: "innovation", element: <InnovationPage /> },
      { path: "crops", element: <CropsPage /> },
      { path: "crops/:slug/nutrients", element: <NutrientManagementPage /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [{ path: "*", element: <NotFoundPage /> }],
  },
];
