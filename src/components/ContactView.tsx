import React, { useState } from "react";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from "lucide-react";

export default function ContactView() {
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
        setSubmitError(data.message || "Failed to send message. Please try again.");
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
          backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.65)), url('https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Contact Us</h1>
          <p className="text-blue-400 font-semibold tracking-wider uppercase text-xs md:text-sm">
            We'd love to hear from you
          </p>
        </div>
      </section>

      {/* 2. Contact Section */}
      <section className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
        
        {/* Left Card: Info */}
        <div className="bg-slate-50 p-8 rounded-3xl border border-gray-100 flex flex-col justify-between space-y-8">
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Get in Touch</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              Have questions about our course syllabuses, timing batches, student certifications, or corporate installations? Drop us a message, or visit our center.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Office Location</h4>
                <p className="text-sm text-gray-500 leading-snug">
                  Basement, H M Patel Trade Center, Opp Embassy Center, Mota Bazar, Vallabh Vidyanagar - 388120, Gujarat, India
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <Phone className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Call Center</h4>
                <a href="tel:+919979978326" className="text-sm text-blue-600 hover:underline font-semibold leading-snug">
                  +91 99799 78326
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Support Email</h4>
                <a href="mailto:ho.best.vvn@gmail.com" className="text-sm text-blue-600 hover:underline font-semibold leading-snug">
                  ho.best.vvn@gmail.com
                </a>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-gray-800 uppercase tracking-wider">Operating Hours</h4>
                <p className="text-sm text-gray-500 leading-snug">
                  Monday to Saturday: 8:00 AM - 8:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Message Form */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between">
          <form onSubmit={handleContactSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <h3 className="text-2xl font-bold text-gray-900 tracking-tight">Send Message</h3>
              <p className="text-sm text-gray-500 leading-relaxed">Fill out the form below and we will get back to you within 24 hours.</p>
            </div>

            {submitSuccess && (
              <div className="p-3.5 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Your message has been sent successfully! Our center staff will reach out to you soon.</span>
              </div>
            )}

            {submitError && (
              <div className="p-3.5 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm">
                {submitError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Your Name</label>
              <input
                type="text"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                placeholder="Full Name"
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase">Your Message</label>
              <textarea
                rows={4}
                value={formMessage}
                onChange={(e) => setFormMessage(e.target.value)}
                placeholder="How can we help you? Write your queries here..."
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 resize-none"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/60 transition text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 shadow cursor-pointer"
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
      </section>

      {/* 3. Google Map section */}
      <section className="w-full px-4 pb-16">
        <div className="max-w-7xl mx-auto rounded-3xl overflow-hidden border border-gray-100 shadow-sm h-96">
          <iframe
            src="https://www.google.com/maps?q=Best%20Computer%20Center%20Mota%20Bazzar%20V.V.%20Nagar&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer"
          ></iframe>
        </div>
      </section>
    </div>
  );
}
