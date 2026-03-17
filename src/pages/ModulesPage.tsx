import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Upload, ChevronDown } from "lucide-react";

const MODULES = [
  { code: "TH501", name: "Systematic Theology I", program: "M.Th", course: "Theology", credits: 3, students: 42 },
  { code: "BS401", name: "New Testament Greek", program: "M.Div", course: "Biblical Studies", credits: 3, students: 38 },
  { code: "MS301", name: "Missiology & Culture", program: "M.Th", course: "Missiology", credits: 2, students: 25 },
  { code: "CH201", name: "Church History I", program: "M.Div", course: "Church History", credits: 3, students: 35 },
  { code: "ET301", name: "Theological Ethics", program: "M.Th", course: "Ethics", credits: 2, students: 30 },
];

export default function ModulesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="page-title">Module Management</h2>
          <p className="page-subtitle">Programs, courses, and module administration</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl h-9">Academic Year <ChevronDown className="h-3 w-3 ml-1 opacity-50" /></Button>
          <Button variant="outline" size="sm" className="rounded-xl h-9"><Upload className="h-4 w-4 mr-1.5" /> Import</Button>
          <Button size="sm" className="rounded-xl h-9"><Plus className="h-4 w-4 mr-1.5" /> Add Module</Button>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="table-header">Code</th>
                    <th className="table-header">Module Name</th>
                    <th className="table-header">Program</th>
                    <th className="table-header">Course</th>
                    <th className="table-header">Credits</th>
                    <th className="table-header">Students</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {MODULES.map((m, i) => (
                    <motion.tr key={m.code} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="table-cell font-mono text-xs text-muted-foreground">{m.code}</td>
                      <td className="table-cell font-semibold">{m.name}</td>
                      <td className="table-cell"><Badge variant="secondary" className="text-[10px] rounded-md">{m.program}</Badge></td>
                      <td className="table-cell text-muted-foreground">{m.course}</td>
                      <td className="table-cell">{m.credits}</td>
                      <td className="table-cell font-semibold">{m.students}</td>
                      <td className="table-cell">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/5"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
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
