import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth, UserRole, ROLE_LABELS } from "@/lib/auth-context";
import saiacsLogo from "@/assets/saiacs-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, User, BarChart3, Menu as MenuIcon, Bell, BookOpen,
  GraduationCap, UserPlus, Users, Settings, CreditCard, ChevronDown,
  LogOut, PanelLeftClose, PanelLeft, Building2, FileText, Layers,
  DollarSign, ClipboardList, ChevronRight, Search, X
} from "lucide-react";

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

const NAV_ITEMS: Record<UserRole, NavItem[]> = {
  super_admin: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Student Register", path: "/dashboard/students", icon: <UserPlus className="h-[18px] w-[18px]" /> },
    { label: "Metrics", path: "/dashboard/metrics", icon: <BarChart3 className="h-[18px] w-[18px]" /> },
    { label: "Quick Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-[18px] w-[18px]" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
    { label: "Admin & Roles", path: "/dashboard/admin-roles", icon: <Users className="h-[18px] w-[18px]" /> },
    { label: "Modules", path: "/dashboard/modules", icon: <Layers className="h-[18px] w-[18px]" /> },
    { label: "Fee Management", path: "/dashboard/fees", icon: <DollarSign className="h-[18px] w-[18px]" /> },
    { label: "Settings", path: "/dashboard/settings", icon: <Settings className="h-[18px] w-[18px]" /> },
  ],
  student: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-[18px] w-[18px]" /> },
    { label: "Quick Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-[18px] w-[18px]" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-[18px] w-[18px]" /> },
    { label: "Courses & Grades", path: "/dashboard/courses", icon: <GraduationCap className="h-[18px] w-[18px]" /> },
  ],
  thesis_supervisor: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Thesis Review", path: "/dashboard/thesis-review", icon: <FileText className="h-[18px] w-[18px]" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
  ],
  hod: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-[18px] w-[18px]" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-[18px] w-[18px]" /> },
    { label: "Notifications", path: "/dashboard/notifications", icon: <Bell className="h-[18px] w-[18px]" /> },
  ],
  faculty: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
    { label: "Quick Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-[18px] w-[18px]" /> },
    { label: "Thesis", path: "/dashboard/thesis", icon: <BookOpen className="h-[18px] w-[18px]" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-[18px] w-[18px]" /> },
  ],
  finance: [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard className="h-[18px] w-[18px]" /> },
    { label: "Profile", path: "/dashboard/profile", icon: <User className="h-[18px] w-[18px]" /> },
    { label: "Metrics", path: "/dashboard/metrics", icon: <BarChart3 className="h-[18px] w-[18px]" /> },
    { label: "Quick Menu", path: "/dashboard/menu", icon: <MenuIcon className="h-[18px] w-[18px]" /> },
    { label: "Students & Grades", path: "/dashboard/students", icon: <ClipboardList className="h-[18px] w-[18px]" /> },
  ],
};

// Breadcrumb mapping
const BREADCRUMB_MAP: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/students": "Students",
  "/dashboard/metrics": "Metrics",
  "/dashboard/menu": "Quick Menu",
  "/dashboard/notifications": "Notifications",
  "/dashboard/profile": "Profile",
  "/dashboard/admin-roles": "Admin & Roles",
  "/dashboard/modules": "Modules",
  "/dashboard/fees": "Fee Management",
  "/dashboard/settings": "Settings",
  "/dashboard/thesis": "Thesis",
  "/dashboard/thesis-review": "Thesis Review",
  "/dashboard/courses": "Courses & Grades",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  if (!user) return null;
  const navItems = NAV_ITEMS[user.role] || [];

  const handleLogout = () => { logout(); navigate("/"); };

  const breadcrumbs = [
    { label: "Home", path: "/dashboard" },
    ...(location.pathname !== "/dashboard"
      ? [{ label: BREADCRUMB_MAP[location.pathname] || "Page", path: location.pathname }]
      : []),
  ];

  const SidebarNav = ({ isMobile = false }: { isMobile?: boolean }) => (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className="flex items-center gap-3 px-5 h-16 border-b border-sidebar-border flex-shrink-0">
        <img src={saiacsLogo} alt="SAIACS" className="w-8 h-8 brightness-0 invert flex-shrink-0" />
        {(!collapsed || isMobile) && (
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className="overflow-hidden"
          >
            <p className="font-bold text-[13px] text-sidebar-foreground font-['Merriweather'] leading-tight">SAIACS</p>
            <p className="text-[10px] text-sidebar-foreground/50 leading-tight mt-0.5">Academic Management</p>
          </motion.div>
        )}
        {isMobile && (
          <button onClick={() => setMobileOpen(false)} className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground">
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {navItems.map((item, idx) => {
          const isActive = location.pathname === item.path;
          return (
            <motion.div
              key={item.path}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.03 }}
            >
              <Link
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-sm"
                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground"
                }`}
              >
                <span className={`flex-shrink-0 transition-transform duration-200 ${isActive ? "" : "group-hover:scale-110"}`}>
                  {item.icon}
                </span>
                {(!collapsed || isMobile) && <span className="truncate">{item.label}</span>}
                {isActive && (!collapsed || isMobile) && (
                  <ChevronRight className="h-3.5 w-3.5 ml-auto opacity-60" />
                )}
              </Link>
            </motion.div>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-sidebar-border p-3 flex-shrink-0">
        <div className="flex items-center gap-3 px-2 py-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sidebar-primary to-sidebar-primary/70 flex items-center justify-center text-sidebar-primary-foreground text-xs font-bold flex-shrink-0 shadow-sm">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          {(!collapsed || isMobile) && (
            <div className="overflow-hidden flex-1">
              <p className="text-xs font-semibold text-sidebar-foreground truncate">{user.name}</p>
              <p className="text-[10px] text-sidebar-foreground/50 truncate">{ROLE_LABELS[user.role]}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 w-full px-3 py-2 mt-1 rounded-xl text-[13px] text-sidebar-foreground/50 hover:bg-destructive/10 hover:text-destructive transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          {(!collapsed || isMobile) && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-background">
      {/* Desktop sidebar */}
      <aside
        className={`hidden md:flex flex-col bg-sidebar transition-all duration-300 ease-in-out flex-shrink-0 ${
          collapsed ? "w-[68px]" : "w-[250px]"
        }`}
      >
        <SidebarNav />
      </aside>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-foreground/30 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 24, stiffness: 300 }}
              className="fixed left-0 top-0 bottom-0 z-50 w-[260px] bg-sidebar md:hidden shadow-elevated"
            >
              <SidebarNav isMobile />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md flex items-center justify-between px-4 sm:px-6 flex-shrink-0 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-muted-foreground hover:text-foreground transition-colors">
              <PanelLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden md:flex items-center justify-center w-8 h-8 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              {collapsed ? <PanelLeft className="h-[18px] w-[18px]" /> : <PanelLeftClose className="h-[18px] w-[18px]" />}
            </button>

            {/* Breadcrumbs */}
            <nav className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              {breadcrumbs.map((bc, i) => (
                <span key={bc.path} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="h-3 w-3 opacity-40" />}
                  <Link
                    to={bc.path}
                    className={`hover:text-foreground transition-colors ${
                      i === breadcrumbs.length - 1 ? "text-foreground font-medium" : ""
                    }`}
                  >
                    {bc.label}
                  </Link>
                </span>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            {/* Search */}
            <button className="flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all">
              <Search className="h-[18px] w-[18px]" />
            </button>

            {/* Notifications */}
            <Link
              to="/dashboard/notifications"
              className="relative flex items-center justify-center w-9 h-9 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-accent rounded-full ring-2 ring-card" />
            </Link>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2.5 pl-2 pr-3 py-1.5 rounded-xl hover:bg-muted transition-all"
              >
                <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                  {user.name.split(" ").map(n => n[0]).join("")}
                </div>
                <div className="hidden sm:block text-left">
                  <p className="text-xs font-semibold text-foreground leading-tight">{user.name.split(" ")[0]}</p>
                  <p className="text-[10px] text-muted-foreground leading-tight">{ROLE_LABELS[user.role].split("/")[0].trim()}</p>
                </div>
                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground hidden sm:block" />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: 4, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.97 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-xl shadow-elevated z-50 py-1.5 overflow-hidden"
                    >
                      <div className="px-3 py-2.5 border-b border-border">
                        <p className="text-xs font-semibold text-foreground">{user.name}</p>
                        <p className="text-[10px] text-muted-foreground">{user.email}</p>
                      </div>
                      <Link
                        to="/dashboard/profile"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                      >
                        <User className="h-3.5 w-3.5" /> View Profile
                      </Link>
                      <Link
                        to="/dashboard/settings"
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors"
                      >
                        <Settings className="h-3.5 w-3.5" /> Settings
                      </Link>
                      <div className="border-t border-border mt-1 pt-1">
                        <button
                          onClick={handleLogout}
                          className="flex items-center gap-2 w-full px-3 py-2 text-xs text-destructive hover:bg-destructive/5 transition-colors"
                        >
                          <LogOut className="h-3.5 w-3.5" /> Sign Out
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
