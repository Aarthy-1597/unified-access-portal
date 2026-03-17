import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { motion } from "framer-motion";
import { Plus, Shield, Edit, Trash2 } from "lucide-react";

const ADMINS = [
  { name: "Dr. Sarah Johnson", email: "admin@saiacs.edu", role: "Super Admin", permissions: { View: true, Edit: true, Add: true, Delete: true } },
  { name: "Dr. Ruth David", email: "ruth@saiacs.edu", role: "HOD", permissions: { View: true, Edit: true, Add: false, Delete: false } },
  { name: "Prof. Mark Philip", email: "mark@saiacs.edu", role: "Faculty", permissions: { View: true, Edit: false, Add: false, Delete: false } },
  { name: "Rachel George", email: "rachel@saiacs.edu", role: "Finance", permissions: { View: true, Edit: true, Add: false, Delete: false } },
];

export default function AdminRolesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
        <div>
          <h2 className="page-title">Admin Roles & Permissions</h2>
          <p className="page-subtitle">Manage user accounts and assign access controls</p>
        </div>
        <Button size="sm" className="rounded-xl h-9"><Plus className="h-4 w-4 mr-1.5" /> Create Account</Button>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="table-header">User</th>
                    <th className="table-header">Role</th>
                    <th className="table-header">View</th>
                    <th className="table-header">Edit</th>
                    <th className="table-header">Add</th>
                    <th className="table-header">Delete</th>
                    <th className="table-header">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {ADMINS.map((a, i) => (
                    <motion.tr key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 + i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="table-cell">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-primary/8 flex items-center justify-center text-primary flex-shrink-0">
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm">{a.name}</p>
                            <p className="text-[11px] text-muted-foreground">{a.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="table-cell"><Badge variant="secondary" className="text-[10px] rounded-md">{a.role}</Badge></td>
                      {Object.values(a.permissions).map((p, j) => (
                        <td key={j} className="table-cell">
                          <Switch checked={p} className="scale-75" />
                        </td>
                      ))}
                      <td className="table-cell">
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg hover:bg-muted"><Edit className="h-3.5 w-3.5" /></Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-destructive hover:bg-destructive/5"><Trash2 className="h-3.5 w-3.5" /></Button>
                        </div>
                      </td>
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
