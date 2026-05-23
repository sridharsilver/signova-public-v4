import type { RouteObject } from "react-router-dom";
import MainLayout from "@/app/layouts/MainLayout";
import AdminLayout from "@/app/layouts/AdminLayout";
import HomePage from "@/pages/Home/index";
import AboutPage from "@/pages/About/index";
import ProductsPage from "@/pages/Products/index";
import KnowledgePage from "@/pages/Knowledge/index";
import KnowledgeDetailsPage from "@/pages/Knowledge/KnowledgeDetails";
import CareersPage from "@/pages/Careers/index";
import ContactPage from "@/pages/Contact/index";
import DistributorPage from "@/pages/Distributor/index";
import InnovationPage from "@/pages/Innovation/index";
import CropsPage from "@/pages/Crops/index";
import NutrientManagementPage from "@/pages/Crops/NutrientManagement";

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
