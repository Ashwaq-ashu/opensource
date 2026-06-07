"use client";

import { useState } from "react";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Building2,
  Home,
  Factory,
  Wrench,
  Shield,
  FileText,
  Upload,
  ChevronDown,
  ArrowRight,
  Linkedin,
  Youtube,
  CheckCircle2,
  ClipboardList,
  Users,
  Eye,
  DollarSign,
  HardHat,
} from "lucide-react";

/* ─── Types ─────────────────────────────────────── */
type ProjectType = "Commercial" | "Residential" | "Industrial" | "Renovation";

/* ─── Data ───────────────────────────────────────── */
const PROJECT_TYPES: ProjectType[] = [
  "Commercial",
  "Residential",
  "Industrial",
  "Renovation",
];

const PROJECT_TYPE_ICONS: Record<ProjectType, React.ReactNode> = {
  Commercial: <Building2 size={28} />,
  Residential: <Home size={28} />,
  Industrial: <Factory size={28} />,
  Renovation: <Wrench size={28} />,
};

const STATS = [
  { value: "50+", label: "Projects Completed" },
  { value: "10+", label: "Years Experience" },
  { value: "98%", label: "On-Time Delivery" },
  { value: "Licensed &\nInsured", label: "" },
];

const PROCESS_STEPS = [
  { num: "01", icon: <ClipboardList size={22} />, title: "Inquiry", desc: "Submit project details with our form." },
  { num: "02", icon: <Users size={22} />, title: "Consultation", desc: "We contact you to discuss your needs." },
  { num: "03", icon: <Eye size={22} />, title: "Site Assessment", desc: "Our team evaluates the site and analyses." },
  { num: "04", icon: <DollarSign size={22} />, title: "Proposal & Quote", desc: "Detailed proposal and transparent pricing." },
  { num: "05", icon: <HardHat size={22} />, title: "Construction", desc: "We build with regular updates." },
];

const AREAS = ["Chicago & Suburbs", "North Illinois", "Northwest Indiana", "Wisconsin"];

/* ─── Reusable components ────────────────────────── */
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <div className="relative">
      <select
        className="w-full appearance-none bg-white border border-gray-200 rounded px-3 py-2.5 text-sm text-gray-700 pr-8 focus:outline-none focus:border-orange-500"
        defaultValue=""
      >
        <option value="" disabled>{label}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

/* ─── Page ───────────────────────────────────────── */
export default function ContactPage() {
  const [selectedType, setSelectedType] = useState<ProjectType>("Commercial");
  const [dragging, setDragging] = useState(false);

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* ── NAVBAR ──────────────────────────────── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d0d] flex items-center justify-between px-8 py-4">
        <div>
          <p className="text-white font-black text-sm tracking-wider uppercase leading-none">MT CONSTRUCTIONS</p>
          <p className="text-orange-500 text-[10px] tracking-widest uppercase leading-none mt-0.5">You Design. We Build.</p>
        </div>
        <div className="hidden md:flex items-center gap-8 text-xs tracking-widest uppercase text-gray-400">
          {["Home", "About", "Projects", "Testimonials"].map((l) => (
            <a key={l} href="#" className="hover:text-white transition-colors">{l}</a>
          ))}
          <a href="#" className="text-orange-500 border-b border-orange-500 pb-0.5">Contact</a>
        </div>
        <button className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 transition-colors">
          Get A Quote →
        </button>
      </nav>

      {/* ── HERO ────────────────────────────────── */}
      <section className="relative bg-[#0d0d0d] pt-24 pb-16 overflow-hidden">
        {/* background image overlay */}
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-8 grid md:grid-cols-2 gap-12 items-center min-h-[480px]">
          <div>
            <p className="text-orange-500 text-xs font-bold tracking-[0.3em] uppercase mb-6">Let&apos;s Build Your Vision</p>
            <h1 className="text-white text-6xl md:text-7xl font-black uppercase leading-none mb-2">
              YOU DESIGN.
            </h1>
            <h1 className="text-orange-500 text-6xl md:text-7xl font-black uppercase leading-none mb-8">
              WE BUILD.
            </h1>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs mb-10">
              Submit your project details with us and our experts will get back to you within 24 hours.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((s, i) => (
                <div key={i} className="flex items-start gap-2">
                  <div className="w-1 h-8 bg-orange-500 mt-1 shrink-0" />
                  <div>
                    <p className="text-white font-black text-lg leading-none whitespace-pre-line">{s.value}</p>
                    {s.label && <p className="text-gray-500 text-[10px] uppercase tracking-wider mt-0.5">{s.label}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* hero right — decorative project card stack */}
          <div className="hidden md:flex flex-col gap-3 opacity-60 pointer-events-none select-none">
            {["Commercial", "Residential", "Industrial"].map((t, i) => (
              <div key={t}
                style={{ transform: `translateX(${i * 12}px)` }}
                className="bg-white/10 border border-white/10 rounded px-5 py-3 flex items-center justify-between"
              >
                <span className="text-white text-xs font-bold uppercase tracking-wider">{t}</span>
                <span className="text-orange-500 text-xs">›</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAIN CONTACT SECTION ─────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-[1fr_1.1fr_1.8fr] gap-8">

        {/* col 1 — Get in touch */}
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-4">Get in Touch</p>
            <div className="space-y-5 text-sm">
              <ContactRow icon={<Phone size={14} />} label="Call Us" value="+1 (555) 892-3000" />
              <ContactRow icon={<Mail size={14} />} label="Email Us" value="projects@mtconstructions.com" />
              <ContactRow icon={<Clock size={14} />} label="Office Hours" value={"Mon – Fri: 08:00 – 18:00\nSat: 09:00 – 13:00"} />
              <ContactRow icon={<MapPin size={14} />} label="Headquarters" value={"1200 Industrial Plaza, Suite 400\nArchitectural District\nChicago, IL 60601"} />
            </div>
          </div>
          {/* CTA block */}
          <div className="bg-[#111] text-white rounded p-6">
            <p className="text-orange-500 text-[10px] font-bold tracking-widest uppercase mb-2">Need Faster Assistance?</p>
            <p className="text-sm font-bold mb-1">Schedule a 15-minute consultation call with our project expert.</p>
            <button className="mt-4 border border-white text-white text-xs font-bold tracking-widest uppercase px-5 py-2.5 flex items-center gap-2 hover:bg-white hover:text-black transition-colors">
              Schedule a Call <ArrowRight size={12} />
            </button>
          </div>
          {/* testimonial */}
          <blockquote className="border-l-2 border-orange-500 pl-4">
            <p className="text-gray-600 text-xs leading-relaxed italic">
              "MT Constructions delivered our warehouse project 3 weeks ahead of schedule. Exceptional team!"
            </p>
            <p className="text-gray-900 text-xs font-bold mt-3 uppercase tracking-wider">David Reynolds</p>
            <div className="flex gap-0.5 mt-1">
              {Array(5).fill(0).map((_, i) => <span key={i} className="text-orange-500 text-xs">★</span>)}
            </div>
          </blockquote>
        </div>

        {/* col 2 — What are you planning */}
        <div className="space-y-8">
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-1">What Are You Planning?</p>
            <p className="text-gray-500 text-xs mb-5">Select the option that best describes your project.</p>
            <div className="grid grid-cols-2 gap-3">
              {PROJECT_TYPES.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`flex flex-col items-center gap-2 border rounded py-5 text-xs font-bold uppercase tracking-wider transition-all ${
                    selectedType === type
                      ? "border-orange-500 bg-orange-500 text-white"
                      : "border-gray-200 text-gray-600 hover:border-orange-300"
                  }`}
                >
                  {PROJECT_TYPE_ICONS[type]}
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-4">How Would You Like to Share Your Details?</p>
            <p className="text-gray-500 text-xs mb-4">Your information will be securely saved to our Google Sheets.</p>
            <div className="space-y-3">
              <ShareOption
                active
                icon={<FileText size={16} />}
                title="Fill the form on this page"
                desc="Recommended for detailed inquiries"
              />
              <ShareOption
                icon={<FileText size={16} />}
                title="Use Google Form"
                desc="Open in a new tab"
              />
              <ShareOption
                icon={<Shield size={16} />}
                title="Secure & Private"
                desc="Your data is safe with us and will never be shared"
              />
            </div>
          </div>
        </div>

        {/* col 3 — Project Inquiry form */}
        <div>
          <p className="text-xs font-bold tracking-[0.25em] uppercase text-gray-900 mb-1">Project Inquiry</p>
          <p className="text-gray-500 text-xs mb-6">Provide your project details and our team will review your submission within 48 hours.</p>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Full Name</label>
                <input type="text" placeholder="Johnathan Doe" className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500" />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Professional Email</label>
                <input type="email" placeholder="j.doe@company.com" className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500" />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Phone Number</label>
              <input type="tel" placeholder="+1 (555) 123-4567" className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Project Type</label>
                <Select label="Commercial Development" options={["Commercial Development", "Residential", "Industrial", "Renovation"]} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Timeline</label>
                <Select label="Select Timeline" options={["ASAP", "1–3 Months", "3–6 Months", "6–12 Months", "12+ Months"]} />
              </div>
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Estimated Budget Range</label>
              <Select label="Select Budget Range" options={["Under $50K", "$50K – $200K", "$200K – $1M", "$1M – $5M", "$5M+"]} />
            </div>

            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Brief Project Scope</label>
              <textarea
                rows={4}
                placeholder="Describe the site location, square footage, and key architectural goals."
                className="w-full border border-gray-200 rounded px-3 py-2.5 text-sm focus:outline-none focus:border-orange-500 resize-none"
              />
            </div>

            {/* upload */}
            <div>
              <label className="block text-[10px] text-gray-500 uppercase tracking-wider mb-1">Upload Plans (Optional)</label>
              <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={(e) => { e.preventDefault(); setDragging(false); }}
                className={`border-2 border-dashed rounded px-4 py-8 flex flex-col items-center gap-2 transition-colors cursor-pointer ${dragging ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}
              >
                <Upload size={24} className="text-gray-400" />
                <p className="text-xs text-gray-500 text-center">
                  Drag & drop files here or{" "}
                  <label className="text-orange-500 font-semibold cursor-pointer hover:underline">
                    click to browse
                    <input type="file" multiple className="hidden" accept=".pdf,.dwg,.jpg,.png" />
                  </label>
                </p>
                <p className="text-[10px] text-gray-400">PDF, DWG, PNG, JPG max 50MB</p>
              </div>
            </div>

            <button className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-black tracking-[0.2em] uppercase py-4 transition-colors">
              Request Consultation »
            </button>
            <p className="text-center text-[10px] text-gray-400 flex items-center justify-center gap-1">
              <Shield size={10} /> Your information is secure and will never be shared.
            </p>
          </div>
        </div>
      </section>

      {/* ── CONSTRUCTION PROCESS ─────────────────── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-8">
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-1">Our Construction Process</p>
          <p className="text-gray-500 text-xs mb-12">A transparent approach that ensures quality, on-time delivery, and complete peace of mind.</p>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {PROCESS_STEPS.map((step) => (
              <div key={step.num} className="text-center md:text-left">
                <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-orange-500 text-orange-500 mb-3">
                  {step.icon}
                </div>
                <p className="text-orange-500 text-[10px] font-bold tracking-widest mb-0.5">{step.num}</p>
                <p className="text-gray-900 text-sm font-bold uppercase tracking-wider mb-1">{step.title}</p>
                <p className="text-gray-500 text-xs leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── MAP + AREAS WE SERVE ──────────────────── */}
      <section className="max-w-7xl mx-auto px-8 py-20 grid md:grid-cols-3 gap-8 items-start">
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-4">Our Location</p>
          <p className="text-xs font-bold uppercase tracking-wider text-gray-900 mb-2">MT Constructions Headquarters</p>
          <p className="text-gray-500 text-xs leading-relaxed mb-4">1200 Industrial Plaza, Suite 400<br />Architectural District<br />Chicago, IL 60601</p>
          <button className="text-orange-500 text-xs font-bold uppercase tracking-widest flex items-center gap-1 hover:gap-2 transition-all">
            Get Directions <ArrowRight size={12} />
          </button>
        </div>
        <div className="bg-gray-100 rounded flex items-center justify-center h-56 border border-gray-200">
          <div className="text-center">
            <MapPin size={32} className="text-orange-500 mx-auto mb-2" />
            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">Map View</p>
            <p className="text-gray-400 text-[10px] mt-0.5">MT HQ</p>
          </div>
        </div>
        <div>
          <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-4">Areas We Serve</p>
          <ul className="space-y-2">
            {AREAS.map((a) => (
              <li key={a} className="flex items-center gap-2 text-sm text-gray-700">
                <CheckCircle2 size={14} className="text-orange-500 shrink-0" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FOOTER ───────────────────────────────── */}
      <footer className="bg-[#0d0d0d] text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-8 grid md:grid-cols-5 gap-10 pb-10 border-b border-white/10">
          {/* brand */}
          <div className="md:col-span-1">
            <p className="font-black text-sm tracking-wider uppercase leading-none">MT CONSTRUCTIONS</p>
            <p className="text-orange-500 text-[10px] tracking-widest uppercase leading-none mt-0.5 mb-4">You Design. We Build.</p>
            <p className="text-gray-500 text-xs leading-relaxed mb-5">Architectural excellence through structural integrity since 1994.</p>
            <div className="flex gap-3">
              {[Linkedin, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 border border-white/20 rounded flex items-center justify-center text-gray-400 hover:text-white hover:border-white transition-colors">
                  <Icon size={13} />
                </a>
              ))}
            </div>
          </div>
          {/* links */}
          <FooterCol title="Information" links={["Privacy Policy", "Terms of Service", "Safety Standards", "Careers"]} />
          <FooterCol title="Connect" links={["LinkedIn", "Instagram", "YouTube"]} />
          <FooterCol title="Legal" links={["Licenses", "Insurance", "Compliance"]} />
          {/* CTA */}
          <div>
            <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-3">Let&apos;s Build Together</p>
            <p className="text-gray-400 text-xs mb-4 uppercase tracking-wider leading-relaxed">Ready to start your project?</p>
            <button className="border border-orange-500 text-orange-500 text-xs font-black tracking-widest uppercase px-5 py-2.5 hover:bg-orange-500 hover:text-white transition-colors">
              Get a Quote
            </button>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-8 pt-6">
          <p className="text-gray-600 text-[10px] text-center uppercase tracking-widest">
            © 2024 MT Constructions. Built for Integrity.
          </p>
        </div>
      </footer>
    </div>
  );
}

/* ─── Sub-components ──────────────────────────────── */
function ContactRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex gap-3">
      <div className="w-7 h-7 rounded-full border border-orange-500 flex items-center justify-center text-orange-500 shrink-0 mt-0.5">
        {icon}
      </div>
      <div>
        <p className="text-[10px] text-gray-400 uppercase tracking-wider">{label}</p>
        <p className="text-gray-800 text-sm whitespace-pre-line leading-snug">{value}</p>
      </div>
    </div>
  );
}

function ShareOption({ icon, title, desc, active }: { icon: React.ReactNode; title: string; desc: string; active?: boolean }) {
  return (
    <div className={`flex items-start gap-3 border rounded p-3 text-xs cursor-pointer transition-colors ${active ? "border-orange-500 bg-orange-50" : "border-gray-200 hover:border-orange-300"}`}>
      <div className={`mt-0.5 ${active ? "text-orange-500" : "text-gray-400"}`}>{icon}</div>
      <div>
        <p className={`font-bold uppercase tracking-wider text-[11px] ${active ? "text-orange-600" : "text-gray-700"}`}>{title}</p>
        <p className="text-gray-500 mt-0.5">{desc}</p>
      </div>
    </div>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-orange-500 mb-4">{title}</p>
      <ul className="space-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="text-gray-500 text-xs hover:text-white transition-colors">{l}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
