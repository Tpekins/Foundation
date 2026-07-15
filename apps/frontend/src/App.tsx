import { Outlet } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

export default function App() {
  return (
    <HelmetProvider>
      <Outlet />
    </HelmetProvider>
  );
}
