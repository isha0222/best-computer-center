import React, { useState, useEffect } from "react";
import { 
  Users, Award, MessageSquare, ShieldCheck, Lock, LogIn, Trash2, 
  CheckSquare, Plus, Edit, RotateCcw, Filter, Search, Calendar, RefreshCw, BarChart3, AlertCircle 
} from "lucide-react";
import { StudentCertificate, CourseInquiry, ContactMessage } from "../types";

export default function AdminView() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Tabs inside Admin panel
  const [activeTab, setActiveTab] = useState<"dashboard" | "inquiries" | "contacts" | "certificates">("dashboard");

  // State lists
  const [inquiries, setInquiries] = useState<CourseInquiry[]>([]);
  const [contacts, setContacts] = useState<ContactMessage[]>([]);
  const [certificates, setCertificates] = useState<StudentCertificate[]>([]);

  // Search/Filters
  const [searchQuery, setSearchQuery] = useState("");

  // Certificate Form inputs (Add/Edit)
  const [certId, setCertId] = useState("");
  const [certRollNo, setCertRollNo] = useState("");
  const [certName, setCertName] = useState("");
  const [certCourse, setCertCourse] = useState("");
  const [certDuration, setCertDuration] = useState("");
  const [certStatus, setCertStatus] = useState("Completed & Issued");
  const [isEditingCert, setIsEditingCert] = useState(false);
  const [certFormError, setCertFormError] = useState("");
  const [certFormSuccess, setCertFormSuccess] = useState("");

  // Loading flags
  const [isLoading, setIsLoading] = useState(false);

  // Admin Login Handle
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setLoginError("Please enter both username and password.");
      return;
    }

    setIsLoggingIn(true);
    setLoginError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();
      if (response.ok && data.success) {
        setIsLoggedIn(true);
        // Save token to localStorage for preview persistence
        localStorage.setItem("best_admin_token", data.token);
        fetchAdminData();
      } else {
        setLoginError(data.message || "Invalid credentials.");
      }
    } catch (err) {
      setLoginError("Could not connect to authentication server.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("best_admin_token");
    setIsLoggedIn(false);
    setUsername("");
    setPassword("");
  };

  // Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("best_admin_token");
    if (token) {
      setIsLoggedIn(true);
      fetchAdminData();
    }
  }, []);

  // Fetch all backend data
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const [inqRes, contRes, certRes] = await Promise.all([
        fetch("/api/inquiries"),
        fetch("/api/contact"),
        fetch("/api/certificates")
      ]);

      if (inqRes.ok) setInquiries(await inqRes.json());
      if (contRes.ok) setContacts(await contRes.json());
      if (certRes.ok) setCertificates(await certRes.json());
    } catch (err) {
      console.error("Error loading admin datasets:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // -------------------------------------------------------------
  // Inquiry actions (update status / delete)
  // -------------------------------------------------------------
  const handleUpdateInquiryStatus = async (id: string, currentStatus: string) => {
    const targetStatus = currentStatus === "New" ? "Contacted" : "Closed";
    try {
      const res = await fetch(`/api/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: targetStatus })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to update inquiry.");
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this inquiry?")) return;
    try {
      const res = await fetch(`/api/inquiries/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to delete inquiry.");
    }
  };

  // -------------------------------------------------------------
  // Contact messages actions (mark read / delete)
  // -------------------------------------------------------------
  const handleMarkContactRead = async (id: string) => {
    try {
      const res = await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "Read" })
      });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to update message status.");
    }
  };

  const handleDeleteContact = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this contact message?")) return;
    try {
      const res = await fetch(`/api/contact/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to delete message.");
    }
  };

  // -------------------------------------------------------------
  // Student Certificate actions (create / update / delete)
  // -------------------------------------------------------------
  const handleCertSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCertFormError("");
    setCertFormSuccess("");

    if (!certRollNo || !certName || !certCourse || !certDuration || !certStatus) {
      setCertFormError("Please fill in all certificate fields.");
      return;
    }

    const payload = {
      rollNo: certRollNo.trim(),
      name: certName.trim(),
      course: certCourse.trim(),
      duration: certDuration.trim(),
      status: certStatus
    };

    try {
      let response;
      if (isEditingCert) {
        response = await fetch(`/api/certificates/${certId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        response = await fetch("/api/certificates", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await response.json();
      if (response.ok && data.success) {
        setCertFormSuccess(isEditingCert ? "Certificate updated successfully!" : "New student certificate created successfully!");
        resetCertForm();
        fetchAdminData();
      } else {
        setCertFormError(data.message || "Failed to process certificate. Roll number might exist.");
      }
    } catch (err) {
      setCertFormError("Server validation failed.");
    }
  };

  const handleEditCertClick = (cert: StudentCertificate) => {
    setCertId(cert.id);
    setCertRollNo(cert.rollNo);
    setCertName(cert.name);
    setCertCourse(cert.course);
    setCertDuration(cert.duration);
    setCertStatus(cert.status);
    setIsEditingCert(true);
    setCertFormError("");
    setCertFormSuccess("");
  };

  const handleDeleteCert = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this student certificate record?")) return;
    try {
      const res = await fetch(`/api/certificates/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchAdminData();
      }
    } catch (err) {
      alert("Failed to delete certificate.");
    }
  };

  const resetCertForm = () => {
    setCertId("");
    setCertRollNo("");
    setCertName("");
    setCertCourse("");
    setCertDuration("");
    setCertStatus("Completed & Issued");
    setIsEditingCert(false);
  };

  // -------------------------------------------------------------
  // Filter sets for tables
  // -------------------------------------------------------------
  const filteredCertificates = certificates.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.rollNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredInquiries = inquiries.filter(i => 
    i.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.course.toLowerCase().includes(searchQuery.toLowerCase()) ||
    i.phone.includes(searchQuery)
  );

  // -------------------------------------------------------------
  // Unlocked Admin Panel Dashboard UI
  // -------------------------------------------------------------
  if (!isLoggedIn) {
    return (
      <div className="w-full bg-slate-50 min-h-[500px] py-16 px-4 flex items-center justify-center">
        <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center mx-auto shadow-inner">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Admin Gatekeeper</h2>
            <p className="text-xs text-gray-500 max-w-[250px] mx-auto">
              Please enter the center credentials to manage student certifications, course inquiries, and messages.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-semibold leading-relaxed">
                {loginError}
              </div>
            )}

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Username</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username (e.g. admin)"
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password (e.g. admin123)"
                className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-950 transition text-white font-bold rounded-lg text-sm flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <LogIn className="w-4 h-4" />
              <span>{isLoggingIn ? "Authenticating..." : "Unlock Dashboard"}</span>
            </button>
          </form>

          {/* <p className="text-[10px] text-gray-400 text-center italic">
            Hint: Default development credentials are <span className="font-bold">admin</span> / <span className="font-bold">admin123</span>
          </p> */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Top Admin Header */}
      <div className="bg-[#0f172a] text-white py-4 px-6 shadow-md flex justify-between items-center flex-wrap gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center border border-blue-400 font-bold text-lg text-white">
            B
          </div>
          <div>
            <h2 className="text-base font-extrabold tracking-tight">Administrative Center</h2>
            <p className="text-[10px] text-blue-400 uppercase tracking-widest font-semibold">Active Session Console</p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-semibold">
          <button
            onClick={fetchAdminData}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg flex items-center gap-1 transition cursor-pointer"
            title="Refresh Registry Data"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Sync</span>
          </button>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-1 transition cursor-pointer"
          >
            <span>Lock Console</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Selector */}
      <div className="border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 flex overflow-x-auto">
          {[
            { id: "dashboard", label: "Overview Metrics", icon: <BarChart3 className="w-4 h-4" /> },
            { id: "inquiries", label: `Course Inquiries (${inquiries.length})`, icon: <Users className="w-4 h-4" /> },
            { id: "contacts", label: `Contact Queries (${contacts.length})`, icon: <MessageSquare className="w-4 h-4" /> },
            { id: "certificates", label: `Certificate Registry (${certificates.length})`, icon: <Award className="w-4 h-4" /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setSearchQuery("");
              }}
              className={`px-5 py-3.5 border-b-2 font-bold text-xs flex items-center gap-2 tracking-wider uppercase transition shrink-0 cursor-pointer ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600 bg-blue-50/10"
                  : "border-transparent text-gray-500 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        
        {/* TAB 1: OVERVIEW METRICS */}
        {activeTab === "dashboard" && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              
              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Total Inquiries</span>
                  <span className="text-3xl font-bold text-gray-900">{inquiries.length}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Unread Messages</span>
                  <span className="text-3xl font-bold text-gray-900">{contacts.filter(c => c.status === "Unread").length}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Student Registries</span>
                  <span className="text-3xl font-bold text-gray-900">{certificates.length}</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-700 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest block">Validation Rate</span>
                  <span className="text-3xl font-bold text-gray-900">100%</span>
                </div>
                <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
              </div>

            </div>

            {/* Quick overview of latest inquiries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Latest inquiries */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-gray-900">Latest Course Inquiries</h3>
                <div className="space-y-3">
                  {inquiries.slice(0, 4).map((inq) => (
                    <div key={inq.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                      <div>
                        <p className="font-bold text-gray-900">{inq.name}</p>
                        <p className="text-gray-500 font-semibold">{inq.course}</p>
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        inq.status === "New" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"
                      }`}>
                        {inq.status}
                      </span>
                    </div>
                  ))}
                  {inquiries.length === 0 && <p className="text-xs text-gray-400 italic">No inquiries received yet.</p>}
                </div>
              </div>

              {/* Latest Queries */}
              <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
                <h3 className="text-base font-bold text-gray-900">Recent Contact Messages</h3>
                <div className="space-y-3">
                  {contacts.slice(0, 4).map((msg) => (
                    <div key={msg.id} className="p-3 bg-slate-50 rounded-xl flex flex-col gap-1 text-xs">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-900">{msg.name}</span>
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                          msg.status === "Unread" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                        }`}>
                          {msg.status}
                        </span>
                      </div>
                      <p className="text-gray-500 italic font-medium line-clamp-2">"{msg.message}"</p>
                    </div>
                  ))}
                  {contacts.length === 0 && <p className="text-xs text-gray-400 italic">No messages received yet.</p>}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: COURSE INQUIRIES LIST */}
        {activeTab === "inquiries" && (
          <div className="space-y-6 animate-fadeIn bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              <h3 className="text-base font-bold text-gray-900">Student Enrollment Inquiries</h3>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search inquiries name, course or phone..."
                className="p-2 border border-gray-200 rounded-xl text-xs w-full max-w-xs focus:outline-none focus:border-blue-600"
              />
            </div>

            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100">
                    <th className="p-4 font-extrabold text-gray-700">Date Logged</th>
                    <th className="p-4 font-extrabold text-gray-700">Student Details</th>
                    <th className="p-4 font-extrabold text-gray-700">Inquired Course</th>
                    <th className="p-4 font-extrabold text-gray-700">Status</th>
                    <th className="p-4 font-extrabold text-gray-700 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {filteredInquiries.map((inq) => (
                    <tr key={inq.id} className="hover:bg-slate-50/50">
                      <td className="p-4 text-gray-500 font-semibold">{new Date(inq.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <p className="font-extrabold text-gray-800">{inq.name}</p>
                        <p className="text-gray-500 font-medium">{inq.phone}</p>
                        <p className="text-[10px] text-gray-400 font-medium">{inq.email}</p>
                      </td>
                      <td className="p-4 font-bold text-gray-800">{inq.course}</td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                          inq.status === "New" 
                            ? "bg-blue-100 text-blue-800" 
                            : inq.status === "Contacted"
                            ? "bg-amber-100 text-amber-800"
                            : "bg-gray-100 text-gray-600"
                        }`}>
                          {inq.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex gap-1">
                          {inq.status !== "Closed" && (
                            <button
                              onClick={() => handleUpdateInquiryStatus(inq.id, inq.status)}
                              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-gray-800 rounded font-bold text-[10px] transition cursor-pointer"
                            >
                              {inq.status === "New" ? "Mark Contacted" : "Close Inquiry"}
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteInquiry(inq.id)}
                            className="p-1 text-red-700 hover:bg-red-50 rounded transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredInquiries.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">No inquiries found matching criteria.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT MESSAGES LIST */}
        {activeTab === "contacts" && (
          <div className="space-y-6 animate-fadeIn bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <h3 className="text-base font-bold text-gray-900">Direct Contact Query Submissions</h3>

            <div className="overflow-x-auto border border-gray-100 rounded-xl">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-gray-100">
                    <th className="p-4 font-extrabold text-gray-700">Date Logged</th>
                    <th className="p-4 font-extrabold text-gray-700">Sender</th>
                    <th className="p-4 font-extrabold text-gray-700">Message Content</th>
                    <th className="p-4 font-extrabold text-gray-700">Status</th>
                    <th className="p-4 font-extrabold text-gray-700 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {contacts.map((msg) => (
                    <tr key={msg.id} className="hover:bg-slate-50/50">
                      <td className="p-4 text-gray-500 font-semibold">{new Date(msg.createdAt).toLocaleDateString()}</td>
                      <td className="p-4">
                        <p className="font-extrabold text-gray-800">{msg.name}</p>
                        <p className="text-gray-500 font-medium">{msg.email}</p>
                      </td>
                      <td className="p-4 text-gray-500 font-medium italic leading-relaxed max-w-sm truncate" title={msg.message}>
                        "{msg.message}"
                      </td>
                      <td className="p-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                          msg.status === "Unread" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-600"
                        }`}>
                          {msg.status}
                        </span>
                      </td>
                      <td className="p-4 text-center">
                        <div className="inline-flex gap-1.5">
                          {msg.status === "Unread" && (
                            <button
                              onClick={() => handleMarkContactRead(msg.id)}
                              className="px-2.5 py-1 bg-green-50 hover:bg-green-100 text-green-700 rounded font-bold text-[10px] transition cursor-pointer"
                            >
                              Mark Read
                            </button>
                          )}
                          <button
                            onClick={() => handleDeleteContact(msg.id)}
                            className="p-1 text-red-700 hover:bg-red-50 rounded transition cursor-pointer"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {contacts.length === 0 && (
                    <tr>
                      <td colSpan={5} className="p-8 text-center text-gray-400 italic">No contact submissions received yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: CERTIFICATES REGISTRY (CRUD PANEL) */}
        {activeTab === "certificates" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start animate-fadeIn">
            
            {/* Form Column (Add/Edit) */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-base font-bold text-gray-900">{isEditingCert ? "Edit Certificate" : "Register Student"}</h3>
                {isEditingCert && (
                  <button
                    onClick={resetCertForm}
                    className="text-[10px] font-extrabold text-blue-600 flex items-center gap-0.5 tracking-wider uppercase transition cursor-pointer"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>

              {certFormError && (
                <div className="p-3 bg-red-50 border border-red-100 rounded-xl text-red-700 text-xs font-semibold">
                  {certFormError}
                </div>
              )}

              {certFormSuccess && (
                <div className="p-3 bg-green-50 border border-green-100 rounded-xl text-green-700 text-xs font-semibold">
                  {certFormSuccess}
                </div>
              )}

              <form onSubmit={handleCertSubmit} className="space-y-4 text-xs">
                
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Roll Number</label>
                  <input
                    type="text"
                    value={certRollNo}
                    onChange={(e) => setCertRollNo(e.target.value)}
                    placeholder="Enter Unique Roll Number (e.g. 1006)"
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 font-bold tracking-widest text-gray-700"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Student Full Name</label>
                  <input
                    type="text"
                    value={certName}
                    onChange={(e) => setCertName(e.target.value)}
                    placeholder="First Name Last Name"
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Completed Course</label>
                  <input
                    type="text"
                    value={certCourse}
                    onChange={(e) => setCertCourse(e.target.value)}
                    placeholder="e.g. Tally with GST, CCC"
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Course Duration</label>
                  <input
                    type="text"
                    value={certDuration}
                    onChange={(e) => setCertDuration(e.target.value)}
                    placeholder="e.g. 2 Months, 3 Months, 1 Year"
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase tracking-wider">Certification Status</label>
                  <select
                    value={certStatus}
                    onChange={(e) => setCertStatus(e.target.value)}
                    className="w-full p-2.5 bg-slate-50 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-600"
                    required
                  >
                    <option value="Completed & Issued">Completed & Issued</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition flex items-center justify-center gap-1.5 cursor-pointer shadow-sm text-sm mt-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>{isEditingCert ? "Update Registry" : "Register Student"}</span>
                </button>
              </form>
            </div>

            {/* Registry List Table Column */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm lg:col-span-2 space-y-4">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <h3 className="text-base font-bold text-gray-900">Student Verification Registry</h3>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student or roll number..."
                  className="p-2 border border-gray-200 rounded-xl text-xs w-full max-w-xs focus:outline-none focus:border-blue-600"
                />
              </div>

              <div className="overflow-x-auto border border-gray-100 rounded-xl">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-gray-100">
                      <th className="p-4 font-extrabold text-gray-700">Roll No</th>
                      <th className="p-4 font-extrabold text-gray-700">Student Name</th>
                      <th className="p-4 font-extrabold text-gray-700">Course / duration</th>
                      <th className="p-4 font-extrabold text-gray-700">Status</th>
                      <th className="p-4 font-extrabold text-gray-700 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredCertificates.map((cert) => (
                      <tr key={cert.id} className="hover:bg-slate-50/50">
                        <td className="p-4 font-extrabold text-gray-800 tracking-wider">{cert.rollNo}</td>
                        <td className="p-4 font-extrabold text-gray-900">{cert.name}</td>
                        <td className="p-4">
                          <p className="font-bold text-gray-800 leading-none">{cert.course}</p>
                          <p className="text-[10px] text-gray-400 mt-1">{cert.duration}</p>
                        </td>
                        <td className="p-4 font-semibold">
                          <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-extrabold uppercase ${
                            cert.status === "Completed & Issued" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {cert.status}
                          </span>
                        </td>
                        <td className="p-4 text-center">
                          <div className="inline-flex gap-1.5">
                            <button
                              onClick={() => handleEditCertClick(cert)}
                              className="p-1 text-slate-700 hover:bg-slate-100 rounded transition cursor-pointer"
                              title="Edit Registry"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteCert(cert.id)}
                              className="p-1 text-red-700 hover:bg-red-50 rounded transition cursor-pointer"
                              title="Delete Student"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredCertificates.length === 0 && (
                      <tr>
                        <td colSpan={5} className="p-8 text-center text-gray-400 italic">No certificates found matching criteria.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
