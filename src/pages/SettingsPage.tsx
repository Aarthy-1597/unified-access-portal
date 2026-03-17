import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Plus, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="page-title">Settings</h2>
        <p className="page-subtitle">System configuration and notification management</p>
      </motion.div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="notifications" className="rounded-lg text-xs">Notifications</TabsTrigger>
          <TabsTrigger value="system" className="rounded-lg text-xs">System</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl border-border/60">
              <CardHeader><CardTitle className="text-base font-['Merriweather']">Create Notification</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  Compose notifications for specific users, departments, or all students.
                </p>
                <div className="space-y-4">
                  <div>
                    <Label className="text-xs font-medium">Title</Label>
                    <Input placeholder="Notification title..." className="mt-1.5 rounded-xl h-10" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Message</Label>
                    <div className="mt-1.5 border border-border rounded-xl p-4 min-h-[120px] bg-muted/20 text-sm text-muted-foreground">
                      Rich text editor — compose your notification here...
                    </div>
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Recipients</Label>
                    <div className="flex gap-2 mt-1.5 flex-wrap">
                      {["All Users", "Department", "Students Only", "Personal"].map(r => (
                        <Button key={r} variant="outline" size="sm" className="rounded-xl h-8 text-xs">{r}</Button>
                      ))}
                    </div>
                  </div>
                  <Button className="rounded-xl"><Plus className="h-4 w-4 mr-1.5" /> Send Notification</Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="system">
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="rounded-2xl border-border/60">
              <CardHeader><CardTitle className="text-base font-['Merriweather']">System Preferences</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs font-medium">Academic Year</Label>
                    <Input defaultValue="2025-2026" className="mt-1.5 rounded-xl h-10" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Current Semester</Label>
                    <Input defaultValue="Spring 2026" className="mt-1.5 rounded-xl h-10" />
                  </div>
                  <div>
                    <Label className="text-xs font-medium">Institution Name</Label>
                    <Input defaultValue="SAIACS" className="mt-1.5 rounded-xl h-10" />
                  </div>
                </div>
                <Button className="rounded-xl"><Save className="h-4 w-4 mr-1.5" /> Save Changes</Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
