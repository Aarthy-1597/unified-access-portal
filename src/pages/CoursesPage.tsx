import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
      <h2 className="text-2xl font-bold">Course Information & Grades</h2>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Raleway']">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Code</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Course Name</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Credits</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Instructor</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Semester</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Grade</th>
                </tr>
              </thead>
              <tbody>
                {COURSES.map(c => (
                  <tr key={c.code} className="border-b border-border hover:bg-muted/30 transition-colors">
                    <td className="p-3 font-mono text-xs">{c.code}</td>
                    <td className="p-3 font-semibold">{c.name}</td>
                    <td className="p-3">{c.credits}</td>
                    <td className="p-3">{c.instructor}</td>
                    <td className="p-3">{c.semester}</td>
                    <td className="p-3">
                      <Badge className={c.grade === "In Progress" ? "bg-blue-100 text-blue-700" : "bg-green-100 text-green-700"}>
                        {c.grade}
                      </Badge>
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
