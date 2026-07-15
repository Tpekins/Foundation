import type { RouteObject } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { Home } from "./pages/Home";
import { OurRoots } from "./pages/OurRoots";
import { Initiatives } from "./components/Initiatives";
import { FieldLog } from "./components/FieldLog";
import { NotFound } from "./components/NotFound";

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "our-roots", element: <OurRoots /> },
      { path: "initiatives", element: <Initiatives /> },
      { path: "field-log", element: <FieldLog /> },
      { path: "*", element: <NotFound /> },
    ],
  },
];
