import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bell, Plus } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle className="text-base">Custom Notifications</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground font-['Raleway']">
              Create custom notifications with rich text editor. Target specific users, departments, or all students.
            </p>
            <div className="space-y-3">
              <div><Label className="font-['Raleway']">Notification Title</Label><Input placeholder="Enter title..." className="mt-1" /></div>
              <div><Label className="font-['Raleway']">Message</Label>
                <div className="mt-1 border border-border rounded-lg p-4 min-h-[120px] bg-card text-sm text-muted-foreground font-['Raleway']">
                  Rich text editor — compose your notification here...
                </div>
              </div>
              <div><Label className="font-['Raleway']">Recipients</Label>
                <div className="flex gap-2 mt-1">
                  <Button variant="outline" size="sm">All Users</Button>
                  <Button variant="outline" size="sm">Department</Button>
                  <Button variant="outline" size="sm">Students Only</Button>
                  <Button variant="outline" size="sm">Personal</Button>
                </div>
              </div>
              <Button><Plus className="h-4 w-4 mr-1" /> Send Notification</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle className="text-base">System Preferences</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div><Label className="font-['Raleway']">Academic Year</Label><Input value="2025-2026" className="mt-1" /></div>
              <div><Label className="font-['Raleway']">Current Semester</Label><Input value="Spring 2026" className="mt-1" /></div>
              <div><Label className="font-['Raleway']">Institution Name</Label><Input value="SAIACS" className="mt-1" /></div>
            </div>
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
