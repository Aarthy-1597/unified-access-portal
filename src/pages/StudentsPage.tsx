import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Search, Filter, Plus, Download, ChevronDown } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const STUDENTS = [
  { id: "STU-001", name: "Rahul Kumar", program: "M.Th", department: "Theology", year: "2024-25", status: "Full Paid", gpa: "3.8", scholarship: "Merit" },
  { id: "STU-002", name: "Anna Thomas", program: "M.Div", department: "Biblical Studies", year: "2024-25", status: "Partially", gpa: "3.5", scholarship: "None" },
  { id: "STU-003", name: "David Samuel", program: "Ph.D", department: "Missiology", year: "2023-24", status: "Full Paid", gpa: "3.9", scholarship: "Research" },
  { id: "STU-004", name: "Priya Mathew", program: "M.Th", department: "Theology", year: "2024-25", status: "Full Paid", gpa: "3.6", scholarship: "None" },
  { id: "STU-005", name: "John Philip", program: "M.Div", department: "Church History", year: "2024-25", status: "Partially", gpa: "3.4", scholarship: "Need-based" },
  { id: "STU-006", name: "Grace Abraham", program: "Ph.D", department: "Theology", year: "2023-24", status: "Full Paid", gpa: "3.7", scholarship: "Merit" },
];

export default function StudentsPage() {
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const isAdmin = user?.role === "super_admin";

  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h2 className="page-title">{isAdmin ? "Student Register" : "Students Information"}</h2>
          <p className="page-subtitle">Manage and view student records</p>
        </div>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="rounded-xl h-9">
              <Download className="h-4 w-4 mr-1.5" /> Export
            </Button>
            <Button size="sm" className="rounded-xl h-9">
              <Plus className="h-4 w-4 mr-1.5" /> Add Student
            </Button>
          </div>
        )}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="rounded-2xl border-border/60">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="pl-9 h-10 rounded-xl"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {["Program", "Department", "Year", "Status"].map(f => (
                  <Button key={f} variant="outline" size="sm" className="rounded-xl h-9 text-xs">
                    {f} <ChevronDown className="h-3 w-3 ml-1 opacity-50" />
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="table-header">ID</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Program</th>
                    <th className="table-header">Department</th>
                    <th className="table-header">Year</th>
                    <th className="table-header">GPA</th>
                    <th className="table-header">Fee Status</th>
                    <th className="table-header">Scholarship</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, i) => (
                    <motion.tr
                      key={s.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.25 + i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors cursor-pointer group"
                    >
                      <td className="table-cell font-mono text-xs text-muted-foreground">{s.id}</td>
                      <td className="table-cell font-semibold text-foreground group-hover:text-primary transition-colors">{s.name}</td>
                      <td className="table-cell"><Badge variant="secondary" className="text-[10px] rounded-md">{s.program}</Badge></td>
                      <td className="table-cell text-muted-foreground">{s.department}</td>
                      <td className="table-cell text-muted-foreground">{s.year}</td>
                      <td className="table-cell font-semibold">{s.gpa}</td>
                      <td className="table-cell">
                        <Badge className={`text-[10px] rounded-md ${
                          s.status === "Full Paid"
                            ? "bg-success/10 text-success border-success/20"
                            : "bg-warning/10 text-warning border-warning/20"
                        }`} variant="outline">
                          {s.status}
                        </Badge>
                      </td>
                      <td className="table-cell text-muted-foreground text-xs">{s.scholarship}</td>
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
