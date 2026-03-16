import { useAuth } from "@/lib/auth-context";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage() {
  const { user } = useAuth();
  if (!user) return null;

  const profileFields = [
    { label: "Full Name", value: user.name },
    { label: "Email", value: user.email },
    { label: "Role", value: user.role.replace(/_/g, " ").replace(/\b\w/g, c => c.toUpperCase()) },
    { label: "Department", value: "Theology" },
    { label: "Program", value: user.role === "student" ? "Master of Theology (M.Th)" : "N/A" },
    { label: "Accreditation", value: "ATA Accredited" },
    { label: "Communities", value: "TBD" },
    { label: "Fee Status", value: "Fully Paid" },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">User Profile</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardContent className="p-6 text-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold mx-auto mb-4">
              {user.name.split(" ").map(n => n[0]).join("")}
            </div>
            <h3 className="text-lg font-bold">{user.name}</h3>
            <p className="text-sm text-muted-foreground font-['Raleway']">{user.email}</p>
            <Badge className="mt-3 bg-accent text-accent-foreground">{user.role.replace(/_/g, " ")}</Badge>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Basic Information</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {profileFields.map((field, i) => (
                <div key={i} className="space-y-1">
                  <p className="text-xs text-muted-foreground font-['Raleway'] uppercase tracking-wider">{field.label}</p>
                  <p className="text-sm font-medium font-['Raleway']">{field.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
