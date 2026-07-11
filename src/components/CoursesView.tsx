import React, { useState, useEffect } from "react";
import { COURSES } from "../data";
import { Search, Clock, BookOpen, AlertCircle, Sparkles, CheckCircle } from "lucide-react";
import { CourseDetail } from "../types";

interface CoursesViewProps {
  setCurrentTab: (tab: string) => void;
  setEnrollingCourse: (course: string) => void;
  selectedCourseId: string | null;
  setSelectedCourseId: (id: string | null) => void;
}

export default function CoursesView({ 
  setCurrentTab, 
  setEnrollingCourse, 
  selectedCourseId, 
  setSelectedCourseId 
}: CoursesViewProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState<CourseDetail[]>(COURSES);
  const [activeModalCourse, setActiveModalCourse] = useState<CourseDetail | null>(null);

  // Search Filter logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredCourses(COURSES);
    } else {
      const q = searchQuery.toLowerCase();
      setFilteredCourses(
        COURSES.filter(c => 
          c.title.toLowerCase().includes(q) || 
          c.description.toLowerCase().includes(q) ||
          c.content.some(item => item.toLowerCase().includes(q))
        )
      );
    }
  }, [searchQuery]);

  // Check if there was an external trigger (like clicking Read More from home)
  useEffect(() => {
    if (selectedCourseId) {
      const course = COURSES.find(c => c.id === selectedCourseId);
      if (course) {
        setActiveModalCourse(course);
      }
      setSelectedCourseId(null); // Reset trigger
    }
  }, [selectedCourseId]);

  const handleEnrollClick = (courseTitle: string) => {
    setEnrollingCourse(courseTitle);
    setCurrentTab("enroll");
    setActiveModalCourse(null);
  };

  return (
    <div className="w-full">
      {/* 1. Course Header */}
      <section 
        className="bg-cover bg-center text-white py-16 px-4 text-center"
        style={{
          backgroundImage: "linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop')"
        }}
      >
        <div className="max-w-4xl mx-auto space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Our Courses</h1>
          <p className="text-gray-300 max-w-xl mx-auto text-sm md:text-base">
            Choose your professional career path and start learning high-demand computer skills today.
          </p>
        </div>
      </section>

      {/* 2. Interactive Search & Listing */}
      <section className="max-w-7xl mx-auto px-4 py-12 space-y-8">
        
        {/* Search Bar */}
        <div className="max-w-md mx-auto relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search courses (e.g. Tally, C++, AWS, Python)..."
            className="w-full pl-11 pr-4 py-3 bg-white border border-gray-200 rounded-2xl text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 w-full bg-slate-100">
                    <img 
                      src={course.image} 
                      alt={course.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 px-2.5 py-0.5 bg-blue-600 text-white text-xs font-bold rounded-md shadow-sm">
                      {course.duration}
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">{course.title}</h3>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-3">{course.description}</p>
                  </div>
                </div>

                <div className="p-6 pt-0 border-t border-gray-50 bg-slate-50/50 flex items-center justify-between gap-2 mt-4">
                  <span className="text-sm font-bold text-blue-600">{course.fees}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveModalCourse(course)}
                      className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-full transition cursor-pointer"
                    >
                      Syllabus
                    </button>
                    <button
                      onClick={() => handleEnrollClick(course.title)}
                      className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-full transition shadow-sm cursor-pointer"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-12 text-center max-w-sm mx-auto space-y-3 bg-slate-50 rounded-2xl border border-gray-100">
              <AlertCircle className="w-12 h-12 text-blue-600 mx-auto" />
            <h3 className="text-lg font-bold text-gray-800">No Courses Found</h3>
            <p className="text-sm text-gray-500 leading-relaxed">
              We couldn't find any courses matching your search. Please try checking typos or looking for broader terms.
            </p>
            <button
              onClick={() => setSearchQuery("")}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-full transition cursor-pointer"
            >
              Clear Search
            </button>
          </div>
        )}
      </section>

      {/* 3. Syllabus/Details Modal */}
      {activeModalCourse && (
        <div className="fixed inset-0 z-[110] bg-black/60 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden max-w-lg w-full shadow-2xl relative border border-gray-100 animate-scaleUp max-h-[85vh] flex flex-col">
            
            {/* Close Button */}
            <button
              onClick={() => setActiveModalCourse(null)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 text-white flex items-center justify-center font-bold text-lg transition z-10 cursor-pointer"
            >
              ×
            </button>

            {/* Header image & title */}
            <div className="relative h-44 w-full bg-slate-100 shrink-0">
              <img 
                src={activeModalCourse.image} 
                alt={activeModalCourse.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400">Syllabus Details</span>
                <h3 className="text-lg md:text-xl font-extrabold tracking-tight leading-tight">{activeModalCourse.title}</h3>
              </div>
            </div>

            {/* Content Body (Scrollable) */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              {/* Course Meta Info */}
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-gray-100 text-center">
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Duration</span>
                  <span className="text-sm font-bold text-gray-800">{activeModalCourse.duration}</span>
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Course Fees</span>
                  <span className="text-sm font-bold text-blue-600">{activeModalCourse.fees}</span>
                </div>
              </div>

              {/* Course Description */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Course Overview</h4>
                <p className="text-sm text-gray-500 leading-relaxed text-justify">{activeModalCourse.description}</p>
              </div>

              {/* Course Topics List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-gray-700 uppercase tracking-wider">What You Will Learn</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  {activeModalCourse.content.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 leading-snug">
                      <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="p-6 border-t border-gray-100 bg-slate-50 flex gap-4 shrink-0">
              <button
                onClick={() => setActiveModalCourse(null)}
                className="flex-1 py-2.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-xl font-bold text-sm transition cursor-pointer"
              >
                Close Syllabus
              </button>
              <button
                onClick={() => handleEnrollClick(activeModalCourse.title)}
                className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-sm shadow transition hover:scale-105 cursor-pointer"
              >
                Enroll Now
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
