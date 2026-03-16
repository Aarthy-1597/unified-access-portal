import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Users, BookOpen, Building2, FileText, DollarSign, Bell, Settings, GraduationCap, BarChart3, Layers } from "lucide-react";

const MENU_ITEMS: Record<string, { label: string; desc: string; icon: React.ReactNode; path: string }[]> = {
  super_admin: [
    { label: "Residential", path: "/dashboard/students", desc: "Manage residential students", icon: <Building2 className="h-6 w-6" /> },
    { label: "Online", path: "/dashboard/students", desc: "Manage online students", icon: <GraduationCap className="h-6 w-6" /> },
    { label: "Metrics", path: "/dashboard/metrics", desc: "View performance metrics", icon: <BarChart3 className="h-6 w-6" /> },
    { label: "Notifications", path: "/dashboard/notifications", desc: "Manage announcements", icon: <Bell className="h-6 w-6" /> },
    { label: "User Profile", path: "/dashboard/profile", desc: "View your profile", icon: <Users className="h-6 w-6" /> },
    { label: "Fee Management", path: "/dashboard/fees", desc: "Manage student fees", icon: <DollarSign className="h-6 w-6" /> },
    { label: "Module Management", path: "/dashboard/modules", desc: "Manage programs & courses", icon: <Layers className="h-6 w-6" /> },
    { label: "Settings", path: "/dashboard/settings", desc: "System settings", icon: <Settings className="h-6 w-6" /> },
  ],
  student: [
    { label: "Thesis", path: "/dashboard/thesis", desc: "View thesis progress", icon: <BookOpen className="h-6 w-6" /> },
  ],
  faculty: [
    { label: "Thesis", path: "/dashboard/thesis", desc: "Thesis supervision", icon: <BookOpen className="h-6 w-6" /> },
    { label: "Students", path: "/dashboard/students", desc: "Student information", icon: <GraduationCap className="h-6 w-6" /> },
  ],
  finance: [
    { label: "Students", path: "/dashboard/students", desc: "Student fee records", icon: <GraduationCap className="h-6 w-6" /> },
    { label: "Metrics", path: "/dashboard/metrics", desc: "Financial metrics", icon: <BarChart3 className="h-6 w-6" /> },
  ],
};

export default function MenuPage() {
  const { user } = useAuth();
  if (!user) return null;
  const items = MENU_ITEMS[user.role] || [];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Quick Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {items.map((item, i) => (
          <Link key={i} to={item.path}>
            <Card className="hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer h-full">
              <CardContent className="p-6 flex flex-col items-center text-center gap-3">
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary">{item.icon}</div>
                <h3 className="font-bold text-sm">{item.label}</h3>
                <p className="text-xs text-muted-foreground font-['Raleway']">{item.desc}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
