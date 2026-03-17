import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Users, GraduationCap, ArrowUpRight } from "lucide-react";

export default function MetricsPage() {
  const metrics = [
    { label: "Enrollment Rate", value: "92%", trend: "+4%", icon: <TrendingUp className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
    { label: "Graduation Rate", value: "88%", trend: "+2%", icon: <GraduationCap className="h-5 w-5" />, color: "bg-success/10 text-success" },
    { label: "Student Satisfaction", value: "4.6/5", trend: "+0.3", icon: <Users className="h-5 w-5" />, color: "bg-accent/20 text-accent-foreground" },
    { label: "Faculty Ratio", value: "1:15", trend: "Stable", icon: <BarChart3 className="h-5 w-5" />, color: "bg-info/10 text-info" },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="page-title">Metrics</h2>
        <p className="page-subtitle">Performance analytics and key indicators</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="stat-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${m.color}`}>{m.icon}</div>
                  <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                    <ArrowUpRight className="h-3 w-3" />{m.trend}
                  </span>
                </div>
                <p className="text-2xl font-bold font-['Merriweather']">{m.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="rounded-2xl border-border/60">
          <CardHeader><CardTitle className="text-base font-['Merriweather']">Performance Overview</CardTitle></CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-muted-foreground rounded-xl bg-muted/30 border border-dashed border-border">
              <p className="text-sm">Chart visualization will appear here with live data integration</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
