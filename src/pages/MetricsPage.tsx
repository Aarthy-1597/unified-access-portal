import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, GraduationCap } from "lucide-react";

export default function MetricsPage() {
  const metrics = [
    { label: "Enrollment Rate", value: "92%", trend: "+4%", icon: <TrendingUp className="h-5 w-5" /> },
    { label: "Graduation Rate", value: "88%", trend: "+2%", icon: <GraduationCap className="h-5 w-5" /> },
    { label: "Student Satisfaction", value: "4.6/5", trend: "+0.3", icon: <Users className="h-5 w-5" /> },
    { label: "Faculty Ratio", value: "1:15", trend: "Stable", icon: <BarChart3 className="h-5 w-5" /> },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Metrics</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((m, i) => (
          <Card key={i}>
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary">{m.icon}</div>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{m.trend}</span>
              </div>
              <p className="text-2xl font-bold">{m.value}</p>
              <p className="text-xs text-muted-foreground font-['Raleway'] mt-1">{m.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card>
        <CardHeader><CardTitle>Performance Overview</CardTitle></CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center text-muted-foreground font-['Raleway']">
            <p className="text-sm">Chart visualization will appear here with live data integration</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
