import React, { useEffect, useState } from "react";
import { ACHIEVEMENTS, TEAM, TESTIMONIALS } from "../data";
import { Award, Target, BookOpen, Users, Calendar, ArrowRight, User } from "lucide-react";

interface AboutViewProps {
  setCurrentTab: (tab: string) => void;
}

export default function AboutView({ setCurrentTab }: AboutViewProps) {
  // Counters state to replicate the custom typing/increment animation on scroll/load
  const [counts, setCounts] = useState(ACHIEVEMENTS.map(() => 0));

  useEffect(() => {
    const duration = 1200; // ms
    const steps = 30;
    const intervalTime = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setCounts(
        ACHIEVEMENTS.map((item) => {
          const progress = step / steps;
          const currentVal = Math.floor(item.value * progress);
          return Math.min(currentVal, item.value);
        })
      );

      if (step >= steps) {
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full">
      
      {/* 1. Header Banner */}
      <section 
        className="bg-cover bg-center text-white py-16 px-4 text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">About Us</h1>
          <p className="text-blue-400 font-semibold tracking-wider uppercase text-xs md:text-sm">
            Learn, Grow & Build Your Career
          </p>
        </div>
      </section>

      {/* 2. Welcome to Best Computer Center */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="rounded-2xl overflow-hidden shadow-lg border border-gray-100 hover:scale-102 transition duration-300">
          <img 
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=600&auto=format&fit=crop" 
            alt="Students practicing in classroom" 
            className="w-full h-auto object-cover"
          />
        </div>
        
        <div className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight leading-snug">
            Welcome to Best Computer Center, V.V. Nagar
          </h2>
          <div className="space-y-4 text-sm text-gray-600 leading-relaxed text-justify">
            <p>
              Your trusted destination for high-quality computer education and practical training. At Best Computer Center, we are passionate about shaping the future of students by providing industry-relevant skills and real-world knowledge.
            </p>
            <p>
              We empower students, working professionals, and learners from all backgrounds through hands-on training in programming languages, software tools, and essential computer skills. Whether you are just starting your journey or looking to upgrade your skills, we are here to guide you at every step.
            </p>
            <p>
              We strongly believe in <span className="text-blue-600 font-bold">“Learning by Doing”</span>. Our expert trainers focus on both theoretical concepts and practical implementation, ensuring that every student gains confidence, clarity, and real experience to succeed in today’s competitive IT world.
            </p>
            <p className="font-semibold text-gray-800">
              Join us and take the first step towards a brighter, smarter, and more successful future 🚀
            </p>
          </div>
          <button
            onClick={() => setCurrentTab("enroll")}
            className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 hover:scale-105 transition rounded-full text-white font-bold text-sm shadow cursor-pointer"
          >
            Inquire For Free Demo
          </button>
        </div>
      </section>

      {/* 3. Achievements Counters */}
      <section className="bg-[#0f172a] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {ACHIEVEMENTS.map((item, idx) => (
            <div key={idx} className="space-y-2 p-4 rounded-xl hover:bg-slate-800/40 transition">
              <h3 className="text-3xl md:text-5xl font-extrabold text-blue-400">
                {counts[idx].toLocaleString()}
                {item.suffix}
              </h3>
              <p className="text-xs md:text-sm text-gray-400 font-semibold uppercase tracking-wider">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Why Choose Us (Upgrade cards) */}
      <section className="py-16 px-4 bg-slate-50">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <h2 className="text-3xl font-bold text-gray-900 tracking-tight">Our Core Advantages</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Expert Trainers", desc: "Our trainers are certified subject matter experts with decades of aggregate field experience." },
              { icon: <BookOpen className="w-8 h-8 text-blue-600" />, title: "Practical Learning", desc: "Curriculums are built 100% around code execution, sheet preparation, and client mockups." },
              { icon: <Award className="w-8 h-8 text-blue-600" />, title: "Affordable Fees", desc: "Highly budget-friendly fee structures with customizable installment schemes for everyone." },
              { icon: <Target className="w-8 h-8 text-blue-600" />, title: "Job Assistance", desc: "We support our top graduates with resume-building workshops, interviews, and placements." },
              { icon: <Calendar className="w-8 h-8 text-blue-600" />, title: "Flexible Timings", desc: "Batches run from 8 AM to 8 PM. Pick any slot that syncs with your college or work hours." },
              { icon: <Users className="w-8 h-8 text-blue-600" />, title: "Modern Computing Lab", desc: "High-speed processors, fully connected routers, and individual workstations for practice." }
            ].map((adv, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm text-left hover:-translate-y-1 transition duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  {adv.icon}
                </div>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-800">{adv.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{adv.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Meet Our Experts (Team) */}
      {/* <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Meet Our Experts</h2>
            <p className="text-gray-500 max-w-sm mx-auto">The dedicated team driving high-quality education and support.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {TEAM.map((member, idx) => (
              <div 
                key={idx} 
                className="bg-slate-50 p-4 rounded-2xl border border-gray-100 text-center flex flex-col items-center hover:shadow-md transition duration-300"
              >
                <div className="w-full h-56 rounded-xl overflow-hidden border border-gray-100 shadow-inner mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover object-top hover:scale-105 transition duration-300"
                  />
                </div>
                <h3 className="text-base font-bold text-gray-900 leading-snug">{member.name}</h3>
                <p className="text-xs text-blue-600 font-semibold mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* 6. Extensive Testimonials Grid */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-12">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">What Our Graduates Say</h2>
            <p className="text-gray-600 max-w-sm mx-auto">In-depth feedback reflecting student growth, skills, and successes.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((test, idx) => (
              <div 
                key={idx} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-left flex flex-col justify-between hover:scale-102 transition duration-300"
              >
                <p className="text-sm text-gray-600 italic leading-relaxed">"{test.text}"</p>
                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{test.author}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{test.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
