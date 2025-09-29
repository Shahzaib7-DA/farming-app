import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { useNavigate, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/components/LanguageProvider";
import Home from "./pages/Home";
import Index from "./pages/Index";
import Profile from "./pages/Profile";
import Query from "./pages/Query";
import Activities from "./pages/Activities";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

import ChatbotAssistant from "@/components/ChatbotAssistant";

const queryClient = new QueryClient();


// Wrapper to handle login state and redirect
function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const farmerProfile = localStorage.getItem("farmerProfile");
    if (!farmerProfile) {
      // Allow welcome page at "/" without redirecting to login
      if (location.pathname !== "/" && location.pathname !== "/login") {
        navigate("/", { replace: true });
      }
    } else if (farmerProfile && location.pathname === "/login") {
      navigate("/home", { replace: true });
    }
  }, [location.pathname, navigate]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Index />} />
      <Route path="/home" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/query" element={<Query />} />
      <Route path="/activities" element={<Activities />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}


const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
          <ChatbotAssistant />
        </BrowserRouter>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
