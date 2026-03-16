import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Download } from "lucide-react";
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">{isAdmin ? "Student Register" : "Students Information"}</h2>
        {isAdmin && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
            <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Student</Button>
          </div>
        )}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by name or ID..." value={search} onChange={e => setSearch(e.target.value)} className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Program</Button>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Department</Button>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Year</Button>
              <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Status</Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Raleway']">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Program</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Department</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Year</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">GPA</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Fee Status</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Scholarship</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(s => (
                  <tr key={s.id} className="border-b border-border hover:bg-muted/30 transition-colors cursor-pointer">
                    <td className="p-3 font-mono text-xs">{s.id}</td>
                    <td className="p-3 font-semibold">{s.name}</td>
                    <td className="p-3"><Badge variant="secondary" className="text-xs">{s.program}</Badge></td>
                    <td className="p-3">{s.department}</td>
                    <td className="p-3">{s.year}</td>
                    <td className="p-3 font-semibold">{s.gpa}</td>
                    <td className="p-3">
                      <Badge className={s.status === "Full Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>
                        {s.status}
                      </Badge>
                    </td>
                    <td className="p-3">{s.scholarship}</td>
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
