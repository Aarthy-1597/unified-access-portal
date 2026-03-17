import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { DollarSign, TrendingUp, Users, ArrowUpRight, Download, ChevronDown } from "lucide-react";

const FEE_STATS = [
  { label: "Total Collection", value: "₹2.4 Cr", change: "+8%", icon: <DollarSign className="h-5 w-5" />, color: "bg-success/10 text-success" },
  { label: "Pending Fees", value: "₹18.5 L", icon: <DollarSign className="h-5 w-5" />, color: "bg-warning/10 text-warning" },
  { label: "Scholarships", value: "₹12.3 L", icon: <TrendingUp className="h-5 w-5" />, color: "bg-info/10 text-info" },
  { label: "Students (Paid)", value: "1,089", change: "+4%", icon: <Users className="h-5 w-5" />, color: "bg-primary/8 text-primary" },
];

const FEES = [
  { id: "STU-001", name: "Rahul Kumar", program: "M.Th", total: "₹1,20,000", paid: "₹1,20,000", status: "Full Paid", date: "Jan 15, 2026" },
  { id: "STU-002", name: "Anna Thomas", program: "M.Div", total: "₹1,00,000", paid: "₹60,000", status: "Partial", date: "Feb 10, 2026" },
  { id: "STU-003", name: "David Samuel", program: "Ph.D", total: "₹1,50,000", paid: "₹1,50,000", status: "Full Paid", date: "Jan 05, 2026" },
  { id: "STU-004", name: "Priya Mathew", program: "M.Th", total: "₹1,20,000", paid: "₹0", status: "Pending", date: "—" },
  { id: "STU-005", name: "John Philip", program: "M.Div", total: "₹1,00,000", paid: "₹40,000", status: "Partial", date: "Mar 01, 2026" },
];

export default function FeesPage() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="page-title">Fee Management</h2>
          <p className="page-subtitle">Track fee collection, payments & scholarships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="rounded-xl h-9"><Download className="h-4 w-4 mr-1.5" /> Export</Button>
          <Button variant="outline" size="sm" className="rounded-xl h-9">Status <ChevronDown className="h-3 w-3 ml-1 opacity-50" /></Button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {FEE_STATS.map((s, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="stat-card">
              <CardContent className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${s.color}`}>{s.icon}</div>
                  {s.change && (
                    <span className="inline-flex items-center gap-0.5 text-[11px] font-semibold text-success bg-success/10 px-2 py-0.5 rounded-full">
                      <ArrowUpRight className="h-3 w-3" />{s.change}
                    </span>
                  )}
                </div>
                <p className="text-2xl font-bold font-['Merriweather']">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <Card className="rounded-2xl border-border/60 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border bg-muted/40">
                    <th className="table-header">ID</th>
                    <th className="table-header">Name</th>
                    <th className="table-header">Program</th>
                    <th className="table-header">Total Fee</th>
                    <th className="table-header">Paid</th>
                    <th className="table-header">Status</th>
                    <th className="table-header">Last Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {FEES.map((f, i) => (
                    <motion.tr key={f.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 + i * 0.04 }}
                      className="border-b border-border/50 hover:bg-muted/30 transition-colors">
                      <td className="table-cell font-mono text-xs text-muted-foreground">{f.id}</td>
                      <td className="table-cell font-semibold">{f.name}</td>
                      <td className="table-cell"><Badge variant="secondary" className="text-[10px] rounded-md">{f.program}</Badge></td>
                      <td className="table-cell">{f.total}</td>
                      <td className="table-cell font-semibold">{f.paid}</td>
                      <td className="table-cell">
                        <Badge className={`text-[10px] rounded-md ${
                          f.status === "Full Paid" ? "bg-success/10 text-success border-success/20" :
                          f.status === "Partial" ? "bg-warning/10 text-warning border-warning/20" :
                          "bg-destructive/10 text-destructive border-destructive/20"
                        }`} variant="outline">{f.status}</Badge>
                      </td>
                      <td className="table-cell text-muted-foreground text-xs">{f.date}</td>
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
