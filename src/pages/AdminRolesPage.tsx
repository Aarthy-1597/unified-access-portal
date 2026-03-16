import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Shield, Edit, Trash2 } from "lucide-react";

const ADMINS = [
  { name: "Dr. Sarah Johnson", email: "admin@saiacs.edu", role: "Super Admin", permissions: ["View", "Edit", "Add", "Delete"] },
  { name: "Dr. Ruth David", email: "ruth@saiacs.edu", role: "HOD", permissions: ["View", "Edit"] },
  { name: "Prof. Mark Philip", email: "mark@saiacs.edu", role: "Faculty", permissions: ["View"] },
  { name: "Rachel George", email: "rachel@saiacs.edu", role: "Finance", permissions: ["View", "Edit"] },
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Admin Roles & Permissions</h2>
        <Button size="sm"><Plus className="h-4 w-4 mr-1" /> Create Account</Button>
      </div>
      <p className="text-sm text-muted-foreground font-['Raleway']">
        Manage user accounts and assign permissions. You can create accounts for Principal and external members.
      </p>
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Raleway']">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Email</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Role</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Permissions</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Actions</th>
                </tr>
              </thead>
              <tbody>
                {ADMINS.map((a, i) => (
                  <tr key={i} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-semibold flex items-center gap-2"><Shield className="h-4 w-4 text-primary" />{a.name}</td>
                    <td className="p-3">{a.email}</td>
                    <td className="p-3"><Badge variant="secondary">{a.role}</Badge></td>
                    <td className="p-3">
                      <div className="flex gap-1">{a.permissions.map(p => <Badge key={p} variant="outline" className="text-[10px]">{p}</Badge>)}</div>
                    </td>
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
