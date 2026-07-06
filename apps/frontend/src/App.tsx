import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { AboutUs } from "./pages/AboutUs";
import { Initiatives } from "./components/Initiatives";
import { FieldLog } from "./components/FieldLog";

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/field-log" element={<FieldLog />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
