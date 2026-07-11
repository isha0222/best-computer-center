/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeView from "./components/HomeView";
import AboutView from "./components/AboutView";
import CoursesView from "./components/CoursesView";
import ServicesView from "./components/ServicesView";
import ContactView from "./components/ContactView";
import EnrollView from "./components/EnrollView";
import CertificateView from "./components/CertificateView";
import AdminView from "./components/AdminView";

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>("home");
  
  // Shared state to allow pre-selecting courses when clicking "Enroll Now" from elsewhere
  const [enrollingCourse, setEnrollingCourse] = useState<string>("");
  
  // Shared state to trigger opening a syllabus details modal upon redirect to courses page
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-between font-sans">
      <Header currentTab={currentTab} setCurrentTab={setCurrentTab} />
      
      {/* Main Content View Transition Area */}
      <main className="flex-1 w-full flex flex-col justify-start items-center">
        {currentTab === "home" && (
          <HomeView 
            setCurrentTab={setCurrentTab} 
            setSelectedCourseId={setSelectedCourseId} 
          />
        )}
        
        {currentTab === "about" && (
          <AboutView setCurrentTab={setCurrentTab} />
        )}
        
        {currentTab === "courses" && (
          <CoursesView 
            setCurrentTab={setCurrentTab} 
            setEnrollingCourse={setEnrollingCourse} 
            selectedCourseId={selectedCourseId}
            setSelectedCourseId={setSelectedCourseId}
          />
        )}
        
        {currentTab === "services" && (
          <ServicesView 
            setCurrentTab={setCurrentTab} 
            setEnrollingCourse={setEnrollingCourse} 
          />
        )}
        
        {currentTab === "contact" && (
          <ContactView />
        )}
        
        {currentTab === "enroll" && (
          <EnrollView 
            enrollingCourse={enrollingCourse} 
            setEnrollingCourse={setEnrollingCourse} 
          />
        )}
        
        {currentTab === "verify" && (
          <CertificateView />
        )}

        {currentTab === "admin" && (
          <AdminView />
        )}
      </main>

      <Footer setCurrentTab={setCurrentTab} />
    </div>
  );
}
