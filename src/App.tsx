import React from "react";
import { useCurrentRoute } from "@/lib/router-compat";
import Index from "./routes/index";
import AuthPage from "./routes/auth";

export default function App() {
  const currentRoute = useCurrentRoute();

  if (currentRoute === "/auth") {
    return <AuthPage />;
  }

  return <Index />;
}
