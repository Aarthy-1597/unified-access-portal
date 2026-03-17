import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/lib/auth-context";
import { ROLE_EMAILS, ROLE_LABELS, type UserRole } from "@/lib/roles";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import saiacsLogo from "@/assets/saiacs-logo.png";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, GraduationCap, BookOpen, Building2, Users, Wallet,
  Eye, EyeOff, Chrome, ArrowRight
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
  super_admin: "Academic administration, dashboards & user access",
  student: "Courses, grades, thesis progress & notifications",
  thesis_supervisor: "Review student submissions, feedback & grading",
  hod: "Department oversight: students, faculty & academics",
  faculty: "Teaching, student records & thesis supervision",
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

  const roles = Object.entries(ROLE_LABELS) as [UserRole, string][];

  const inferRoleFromEmail = (value: string): UserRole => {
    const normalized = value.trim().toLowerCase();
    const match = (Object.entries(ROLE_EMAILS) as [UserRole, string][])
      .find(([, e]) => e.toLowerCase() === normalized);
    return match?.[0] ?? "student";
  };

  const handleGoogleLogin = () => {
    if (!selectedRole && !email.trim()) {
      setError("Please choose your role or enter your email");
      return;
    }
    const role = selectedRole ?? inferRoleFromEmail(email);
    loginWithGoogle(role);
    navigate("/dashboard");
  };

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { setError("Please fill in all fields"); return; }
    const role = selectedRole ?? inferRoleFromEmail(email);
    login(email, password, role);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left Panel - Visual branding */}
      <div className="hidden lg:flex lg:w-[44%] bg-primary relative overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 opacity-[0.16]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cg fill='none' stroke='white' stroke-opacity='0.55' stroke-width='1'%3E%3Cpath d='M48 0v96M0 48h96'/%3E%3Ccircle cx='24' cy='24' r='24'/%3E%3Ccircle cx='72' cy='24' r='24'/%3E%3Ccircle cx='24' cy='72' r='24'/%3E%3Ccircle cx='72' cy='72' r='24'/%3E%3Ccircle cx='48' cy='48' r='24'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundRepeat: "repeat",
              backgroundSize: "128px 128px",
            }}
          />
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
            <p className="text-muted-foreground text-sm mt-1.5">Sign in with your institutional account</p>
          </div>

          {/* Role selection (restored) */}
          <div>
            <Label className="text-[11px] uppercase tracking-widest text-muted-foreground font-semibold">
              Choose your role (optional)
            </Label>
            <div className="grid grid-cols-2 gap-2.5 mt-3">
              {roles.map(([role, label], idx) => (
                <motion.button
                  key={role}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                  onClick={() => {
                    setSelectedRole(role);
                    setEmail(ROLE_EMAILS[role]);
                    setError("");
                  }}
                  className={`group relative flex items-center gap-2.5 px-3.5 py-3 rounded-xl border text-left transition-all duration-200 ${
                    selectedRole === role
                      ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/20"
                      : "border-border bg-card/70 backdrop-blur-sm text-foreground hover:border-primary/30 hover:shadow-sm"
                  }`}
                  type="button"
                >
                  <span className={`flex-shrink-0 transition-transform duration-200 ${selectedRole !== role ? "group-hover:scale-110" : ""}`}>
                    {ROLE_ICONS[role]}
                  </span>
                  <div className="min-w-0">
                    <span className="font-semibold text-xs leading-tight block truncate">{label}</span>
                    <span className={`text-[10px] leading-tight block mt-0.5 truncate ${
                      selectedRole === role ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {ROLE_DESCRIPTIONS[role]}
                    </span>
                  </div>
                </motion.button>
              ))}
            </div>
            {selectedRole && (
              <div className="mt-2 flex justify-end">
                <button
                  type="button"
                  onClick={() => setSelectedRole(null)}
                  className="text-[11px] text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear selection
                </button>
              </div>
            )}
          </div>

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
            <motion.div
              key="single-login"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="space-y-4"
            >
              <motion.form
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
                    onChange={(e) => { setEmail(e.target.value); setError(""); }}
                    className="h-11 rounded-xl"
                    autoComplete="username"
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
                      onChange={(e) => { setPassword(e.target.value); setError(""); }}
                      className="h-11 pr-10 rounded-xl"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <button type="button" className="text-xs text-muted-foreground hover:text-foreground transition-colors">
                    Need help signing in?
                  </button>
                  <button type="button" className="text-xs text-primary hover:underline font-medium">
                    Forgot Password?
                  </button>
                </div>
                <Button type="submit" className="w-full h-11 font-semibold rounded-xl">
                  Sign In
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              </motion.form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-[10px] uppercase tracking-widest">
                  <span className="bg-background px-3 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>

              <Button
                onClick={handleGoogleLogin}
                className="w-full h-12 bg-card text-foreground border border-border hover:bg-muted hover:shadow-sm font-semibold rounded-xl transition-all duration-200"
                variant="outline"
              >
                <Chrome className="h-5 w-5 mr-2.5" />
                Google SSO
                <ArrowRight className="h-4 w-4 ml-auto opacity-40" />
              </Button>
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-[11px] text-muted-foreground/60 pt-4">
            © 2026 South Asia Institute of Advanced Christian Studies
          </p>
        </motion.div>
      </div>
    </div>
  );
}
