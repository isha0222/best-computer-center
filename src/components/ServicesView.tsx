import React, { useState } from "react";
import { SERVICES } from "../data";
import { HelpCircle, ChevronRight, CheckSquare, Sparkles } from "lucide-react";
import { ServiceDetail } from "../types";

interface ServicesViewProps {
  setCurrentTab: (tab: string) => void;
  setEnrollingCourse: (course: string) => void;
}

export default function ServicesView({ setCurrentTab, setEnrollingCourse }: ServicesViewProps) {
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  const handleServiceClick = (service: ServiceDetail) => {
    if (service.id === "courses" || service.id === "ai" || service.id === "cyber") {
      setCurrentTab("courses");
    } else {
      setActiveModalService(service);
    }
  };

  const handleInquireClick = (serviceTitle: string) => {
    setEnrollingCourse(`Service: ${serviceTitle}`);
    setCurrentTab("enroll");
    setActiveModalService(null);
  };

  return (
    <div className="w-full">
      {/* 1. Header Banner */}
      <section 
        className="bg-cover bg-center text-white py-16 px-4 text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Services</h1>
          <p className="text-blue-400 font-semibold tracking-wider uppercase text-xs md:text-sm">
            Upgrade your skills with industry-focused training & IT integrations
          </p>
        </div>
      </section>

      {/* 2. Services Grid */}
      <section className="max-w-7xl mx-auto px-4 py-16 space-y-12 text-center">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Explore Our Services</h2>
          <p className="text-gray-500 max-w-sm mx-auto">Click any service to view our corporate solutions, tools, and timelines.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div 
              key={service.id}
              onClick={() => handleServiceClick(service)}
              className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 text-center flex flex-col justify-between items-center hover:bg-[#0f172a] hover:text-white group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md hover:border-slate-800"
            >
              <div className="space-y-4">
                <div className="text-4xl group-hover:scale-110 transition duration-300">{service.icon}</div>
                <h3 className="text-lg font-bold group-hover:text-blue-400 transition duration-300">{service.title}</h3>
                <p className="text-xs text-gray-400 group-hover:text-slate-300 leading-relaxed">{service.description}</p>
              </div>

              <div className="text-xs font-bold text-blue-600 group-hover:text-white flex items-center gap-1 mt-4 transition uppercase tracking-wider">
                <span>View Solution</span>
                <ChevronRight className="w-3 h-3" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. AI Banner CTA */}
      <section className="max-w-7xl mx-auto px-4 pb-16">
        <div className="bg-[#0f172a] text-white p-8 md:p-12 rounded-3xl text-center space-y-6 relative overflow-hidden shadow-lg border border-slate-800">
          <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 to-blue-900/10 opacity-30"></div>
          <div className="max-w-xl mx-auto space-y-4 relative z-10">
            <div className="w-12 h-12 rounded-full bg-blue-950/80 flex items-center justify-center text-xl mx-auto border border-blue-500/20">
              🚀
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">New AI Course Available</h2>
            <p className="text-sm text-gray-300">
              Learn Canva AI, Script Writing, CapCut reels creation, prompt engineering formulas, ChatGPT hacks and business automation strategies!
            </p>
            <button
              onClick={() => {
                setEnrollingCourse("Artificial Intelligence");
                setCurrentTab("enroll");
              }}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow transition cursor-pointer text-sm"
            >
              Join AI Course Now
            </button>
          </div>
        </div>
      </section>

      {/* 4. Detailed Service Modal */}
      {activeModalService && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-md w-full shadow-2xl relative border border-gray-100 animate-scaleUp max-h-[80vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalService(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold text-lg transition z-10 cursor-pointer"
            >
              ×
            </button>

            {/* Header */}
            <div className="p-6 bg-[#0f172a] text-white flex items-center gap-3 shrink-0">
              <span className="text-4xl">{activeModalService.icon}</span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Service Solution</span>
                <h3 className="text-lg font-extrabold leading-tight">{activeModalService.title}</h3>
              </div>
            </div>

            {/* Content (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-4 flex-1 text-sm text-gray-600 leading-relaxed text-justify">
              <p className="whitespace-pre-line leading-relaxed">{activeModalService.content}</p>
            </div>

            {/* Footer */}
            <div className="p-6 border-t border-gray-100 bg-slate-50 flex gap-4 shrink-0">
              <button
                onClick={() => setActiveModalService(null)}
                className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Close Solution
              </button>
              <button
                onClick={() => handleInquireClick(activeModalService.title)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow transition hover:scale-105 cursor-pointer"
              >
                Get Quote / Inquire
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
