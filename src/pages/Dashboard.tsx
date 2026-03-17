import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, Users, GraduationCap, BookOpen, DollarSign, Bell, TrendingUp, FileText, ArrowUpRight, Clock } from "lucide-react";

const ROLE_STATS: Record<string, { label: string; value: string; icon: React.ReactNode; change?: string; color: string }[]> = {
  super_admin: [
    { label: "Total Students", value: "1,247", icon: <GraduationCap className="h-5 w-5" />, change: "+12%", color: "bg-primary/8 text-primary" },
    { label: "Faculty Members", value: "86", icon: <Users className="h-5 w-5" />, change: "+3%", color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Active Programs", value: "14", icon: <BookOpen className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Fee Collection", value: "₹2.4Cr", icon: <DollarSign className="h-5 w-5" />, change: "+8%", color: "bg-success/10 text-success" },
  ],
  student: [
    { label: "Current GPA", value: "3.72", icon: <TrendingUp className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
    { label: "Courses Enrolled", value: "6", icon: <BookOpen className="h-5 w-5" />, color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Thesis Progress", value: "65%", icon: <FileText className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Notifications", value: "3", icon: <Bell className="h-5 w-5" />, color: "bg-warning/10 text-warning" },
  ],
  thesis_supervisor: [
    { label: "Assigned Students", value: "12", icon: <GraduationCap className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
    { label: "Pending Reviews", value: "5", icon: <FileText className="h-5 w-5" />, color: "bg-warning/10 text-warning" },
    { label: "Completed Reviews", value: "34", icon: <BookOpen className="h-5 w-5" />, color: "bg-success/10 text-success" },
    { label: "Avg. Grade", value: "B+", icon: <BarChart3 className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
  ],
  hod: [
    { label: "Department Students", value: "187", icon: <GraduationCap className="h-5 w-5" />, change: "+5%", color: "bg-primary/8 text-primary" },
    { label: "Faculty Members", value: "12", icon: <Users className="h-5 w-5" />, color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Active Courses", value: "8", icon: <BookOpen className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Thesis Submissions", value: "23", icon: <FileText className="h-5 w-5" />, color: "bg-success/10 text-success" },
  ],
  faculty: [
    { label: "My Students", value: "45", icon: <GraduationCap className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
    { label: "Classes Today", value: "3", icon: <BookOpen className="h-5 w-5" />, color: "bg-secondary/20 text-secondary-foreground" },
    { label: "Thesis Supervision", value: "7", icon: <FileText className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Pending Grades", value: "12", icon: <BarChart3 className="h-5 w-5" />, color: "bg-warning/10 text-warning" },
  ],
  finance: [
    { label: "Total Revenue", value: "₹2.4Cr", icon: <DollarSign className="h-5 w-5" />, change: "+8%", color: "bg-success/10 text-success" },
    { label: "Pending Fees", value: "₹18.5L", icon: <DollarSign className="h-5 w-5" />, color: "bg-warning/10 text-warning" },
    { label: "Scholarships", value: "142", icon: <GraduationCap className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
    { label: "Total Students", value: "1,247", icon: <Users className="h-5 w-5" />, color: "bg-secondary/20 text-secondary-foreground" },
  ],
};

const ACTIVITIES = [
  { title: "New student registration", time: "2 hours ago", desc: "Rahul Kumar registered for M.Th program", color: "bg-primary" },
  { title: "Thesis submission", time: "4 hours ago", desc: "Anna Thomas submitted Chapter 3 for review", color: "bg-accent" },
  { title: "Fee payment received", time: "Yesterday", desc: "₹45,000 received from Student ID: STU-2024-089", color: "bg-success" },
  { title: "Module grades updated", time: "Yesterday", desc: "Systematic Theology grades published for Semester 2", color: "bg-secondary" },
];

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  const stats = ROLE_STATS[user.role] || [];

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="page-title">Welcome back, {user.name.split(" ")[0]}</h2>
        <p className="page-subtitle">Here's what's happening today</p>
      </motion.div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
          >
            <Card className="stat-card group cursor-default">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${stat.color} transition-transform duration-200 group-hover:scale-105`}>
                    {stat.icon}
                  </div>
                  {stat.change && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <ArrowUpRight className="h-3 w-3" />
                      {stat.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold text-foreground font-['Merriweather']">{stat.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
      >
        <Card className="border-border/60 rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-['Merriweather']">Recent Activity</CardTitle>
              <button className="text-xs text-primary hover:underline font-medium">View All</button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {ACTIVITIES.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="flex items-start gap-4 p-3 rounded-xl hover:bg-muted/50 transition-colors -mx-1"
                >
                  <div className="mt-1.5 flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{item.desc}</p>
                  </div>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 flex-shrink-0">
                    <Clock className="h-3 w-3" />
                    {item.time}
                  </span>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
