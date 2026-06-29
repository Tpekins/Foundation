import { Outlet } from "react-router-dom";
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { Transect } from "../components/Transect";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-paper text-ink selection:bg-laterite selection:text-paper font-body flex flex-col">
      <Header />
      
      <main className="flex-1">
        <Outlet />
      </main>

      <Transect />
      <Footer />
    </div>
  );
}
