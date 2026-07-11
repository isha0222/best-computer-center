import React, { useState, useEffect } from "react";
import { Sparkles, Calendar, BookOpen, Clock, ArrowRight, User, CheckCircle2, MapPin, Phone, Mail, Send, Check } from "lucide-react";
import { COURSES } from "../data";

interface HomeViewProps {
  setCurrentTab: (tab: string) => void;
  setSelectedCourseId: (id: string | null) => void;
}

export default function HomeView({ setCurrentTab, setSelectedCourseId }: HomeViewProps) {
  // Typing Effect
  const headlineText = "Build Your Future with Computer Skills 🚀";
  const [typedText, setTypedText] = useState("");
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    if (typingIndex < headlineText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + headlineText.charAt(typingIndex));
        setTypingIndex(prev => prev + 1);
      }, 55);
      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);

  // AI Course Popup Modal
  const [showPopup, setShowPopup] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  // Form Submission
  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formMessage, setFormMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formName,
          email: formEmail,
          message: formMessage
        })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setFormName("");
        setFormEmail("");
        setFormMessage("");
      } else {
        setSubmitError(data.message || "Failed to submit message. Please try again.");
      }
    } catch (err) {
      setSubmitError("Server connection failed. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const featuredCourseIds = ["ccc", "accounting", "c", "ai"];
  const featuredCourses = COURSES.filter(c => featuredCourseIds.includes(c.id));

  return (
    <div className="w-full relative">
      
      {/* 1. Hero Section */}
      <section 
        className="relative bg-cover bg-center min-h-[550px] flex items-center justify-center text-white text-center py-20 px-4"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.75), rgba(15, 23, 42, 0.9)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-xs font-semibold uppercase tracking-wider border border-blue-500/20">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>25+ Years of Educational Excellence</span>
          </div>
          
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-blue-200 to-white bg-clip-text text-transparent">
              {typedText}
            </span>
            <span className="border-r-2 border-blue-500 ml-1 cursor-blink"></span>
          </h1>

          <p className="text-base md:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            From beginners to professionals — we train you for real success. Upgrade your skills, boost your career, and unlock new opportunities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentTab("courses")}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 hover:scale-105 transition duration-300 text-white font-semibold rounded-full shadow-lg shadow-blue-500/10 flex items-center gap-2 cursor-pointer"
            >
              Explore Courses
              <ArrowRight className="w-4 h-4" />
            </button>
            <a
              href="tel:+919979978326"
              className="px-6 py-3 bg-transparent border-2 border-white/40 hover:bg-white/10 hover:border-white hover:scale-105 transition duration-300 text-white font-semibold rounded-full flex items-center gap-2"
            >
              Call Now
            </a>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1 opacity-70 animate-bounce">
          <span className="text-xs tracking-widest uppercase">Scroll Down</span>
          <span className="text-lg">↓</span>
        </div>
      </section>

      {/* 2. Why Choose Us Section */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Why Choose Us?</h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            We provide the best learning experience to help you succeed in your career with practical training.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-8">
            {[
              { icon: "👨‍🏫", title: "Expert Trainers", desc: "Learn from highly experienced professionals who guide you step-by-step." },
              { icon: "💻", title: "Practical Learning", desc: "Hands-on coding labs with real-world project portfolios and code execution." },
              { icon: "📜", title: "Recognized Certification", desc: "Get fully validated certificates with easy online roll number verification." },
              { icon: "💰", title: "Affordable Fees", desc: "Industry-grade training at budget-friendly prices with easy installment schemes." },
              { icon: "🧑‍🎓", title: "Personal Support", desc: "Friendly trainers, interactive doubt solving, and flexible student timings." },
              { icon: "🚀", title: "Career Growth", desc: "Acquire high-demand technical skills to trigger solid job opportunities." }
            ].map((card, idx) => (
              <div 
                key={idx}
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 text-left border border-gray-100 flex gap-4"
              >
                <span className="text-4xl shrink-0">{card.icon}</span>
                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-gray-800">{card.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Featured Courses */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Featured Courses</h2>
            <p className="text-gray-600 max-w-xl mx-auto">Explore our most popular courses designed for your success.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {featuredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-[#0f172a] text-white rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition duration-300 flex flex-col justify-between h-[340px] border border-slate-800"
              >
                <div className="p-6 space-y-4">
                  <div className="inline-block px-2.5 py-0.5 bg-blue-950/60 text-blue-400 text-xs font-semibold rounded border border-blue-500/20">
                    {course.duration}
                  </div>
                  <h3 className="text-lg font-extrabold text-white tracking-tight leading-tight">{course.title}</h3>
                  <p className="text-xs text-gray-300 line-clamp-4 leading-relaxed">{course.description}</p>
                </div>
                
                <div className="p-6 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between">
                  <span className="text-blue-400 text-sm font-bold">{course.fees}</span>
                  <button
                    onClick={() => {
                      setSelectedCourseId(course.id);
                      setCurrentTab("courses");
                    }}
                    className="text-xs text-white hover:text-blue-400 flex items-center gap-1 transition font-semibold cursor-pointer"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            ))}

            {/* Many More Card */}
            <div className="bg-slate-900 text-white rounded-2xl overflow-hidden hover:-translate-y-2 hover:shadow-xl transition duration-300 flex flex-col justify-between p-6 h-[340px] text-center border border-slate-800 shadow-sm">
              <div className="space-y-4 my-auto">
                <span className="text-4xl">🎓</span>
                <h3 className="text-xl font-bold tracking-tight text-white">30+ More Courses</h3>
                <p className="text-xs text-slate-400">
                  Java, Python, Flutter, C++, Web Technologies, Cyber Security, AWS Cloud Solutions & more.
                </p>
              </div>

              <button
                onClick={() => setCurrentTab("courses")}
                className="w-full py-2.5 bg-blue-600 text-white rounded-full font-bold hover:bg-blue-500 transition shadow-md cursor-pointer text-xs uppercase tracking-wider"
              >
                View All Courses
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Banner CTA */}
      <section className="bg-[#0f172a] text-white py-16 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/40 to-slate-900/40 opacity-50"></div>
        <div className="max-w-3xl mx-auto space-y-6 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Start Your Career Journey Today 🚀</h2>
          <p className="text-gray-300 max-w-xl mx-auto">
            Join thousands of trained professionals. Build your future with practical, industry-certified computer skills at Vallabh Vidyanagar's most trusted center.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <button
              onClick={() => setCurrentTab("enroll")}
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-full shadow-lg hover:scale-105 transition cursor-pointer text-sm"
            >
              Enroll Now
            </button>
            <a
              href="tel:+919979978326"
              className="px-6 py-2.5 bg-transparent border-2 border-white/40 text-white font-bold rounded-full hover:bg-white/10 transition text-sm"
            >
              Call Center
            </a>
          </div>
        </div>
      </section>

      {/* 5. Testimonials */}
      <section className="bg-slate-50 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center space-y-10">
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">What Our Students Say</h2>
            <p className="text-gray-600 max-w-md mx-auto">Real feedback from our students who achieved career growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { text: "\"Best institute! I learned computer basics and MS Office very easily. Teachers are very supportive and take care of everyone.\"", author: "Rahul Patel", course: "CCC Course" },
              { text: "\"The Tally with Accounting training helped me secure a local job immediately. Practical GST calculations were very helpful.\"", author: "Priya Shah", course: "Accounting & GST Student" },
              { text: "\"Awesome environment and highly structured coding classes. I built an entire full stack app in PHP and SQL. Thank you!\"", author: "Meet Joshi", course: "C & Web Student" }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between text-left">
                <p className="text-sm text-gray-600 italic leading-relaxed">{item.text}</p>
                <div className="pt-4 border-t border-gray-50 mt-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                    <User className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900">{item.author}</h4>
                    <p className="text-xs text-blue-600 font-semibold">{item.course}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Quick Contact & Map */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
            <p className="text-gray-600">Feel free to contact us or drop an inquiry message anytime.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
            {/* Left Column: Info & Form */}
            <div className="space-y-6 flex flex-col justify-between">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 text-center space-y-1.5">
                  <MapPin className="w-6 h-6 text-blue-600 mx-auto" />
                  <h4 className="text-sm font-bold text-gray-800">Address</h4>
                  <p className="text-xs text-gray-500 leading-tight">HM Patel Trade Center, Mota Bazar, V.V. Nagar</p>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 text-center space-y-1.5">
                  <Phone className="w-6 h-6 text-blue-600 mx-auto" />
                  <h4 className="text-sm font-bold text-gray-800">Phone</h4>
                  <a href="tel:+919979978326" className="text-xs text-blue-600 hover:underline leading-tight block">
                    +91 99799 78326
                  </a>
                </div>
                <div className="bg-slate-50 p-4 rounded-xl border border-gray-100 text-center space-y-1.5">
                  <Mail className="w-6 h-6 text-blue-600 mx-auto" />
                  <h4 className="text-sm font-bold text-gray-800">Email</h4>
                  <a href="mailto:ho.best.vvn@gmail.com" className="text-xs text-blue-600 hover:underline leading-tight block">
                    ho.best.vvn@gmail.com
                  </a>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleContactSubmit} className="bg-slate-50 p-6 rounded-2xl border border-gray-100 space-y-4">
                <h3 className="text-lg font-bold text-gray-800">Send a Quick Message</h3>
                
                {submitSuccess && (
                  <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>Your message has been sent successfully! Our center head will contact you shortly.</span>
                  </div>
                )}

                {submitError && (
                  <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                    {submitError}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Your Name</label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Enter Full Name"
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-gray-600 uppercase">Your Email</label>
                    <input
                      type="email"
                      value={formEmail}
                      onChange={(e) => setFormEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Your Message</label>
                  <textarea
                    rows={3}
                    value={formMessage}
                    onChange={(e) => setFormMessage(e.target.value)}
                    placeholder="Type your message here..."
                    className="w-full p-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/60 transition text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Sending...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Right Column: Google Maps Iframe */}
            <div className="rounded-2xl overflow-hidden border border-gray-100 min-h-[350px] shadow-sm">
              <iframe
                src="https://maps.google.com/maps?q=Best%20Computer%20Center%20Mota%20Bazaar%20Vallabh%20Vidyanagar%20Anand&t=&z=17&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "350px" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* 7. AI Course Popup Modal (triggers after 1.5s) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-sm w-full shadow-2xl relative border border-gray-100 animate-scaleUp">
            {/* Close */}
            <button
              onClick={() => setShowPopup(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold text-lg transition z-10 cursor-pointer"
            >
              ×
            </button>

            <img
              src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=500&auto=format&fit=crop"
              alt="AI course launch"
              className="w-full h-48 object-cover"
            />

            <div className="p-6 text-center space-y-4">
              <div className="inline-block px-3 py-1 bg-blue-50 text-blue-800 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100">
                🚀 Highly Requested Launch
              </div>
              <h3 className="text-xl font-bold text-gray-900 tracking-tight leading-tight">
                New Artificial Intelligence & prompt Writing Course!
              </h3>
              <p className="text-sm text-gray-500">
                Learn ChatGPT proper use, smart prompt formulations, Canva AI graphics, CapCut AI video editing, local WhatsApp automation & freelancing secrets.
              </p>
              
              <div className="pt-2 flex gap-3">
                <button
                  onClick={() => setShowPopup(false)}
                  className="flex-1 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl font-bold text-sm transition cursor-pointer"
                >
                  Maybe Later
                </button>
                <button
                  onClick={() => {
                    setSelectedCourseId("ai");
                    setCurrentTab("courses");
                    setShowPopup(false);
                  }}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow transition hover:scale-105 cursor-pointer"
                >
                  Read Syllabus
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
