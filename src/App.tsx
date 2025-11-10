import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ClerkProvider, RedirectToSignIn, useAuth } from "@clerk/clerk-react";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";

const queryClient = new QueryClient();

// Get Clerk publishable key from environment variables
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerkPubKey) {
  console.warn("Missing Clerk Publishable Key. Admin features will not work.");
}

// Protected Admin Route Component
const ProtectedAdmin = () => {
  const { isLoaded, isSignedIn } = useAuth();

  // Wait for Clerk to load before making authentication decisions
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  // Once loaded, check if user is signed in
  if (!isSignedIn) {
    return <RedirectToSignIn redirectUrl="/admin/login" />;
  }

  // User is authenticated, render the admin page
  return <Admin />;
};

const App = () => {
  const appContent = (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/signup" element={<AdminSignup />} />
            <Route path="/admin" element={<ProtectedAdmin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );

  // Only wrap with ClerkProvider if we have a valid key
  if (clerkPubKey && clerkPubKey.length > 10) {
    return (
      <ClerkProvider
        publishableKey={clerkPubKey}
        signInUrl="/admin/login"
        signUpUrl="/admin/signup"
        afterSignOutUrl="/admin/login"
      >
        {appContent}
      </ClerkProvider>
    );
  }

  // Fallback: run without Clerk if key is missing (admin features won't work)
  return appContent;
};

export default App;
