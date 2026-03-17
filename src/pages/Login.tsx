import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole, ROLE_LABELS } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import saiacsLogo from "@/assets/saiacs-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, GraduationCap, BookOpen, Building2, Users, Wallet,
  Eye, EyeOff, Chrome, ArrowRight, CheckCircle2
} from "lucide-react";

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  super_admin: <ShieldCheck className="h-5 w-5" />,
  student: <GraduationCap className="h-5 w-5" />,
  thesis_supervisor: <BookOpen className="h-5 w-5" />,
  hod: <Building2 className="h-5 w-5" />,
  faculty: <Users className="h-5 w-5" />,
  finance: <Wallet className="h-5 w-5" />,
};

const ROLE_DESCRIPTIONS: Record<UserRole, string> = {
  super_admin: "Full system access & academic administration",
  student: "View courses, grades, thesis & fee status",
  thesis_supervisor: "Review & grade student thesis submissions",
  hod: "Manage department, students & faculty",
  faculty: "Classes, student grades & thesis supervision",
  finance: "Fee tracking, payments & revenue analytics",
};

export default function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const isThesisSupervisor = selectedRole === "thesis_supervisor";

  const handleGoogleLogin = () => {
    if (!selectedRole) { setError("Please select your role first"); return; }
    loginWithGoogle(selectedRole);
    navigate("/dashboard");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) { setError("Please select your role first"); return; }
    if (!email || !password) { setError("Please fill in all fields"); return; }
    login(email, password, selectedRole);
    navigate("/dashboard");
  };

  const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Visual branding */}
      <div className="hidden lg:flex lg:w-[44%] bg-primary relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-[0.04]" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary-foreground)) 1px, transparent 0)`,
            backgroundSize: '24px 24px'
          }} />
          <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-secondary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-accent/8 blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-secondary/5 blur-2xl" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <img src={saiacsLogo} alt="SAIACS Logo" className="w-28 h-28 mx-auto mb-10 brightness-0 invert opacity-90" />
            <h1 className="text-3xl font-bold text-primary-foreground mb-3 font-['Merriweather'] leading-tight">
              South Asia Institute of<br />Advanced Christian Studies
            </h1>
            <div className="w-12 h-1 bg-accent mx-auto my-6 rounded-full" />
            <p className="text-primary-foreground/50 text-sm max-w-xs mx-auto leading-relaxed">
              Academic Management System — Empowering education through technology
            </p>
          </motion.div>

          {/* Decorative stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 grid grid-cols-3 gap-6"
          >
            {[
              { val: "1,200+", label: "Students" },
              { val: "86", label: "Faculty" },
              { val: "14", label: "Programs" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-bold text-accent">{s.val}</p>
                <p className="text-[11px] text-primary-foreground/40 mt-1">{s.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Right Panel - Login */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-[440px] space-y-7"
        >
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-6">
            <img src={saiacsLogo} alt="SAIACS" className="w-14 h-14 mx-auto mb-3" />
            <h1 className="text-lg font-bold text-foreground font-['Merriweather']">SAIACS</h1>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground font-['Merriweather']">Welcome Back</h2>
            <p className="text-muted-foreground text-sm mt-1.5">Select your role and sign in to continue</p>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              Choose Your Role
            </Label>
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {roles.map(([role, label], idx) => (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  onClick={() => { setSelectedRole(role); setError(""); }}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-left transition-all duration-200 ${
                    selectedRole === role
                      ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                      : "border-border bg-card text-foreground hover:border-primary/30 hover:shadow-sm"
                  }`}
                >
                  <span className={`flex-shrink-0 transition-transform duration-200 ${selectedRole !== role ? "group-hover:scale-110" : ""}`}>
                    {ROLE_ICONS[role]}
                  </span>
                  <div className="min-w-0">
                    <span className="font-semibold text-xs leading-tight block truncate">{label}</span>
                  </div>
                  {selectedRole === role && (
                    <CheckCircle2 className="h-3.5 w-3.5 absolute top-2 right-2 opacity-70" />
                  )}
                </motion.button>
              ))}
            </div>
          </div>

          {/* Role description */}
          <AnimatePresence mode="wait">
            {selectedRole && (
              <motion.p
                key={selectedRole}
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs text-muted-foreground bg-muted/60 px-3.5 py-2.5 rounded-lg border border-border/50"
              >
                {ROLE_DESCRIPTIONS[selectedRole]}
              </motion.p>
            )}
          </AnimatePresence>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-destructive text-sm bg-destructive/5 px-3.5 py-2.5 rounded-lg"
            >
              {error}
            </motion.p>
          )}

          {/* Login Methods */}
          <AnimatePresence mode="wait">
            {selectedRole && !isThesisSupervisor && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                className="space-y-4"
              >
                <Button
                  onClick={handleGoogleLogin}
                  className="w-full h-12 bg-card text-foreground border border-border hover:bg-muted hover:shadow-sm font-semibold rounded-xl transition-all duration-200"
                  variant="outline"
                >
                  <Chrome className="h-5 w-5 mr-2.5" />
                  Sign in with Google SSO
                  <ArrowRight className="h-4 w-4 ml-auto opacity-40" />
                </Button>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                    <span className="bg-background px-3 text-muted-foreground">
                      Institutional SSO Required
                    </span>
                  </div>
                </div>
              </motion.div>
            )}

            {isThesisSupervisor && (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleEmailLogin}
                className="space-y-4"
              >
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-xs font-medium">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@saiacs.edu"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="password" className="text-xs font-medium">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="h-11 pr-10 rounded-xl"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex justify-end">
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot Password?
                  </button>
                </div>
                <Button type="submit" className="w-full h-11 font-semibold rounded-xl">
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.form>
            )}
          </AnimatePresence>

          <p className="text-center text-[11px] text-muted-foreground/60 pt-4">
            © 2026 South Asia Institute of Advanced Christian Studies
          </p>
        </motion.div>
      </div>
    </div>
  );
}
