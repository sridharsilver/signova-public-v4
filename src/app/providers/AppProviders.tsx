import type { PropsWithChildren } from "react";
import { ThemeProvider } from "@/hooks/use-theme";

export default function AppProviders({ children }: PropsWithChildren) {
  return <ThemeProvider>{children}</ThemeProvider>;
}
