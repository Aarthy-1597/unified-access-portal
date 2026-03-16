import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth } from "@/lib/auth-context";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import DashboardLayout from "./components/DashboardLayout";
import ProfilePage from "./pages/ProfilePage";
import MetricsPage from "./pages/MetricsPage";
import StudentsPage from "./pages/StudentsPage";
import NotificationsPage from "./pages/NotificationsPage";
import MenuPage from "./pages/MenuPage";
import ThesisPage from "./pages/ThesisPage";
import CoursesPage from "./pages/CoursesPage";
import AdminRolesPage from "./pages/AdminRolesPage";
import ModulesPage from "./pages/ModulesPage";
import FeesPage from "./pages/FeesPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/" replace />;
  return <DashboardLayout>{children}</DashboardLayout>;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <Login />} />
      <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
      <Route path="/dashboard/metrics" element={<ProtectedRoute><MetricsPage /></ProtectedRoute>} />
      <Route path="/dashboard/students" element={<ProtectedRoute><StudentsPage /></ProtectedRoute>} />
      <Route path="/dashboard/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/dashboard/menu" element={<ProtectedRoute><MenuPage /></ProtectedRoute>} />
      <Route path="/dashboard/thesis" element={<ProtectedRoute><ThesisPage /></ProtectedRoute>} />
      <Route path="/dashboard/thesis-review" element={<ProtectedRoute><ThesisPage /></ProtectedRoute>} />
      <Route path="/dashboard/courses" element={<ProtectedRoute><CoursesPage /></ProtectedRoute>} />
      <Route path="/dashboard/admin-roles" element={<ProtectedRoute><AdminRolesPage /></ProtectedRoute>} />
      <Route path="/dashboard/modules" element={<ProtectedRoute><ModulesPage /></ProtectedRoute>} />
      <Route path="/dashboard/fees" element={<ProtectedRoute><FeesPage /></ProtectedRoute>} />
      <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
