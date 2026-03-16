import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole, ROLE_LABELS } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import saiacsLogo from "@/assets/saiacs-logo.png";
import { 
  ShieldCheck, GraduationCap, BookOpen, Building2, Users, Wallet,
  Eye, EyeOff, Chrome
} from "lucide-react";

const ROLE_ICONS: Record<UserRole, React.ReactNode> = {
  super_admin: <ShieldCheck className="h-5 w-5" />,
  student: <GraduationCap className="h-5 w-5" />,
  thesis_supervisor: <BookOpen className="h-5 w-5" />,
  hod: <Building2 className="h-5 w-5" />,
  faculty: <Users className="h-5 w-5" />,
  finance: <Wallet className="h-5 w-5" />,
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
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] bg-primary flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-secondary" />
          <div className="absolute bottom-20 -right-10 w-96 h-96 rounded-full bg-accent" />
        </div>
        <div className="relative z-10 text-center px-12">
          <img src={saiacsLogo} alt="SAIACS Logo" className="w-32 h-32 mx-auto mb-8 brightness-0 invert" />
          <h1 className="text-3xl font-bold text-primary-foreground mb-2">South Asia</h1>
          <h2 className="text-xl text-primary-foreground/80 mb-1">Institute of Advanced</h2>
          <h2 className="text-xl text-primary-foreground/80 mb-8">Christian Studies</h2>
          <div className="w-16 h-1 bg-accent mx-auto mb-8 rounded-full" />
          <p className="text-primary-foreground/60 text-sm font-['Raleway'] max-w-sm">
            Academic Management System — Empowering education through technology
          </p>
        </div>
      </div>

      {/* Right Panel - Login Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 bg-background">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8">
            <img src={saiacsLogo} alt="SAIACS" className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-xl font-bold text-foreground">SAIACS</h1>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-foreground">Welcome Back</h2>
            <p className="text-muted-foreground text-sm mt-1 font-['Raleway']">Sign in to your account to continue</p>
          </div>

          {/* Role Selection */}
          <div>
            <Label className="text-xs uppercase tracking-wider text-muted-foreground font-['Raleway'] font-semibold">
              Select Your Role
            </Label>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {roles.map(([role, label]) => (
                <button
                  key={role}
                  onClick={() => { setSelectedRole(role); setError(""); }}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-left transition-all text-sm font-['Raleway'] ${
                    selectedRole === role
                      ? "border-primary bg-primary text-primary-foreground shadow-md"
                      : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted"
                  }`}
                >
                  {ROLE_ICONS[role]}
                  <span className="font-medium text-xs leading-tight">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {error && (
            <p className="text-destructive text-sm font-['Raleway']">{error}</p>
          )}

          {/* Login Methods */}
          {selectedRole && !isThesisSupervisor && (
            <Button
              onClick={handleGoogleLogin}
              className="w-full h-12 bg-card text-foreground border border-border hover:bg-muted font-['Raleway'] font-semibold"
              variant="outline"
            >
              <Chrome className="h-5 w-5 mr-2" />
              Sign in with Google SSO
            </Button>
          )}

          {isThesisSupervisor && (
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-['Raleway']">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@saiacs.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-['Raleway']">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-11 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>
              <button type="button" className="text-sm text-secondary-foreground hover:text-primary font-['Raleway'] hover:underline">
                Forgot Password?
              </button>
              <Button type="submit" className="w-full h-11 font-['Raleway'] font-semibold">
                Sign In
              </Button>
            </form>
          )}

          {selectedRole && !isThesisSupervisor && (
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground font-['Raleway']">
                  Institutional SSO Required
                </span>
              </div>
            </div>
          )}

          <p className="text-center text-xs text-muted-foreground font-['Raleway']">
            © 2026 SAIACS. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
