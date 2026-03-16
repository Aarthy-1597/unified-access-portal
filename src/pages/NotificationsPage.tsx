import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Plus } from "lucide-react";
import { useAuth } from "@/lib/auth-context";

const NOTIFICATIONS = [
  { id: 1, title: "Semester Registration Open", desc: "Registration for Spring 2026 semester is now open. Deadline: April 15, 2026.", time: "1 hour ago", type: "announcement", read: false },
  { id: 2, title: "Thesis Submission Deadline", desc: "Chapter 4 submission deadline is March 30, 2026.", time: "3 hours ago", type: "academic", read: false },
  { id: 3, title: "Fee Payment Reminder", desc: "Second installment due by March 25, 2026.", time: "Yesterday", type: "finance", read: true },
  { id: 4, title: "Chapel Service Update", desc: "Special chapel service this Friday at 10:00 AM.", time: "2 days ago", type: "general", read: true },
  { id: 5, title: "Library Hours Extended", desc: "Library will remain open until 10 PM during exam week.", time: "3 days ago", type: "general", read: true },
];

export default function NotificationsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === "super_admin";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Notifications & Announcements</h2>
        {isAdmin && <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Add Notification</Button>}
      </div>
      <div className="space-y-3">
        {NOTIFICATIONS.map(n => (
          <Card key={n.id} className={`transition-all hover:shadow-md ${!n.read ? "border-l-4 border-l-accent" : ""}`}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${!n.read ? "bg-accent/20 text-accent-foreground" : "bg-muted text-muted-foreground"}`}>
                <Bell className="h-4 w-4" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-sm font-semibold">{n.title}</p>
                  {!n.read && <Badge className="bg-accent text-accent-foreground text-[10px]">New</Badge>}
                  <Badge variant="outline" className="text-[10px]">{n.type}</Badge>
                </div>
                <p className="text-xs text-muted-foreground font-['Raleway']">{n.desc}</p>
                <p className="text-[10px] text-muted-foreground/60 font-['Raleway'] mt-2">{n.time}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
