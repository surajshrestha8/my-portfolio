import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState } from "react";
import Cursor from "./components/Cursor";
import ScrollProgress from "./components/ScrollProgress";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener("resize", checkMobile);
    
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {!isMobile && <Cursor />}
      <ScrollProgress />
      <Navbar />
      <main>
        <Router />
      </main>
      <Footer />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
