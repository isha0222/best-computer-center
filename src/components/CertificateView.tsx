import React, { useState } from "react";
import { Search, Award, FileCheck2, AlertTriangle, Printer, BadgeCheck, ShieldCheck } from "lucide-react";
import { StudentCertificate } from "../types";

export default function CertificateView() {
  const [rollNo, setRollNo] = useState("");
  const [student, setStudent] = useState<StudentCertificate | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rollNo.trim()) {
      setErrorMsg("Please enter a roll number.");
      setStudent(null);
      return;
    }

    setIsVerifying(true);
    setErrorMsg("");
    setStudent(null);

    try {
      const response = await fetch(`/api/certificates/${rollNo.trim()}`);
      const data = await response.json();

      if (response.ok && data.success) {
        setStudent(data.student);
      } else {
        setErrorMsg(data.message || "Invalid Roll Number. Please double-check with the admin registry.");
      }
    } catch (err) {
      setErrorMsg("Connection error. Could not connect to the certification server.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full">
      {/* 1. Header Banner */}
      <section 
        className="bg-cover bg-center text-white py-16 px-4 text-center print:hidden"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">🎓 Certificate Verification</h1>
          <p className="text-blue-400 font-semibold tracking-wider uppercase text-xs md:text-sm">
            Student Validation & Authentication Registry
          </p>
        </div>
      </section>

      {/* 2. Main Verification Input & Output container */}
      <section className="max-w-4xl mx-auto px-4 py-16 space-y-12">
        
        {/* Verification Form (Hidden during printing) */}
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm max-w-md mx-auto text-center space-y-6 print:hidden">
          <div className="space-y-2">
            <Award className="w-12 h-12 text-blue-600 mx-auto" />
            <h3 className="text-xl font-bold text-gray-900 tracking-tight">Verify Student Certificate</h3>
            <p className="text-xs text-gray-500 leading-relaxed">
              Enter your Roll Number below to instantly verify your course completion, duration hours, and certificate status.
            </p>
          </div>

          <form onSubmit={handleVerify} className="space-y-4">
            <div className="relative">
              <input
                type="text"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                placeholder="Enter Student Roll Number (e.g. 1001)"
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-2xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-center font-bold tracking-widest text-gray-800"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-900/60 text-white rounded-2xl font-bold text-sm shadow transition duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isVerifying ? (
                <span>Verifying Credentials...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Certificate</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {errorMsg && (
            <div className="p-4 bg-red-50 border border-red-100 rounded-2xl text-red-700 text-sm flex gap-2 text-left items-start">
              <AlertTriangle className="w-5 h-5 shrink-0 text-blue-600" />
              <div className="space-y-0.5">
                <h4 className="font-bold text-red-800 leading-tight">Verification Failed</h4>
                <p className="text-xs text-red-600 leading-relaxed">{errorMsg}</p>
                <p className="text-[10px] text-gray-400 italic pt-1 leading-tight">Note: Try roll numbers 1001, 1002, 1003, or 1004 to test preloaded certificates.</p>
              </div>
            </div>
          )}
        </div>

        {/* Certificate Display Area (Printable) */}
        {student && (
          <div className="space-y-4">
            
            {/* Top print instructions (Hidden when printing) */}
            <div className="flex flex-col sm:flex-row justify-between items-center bg-emerald-50 border border-emerald-200 p-4 rounded-2xl gap-4 print:hidden">
              <div className="flex gap-2 text-left">
                <BadgeCheck className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <h4 className="text-sm font-bold text-emerald-800">Certificate Status: Verified Valid</h4>
                  <p className="text-xs text-emerald-600">The roll number matches our active administrative database registry.</p>
                </div>
              </div>
              <button
                onClick={handlePrint}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 shadow transition cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Certificate</span>
              </button>
            </div>

            {/* Actual Certificate Document Wrapper */}
            <div className="bg-amber-50/20 border-8 border-double border-amber-800 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-md max-w-2xl mx-auto space-y-8 bg-white font-serif">
              {/* Corner Ornaments */}
              <div className="absolute top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-amber-800"></div>
              <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-amber-800"></div>
              <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-amber-800"></div>
              <div className="absolute bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-amber-800"></div>

              {/* Watermark in center */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
                <Award className="w-80 h-80 text-amber-800" />
              </div>

              {/* Header */}
              <div className="text-center space-y-2 relative z-10">
                <div className="text-center">
                  <span className="font-sans text-xs font-bold tracking-widest text-amber-800 uppercase block">Certificate of Completion</span>
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 font-serif mt-1">BEST COMPUTER CENTER</h2>
                  <p className="font-sans text-[10px] font-bold tracking-wider text-blue-800">VALLABH VIDYANAGAR, GUJARAT, INDIA</p>
                  <div className="w-24 h-0.5 bg-amber-800 mx-auto mt-2"></div>
                </div>
              </div>

              {/* Certificate content text */}
              <div className="text-center space-y-6 relative z-10 leading-relaxed font-sans text-gray-700">
                <p className="text-sm font-medium italic text-gray-500">This is to certify and verify that</p>
                <h3 className="text-xl md:text-2xl font-bold text-blue-950 border-b border-dashed border-gray-300 pb-2 max-w-md mx-auto">{student.name}</h3>
                
                <p className="text-sm leading-relaxed max-w-lg mx-auto">
                  has successfully completed the prescribed course of training for the subject <br />
                  <span className="text-base font-extrabold text-gray-900 leading-snug">{student.course}</span> <br />
                  with a course duration of <span className="font-extrabold text-gray-900">{student.duration}</span> at our Vallabh Vidyanagar training division.
                </p>

                <p className="text-xs font-semibold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-4 py-1.5 rounded-full inline-block border border-emerald-200">
                  Status: {student.status}
                </p>
              </div>

              {/* Verification Details Table */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 font-sans text-xs relative z-10">
                <div className="space-y-1 text-left">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Validation Credentials</p>
                  <p className="text-gray-700 font-semibold"><span className="text-gray-400 font-normal">Roll Number:</span> {student.rollNo}</p>
                  <p className="text-gray-700 font-semibold"><span className="text-gray-400 font-normal">Registry ID:</span> {student.id}</p>
                </div>
                <div className="space-y-1 text-right flex flex-col justify-end items-end">
                  <p className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">Registry Seal</p>
                  <div className="flex items-center gap-1 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 shrink-0" />
                    <span>VERIFIED OFFICIAL</span>
                  </div>
                  <p className="text-[10px] text-gray-400 italic">Validated on {new Date().toLocaleDateString()}</p>
                </div>
              </div>

            </div>
          </div>
        )}

      </section>
    </div>
  );
}
