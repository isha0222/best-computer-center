import React, { useState, useEffect } from "react";
import { CheckSquare, Phone, ArrowRight, MessageSquare, CheckCircle2 } from "lucide-react";
import { COURSES } from "../data";

interface EnrollViewProps {
  enrollingCourse: string;
  setEnrollingCourse: (course: string) => void;
}

export default function EnrollView({ enrollingCourse, setEnrollingCourse }: EnrollViewProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Sync state if course was passed from other pages (like courses view)
  useEffect(() => {
    if (enrollingCourse) {
      // Find course or set value
      setCourse(enrollingCourse);
    }
  }, [enrollingCourse]);

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !email || !course) {
      setSubmitError("Please fill in all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");
    setSubmitSuccess(false);

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, course })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setSubmitSuccess(true);
        setName("");
        setPhone("");
        setEmail("");
        setCourse("");
        setEnrollingCourse(""); // Clear shared trigger
      } else {
        setSubmitError(data.message || "Failed to submit inquiry. Please try again.");
      }
    } catch (err) {
      setSubmitError("Server connection failed. Please check your network.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* 1. Header Banner */}
      <section 
        className="bg-cover bg-center text-white py-16 px-4 text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Enroll Now</h1>
          <p className="text-blue-400 font-semibold tracking-wider uppercase text-xs md:text-sm">
            Start your journey with us today 🚀
          </p>
        </div>
      </section>

      {/* 2. Enrollment Form Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left Column: Why Join Us */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Why Join Us?</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We focus on building strong computer foundations and real-world implementation. Our expert support system assists students from standard CCC levels up to AWS Cloud Practitioner configurations.
            </p>
          </div>

          <div className="space-y-4">
            {[
              "Highly experienced & certified professional trainers",
              "100% Practical 'Learning by Doing' methodology",
              "Fully equipped computing labs and standard workspaces",
              "Valid course certificates with online verification checks",
              "Extremely flexible slot timings running from 8 AM to 8 PM",
              "Affordable pricing with split installments schemes"
            ].map((text, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold">✔</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">{text}</span>
              </div>
            ))}
          </div>

          {/* Direct CTA Buttons */}
          <div className="space-y-3 pt-4">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest">Connect Instantly</h4>
            <div className="grid grid-cols-2 gap-4">
              <a 
                href="tel:+919979978326"
                className="py-3 bg-blue-600 hover:bg-blue-700 transition text-white rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Phone className="w-4 h-4" />
                <span>Call +91 99799 78326</span>
              </a>
              <a 
                href="https://wa.me/919979978326"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 bg-green-600 hover:bg-green-700 transition text-white rounded-xl text-center font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp chat</span>
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Inquiry Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <form onSubmit={handleEnrollSubmit} className="space-y-4">
            <div className="space-y-1">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Course Inquiry Form</h3>
              <p className="text-sm text-gray-500">Submit this inquiry and we will book your free diagnostic trial session.</p>
            </div>

            {submitSuccess && (
              <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Your inquiry has been logged! Center Head Mehul Chavda will call you to schedule your demo.</span>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Your Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="First Name Last Name"
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Mobile Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. 9876543210"
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-gray-600 uppercase">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com"
                  className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Select Target Course</label>
              <select
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              >
                <option value="">-- Choose a Course / Service --</option>
                {/* Categorized options */}
                <optgroup label="Core Computer Literacy">
                  <option value="CCC">CCC (Course on Computer Concepts)</option>
                  <option value="CCC+">CCC+ (Advanced Computer Concepts)</option>
                  <option value="Advance Excel">Advance Excel Sheets</option>
                </optgroup>
                <optgroup label="Financial Systems">
                  <option value="Tally with Accounting">Advanced Financial Accounting (Tally + GST)</option>
                </optgroup>
                <optgroup label="Software Engineering">
                  <option value="C Programming">C Programming language</option>
                  <option value="C++ Programming">C++ Programming language</option>
                  <option value="Core Java">Core Java standard edition</option>
                  <option value="Advance Java">Advanced Java enterprise edition</option>
                  <option value="Master In Java">Master In Java full-stack package</option>
                  <option value="Python Django">Python Django full-stack web</option>
                  <option value="Oracle Database">Oracle DB with PL/SQL schemas</option>
                  <option value="PHP Development">PHP Dynamic backend development</option>
                  <option value="Flutter & Dart">Flutter & Dart mobile apps dev</option>
                </optgroup>
                <optgroup label="Modern Full Stack">
                  <option value="Adv. Techno">Advanced Technologies (Node, Angular, MongoDB)</option>
                  <option value="ADSE">Advance Diploma in Software Engg (1 Year)</option>
                </optgroup>
                <optgroup label="Cloud & Future Tech">
                  <option value="Artificial Intelligence">Artificial Intelligence & Prompts Writing</option>
                  <option value="Cyber Security">Cyber Security defender training</option>
                  <option value="AWS Cloud Practitioner">AWS Cloud Practitioner prep</option>
                  <option value="AWS Solution Architect">AWS Solution Architect Associate prep</option>
                  <option value="AWS Developer Associate">AWS Developer Associate prep</option>
                </optgroup>
                <optgroup label="Graphics & Interfaces">
                  <option value="Desktop Publishing">DTP (Photoshop + CorelDraw + Typings)</option>
                  <option value="PhotoShop">Adobe PhotoShop layouts</option>
                  <option value="CorelDraw">CorelDraw vectors</option>
                  <option value="Illustrator">Adobe Illustrator assets</option>
                  <option value="UI-UX Design">UI-UX Design Figma prototyping</option>
                </optgroup>
                <optgroup label="Corporate IT Solutions">
                  <option value="Service: Web Development">Corporate Web Development Solutions</option>
                  <option value="Service: App Development">Corporate App Development Solutions</option>
                  <option value="Service: Camera Installation">Surveillance CCTV installations</option>
                  <option value="Service: AMC Services">Annual Systems Maintenance (AMC)</option>
                </optgroup>
              </select>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/60 transition text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow cursor-pointer mt-2"
            >
              {isSubmitting ? (
                <span>Submitting Inquiries...</span>
              ) : (
                <>
                  <span>Submit Inquiry</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
