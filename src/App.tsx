
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import RouteGuard from "@/components/auth/RouteGuard";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import UserManagement from "./pages/UserManagement";
import PropertyValuation from "./pages/PropertyValuation";
import MyCourses from "./pages/MyCourses";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/pricing" element={<Pricing />} />

            {/* Protected User Routes */}
            <Route path="/dashboard" element={
              <RouteGuard>
                <Dashboard />
              </RouteGuard>
            } />
            <Route path="/valuation" element={
              <RouteGuard>
                <PropertyValuation />
              </RouteGuard>
            } />
            <Route path="/my-courses" element={
              <RouteGuard>
                <MyCourses />
              </RouteGuard>
            } />

            {/* Protected Admin Routes */}
            <Route path="/admin-dashboard" element={
              <RouteGuard requireAdmin>
                <AdminDashboard />
              </RouteGuard>
            } />
            <Route path="/users" element={
              <RouteGuard requireAdmin>
                <UserManagement />
              </RouteGuard>
            } />

            {/* Catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
