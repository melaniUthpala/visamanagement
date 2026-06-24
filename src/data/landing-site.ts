import {
  Globe2, Shield, Plane, FileCheck, Users, Award, Briefcase,
  GraduationCap, HeartHandshake, Phone, Mail, MapPin, Building2,
  type LucideIcon,
} from "lucide-react";

export const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Jobs", href: "#jobs" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export const STATS = [
  { v: "5,000+", l: "Workers Placed" },
  { v: "15+", l: "Countries" },
  { v: "98%", l: "Visa Success" },
  { v: "10+", l: "Years Experience" },
];

export const WHY: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Globe2, t: "Global Network", d: "Strong relationships with top employers across the Middle East, Europe & Asia." },
  { icon: Shield, t: "Legal & Ethical", d: "Fully licensed agency following all SLBFE government regulations." },
  { icon: HeartHandshake, t: "End-to-End Support", d: "From application to departure & beyond — we walk every step with you." },
  { icon: Award, t: "Trusted Process", d: "Transparent, fast and hassle-free recruitment with zero hidden fees." },
];

export const SERVICES: { icon: LucideIcon; t: string; d: string }[] = [
  { icon: Briefcase, t: "Job Placement", d: "Verified roles in construction, hospitality, healthcare, manufacturing & more." },
  { icon: FileCheck, t: "Visa & Documentation", d: "Complete assistance with visa applications, work permits and all paperwork." },
  { icon: GraduationCap, t: "Pre-Departure Training", d: "Comprehensive orientation on cultural, legal and workplace expectations." },
  { icon: Users, t: "Post-Employment Support", d: "Ongoing support after placement — always available for concerns or advice." },
];

export interface Job {
  t: string;
  c: string;
  s: string;
  exp: string;
}

export const JOBS: Job[] = [
  { t: "Asphalt Work Crew", c: "Romania", s: "3,750 RON/mo", exp: "1+ Year" },
  { t: "Heavy Vehicle Driver", c: "Romania", s: "3,700 RON/mo", exp: "2+ Years" },
  { t: "Baker", c: "Romania", s: "3,500 RON/mo", exp: "1+ Year" },
  { t: "Carpenter (Shuttering)", c: "Romania", s: "3,500 RON/mo", exp: "1+ Year" },
  { t: "Cook", c: "Romania", s: "3,700 RON/mo", exp: "1+ Year" },
  { t: "Delivery Rider", c: "Romania", s: "3,750 RON/mo", exp: "License Required" },
  { t: "Bartender", c: "Romania", s: "3,500 RON/mo", exp: "1+ Year" },
  { t: "Welder", c: "Romania", s: "3,800 RON/mo", exp: "2+ Years" },

  { t: "Construction Labourer", c: "UAE", s: "AED 1,200/mo", exp: "No Exp Required" },
  { t: "Electrician", c: "UAE", s: "AED 2,000/mo", exp: "2+ Years" },
  { t: "Housekeeping Staff", c: "UAE", s: "AED 1,100/mo", exp: "1+ Year" },
  { t: "Security Guard", c: "UAE", s: "AED 1,300/mo", exp: "No Exp Required" },
  { t: "AC Technician", c: "UAE", s: "AED 2,200/mo", exp: "2+ Years" },
  { t: "Restaurant Cook", c: "UAE", s: "AED 1,500/mo", exp: "1+ Year" },

  { t: "Factory Worker", c: "Saudi Arabia", s: "SAR 1,000/mo", exp: "No Exp Required" },
  { t: "Plumber", c: "Saudi Arabia", s: "SAR 1,800/mo", exp: "1+ Year" },
  { t: "Forklift Operator", c: "Saudi Arabia", s: "SAR 1,500/mo", exp: "1+ Year" },
  { t: "Cleaner / Janitor", c: "Saudi Arabia", s: "SAR 900/mo", exp: "No Exp Required" },
  { t: "Painter", c: "Saudi Arabia", s: "SAR 1,200/mo", exp: "1+ Year" },

  { t: "Steel Fixer", c: "Qatar", s: "QAR 1,400/mo", exp: "1+ Year" },
  { t: "Driver (Light Vehicle)", c: "Qatar", s: "QAR 1,600/mo", exp: "License Required" },
  { t: "Scaffolder", c: "Qatar", s: "QAR 1,300/mo", exp: "1+ Year" },
  { t: "Waiter / Service Staff", c: "Qatar", s: "QAR 1,100/mo", exp: "No Exp Required" },

  { t: "Production Operator", c: "Malaysia", s: "MYR 1,500/mo", exp: "No Exp Required" },
  { t: "Rubber Tapper", c: "Malaysia", s: "MYR 1,200/mo", exp: "No Exp Required" },
  { t: "Welder (MIG/TIG)", c: "Malaysia", s: "MYR 2,000/mo", exp: "2+ Years" },
  { t: "Machine Operator", c: "Malaysia", s: "MYR 1,600/mo", exp: "1+ Year" },

  { t: "Factory Line Worker", c: "Japan", s: "¥180,000/mo", exp: "No Exp Required" },
  { t: "Agriculture Worker", c: "Japan", s: "¥160,000/mo", exp: "No Exp Required" },
  { t: "Caregiver (Elderly)", c: "Japan", s: "¥190,000/mo", exp: "1+ Year" },
  { t: "Construction Helper", c: "Japan", s: "¥170,000/mo", exp: "No Exp Required" },
];

export const COUNTRIES = [
  { flag: "🇷🇴", n: "Romania", j: "8 Jobs" },
  { flag: "🇦🇪", n: "UAE", j: "6 Jobs" },
  { flag: "🇶🇦", n: "Qatar", j: "4 Jobs" },
  { flag: "🇸🇦", n: "Saudi Arabia", j: "5 Jobs" },
  { flag: "🇲🇾", n: "Malaysia", j: "4 Jobs" },
  { flag: "🇯🇵", n: "Japan", j: "4 Jobs" },
];

export const PROCESS = [
  { n: "01", t: "Apply Online", d: "Submit your profile & CV through our simple form." },
  { n: "02", t: "Interview", d: "Selected candidates are interviewed by our partner employers." },
  { n: "03", t: "Documentation", d: "We handle visa, medicals & all paperwork." },
  { n: "04", t: "Pre-Departure", d: "Orientation training before you fly." },
  { n: "05", t: "Departure & Support", d: "Fly out with confidence — we stay with you." },
];

export const TESTIMONIALS = [
  { n: "Kasun Perera", r: "Welder, Romania", q: "RO94 made my dream of working abroad a reality. The process was transparent and they supported me at every step." },
  { n: "Nuwan Silva", r: "Driver, UAE", q: "From visa to flight ticket — everything was handled professionally. I'm earning 4x what I made in Sri Lanka." },
  { n: "Nirosha Fernando", r: "Housekeeping, Saudi Arabia", q: "I was nervous going alone but RO94 arranged everything — visa, tickets, orientation. Highly recommend!" },
];

export const CONTACTS: { i: LucideIcon; l: string; v: string }[] = [
  { i: Phone, l: "Phone", v: "+94 77 917 9000" },
  { i: Mail, l: "Email", v: "ro94holdings@gmail.com" },
  { i: MapPin, l: "Address", v: "Colombo, Sri Lanka" },
  { i: Building2, l: "License", v: "SLBFE Licensed Agency" },
];

export const FAQS = [
  { q: "What countries do you provide jobs for?", a: "We provide verified foreign job opportunities in Romania, UAE, Qatar, Saudi Arabia, Malaysia, Japan and more." },
  { q: "Do I need experience to apply?", a: "Some jobs require experience, but many positions are available for beginners and first-time foreign workers." },
  { q: "Does RO94 help with visa processing?", a: "Yes. We handle visa applications, documentation, medical appointments and pre-departure guidance." },
  { q: "How long does the process take?", a: "The process usually takes between 4 to 12 weeks depending on the country, employer and visa approval timeline." },
  { q: "How can I contact RO94 Holdings?", a: "You can contact us through phone, WhatsApp or email using the details in the contact section." },
];
