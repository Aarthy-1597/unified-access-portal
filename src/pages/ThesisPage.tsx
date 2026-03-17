import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { motion } from "framer-motion";
import { FileText, Upload, MessageSquare, BookOpen } from "lucide-react";

const THESIS_DATA = [
  { id: 1, student: "Rahul Kumar", title: "Contextual Theology in South Asian Churches", status: "In Progress", chapter: "Chapter 4", grade: "B+", feedback: "Good progress, needs more primary sources" },
  { id: 2, student: "Anna Thomas", title: "Women in Early Church Leadership", status: "Under Review", chapter: "Chapter 3", grade: "A-", feedback: "Excellent research methodology" },
  { id: 3, student: "David Samuel", title: "Missiology in Post-Colonial India", status: "Submitted", chapter: "Final Draft", grade: "A", feedback: "Ready for defense" },
  { id: 4, student: "Priya Mathew", title: "Theological Ethics in Modern Context", status: "In Progress", chapter: "Chapter 2", grade: "B", feedback: "Needs literature review revision" },
];

const STATUS_STYLES: Record<string, string> = {
  "Submitted": "bg-success/10 text-success border-success/20",
  "Under Review": "bg-warning/10 text-warning border-warning/20",
  "In Progress": "bg-info/10 text-info border-info/20",
};

export default function ThesisPage() {
  const { user } = useAuth();
  const isSupervisor = user?.role === "thesis_supervisor";
  const isStudent = user?.role === "student";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="page-title">{isSupervisor ? "Thesis Review & Grading" : "Thesis"}</h2>
          <p className="page-subtitle">{isSupervisor ? "Review student submissions and assign grades" : "Track your thesis progress"}</p>
        </div>
        {isStudent && <Button size="sm" className="rounded-xl h-9"><Upload className="h-4 w-4 mr-1.5" /> Submit Chapter</Button>}
      </motion.div>

      <div className="space-y-4">
        {(isStudent ? THESIS_DATA.slice(0, 1) : THESIS_DATA).map((t, i) => (
          <motion.div key={t.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="rounded-2xl border-border/60 hover:shadow-md transition-all duration-300 group">
              <CardContent className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <div className="w-11 h-11 rounded-xl bg-primary/8 flex items-center justify-center text-primary flex-shrink-0 group-hover:scale-105 transition-transform">
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{t.title}</p>
                      {!isStudent && <p className="text-xs text-muted-foreground mt-0.5">by {t.student}</p>}
                      <div className="flex gap-2 mt-2.5">
                        <Badge variant="outline" className="text-[10px] rounded-md">{t.chapter}</Badge>
                        <Badge className={`text-[10px] rounded-md ${STATUS_STYLES[t.status]}`} variant="outline">{t.status}</Badge>
                        {t.grade && <Badge className="bg-primary/8 text-primary border-primary/20 text-[10px] rounded-md" variant="outline">Grade: {t.grade}</Badge>}
                      </div>
                    </div>
                  </div>
                  {isSupervisor && (
                    <div className="flex gap-2 flex-shrink-0">
                      <Button variant="outline" size="sm" className="rounded-xl h-9"><MessageSquare className="h-4 w-4 mr-1.5" /> Feedback</Button>
                      <Button size="sm" className="rounded-xl h-9">Grade</Button>
                    </div>
                  )}
                </div>
                {t.feedback && (
                  <div className="mt-4 p-3 bg-muted/40 rounded-xl border border-border/30">
                    <p className="text-xs text-muted-foreground"><span className="font-semibold text-foreground">Feedback:</span> {t.feedback}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
