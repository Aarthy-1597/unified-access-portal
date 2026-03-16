import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, Filter, Upload } from "lucide-react";

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Module Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Academic Year</Button>
          <Button variant="outline" size="sm"><Upload className="h-4 w-4 mr-1" /> Import Grades</Button>
          <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Module</Button>
        </div>
      </div>
      <p className="text-sm text-muted-foreground font-['Raleway']">
        Programs, Courses, and Modules management. Add, Edit, and Delete modules. Import/manual grade entry for students.
      </p>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Raleway']">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Code</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Module Name</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Program</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Course</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Credits</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Students</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {MODULES.map(m => (
                  <tr key={m.code} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{m.code}</td>
                    <td className="p-3 font-semibold">{m.name}</td>
                    <td className="p-3"><Badge variant="secondary">{m.program}</Badge></td>
                    <td className="p-3">{m.course}</td>
                    <td className="p-3">{m.credits}</td>
                    <td className="p-3">{m.students}</td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="h-3 w-3" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive"><Trash2 className="h-3 w-3" /></Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
