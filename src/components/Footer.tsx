import React from "react";
import { GraduationCap, MapPin, Phone, Mail, Clock, ShieldAlert } from "lucide-react";

interface FooterProps {
  setCurrentTab: (tab: string) => void;
}

export default function Footer({ setCurrentTab }: FooterProps) {
  return (
    <footer className="bg-[#020617] text-white pt-16 pb-6">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Box 1: About */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h3 className="text-xl font-bold tracking-tight">Best Computer Center</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed text-justify">
            We provide practical computer education to help students build strong careers and succeed in the digital world. Our 25+ years of training excellence guarantees industry-relevant skills.
          </p>
          <div className="pt-2">
            <button
              onClick={() => setCurrentTab("admin")}
              className="text-xs text-slate-500 hover:text-blue-400 flex items-center gap-1 transition cursor-pointer"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Administrative Portal</span>
            </button>
          </div>
        </div>

        {/* Box 2: Quick Links */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-gray-800 pb-2 text-blue-500">Quick Links</h3>
          <ul className="space-y-2.5 text-sm text-gray-400">
            {["home", "about", "courses", "services", "contact", "verify"].map((link) => {
              const labelMap: Record<string, string> = {
                home: "Home",
                about: "About Us",
                courses: "Featured Courses",
                services: "Our Services",
                contact: "Contact Us",
                verify: "Student Verification"
              };
              return (
                <li key={link}>
                  <button
                    onClick={() => setCurrentTab(link)}
                    className="hover:text-blue-400 transition cursor-pointer text-left"
                  >
                    → {labelMap[link]}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Box 3: Courses */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-gray-800 pb-2 text-blue-500">Popular Courses</h3>
          <ul className="space-y-2 text-sm text-gray-400">
            {["CCC Course", "Tally with GST", "Python Django", "C Programming", "Artificial Intelligence", "AWS Cloud Practitioner"].map((c) => (
              <li key={c} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full"></span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Box 4: Contact */}
        <div className="space-y-4">
          <h3 className="text-lg font-bold border-b border-gray-800 pb-2 text-blue-500">Get in Touch</h3>
          <ul className="space-y-3.5 text-sm text-gray-400">
            <li className="flex items-start gap-2">
              <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <span className="leading-snug">
                Basement, H M Patel Trade Center, Opp Embassy Center, Mota Bazar, Vallabh Vidyanagar - 388120, Gujarat, India
              </span>
            </li>
            <li className="flex items-center gap-2">
              <Phone className="w-5 h-5 text-blue-500 shrink-0" />
              <a href="tel:+919979978326" className="hover:text-white transition">+91 99799 78326</a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-blue-500 shrink-0" />
              <a href="mailto:ho.best.vvn@gmail.com" className="hover:text-white transition">ho.best.vvn@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-500 shrink-0" />
              <span>Mon - Sat: 8:00 AM - 8:00 PM</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-12 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
        <p>© {new Date().getFullYear()} Best Computer Center | All Rights Reserved</p>
        <p className="text-xs text-gray-600 mt-1">Authorized Training Partner & Student Verification Center</p>
      </div>
    </footer>
  );
}
