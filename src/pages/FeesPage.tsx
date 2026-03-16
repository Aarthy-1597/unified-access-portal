import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Filter, Download, DollarSign, TrendingUp, Users } from "lucide-react";

const FEE_RECORDS = [
  { id: "STU-001", name: "Rahul Kumar", program: "M.Th", department: "Theology", total: "₹1,20,000", paid: "₹1,20,000", status: "Full Paid", scholarship: "Merit - ₹30,000" },
  { id: "STU-002", name: "Anna Thomas", program: "M.Div", department: "Biblical Studies", total: "₹1,00,000", paid: "₹60,000", status: "Partially", scholarship: "None" },
  { id: "STU-003", name: "David Samuel", program: "Ph.D", department: "Missiology", total: "₹1,50,000", paid: "₹1,50,000", status: "Full Paid", scholarship: "Research - ₹50,000" },
  { id: "STU-004", name: "Priya Mathew", program: "M.Th", department: "Theology", total: "₹1,20,000", paid: "₹80,000", status: "Partially", scholarship: "Need-based - ₹20,000" },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-2xl font-bold">Fee Management</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Program</Button>
          <Button variant="outline" size="sm"><Filter className="h-4 w-4 mr-1" /> Status</Button>
          <Button variant="outline" size="sm"><Download className="h-4 w-4 mr-1" /> Export</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card><CardContent className="p-5">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center text-green-600"><DollarSign className="h-5 w-5" /></div>
          <div><p className="text-xl font-bold">₹4,90,000</p><p className="text-xs text-muted-foreground font-['Raleway']">Total Collected</p></div></div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center text-yellow-600"><TrendingUp className="h-5 w-5" /></div>
          <div><p className="text-xl font-bold">₹1,00,000</p><p className="text-xs text-muted-foreground font-['Raleway']">Pending</p></div></div>
        </CardContent></Card>
        <Card><CardContent className="p-5">
          <div className="flex items-center gap-3"><div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600"><Users className="h-5 w-5" /></div>
          <div><p className="text-xl font-bold">₹1,00,000</p><p className="text-xs text-muted-foreground font-['Raleway']">Scholarships Given</p></div></div>
        </CardContent></Card>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm font-['Raleway']">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left p-3 font-semibold text-muted-foreground">ID</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Name</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Program</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Total Fee</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Paid</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Status</th>
                  <th className="text-left p-3 font-semibold text-muted-foreground">Scholarship</th>
                </tr>
              </thead>
              <tbody>
                {FEE_RECORDS.map(f => (
                  <tr key={f.id} className="border-b border-border hover:bg-muted/30">
                    <td className="p-3 font-mono text-xs">{f.id}</td>
                    <td className="p-3 font-semibold">{f.name}</td>
                    <td className="p-3"><Badge variant="secondary">{f.program}</Badge></td>
                    <td className="p-3">{f.total}</td>
                    <td className="p-3">{f.paid}</td>
                    <td className="p-3">
                      <Badge className={f.status === "Full Paid" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}>{f.status}</Badge>
                    </td>
                    <td className="p-3 text-xs">{f.scholarship}</td>
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
