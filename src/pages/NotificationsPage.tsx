import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Bell, Plus, Clock } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const NOTIFICATIONS = [
  { id: 1, title: "Semester Registration Open", desc: "Registration for Spring 2026 semester is now open. Deadline: April 15, 2026.", time: "1 hour ago", type: "announcement", read: false },
  { id: 2, title: "Thesis Submission Deadline", desc: "Chapter 4 submission deadline is March 30, 2026.", time: "3 hours ago", type: "academic", read: false },
  { id: 3, title: "Fee Payment Reminder", desc: "Second installment due by March 25, 2026.", time: "Yesterday", type: "finance", read: true },
  { id: 4, title: "Chapel Service Update", desc: "Special chapel service this Friday at 10:00 AM.", time: "2 days ago", type: "general", read: true },
  { id: 5, title: "Library Hours Extended", desc: "Library will remain open until 10 PM during exam week.", time: "3 days ago", type: "general", read: true },
];

const TYPE_STYLES: Record<string, string> = {
  announcement: "bg-primary/8 text-primary border-primary/20",
  academic: "bg-info/10 text-info border-info/20",
  finance: "bg-warning/10 text-warning border-warning/20",
  general: "bg-muted text-muted-foreground border-border",
};

export default function NotificationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "super_admin";

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="page-title">Notifications</h2>
          <p className="page-subtitle">Stay updated with announcements and alerts</p>
        </div>
        {isAdmin && <Button size="sm" className="rounded-xl h-9"><Plus className="h-4 w-4 mr-1.5" /> New</Button>}
      </motion.div>

      <div className="space-y-3">
        {NOTIFICATIONS.map((n, i) => (
          <motion.div key={n.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
            <Card className={`rounded-2xl border-border/60 transition-all duration-200 hover:shadow-sm ${!n.read ? "border-l-[3px] border-l-accent" : ""}`}>
              <CardContent className="p-4 flex items-start gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${!n.read ? "bg-accent/15 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                  <Bell className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-semibold">{n.title}</p>
                    {!n.read && <Badge className="bg-accent/20 text-accent-foreground border-accent/30 text-[9px] rounded-md" variant="outline">New</Badge>}
                    <Badge className={`text-[9px] rounded-md ${TYPE_STYLES[n.type]}`} variant="outline">{n.type}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{n.desc}</p>
                  <span className="flex items-center gap-1 text-[10px] text-muted-foreground/60 mt-2">
                    <Clock className="h-3 w-3" />{n.time}
                  </span>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
