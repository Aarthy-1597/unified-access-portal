import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

const COURSES = [
  { code: "TH501", name: "Systematic Theology I", credits: 3, grade: "A", semester: "Fall 2025", instructor: "Dr. James Thomas" },
  { code: "BS401", name: "New Testament Greek", credits: 3, grade: "B+", semester: "Fall 2025", instructor: "Prof. Mark Philip" },
  { code: "MS301", name: "Missiology & Culture", credits: 2, grade: "A-", semester: "Fall 2025", instructor: "Dr. Ruth David" },
  { code: "CH201", name: "Church History I", credits: 3, grade: "B", semester: "Spring 2025", instructor: "Dr. Samuel John" },
  { code: "TH502", name: "Systematic Theology II", credits: 3, grade: "In Progress", semester: "Spring 2026", instructor: "Dr. James Thomas" },
  { code: "ET301", name: "Theological Ethics", credits: 2, grade: "In Progress", semester: "Spring 2026", instructor: "Prof. Anna Grace" },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="page-title">Courses & Grades</h2>
        <p className="page-subtitle">Your enrolled courses and academic performance</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="table-header">Code</th>
                    <th className="table-header">Course Name</th>
                    <th className="table-header">Credits</th>
                    <th className="table-header">Instructor</th>
                    <th className="table-header">Semester</th>
                    <th className="table-header">Grade</th>
                  </tr>
                </thead>
                <tbody>
                  {COURSES.map((c, i) => (
                    <motion.tr key={c.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="table-cell font-mono text-xs text-muted-foreground">{c.code}</td>
                      <td className="table-cell font-semibold">{c.name}</td>
                      <td className="table-cell">{c.credits}</td>
                      <td className="table-cell text-muted-foreground">{c.instructor}</td>
                      <td className="table-cell text-muted-foreground">{c.semester}</td>
                      <td className="table-cell">
                        <Badge className={`text-[10px] rounded-md ${
                          c.grade === "In Progress"
                            ? "bg-info/10 text-info border-info/20"
                            : "bg-success/10 text-success border-success/20"
                        }`} variant="outline">{c.grade}</Badge>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
