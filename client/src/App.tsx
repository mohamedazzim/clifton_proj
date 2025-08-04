import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import Home from "@/pages/Home";
import Products from "@/pages/Products";
import ProductCategory from "@/pages/ProductCategory";
import ProductDetail from "@/pages/ProductDetail";
import AboutUs from "@/pages/AboutUs";
import ContactUs from "@/pages/ContactUs";

import NotFound from "@/pages/not-found";

function Router() {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={AboutUs} />
        <Route path="/contact" component={ContactUs} />
        <Route path="/products" component={Products} />

        <Route path="/products/:category/:productName">
          {(params) => <ProductDetail category={params.category} productName={params.productName} />}
        </Route>
        <Route path="/products/:category">
          {(params) => <ProductCategory category={params.category} />}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Router />
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
