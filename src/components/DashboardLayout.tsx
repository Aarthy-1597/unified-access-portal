import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, UserRole, ROLE_LABELS } from "@/lib/auth-context";
import saiacsLogo from "@/assets/saiacs-logo.png";
import {
  LayoutDashboard, User, BarChart3, Menu as MenuIcon, Bell, BookOpen,
  GraduationCap, UserPlus, Users, Settings, CreditCard, ChevronDown,
  LogOut, PanelLeftClose, PanelLeft, Building2, FileText, Layers,
  DollarSign, ClipboardList
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  super_admin: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Student Register", path: "/dashboard/students", icon: <UserPlus className="h-4 w-4" /> },
    { label: "Metrics", path: "/dashboard/metrics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-4 w-4" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-4 w-4" /> },
    { label: "User Profile", path: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
    { label: "Admin & Roles", path: "/dashboard/admin-roles", icon: <Users className="h-4 w-4" /> },
    { label: "Module Management", path: "/dashboard/modules", icon: <Layers className="h-4 w-4" /> },
    { label: "Fee Management", path: "/dashboard/fees", icon: <DollarSign className="h-4 w-4" /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Settings className="h-4 w-4" /> },
  ],
  student: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "User Profile", path: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-4 w-4" /> },
    { label: "Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-4 w-4" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Course Info & Grades", path: "/dashboard/courses", icon: <GraduationCap className="h-4 w-4" /> },
  ],
  thesis_supervisor: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "Thesis Review", path: "/dashboard/thesis-review", icon: <FileText className="h-4 w-4" /> },
  ],
  hod: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "User Profile", path: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-4 w-4" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-4 w-4" /> },
  ],
  faculty: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "User Profile", path: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
    { label: "Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-4 w-4" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-4 w-4" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-4 w-4" /> },
  ],
  finance: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-4 w-4" /> },
    { label: "User Profile", path: "/dashboard/profile", icon: <User className="h-4 w-4" /> },
    { label: "Metrics", path: "/dashboard/metrics", icon: <BarChart3 className="h-4 w-4" /> },
    { label: "Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-4 w-4" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-4 w-4" /> },
  ],
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!user) return null;
  const navItems = NAV_ITEMS[user.role] || [];

  const handleLogout = () => { logout(); navigate("/"); };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
        <img src={saiacsLogo} alt="SAIACS" className="w-8 h-8 brightness-0 invert flex-shrink-0" />
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="font-bold text-sm text-sidebar-foreground font-['Merriweather'] truncate">SAIACS</p>
            <p className="text-[10px] text-sidebar-foreground/60 font-['Raleway'] truncate">Academic Management</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-['Raleway'] transition-all ${
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground font-semibold"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}
            >
              {item.icon}
              {!collapsed && <span className="truncate">{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-3 px-2 py-2">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center text-sidebar-foreground text-xs font-bold flex-shrink-0">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          {!collapsed && (
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/60 truncate">{ROLE_LABELS[user.role]}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 mt-1 rounded-lg text-sm text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-all font-['Raleway']"
        >
          <LogOut className="h-4 w-4" />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside className={`hidden md:flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300 ${collapsed ? "w-16" : "w-60"}`}>
        <SidebarContent />
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-foreground/40" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-60 h-full bg-sidebar">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-14 border-b border-border bg-card flex items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-foreground">
              <PanelLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setCollapsed(!collapsed)} className="hidden md:block text-muted-foreground hover:text-foreground">
              {collapsed ? <PanelLeft className="h-5 w-5" /> : <PanelLeftClose className="h-5 w-5" />}
            </button>
            <h1 className="text-sm font-semibold text-foreground font-['Merriweather']">
              {ROLE_LABELS[user.role]} Portal
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative text-muted-foreground hover:text-foreground">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-accent rounded-full" />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
