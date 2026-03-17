import { useAuth } from "@/lib/auth-context";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BookOpen, Building2, DollarSign, Bell, Settings, GraduationCap, BarChart3, Layers, ArrowRight } from "lucide-react";

const MENU_ITEMS: Record<string, { label: string; desc: string; icon: React.ReactNode; path: string; color: string }[]> = {
  super_admin: [
    { label: "Residential", path: "/dashboard/students", desc: "Manage residential students", icon: <Building2 className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Online", path: "/dashboard/students", desc: "Manage online students", icon: <GraduationCap className="h-6 w-6" />, color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Metrics", path: "/dashboard/metrics", desc: "View performance metrics", icon: <BarChart3 className="h-6 w-6" />, color: "bg-success/10 text-success" },
    { label: "Notifications", path: "/dashboard/notifications", desc: "Manage announcements", icon: <Bell className="h-6 w-6" />, color: "bg-warning/10 text-warning" },
    { label: "User Profile", path: "/dashboard/profile", desc: "View your profile", icon: <Users className="h-6 w-6" />, color: "bg-info/10 text-info" },
    { label: "Fee Management", path: "/dashboard/fees", desc: "Manage student fees", icon: <DollarSign className="h-6 w-6" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Modules", path: "/dashboard/modules", desc: "Manage programs & courses", icon: <Layers className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Settings", path: "/dashboard/settings", desc: "System settings", icon: <Settings className="h-6 w-6" />, color: "bg-muted text-muted-foreground" },
  ],
  student: [
    { label: "Thesis", path: "/dashboard/thesis", desc: "View thesis progress", icon: <BookOpen className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
  ],
  thesis_supervisor: [
    { label: "Thesis Review", path: "/dashboard/thesis-review", desc: "Review submissions & grading", icon: <BookOpen className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Notifications", path: "/dashboard/notifications", desc: "Announcements and alerts", icon: <Bell className="h-6 w-6" />, color: "bg-warning/10 text-warning" },
  ],
  hod: [
    { label: "Students", path: "/dashboard/students", desc: "Department student records", icon: <GraduationCap className="h-6 w-6" />, color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Thesis", path: "/dashboard/thesis", desc: "Track submissions & progress", icon: <BookOpen className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Notifications", path: "/dashboard/notifications", desc: "Department announcements", icon: <Bell className="h-6 w-6" />, color: "bg-warning/10 text-warning" },
  ],
  faculty: [
    { label: "Thesis", path: "/dashboard/thesis", desc: "Thesis supervision", icon: <BookOpen className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Students", path: "/dashboard/students", desc: "Student information", icon: <GraduationCap className="h-6 w-6" />, color: "bg-secondary/20 text-secondary-foreground" },
  ],
  finance: [
    { label: "Students", path: "/dashboard/students", desc: "Student fee records", icon: <GraduationCap className="h-6 w-6" />, color: "bg-primary/8 text-primary" },
    { label: "Metrics", path: "/dashboard/metrics", desc: "Financial metrics", icon: <BarChart3 className="h-6 w-6" />, color: "bg-success/10 text-success" },
  ],
};

export default function MenuPage() {
  const { user } = useAuth();
  if (!user) return null;
  const items = MENU_ITEMS[user.role] || [];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="page-title">Quick Menu</h2>
        <p className="page-subtitle">Quick access to frequently used features</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Link to={item.path}>
              <Card className="rounded-2xl border-border/60 hover:shadow-md hover:border-primary/20 transition-all duration-300 cursor-pointer group h-full">
                <CardContent className="p-6 flex flex-col items-center text-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform duration-200`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm font-['Merriweather']">{item.label}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{item.desc}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
