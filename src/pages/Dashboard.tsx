import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, GraduationCap, BookOpen, DollarSign, Bell, TrendingUp, FileText } from "lucide-react";

const ROLE_STATS: Record<string, { label: string; value: string; icon: React.ReactNode; change?: string }[]> = {
  super_admin: [
    { label: "Total Students", value: "1,247", icon: <GraduationCap className="h-5 w-5" />, change: "+12%" },
    { label: "Faculty Members", value: "86", icon: <Users className="h-5 w-5" />, change: "+3%" },
    { label: "Active Programs", value: "14", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Fee Collection", value: "₹2.4Cr", icon: <DollarSign className="h-5 w-5" />, change: "+8%" },
  ],
  student: [
    { label: "Current GPA", value: "3.72", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Courses Enrolled", value: "6", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Thesis Progress", value: "65%", icon: <FileText className="h-5 w-5" /> },
    { label: "Notifications", value: "3", icon: <Bell className="h-5 w-5" /> },
  ],
  thesis_supervisor: [
    { label: "Assigned Students", value: "12", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Pending Reviews", value: "5", icon: <FileText className="h-5 w-5" /> },
    { label: "Completed Reviews", value: "34", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Avg. Grade", value: "B+", icon: <BarChart3 className="h-5 w-5" /> },
  ],
  hod: [
    { label: "Department Students", value: "187", icon: <GraduationCap className="h-5 w-5" />, change: "+5%" },
    { label: "Faculty Members", value: "12", icon: <Users className="h-5 w-5" /> },
    { label: "Active Courses", value: "8", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Thesis Submissions", value: "23", icon: <FileText className="h-5 w-5" /> },
  ],
  faculty: [
    { label: "My Students", value: "45", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Classes Today", value: "3", icon: <BookOpen className="h-5 w-5" /> },
    { label: "Thesis Supervision", value: "7", icon: <FileText className="h-5 w-5" /> },
    { label: "Pending Grades", value: "12", icon: <BarChart3 className="h-5 w-5" /> },
  ],
  finance: [
    { label: "Total Revenue", value: "₹2.4Cr", icon: <DollarSign className="h-5 w-5" />, change: "+8%" },
    { label: "Pending Fees", value: "₹18.5L", icon: <DollarSign className="h-5 w-5" /> },
    { label: "Scholarships", value: "142", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Total Students", value: "1,247", icon: <Users className="h-5 w-5" /> },
  ],
};

export default function Dashboard() {
  const { user } = useAuth();
  if (!user) return null;
  const stats = ROLE_STATS[user.role] || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-foreground">Welcome back, {user.name.split(" ")[0]}</h2>
        <p className="text-sm text-muted-foreground font-['Raleway'] mt-1">Here's what's happening today</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border bg-card hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                  {stat.icon}
                </div>
                {stat.change && (
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-['Raleway']">
                    {stat.change}
                  </span>
                )}
              </div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs text-muted-foreground font-['Raleway'] mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card className="border-border">
        <CardHeader>
          <CardTitle className="text-lg">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { title: "New student registration", time: "2 hours ago", desc: "Rahul Kumar registered for M.Th program" },
              { title: "Thesis submission", time: "4 hours ago", desc: "Anna Thomas submitted Chapter 3 for review" },
              { title: "Fee payment received", time: "Yesterday", desc: "₹45,000 received from Student ID: STU-2024-089" },
              { title: "Module grades updated", time: "Yesterday", desc: "Systematic Theology grades published for Semester 2" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 pb-4 border-b border-border last:border-0 last:pb-0">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-foreground font-['Raleway']">{item.title}</p>
                  <p className="text-xs text-muted-foreground font-['Raleway']">{item.desc}</p>
                  <p className="text-[10px] text-muted-foreground/60 font-['Raleway'] mt-1">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
