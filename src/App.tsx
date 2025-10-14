import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import { AnimatePresence } from "framer-motion";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { LinksProvider } from "@/contexts/LinksContext";
import { ThemeProvider } from "@/contexts/ThemeContext";

// Lazy loading de componentes para code splitting
const Index = lazy(() => import("./pages/Index"));
const NotFound = lazy(() => import("./pages/NotFound"));
const GuiasYManuales = lazy(() => import("./components/GuiasYManuales"));
const Tutoriales = lazy(() => import("./components/Tutoriales"));
const Interoperabilidad = lazy(() => import("./pages/Interoperabilidad"));
const Normatividad = lazy(() => import("./pages/Normatividad"));
const GestoresComunitarios = lazy(() => import("./pages/GestoresComunitarios"));
const AdminLinks = lazy(() => import("./pages/AdminLinks"));
const Sitemap = lazy(() => import("./pages/Sitemap"));
const SearchResults = lazy(() => import("./pages/SearchResults"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index />} />
        <Route path="/guias-manuales" element={<GuiasYManuales />} />
        <Route path="/tutoriales" element={<Tutoriales />} />
        <Route path="/interoperabilidad" element={<Interoperabilidad />} />
        <Route path="/normatividad" element={<Normatividad />} />
        <Route path="/gestores-comunitarios" element={<GestoresComunitarios />} />
        <Route path="/sitemap" element={<Sitemap />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/admin/links" element={<AdminLinks />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LinksProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <AnimatedRoutes />
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LinksProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
