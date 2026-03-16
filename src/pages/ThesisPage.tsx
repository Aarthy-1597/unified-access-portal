import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { FileText, Upload, MessageSquare } from "lucide-react";

const THESIS_DATA = [
  { id: 1, student: "Rahul Kumar", title: "Contextual Theology in South Asian Churches", status: "In Progress", chapter: "Chapter 4", grade: "B+", feedback: "Good progress, needs more primary sources" },
  { id: 2, student: "Anna Thomas", title: "Women in Early Church Leadership", status: "Under Review", chapter: "Chapter 3", grade: "A-", feedback: "Excellent research methodology" },
  { id: 3, student: "David Samuel", title: "Missiology in Post-Colonial India", status: "Submitted", chapter: "Final Draft", grade: "A", feedback: "Ready for defense" },
  { id: 4, student: "Priya Mathew", title: "Theological Ethics in Modern Context", status: "In Progress", chapter: "Chapter 2", grade: "B", feedback: "Needs literature review revision" },
];

export default function ThesisPage() {
  const { user } = useAuth();
  const isSupervisor = user?.role === "thesis_supervisor";
  const isStudent = user?.role === "student";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">{isSupervisor ? "Thesis Review & Grading" : "Thesis"}</h2>
        {isStudent && <Button size="sm"><Upload className="h-4 w-4 mr-1" /> Submit Chapter</Button>}
      </div>
      <div className="space-y-4">
        {(isStudent ? THESIS_DATA.slice(0, 1) : THESIS_DATA).map(t => (
          <Card key={t.id} className="hover:shadow-md transition-all">
            <CardContent className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{t.title}</p>
                    {!isStudent && <p className="text-xs text-muted-foreground font-['Raleway']">by {t.student}</p>}
                    <div className="flex gap-2 mt-2">
                      <Badge variant="outline" className="text-[10px]">{t.chapter}</Badge>
                      <Badge className={
                        t.status === "Submitted" ? "bg-green-100 text-green-700" :
                        t.status === "Under Review" ? "bg-yellow-100 text-yellow-700" :
                        "bg-blue-100 text-blue-700"
                      }>{t.status}</Badge>
                      {t.grade && <Badge className="bg-primary/10 text-primary text-[10px]">Grade: {t.grade}</Badge>}
                    </div>
                  </div>
                </div>
                {isSupervisor && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm"><MessageSquare className="h-4 w-4 mr-1" /> Feedback</Button>
                    <Button size="sm">Grade</Button>
                  </div>
                )}
              </div>
              {t.feedback && (
                <div className="mt-3 p-3 bg-muted/50 rounded-lg">
                  <p className="text-xs text-muted-foreground font-['Raleway']"><span className="font-semibold">Feedback:</span> {t.feedback}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
