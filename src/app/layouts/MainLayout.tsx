import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/common/Navbar";
import { Footer } from "@/components/common/Footer";
import { WhatsAppFab } from "@/components/common/WhatsAppFab";
import { AIChatbot } from "@/components/common/AIChatbot";

export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppFab />
      <AIChatbot />
    </div>
  );
}
