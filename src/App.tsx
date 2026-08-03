import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import CallToAction from "./pages/CallToAction";
import NotFound from "./pages/NotFound";
import ExperiencePage from "./pages/Experience";

import { AuthProvider } from "@/context/AuthContext";
import { PortfolioDataProvider } from "@/context/PortfolioDataContext";
import AdminLogin from "@/pages/admin/AdminLogin";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import { ProtectedAdminRoute } from "@/components/admin/ProtectedAdminRoute";

const queryClient = new QueryClient();

const Layout = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="relative min-h-screen">
      {!isAdminRoute && <Navigation />}
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Home />} />
          <Route path="/experience" element={<Home />} />
          <Route path="/skills" element={<Home />} />
          <Route path="/projects" element={<Home />} />
          <Route path="/certificates" element={<Home />} />
          <Route path="/social" element={<Home />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/hire" element={<CallToAction />} />

          {/* Admin CMS Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard/*"
            element={
              <ProtectedAdminRoute>
                <AdminDashboard />
              </ProtectedAdminRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <PortfolioDataProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Layout />
          </BrowserRouter>
        </TooltipProvider>
      </PortfolioDataProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
