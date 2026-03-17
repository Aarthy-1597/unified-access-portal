export type UserRole =
  | "super_admin"
  | "student"
  | "thesis_supervisor"
  | "hod"
  | "faculty"
  | "finance";

export const ROLE_LABELS: Record<UserRole, string> = {
  super_admin: "Super Admin / Academic Dean",
  student: "Student",
  thesis_supervisor: "Thesis Supervisor",
  hod: "Head of Department",
  faculty: "Faculty / Facilitator",
  finance: "Finance Team",
};

// Demo mapping so login can auto-pick persona by email.
export const ROLE_EMAILS: Record<UserRole, string> = {
  super_admin: "admin@saiacs.edu",
  student: "priya@saiacs.edu",
  thesis_supervisor: "james@saiacs.edu",
  hod: "ruth@saiacs.edu",
  faculty: "mark@saiacs.edu",
  finance: "rachel@saiacs.edu",
};

