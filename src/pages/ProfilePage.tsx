import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";
import { Edit, Mail, Building2, GraduationCap, Calendar } from "lucide-react";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const profileFields = [
    { label: "Full Name", value: user.name, icon: null },
    { label: "Email", value: user.email, icon: <Mail className="h-3.5 w-3.5" /> },
    { label: "Role", value: user.role.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()), icon: null },
    { label: "Department", value: "Theology", icon: <Building2 className="h-3.5 w-3.5" /> },
    { label: "Program", value: user.role === "student" ? "Master of Theology (M.Th)" : "N/A", icon: <GraduationCap className="h-3.5 w-3.5" /> },
    { label: "Accreditation", value: "ATA Accredited", icon: null },
    { label: "Academic Year", value: "2025-2026", icon: <Calendar className="h-3.5 w-3.5" /> },
    { label: "Fee Status", value: "Fully Paid", icon: null },
  ];

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
        <h2 className="page-title">Profile</h2>
        <p className="page-subtitle">Your personal information and academic details</p>
      </motion.div>

      <Tabs defaultValue="info" className="space-y-6">
        <TabsList className="bg-muted/50 rounded-xl p-1">
          <TabsTrigger value="info" className="rounded-lg text-xs">Personal Info</TabsTrigger>
          <TabsTrigger value="academic" className="rounded-lg text-xs">Academic</TabsTrigger>
          <TabsTrigger value="fees" className="rounded-lg text-xs">Fee Status</TabsTrigger>
        </TabsList>

        <TabsContent value="info">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              <Card className="rounded-2xl border-border/60">
                <CardContent className="p-8 text-center">
                  <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-5 shadow-sm">
                    {user.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <h3 className="text-lg font-bold font-['Merriweather']">{user.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                  <Badge className="mt-3 bg-accent/20 text-accent-foreground border-accent/30 rounded-lg" variant="outline">
                    {user.role.replace(/_/g, " ")}
                  </Badge>
                  <Button variant="outline" size="sm" className="w-full mt-6 rounded-xl h-9">
                    <Edit className="h-3.5 w-3.5 mr-1.5" /> Edit Profile
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-2">
              <Card className="rounded-2xl border-border/60">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-['Merriweather']">Basic Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {profileFields.map((field, i) => (
                      <div key={i} className="space-y-1.5 p-3 rounded-xl bg-muted/30">
                        <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-semibold">{field.label}</p>
                        <div className="flex items-center gap-2">
                          {field.icon && <span className="text-muted-foreground">{field.icon}</span>}
                          <p className="text-sm font-medium">{field.value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </TabsContent>

        <TabsContent value="academic">
          <Card className="rounded-2xl border-border/60">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>Academic details will appear here with live data integration.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="fees">
          <Card className="rounded-2xl border-border/60">
            <CardContent className="p-8 text-center text-muted-foreground">
              <p>Fee payment history and status will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
