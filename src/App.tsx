import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import Home from "./pages/Home";
import Resume from "./pages/Resume";
import CallToAction from "./pages/CallToAction";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="relative min-h-screen">
          <Navigation />
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<Home />} />
              <Route path="/projects" element={<Home />} />
              <Route path="/skills" element={<Home />} />
              <Route path="/contact" element={<Home />} />
              <Route path="/certificates" element={<Home />} />
              <Route path="/profiles" element={<Home />} />
              <Route path="/social" element={<Home />} />
              <Route path="/resume" element={<Resume />} />
              <Route path="/hire" element={<CallToAction />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
