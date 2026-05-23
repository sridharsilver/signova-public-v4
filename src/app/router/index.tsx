import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import AppProviders from "@/app/providers/AppProviders";
import { routes } from "./routes";

function RouterView() {
  return useRoutes(routes);
}

function RouteLoader() {
  return (
    <div className="grid min-h-screen place-items-center bg-background text-foreground">
      <div className="text-sm font-medium text-muted-foreground">Loading...</div>
    </div>
  );
}

export default function AppRoutes() {
  return (
    <AppProviders>
      <Suspense fallback={<RouteLoader />}>
        <RouterView />
      </Suspense>
    </AppProviders>
  );
}
