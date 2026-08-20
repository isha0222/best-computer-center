import React, { useState } from "react";
import { Menu, X, Phone, Mail, GraduationCap } from "lucide-react";

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export default function Header({ currentTab, setCurrentTab }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About Us" },
    { id: "courses", label: "Courses" },
    { id: "services", label: "Services" },
    { id: "contact", label: "Contact" },
    { id: "enroll", label: "Enroll Now" },
    { id: "verify", label: "Student Verification" }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setIsOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      {/* <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center border-b border-gray-100 gap-2">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNavClick("home")}>
          <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-lg shadow-sm border border-blue-500/20">
            B
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900 tracking-tight leading-none flex items-center gap-1">
              BEST <span className="text-blue-600 font-medium">COMPUTER</span>
            </h1>
            <p className="text-xs text-slate-500 font-semibold tracking-wider">VALLABH VIDYANAGAR</p>
          </div>
        </div> */}
      <div
  className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row justify-between items-center border-b border-gray-100 gap-2"
>
 <div
  className="flex items-center gap-3 cursor-pointer"
  onClick={() => handleNavClick("home")} >
  <img
    src="/team/logo.jpg"
    alt="Best Computer Center"
    className="h-14 w-auto object-contain" />
</div>
</div>

        <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-700 font-medium">
          <a href="tel:+919979978326" className="flex items-center gap-1.5 hover:text-blue-600 transition">
            <Phone className="w-4 h-4 text-blue-600" />
            <span>+91 99799 78326</span>
          </a>
          <a href="mailto:ho.best.vvn@gmail.com" className="flex items-center gap-1.5 hover:text-blue-600 transition">
            <Mail className="w-4 h-4 text-blue-600" />
            <span>ho.best.vvn@gmail.com</span>
          </a>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center h-12">
            {/* Desktop Nav */}
            <div className="hidden lg:flex justify-center items-center w-full gap-1">
              {navItems.map((item) => {
                const isEnrollOrVerify = item.id === "enroll" || item.id === "verify";
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-4 py-2.5 text-[14px] font-medium transition-all duration-200 cursor-pointer ${
                      currentTab === item.id
                        ? isEnrollOrVerify
                          ? "bg-blue-600 text-white shadow-md scale-105 rounded-full"
                          : "text-blue-400 border-b-2 border-blue-400"
                        : isEnrollOrVerify
                        ? "bg-blue-600 hover:bg-blue-700 text-white rounded-full mx-1 shadow-sm px-4 py-1.5"
                        : "text-gray-300 hover:text-blue-400"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>

            {/* Mobile menu header */}
            <div className="flex lg:hidden justify-between items-center w-full">
              <span className="text-sm font-semibold tracking-wider text-blue-400 flex items-center gap-1">
                <GraduationCap className="w-4 h-4 text-blue-500" />
                LEARN, GROW & BUILD CAREER
              </span>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1 text-gray-300 hover:text-white transition cursor-pointer"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isOpen && (
          <div className="lg:hidden bg-[#1e293b] border-t border-gray-700 px-4 py-3 space-y-2 animate-fadeIn">
            {navItems.map((item) => {
              const isEnrollOrVerify = item.id === "enroll" || item.id === "verify";
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`block w-full text-left px-4 py-2 rounded-md font-medium text-sm transition cursor-pointer ${
                    currentTab === item.id
                      ? "bg-[#0f172a] text-blue-400 font-semibold"
                      : isEnrollOrVerify
                      ? "bg-blue-600 text-white hover:bg-blue-700 text-center font-semibold mt-3"
                      : "text-gray-300 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        )}
      </nav>
    </header>
  );
}
